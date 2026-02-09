const User = require('../models/User');
const { dbHelpers } = require('../database/db');

class DashboardController {
    // Get dashboard data
    async getDashboardData(req, res) {
        try {
            const userId = req.userId;

            // Get user dashboard stats
            const dashboardData = await User.getDashboardStats(userId);
            if (!dashboardData) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Format stats for frontend
            const stats = [
                {
                    id: 1,
                    title: 'Total Earnings',
                    value: `KSh ${dashboardData.user.total_earnings.toFixed(2)}`,
                    income: '+12.5%' // Calculate from previous period
                },
                {
                    id: 2,
                    title: 'Referrals',
                    value: dashboardData.user.referrals,
                    change: '+18%'
                },
                {
                    id: 3,
                    title: 'Points Earned',
                    value: dashboardData.user.points.toLocaleString(),
                    change: '+450%'
                },
                {
                    id: 4,
                    title: 'FiAward',
                    value: 'warning',
                    icon: '⚠️'
                }
            ];

            // Format activities
            const activities = dashboardData.activities.map(activity => ({
                id: activity.id,
                type: activity.activity_type,
                description: activity.description,
                points: activity.points_earned,
                time: new Date(activity.created_at).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                }),
                date: new Date(activity.created_at).toLocaleDateString()
            }));

            res.json({
                success: true,
                user: dashboardData.user,
                stats,
                activities,
                referral_stats: dashboardData.referral_stats,
                today_earnings: dashboardData.today_earnings
            });
        } catch (error) {
            console.error('Dashboard error:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching dashboard data'
            });
        }
    }

    // Record activity
    async recordActivity(req, res) {
        try {
            const { userId, activity_type, description, points_earned = 0 } = req.body;

            await dbHelpers.run(
                `INSERT INTO activities (user_id, activity_type, description, points_earned)
                 VALUES (?, ?, ?, ?)`,
                [userId, activity_type, description, points_earned]
            );

            // Update user points
            if (points_earned > 0) {
                await User.updateStats(userId, { points: points_earned });
            }

            res.json({
                success: true,
                message: 'Activity recorded'
            });
        } catch (error) {
            console.error('Activity error:', error);
            res.status(500).json({
                success: false,
                message: 'Error recording activity'
            });
        }
    }

    // Share referral
    async shareReferral(req, res) {
        try {
            const { userId, platform } = req.body;

            // Get user's referral code
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const referralCode = user.referral_code;
            
            // Generate share URLs
            const shareUrls = {
                twitter: `https://twitter.com/intent/tweet?text=Join%20me%20on%20NewStateHela!%20Use%20my%20referral%20code:%20${referralCode}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=https://newstatehela.com&quote=Use%20my%20referral%20code:%20${referralCode}`,
                whatsapp: `https://wa.me/?text=Join%20me%20on%20NewStateHela!%20Use%20my%20referral%20code:%20${referralCode}`,
                telegram: `https://t.me/share/url?url=https://newstatehela.com&text=Use%20my%20referral%20code:%20${referralCode}`,
                copy: referralCode
            };

            // Record share activity
            await this.recordActivity(req, {
                body: {
                    userId,
                    activity_type: 'referral_share',
                    description: `Shared referral link via ${platform}`,
                    points_earned: 5 // Give points for sharing
                }
            }, { json: () => {} });

            res.json({
                success: true,
                share_url: shareUrls[platform],
                message: `Sharing via ${platform}...`
            });
        } catch (error) {
            console.error('Share error:', error);
            res.status(500).json({
                success: false,
                message: 'Error sharing referral'
            });
        }
    }

    // Get referrals list
    async getReferrals(req, res) {
        try {
            const userId = req.userId;

            const referrals = await dbHelpers.query(
                `SELECT 
                    r.id,
                    u.username as referred_username,
                    u.full_name as referred_name,
                    u.email as referred_email,
                    r.status,
                    r.earned_points,
                    r.created_at
                 FROM referrals r
                 JOIN users u ON r.referred_id = u.id
                 WHERE r.referrer_id = ?
                 ORDER BY r.created_at DESC`,
                [userId]
            );

            res.json({
                success: true,
                referrals
            });
        } catch (error) {
            console.error('Referrals error:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching referrals'
            });
        }
    }
}

module.exports = new DashboardController();
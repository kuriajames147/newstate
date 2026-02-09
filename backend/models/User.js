const bcrypt = require('bcryptjs');
const { dbHelpers } = require('../database/db');

class User {
    // Create new user
    static async create(userData) {
        try {
            const { username, email, full_name, password, phone_number } = userData;
            
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            
            // Generate referral code (using first 4 chars of username + random number)
            const referralCode = username.slice(0, 4).toUpperCase() + Math.floor(1000 + Math.random() * 9000);
            
            const result = await dbHelpers.run(
                `INSERT INTO users (username, email, full_name, phone_number, password_hash, referral_code) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [username, email, full_name, phone_number, passwordHash, referralCode]
            );
            
            return { id: result.id, username, email, full_name, referral_code: referralCode };
        } catch (error) {
            throw error;
        }
    }

    // Find user by username
    static async findByUsername(username) {
        try {
            return await dbHelpers.get(
                'SELECT * FROM users WHERE username = ?',
                [username]
            );
        } catch (error) {
            throw error;
        }
    }

    // Find user by email
    static async findByEmail(email) {
        try {
            return await dbHelpers.get(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
        } catch (error) {
            throw error;
        }
    }

    // Find user by ID
    static async findById(id) {
        try {
            const user = await dbHelpers.get(
                `SELECT id, username, email, full_name, phone_number, 
                        points, referrals, total_earnings, referral_code, 
                        created_at, last_login 
                 FROM users WHERE id = ?`,
                [id]
            );
            return user;
        } catch (error) {
            throw error;
        }
    }

    // Verify password
    static async verifyPassword(password, passwordHash) {
        return await bcrypt.compare(password, passwordHash);
    }

    // Update user stats
    static async updateStats(userId, updates) {
        try {
            const fields = [];
            const values = [];
            
            if (updates.points !== undefined) {
                fields.push('points = points + ?');
                values.push(updates.points);
            }
            
            if (updates.referrals !== undefined) {
                fields.push('referrals = referrals + ?');
                values.push(updates.referrals);
            }
            
            if (updates.total_earnings !== undefined) {
                fields.push('total_earnings = total_earnings + ?');
                values.push(updates.total_earnings);
            }
            
            if (fields.length === 0) return;
            
            values.push(userId);
            
            await dbHelpers.run(
                `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
                values
            );
        } catch (error) {
            throw error;
        }
    }

    // Get dashboard stats for user
    static async getDashboardStats(userId) {
        try {
            const user = await this.findById(userId);
            if (!user) return null;

            // Get recent activities
            const activities = await dbHelpers.query(
                `SELECT * FROM activities 
                 WHERE user_id = ? 
                 ORDER BY created_at DESC 
                 LIMIT 10`,
                [userId]
            );

            // Get referral stats
            const referralStats = await dbHelpers.get(
                `SELECT 
                    COUNT(*) as total_referrals,
                    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_referrals,
                    SUM(earned_points) as total_points_from_referrals
                 FROM referrals 
                 WHERE referrer_id = ?`,
                [userId]
            );

            // Get today's earnings
            const todayEarnings = await dbHelpers.get(
                `SELECT COALESCE(SUM(amount), 0) as today_earnings
                 FROM transactions 
                 WHERE user_id = ? 
                 AND DATE(created_at) = DATE('now')
                 AND status = 'completed'`,
                [userId]
            );

            return {
                user,
                activities,
                referral_stats: referralStats || { total_referrals: 0, completed_referrals: 0, total_points_from_referrals: 0 },
                today_earnings: todayEarnings?.today_earnings || 0
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
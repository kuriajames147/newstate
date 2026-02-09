const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthController {
    // Register new user
    async register(req, res) {
        try {
            const { username, email, full_name, password, phone_number, referral_code } = req.body;

            // Check if user exists
            const existingUser = await User.findByUsername(username) || await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Username or email already exists'
                });
            }

            // Create user
            const user = await User.create({
                username,
                email,
                full_name,
                password,
                phone_number
            });

            // Handle referral if code provided
            if (referral_code) {
                const referrer = await User.findByUsername(referral_code);
                if (referrer) {
                    const { dbHelpers } = require('../database/db');
                    await dbHelpers.run(
                        `INSERT INTO referrals (referrer_id, referred_id, status) 
                         VALUES (?, ?, 'pending')`,
                        [referrer.id, user.id]
                    );

                    // Update referrer stats
                    await User.updateStats(referrer.id, { referrals: 1 });
                }
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );

            res.status(201).json({
                success: true,
                message: 'Registration successful',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    full_name: user.full_name,
                    referral_code: user.referral_code,
                    points: 0,
                    referrals: 0,
                    total_earnings: 0
                },
                token
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Error during registration'
            });
        }
    }

    // Login user
    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Find user
            const user = await User.findByUsername(username);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Verify password
            const isValidPassword = await User.verifyPassword(password, user.password_hash);
            if (!isValidPassword) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Update last login
            const { dbHelpers } = require('../database/db');
            await dbHelpers.run(
                'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?',
                [user.id]
            );

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );

            res.json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    full_name: user.full_name,
                    points: user.points,
                    referrals: user.referrals,
                    total_earnings: user.total_earnings,
                    referral_code: user.referral_code
                },
                token
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'Error during login'
            });
        }
    }

    // Get current user profile
    async getProfile(req, res) {
        try {
            const userId = req.userId; // From middleware
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.json({
                success: true,
                user
            });
        } catch (error) {
            console.error('Profile error:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching profile'
            });
        }
    }
}

module.exports = new AuthController();
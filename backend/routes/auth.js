const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ Import User model correctly
const { User } = require('../models');
const authController = require('../controllers/authController');

// ✅ .env secret fallback
const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

// REGISTER route
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, referralCode } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      passwordHash,
      referralCode: generateReferralCode(),
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET);
    res.json({ token, user: newUser });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper: Generate unique referral code
function generateReferralCode() {
  return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase();
}
// public routes for registration and login
router.post('/register', authController.register);
router.post('/login', authController.login);
//protected routes
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;

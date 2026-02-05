// ================================
// 📁 backend/routes/user.js
// ================================
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const authenticate = require('../middleware/auth');

// ✅ GET /api/users/referrals - Get all users referred by this user
router.get('/referrals', authenticate, async (req, res) => {
  console.log('User from token:', req.user);
  try {
    const referrals = await User.findAll({
      where: { referrerId: req.user.id },
      attributes: ['id', 'name', 'email', 'createdAt']
    });
    res.json({ referrals });
  } catch (err) {
    console.error('Referral fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch referrals' });
  }
});

// GET /api/users/profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('User fetch error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;

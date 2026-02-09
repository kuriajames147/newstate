const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

// all dashboard routes require authentication
router.use(authMiddleware);

//dashboard data
router.get('/stats', dashboardController.getdashboardData);

//activities
router.post('/activity', dashboardController.recordActivity);

//referrals
router.post('/referrals/share', dashboardController.shareReferral);
router.get('/referrals', dashboardController.getReferralStats);

module.exports = router;
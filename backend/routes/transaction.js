const express = require('express');
const router = express.Router();
const { deposit, withdraw } = require('../controllers/transaction');
const authenticate = require('../middleware/auth');

router.post('/deposit', authenticate, deposit);
router.post('/withdraw', authenticate, withdraw);

module.exports = router;

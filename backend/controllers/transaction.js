const { User } = require('../models');
const Transaction = require('../models/Transaction');

const deposit = async (req, res) => {
  const { amount, mpesaNumber } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    user.mpesaBalance += amount;
    user.mpesaNumber = mpesaNumber;
    await user.save();

    await Transaction.create({ userId, type: 'deposit', amount, status: 'approved' });

    res.json({ message: 'Deposit successful', balance: user.mpesaBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Deposit failed' });
  }
};

const withdraw = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (user.mpesaBalance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.mpesaBalance -= amount;
    await user.save();

    await Transaction.create({ userId, type: 'withdraw', amount, status: 'pending' });

    res.json({ message: 'Withdrawal requested', balance: user.mpesaBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Withdrawal failed' });
  }
};

module.exports = { deposit, withdraw };

// ✅ backend/models/Transaction.js
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdraw'),
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    mpesaNumber: DataTypes.STRING
  }, {
    timestamps: true
  });

  return Transaction;
};

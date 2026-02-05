// ✅ backend/models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    passwordHash: DataTypes.STRING,
    phone: DataTypes.STRING,
    referralCode: { type: DataTypes.STRING, unique: true },
    referrerId: DataTypes.INTEGER,
    referralEarnings: { type: DataTypes.FLOAT, defaultValue: 0 },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    mpesaNumber: DataTypes.STRING
  }, {
    timestamps: true
  });

  return User;
};

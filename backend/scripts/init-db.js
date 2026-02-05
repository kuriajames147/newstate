// 📁 scripts/init-db.js
const { sequelize, User } = require('../models');
const bcrypt = require('bcrypt');

async function init() {
  await sequelize.sync({ force: true }); // force true: drops & recreates
  const passwordHash = await bcrypt.hash('test123', 10);

  await User.create({
    name: 'Test User',
    email: 'test@example.com',
    phone: '0700123456',
    passwordHash,
    referralCode: 'TEST123',
    isActivated: true
  });

  console.log('✅ DB initialized with one test user');
}

init();

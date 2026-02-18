const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite')
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models - ALL models should get both sequelize and Sequelize.DataTypes
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Transaction = require('./Transaction')(sequelize, Sequelize.DataTypes);
db.Quiz = require('./Quiz')(sequelize, Sequelize.DataTypes);

// Define relationships (if needed)
db.User.hasMany(db.Transaction, { foreignKey: 'userId' });
db.Transaction.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;
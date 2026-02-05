// ✅ backend/models/Quiz.js
module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define('Quiz', {
    question: DataTypes.STRING,
    options: DataTypes.JSON,         // Store options as an array
    answerIndex: DataTypes.INTEGER   // Index of the correct option
  }, {
    timestamps: true
  });

  return Quiz;
};

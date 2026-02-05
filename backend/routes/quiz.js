const express = require('express');

module.exports = (Quiz) => {
  const router = express.Router();
  const { submitQuiz } = require('../controllers/quiz')(Quiz);

  router.post('/submit', submitQuiz);

  return router;
};

// controllers/quiz.js
module.exports = (Quiz) => {
  const submitQuiz = async (req, res) => {
    const { quizId, selected } = req.body;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const correct = selected === quiz.answerIndex;
    const reward = correct ? 100 : 0;

    res.json({ correct, reward });
  };

  return { submitQuiz };
};

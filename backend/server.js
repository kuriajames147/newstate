// 📁 backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load DB and models
const { sequelize } = require('./models/index');
const User = require('./models/User');
const Transaction = require('./models/Transaction');
const Quiz = require('./models/Quiz');

// Routes
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction');

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Sync database
sequelize.sync()
  .then(() => {
    console.log('✅ Database synced');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ Database sync failed:', err));

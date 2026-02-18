const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// Test database connection and sync models
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    // Sync all models with database
    return sequelize.sync({ alter: true }); // Use { force: true } only in development to reset tables
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const registerRoutes = require('./routes/register');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', registerRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GPL-3 API is running' });
});

app.listen(PORT, () => {
  console.log(`🏏 GPL-3 Backend running on port ${PORT}`);
});

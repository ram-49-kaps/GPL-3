const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { registerPlayer } = require('../controllers/registerController');

const router = express.Router();

// Ensure uploads directory exists on Render
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Use memory storage to process uploads without saving to disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, and WEBP images are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// POST /api/register
router.post('/register', upload.single('photo'), registerPlayer);

module.exports = router;

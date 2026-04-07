const express = require('express');
const supabase = require('../config/supabase');
const router = express.Router();

// Middleware to check admin password
const requireAdmin = (req, res, next) => {
  const providedPassword = req.headers['x-admin-password'];
  
  if (!process.env.ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD is not set in environment variables');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  if (providedPassword === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Invalid Admin Password' });
  }
};

router.get('/registrations', requireAdmin, async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ message: 'Supabase configuration is missing.' });
    }

    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ message: 'Error fetching registrations' });
    }

    res.json(data);
  } catch (error) {
    console.error('Admin Fetch Error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;

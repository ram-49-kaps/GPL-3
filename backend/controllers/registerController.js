const supabase = require('../config/supabase');
const { sendConfirmationEmail } = require('../utils/emailService');

const registerPlayer = async (req, res) => {
  try {
    const { name, email, phone, playing_2025, player_type, payment_method } = req.body;

    // Validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: 'Name is required (min 2 characters)' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Valid email is required' });
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ message: 'Valid 10-digit phone number required' });
    }
    if (!['Yes', 'No'].includes(playing_2025)) {
      return res.status(400).json({ message: 'Playing status is required' });
    }
    if (!['Batsman', 'Bowler', 'All Rounder'].includes(player_type)) {
      return res.status(400).json({ message: 'Valid player type is required' });
    }
    if (!['Cash', 'Online'].includes(payment_method)) {
      return res.status(400).json({ message: 'Valid payment method is required' });
    }

    const photo_path = req.file ? `/uploads/${req.file.filename}` : null;

    // Save to Supabase
    let dbRecord = null;
    if (supabase) {
      const { data, error } = await supabase
        .from('registrations')
        .insert([{
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone,
          playing_2025,
          photo_path,
          player_type,
          payment_method,
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ message: 'Database error. Please try again.' });
      }
      dbRecord = data;
    } else {
      // Fallback: just log if Supabase not configured
      dbRecord = { id: Date.now(), name, email, phone, playing_2025, photo_path, player_type, payment_method };
      console.log('📝 Registration (no DB):', dbRecord);
    }

    // Send confirmation email (non-blocking)
    sendConfirmationEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      player_type,
      payment_method,
    }).catch(err => console.error('🔥 Email Send Error:', err));

    // Response
    res.status(201).json({
      message: 'Registration successful!',
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      player_type,
      payment_method,
      id: dbRecord?.id,
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

module.exports = { registerPlayer };

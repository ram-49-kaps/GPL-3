const axios = require('axios');

const sendConfirmationEmail = async ({ name, email, phone, player_type, payment_method }) => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  if (!BREVO_API_KEY) {
    console.warn('⚠️  Brevo API key not configured. Skipping confirmation email.');
    return;
  }

  const htmlTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="margin:0;padding:0;background:#060b14;font-family:'Segoe UI',Arial,sans-serif;">
    <div style="max-width:500px;margin:0 auto;padding:24px 16px;">
      
      <!-- Header -->
      <div style="text-align:center;padding:30px 20px;background:linear-gradient(135deg,#0f2847,#111d2e);border-radius:16px 16px 0 0;border:1px solid rgba(212,160,23,0.2);border-bottom:none;">
        <h1 style="color:#d4a017;font-size:28px;margin:0 0 4px;letter-spacing:2px;">GPL-3</h1>
        <p style="color:#7a8599;font-size:12px;margin:0;letter-spacing:3px;text-transform:uppercase;">Ganadhishay Premier League • Season 3</p>
      </div>

      <!-- Body -->
      <div style="background:#0d1520;padding:28px 24px;border:1px solid rgba(212,160,23,0.1);border-top:2px solid #d4a017;">
        
        <!-- Success Badge -->
        <div style="text-align:center;margin-bottom:24px;">
          <div style="display:inline-block;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:50px;padding:8px 20px;">
            <span style="color:#22c55e;font-size:14px;">✓ Registration Confirmed</span>
          </div>
        </div>

        <p style="color:#f5f0e8;font-size:16px;margin:0 0 20px;">Hello <strong style="color:#d4a017;">${name}</strong>,</p>
        <p style="color:#7a8599;font-size:14px;line-height:1.6;margin:0 0 24px;">
          Welcome to the Ganadhishay Premier League Season 3! Your registration has been successfully recorded. Here are your details:
        </p>

        <!-- Details Table -->
        <div style="background:#111d2e;border-radius:12px;padding:16px;border:1px solid rgba(212,160,23,0.08);">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="color:#7a8599;font-size:13px;padding:10px 0;border-bottom:1px solid rgba(122,133,153,0.15);">Name</td>
              <td style="color:#f5f0e8;font-size:13px;padding:10px 0;text-align:right;border-bottom:1px solid rgba(122,133,153,0.15);font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="color:#7a8599;font-size:13px;padding:10px 0;border-bottom:1px solid rgba(122,133,153,0.15);">Phone</td>
              <td style="color:#f5f0e8;font-size:13px;padding:10px 0;text-align:right;border-bottom:1px solid rgba(122,133,153,0.15);font-weight:600;">+91 ${phone}</td>
            </tr>
            <tr>
              <td style="color:#7a8599;font-size:13px;padding:10px 0;border-bottom:1px solid rgba(122,133,153,0.15);">Player Type</td>
              <td style="color:#d4a017;font-size:13px;padding:10px 0;text-align:right;border-bottom:1px solid rgba(122,133,153,0.15);font-weight:600;">${player_type}</td>
            </tr>
            <tr>
              <td style="color:#7a8599;font-size:13px;padding:10px 0;">Payment</td>
              <td style="color:#f5f0e8;font-size:13px;padding:10px 0;text-align:right;font-weight:600;">${payment_method} — ₹700</td>
            </tr>
          </table>
        </div>

        ${payment_method === 'Cash' 
          ? `<div style="margin-top:16px;padding:12px 16px;background:rgba(34,197,94,0.05);border:1px solid rgba(34,197,94,0.15);border-radius:8px;">
              <p style="color:#22c55e;font-size:12px;margin:0;">💰 Please pay ₹700 in cash at the venue during registration.</p>
            </div>` 
          : `<div style="margin-top:16px;padding:12px 16px;background:rgba(212,160,23,0.05);border:1px solid rgba(212,160,23,0.15);border-radius:8px;">
              <p style="color:#d4a017;font-size:12px;margin:0;">📱 Online payment selected. Please ensure your UPI payment of ₹700 is completed.</p>
            </div>`
        }
      </div>

      <!-- Footer -->
      <div style="text-align:center;padding:20px;background:#0d1520;border-radius:0 0 16px 16px;border:1px solid rgba(212,160,23,0.1);border-top:none;">
        <p style="color:#7a8599;font-size:11px;margin:0;">© 2026 Ganadhishay Premier League</p>
        <p style="color:#7a8599;font-size:10px;margin:4px 0 0;opacity:0.6;">Box Cricket Tournament • Season 3</p>
      </div>

    </div>
  </body>
  </html>
  `;

  try {
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: 'GPL-3 Registration', email: 'ganadhishay11@gmail.com' },
      to: [{ email }],
      subject: '🏏 GPL-3 Registration Confirmed',
      htmlContent: htmlTemplate,
    }, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    console.log(`✉️  Confirmation email sent to ${email} via Brevo`);
  } catch (err) {
    console.error('🔥 Brevo Email Error:', err.response?.data || err.message);
  }
};

module.exports = { sendConfirmationEmail };

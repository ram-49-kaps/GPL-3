import { useState, useRef } from 'react';
import PaymentSection from './PaymentSection';
import { submitRegistration } from '../utils/api';

const RegistrationForm = ({ onSuccess }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    playing_2025: '',
    mandal_token_2026: '',
    photo: null,
    player_type: '',
    payment_method: '',
  });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Name is required (min 2 characters)';
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = 'Valid 10-digit Indian phone number required';
    }
    if (!form.playing_2025) {
      newErrors.playing_2025 = 'Please select an option';
    }
    if (!form.mandal_token_2026) {
      newErrors.mandal_token_2026 = 'Please select an option';
    }
    if (!form.player_type) {
      newErrors.player_type = 'Please select your player type';
    }
    if (!form.payment_method) {
      newErrors.payment_method = 'Please select payment method';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: 'Photo must be under 5MB' }));
      return;
    }
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, photo: 'Please upload an image file' }));
      return;
    }
    setForm((prev) => ({ ...prev, photo: file }));
    setErrors((prev) => ({ ...prev, photo: undefined }));
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await submitRegistration(form);
      onSuccess(result);
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  const playerTypes = [
    {
      value: 'Batsman',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15M8 4l-4 4 8 8M15.5 8.5l4.5 4.5" />
        </svg>
      ),
      label: 'Batsman',
    },
    {
      value: 'Bowler',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="7" strokeDasharray="4 2" />
          <path strokeLinecap="round" d="M12 5V2M12 22v-3" />
        </svg>
      ),
      label: 'Bowler',
    },
    {
      value: 'All Rounder',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      label: 'All Rounder',
    },
  ];

  const paymentMethods = [
    {
      value: 'Cash',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      label: 'Cash',
      sub: 'Pay at venue',
    },
    {
      value: 'Online',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
      label: 'Online',
      sub: 'UPI / QR Code',
    },
  ];

  return (
    <section id="register" className="relative py-12 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold font-accent text-xs sm:text-sm tracking-wider mb-3">
            REGISTRATION OPEN
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-gradient-gold">
            Register Now
          </h2>
          <p className="text-ash text-xs sm:text-sm font-body mt-2 max-w-md mx-auto">
            Join the most exciting box cricket tournament — Season 3
          </p>
          <div className="section-divider mt-4 max-w-xs mx-auto" />
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="glass-card p-5 sm:p-7 md:p-8 space-y-5 sm:space-y-6">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Name */}
            <div>
              <label className="input-label" htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                className="input-field"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
              {errors.name && <p className="input-error">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="input-label" htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                type="email"
                className="input-field"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {errors.email && <p className="input-error">{errors.email}</p>}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="input-label" htmlFor="reg-phone">Phone Number</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ash text-sm font-body">+91</span>
              <input
                id="reg-phone"
                type="tel"
                className="input-field pl-12"
                placeholder="9876543210"
                maxLength={10}
                value={form.phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  handleChange('phone', val);
                }}
              />
            </div>
            {errors.phone && <p className="input-error">{errors.phone}</p>}
          </div>

          {/* Playing in 2026 */}
          <div>
            <label className="input-label">Are you playing in 2025?</label>
            <div className="flex gap-3">
              {['Yes', 'No'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`radio-card flex-1 justify-center ${form.playing_2025 === opt ? 'active' : ''}`}
                  onClick={() => handleChange('playing_2025', opt)}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${form.playing_2025 === opt ? 'border-gold bg-gold' : 'border-ash/40'
                    }`}>
                    {form.playing_2025 === opt && <span className="w-1.5 h-1.5 rounded-full bg-midnight" />}
                  </span>
                  <span className={`font-body text-sm ${form.playing_2025 === opt ? 'text-cream' : 'text-ash'}`}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>
            {errors.playing_2025 && <p className="input-error">{errors.playing_2025}</p>}
          </div>

          {/* Mandal Token 2026 */}
          <div>
            <label className="input-label">Have you paid Mandal Token amount?</label>
            <div className="flex gap-3">
              {['Yes', 'No'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`radio-card flex-1 justify-center ${form.mandal_token_2026 === opt ? 'active' : ''}`}
                  onClick={() => handleChange('mandal_token_2026', opt)}
                >
                  <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    form.mandal_token_2026 === opt ? 'border-gold bg-gold' : 'border-ash/40'
                  }`}>
                    {form.mandal_token_2026 === opt && <span className="w-1.5 h-1.5 rounded-full bg-midnight" />}
                  </span>
                  <span className={`font-body text-sm ${form.mandal_token_2026 === opt ? 'text-cream' : 'text-ash'}`}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>
            {errors.mandal_token_2026 && <p className="input-error">{errors.mandal_token_2026}</p>}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="input-label">Upload Recent Photo</label>
            <div
              className={`upload-zone ${photoPreview ? 'has-file' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
              {photoPreview ? (
                <div className="flex items-center gap-4">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-gold/30"
                  />
                  <div className="text-left">
                    <p className="text-cream text-sm font-body">{form.photo?.name}</p>
                    <p className="text-ash text-xs mt-1">
                      {(form.photo?.size / 1024).toFixed(0)} KB • Click to change
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <svg className="w-8 h-8 text-ash/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 6.75v11.5A2.25 2.25 0 003.75 21zM8.25 8.625a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z" />
                  </svg>
                  <p className="text-ash text-xs sm:text-sm text-center">
                    <span className="text-gold font-semibold">Click to upload</span> your recent photo
                  </p>
                  <p className="text-ash/50 text-[10px] sm:text-xs">JPG, PNG — Max 5MB</p>
                </>
              )}
            </div>
            {errors.photo && <p className="input-error">{errors.photo}</p>}
          </div>

          {/* Player Type */}
          <div>
            <label className="input-label">Player Type</label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {playerTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className={`radio-card flex-col py-3 sm:py-4 ${form.player_type === type.value ? 'active' : ''}`}
                  onClick={() => handleChange('player_type', type.value)}
                >
                  <span className={`transition-colors ${form.player_type === type.value ? 'text-gold' : 'text-ash/60'}`}>
                    {type.icon}
                  </span>
                  <span className={`font-body text-[10px] sm:text-xs font-medium mt-1 ${form.player_type === type.value ? 'text-cream' : 'text-ash'
                    }`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
            {errors.player_type && <p className="input-error">{errors.player_type}</p>}
          </div>

          {/* Payment Method */}
          <div>
            <label className="input-label">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map((pm) => (
                <button
                  key={pm.value}
                  type="button"
                  className={`radio-card flex-col py-3 sm:py-4 ${form.payment_method === pm.value ? 'active' : ''}`}
                  onClick={() => handleChange('payment_method', pm.value)}
                >
                  <span className={`transition-colors ${form.payment_method === pm.value ? 'text-gold' : 'text-ash/60'}`}>
                    {pm.icon}
                  </span>
                  <span className={`font-body text-xs sm:text-sm font-medium mt-1 ${form.payment_method === pm.value ? 'text-cream' : 'text-ash'
                    }`}>
                    {pm.label}
                  </span>
                  <span className="text-ash/50 text-[9px] sm:text-[10px] font-body">{pm.sub}</span>
                </button>
              ))}
            </div>
            {errors.payment_method && <p className="input-error">{errors.payment_method}</p>}
          </div>

          {/* Payment Section */}
          <PaymentSection method={form.payment_method} />

          {/* Registration Fee Info */}
          <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-midnight-200/50 border border-midnight-300/30">
            <span className="text-ash text-xs sm:text-sm font-body">Registration Fee</span>
            <span className="text-gold font-accent text-xl sm:text-2xl">₹700</span>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 rounded-xl bg-crimson/10 border border-crimson/20 text-crimson text-xs sm:text-sm font-body text-center">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Registering...</span>
              </>
            ) : (
              <>
                <span>Register Now</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;

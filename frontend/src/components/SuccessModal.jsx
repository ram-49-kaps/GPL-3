import { useEffect } from 'react';

const SuccessModal = ({ data, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-midnight/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-card p-6 sm:p-8 max-w-md w-full animate-scale-in border border-gold/20">
        {/* Confetti Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(30)].map((_, i) => {
            const colors = ['#d4a017', '#f5c542', '#e8650a', '#22c55e', '#60a5fa'];
            return (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full animate-float"
                style={{
                  backgroundColor: colors[i % colors.length],
                  left: `${Math.random() * 100}%`,
                  top: `${-10 + Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  opacity: 0.6,
                }}
              />
            );
          })}
        </div>

        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="success-circle w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald/10 border-2 border-emerald flex items-center justify-center">
            <svg className="success-check w-8 h-8 sm:w-10 sm:h-10 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-5">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-gradient-gold">
            Registration Successful!
          </h3>
          <p className="text-ash text-xs sm:text-sm font-body mt-1.5">
            Welcome to GPL Season 3! 🏏
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2.5 mb-6">
          {[
            { label: 'Name', value: data?.name },
            { label: 'Email', value: data?.email },
            { label: 'Phone', value: data?.phone ? `+91 ${data.phone}` : '' },
            { label: 'Player Type', value: data?.player_type },
            { label: 'Payment', value: data?.payment_method },
          ].filter(d => d.value).map((detail, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-midnight-300/30 last:border-0">
              <span className="text-ash text-xs sm:text-sm font-body">{detail.label}</span>
              <span className="text-cream text-xs sm:text-sm font-body font-medium">{detail.value}</span>
            </div>
          ))}
        </div>

        {/* Email Notice */}
        <div className="p-3 rounded-xl bg-gold/5 border border-gold/15 mb-5">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <p className="text-gold/80 text-[10px] sm:text-xs font-body leading-relaxed">
              A confirmation email has been sent to your registered email address with all the details.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-gold w-full"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;

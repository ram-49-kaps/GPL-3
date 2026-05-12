const RegistrationForm = () => {
  return (
    <section id="register" className="relative py-12 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 text-crimson font-accent text-xs sm:text-sm tracking-wider mb-3">
            REGISTRATION CLOSED
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-gradient-gold">
            Seats Are Full!
          </h2>
          <p className="text-ash text-xs sm:text-sm font-body mt-2 max-w-md mx-auto">
            Thank you for the overwhelming response. All spots for GPL Season 3 have been filled.
          </p>
          <div className="section-divider mt-4 max-w-xs mx-auto" />
        </div>

        {/* Closed Card */}
        <div className="glass-card p-6 sm:p-8 md:p-10 text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-crimson/10 border border-crimson/20 flex items-center justify-center animate-scale-in">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-crimson" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-cream">
              Registration is Now Closed
            </h3>
            <p className="text-ash text-sm sm:text-base font-body leading-relaxed max-w-md mx-auto">
              All available seats for Ganadhishay Premier League Season 3 have been booked. 
              We appreciate your interest and hope to see you in the next season!
            </p>
          </div>

          {/* Stats Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
            <span className="w-2 h-2 rounded-full bg-crimson animate-glow-pulse" />
            <span className="text-gold font-body text-xs sm:text-sm font-medium">All spots filled</span>
          </div>

          {/* Info */}
          <div className="p-4 rounded-xl bg-midnight-200/50 border border-midnight-300/30">
            <p className="text-ash/70 text-xs sm:text-sm font-body">
              🏏 Stay tuned for match schedules and updates. Follow us for GPL-3 highlights!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;

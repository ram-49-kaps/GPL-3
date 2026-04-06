import { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exit'), 2800);
    const completeTimer = setTimeout(() => onComplete(), 3400);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center splash-container transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Ambient Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Radial Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] animate-glow-pulse" />

      {/* Main Content */}
      <div className="relative flex flex-col items-center gap-6 px-4">
        {/* Logos Row */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-10">
          {/* Mandal Logo */}
          <div className="opacity-0 animate-slide-right animation-delay-200">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-gold/30 shadow-gold-md p-1 bg-midnight-100/50">
              <img
                src="/assets/logos/mandal-logo.png"
                alt="Mandal Ganesh Utsav"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div class="w-full h-full rounded-full bg-gradient-to-br from-gold/20 to-fire/10 flex items-center justify-center"><span class="text-gold font-display text-lg sm:text-xl font-bold">गणाधिशाय</span></div>`;
                }}
              />
            </div>
          </div>

          {/* X Mark */}
          <div className="opacity-0 animate-x-appear animation-delay-600">
            <span className="text-3xl sm:text-4xl md:text-5xl font-accent text-gold splash-x select-none">
              ✕
            </span>
          </div>

          {/* GPL Logo */}
          <div className="opacity-0 animate-slide-left animation-delay-200">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-gold/30 shadow-gold-md p-1 bg-midnight-100/50">
              <img
                src="/assets/logos/gpl-logo.png"
                alt="GPL-3"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div class="w-full h-full rounded-full bg-gradient-to-br from-shield/50 to-shield-light/30 flex items-center justify-center"><span class="text-gold font-accent text-2xl sm:text-3xl">GPL-3</span></div>`;
                }}
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center opacity-0 animate-slide-up animation-delay-1000">
          <h1 className="font-display font-bold text-xl sm:text-2xl md:text-4xl tracking-wide text-gradient-gold">
            Ganadhishay Premier League
          </h1>
          <div className="flex items-center justify-center gap-3 mt-1">
            <span className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold/50" />
            <span className="font-accent text-3xl sm:text-4xl md:text-5xl text-gold">
              Season 3
            </span>
            <span className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold/50" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-ash text-xs sm:text-sm font-body tracking-widest uppercase opacity-0 animate-fade-in animation-delay-1500">
          Box Cricket Tournament
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;

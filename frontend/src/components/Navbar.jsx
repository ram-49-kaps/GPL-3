import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-midnight/90 backdrop-blur-xl border-b border-gold/10 shadow-lg'
          : 'py-3 sm:py-4 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gold/30 p-0.5 bg-midnight-100/50 flex-shrink-0">
            <img
              src="/assets/logos/gpl-logo.png"
              alt="GPL-3"
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div class="w-full h-full rounded-full bg-shield flex items-center justify-center"><span class="text-gold font-accent text-xs">GPL</span></div>`;
              }}
            />
          </div>
          <div>
            <h2 className="font-display font-bold text-sm sm:text-base md:text-lg text-gradient-gold leading-tight">
              GPL-3
            </h2>
            <p className="text-ash text-[9px] sm:text-[10px] font-body tracking-wider uppercase hidden xs:block">
              Ganadhishay Premier League
            </p>
          </div>
        </div>

        {/* Season Badge */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-gold/10 border border-gold/20 text-gold font-accent text-[10px] sm:text-xs tracking-wider">
            SEASON 3 • 2026
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

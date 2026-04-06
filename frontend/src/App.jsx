import { useState, useCallback } from 'react';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import GallerySection from './components/GallerySection';
import SuccessModal from './components/SuccessModal';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [successData, setSuccessData] = useState(null);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleSuccess = useCallback((data) => {
    setSuccessData(data);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSuccessData(null);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="stadium-bg min-h-screen">
      {/* Noise Texture */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logos */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 mb-5 sm:mb-6">
              <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-gold/30 p-0.5 bg-midnight-100/50 animate-fade-in">
                <img
                  src="/assets/logos/mandal-logo.png"
                  alt="Mandal Ganesh Utsav"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="w-full h-full rounded-full bg-gradient-to-br from-gold/20 to-fire/10 flex items-center justify-center"><span class="text-gold font-display text-sm sm:text-base font-bold">गणा</span></div>`;
                  }}
                />
              </div>
              <span className="text-gold/60 text-lg sm:text-xl font-accent animate-fade-in animation-delay-200">✕</span>
              <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-gold/30 p-0.5 bg-midnight-100/50 animate-fade-in animation-delay-300">
                <img
                  src="/assets/logos/gpl-logo.png"
                  alt="GPL-3"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="w-full h-full rounded-full bg-gradient-to-br from-shield/50 to-shield-light/30 flex items-center justify-center"><span class="text-gold font-accent text-base sm:text-lg">GPL</span></div>`;
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-gradient-gold animate-slide-up animation-delay-300 leading-tight">
              Ganadhishay Premier League
            </h1>
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-2 animate-slide-up animation-delay-400">
              <span className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-gold/50" />
              <span className="font-accent text-2xl sm:text-3xl md:text-4xl text-fire">Season 3</span>
              <span className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-gold/50" />
            </div>
            <p className="text-ash text-xs sm:text-sm md:text-base font-body tracking-wide mt-2 sm:mt-3 animate-fade-in animation-delay-500">
              Box Cricket Tournament • Registration 2026
            </p>

            {/* CTA Badge */}
            <div className="mt-5 sm:mt-6 animate-slide-up animation-delay-600">
              <a
                href="#register"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-gold/10 border border-gold/30 text-gold font-display font-semibold text-xs sm:text-sm tracking-wide hover:bg-gold/20 hover:border-gold/50 transition-all duration-300 group"
              >
                <span>Register Now</span>
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="section-divider max-w-2xl mx-auto" />

        {/* Registration Form */}
        <RegistrationForm onSuccess={handleSuccess} />

        {/* Divider */}
        <div className="section-divider max-w-2xl mx-auto" />

        {/* Gallery Section */}
        <GallerySection />

        {/* Footer */}
        <footer className="border-t border-midnight-300/30 mt-8 py-6 sm:py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-gold/20 p-0.5">
                <img
                  src="/assets/logos/gpl-logo.png"
                  alt="GPL"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                />
              </div>
              <span className="font-display font-bold text-sm text-gold/60">GPL-3</span>
            </div>
            <p className="text-ash/50 text-[10px] sm:text-xs font-body">
              © 2026 Ganadhishay Premier League. All rights reserved.
            </p>
            <p className="text-ash/30 text-[9px] sm:text-[10px] font-body mt-1">
              Mandal Ganesh Utsav • Box Cricket Tournament Season 3
            </p>
          </div>
        </footer>
      </main>

      {/* Success Modal */}
      {successData && <SuccessModal data={successData} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;

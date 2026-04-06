import { useState, useEffect, useCallback } from 'react';

const highlights = [
  {
    type: 'image',
    src: '/assets/highlights/winner-team.jpg',
    title: 'GPL-2 Champions',
    subtitle: 'Last Year Winners',
    badge: '🏆 CHAMPIONS',
  },
  {
    type: 'image',
    src: '/assets/highlights/man-of-match.jpg',
    title: 'Man of the Match',
    subtitle: 'Outstanding Performance',
    badge: '⭐ MoM',
  },
  {
    type: 'video',
    src: '/assets/highlights/highlight-video.mov',
    title: 'GPL-2 Highlights',
    subtitle: 'Best Moments from Season 2',
    badge: '🎬 HIGHLIGHTS',
  },
];

const GallerySection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % highlights.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleInteraction = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section id="highlights" className="relative py-12 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-fire/10 border border-fire/20 text-fire font-accent text-xs sm:text-sm tracking-wider mb-3">
            SEASON 2 FLASHBACK
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-gradient-fire">
            GPL Highlights
          </h2>
          <p className="text-ash text-xs sm:text-sm font-body mt-2">
            Relive the best moments from last season
          </p>
          <div className="section-divider mt-4 max-w-xs mx-auto" />
        </div>

        {/* Carousel */}
        <div className="relative glass-card overflow-hidden">
          {/* Slides Container */}
          <div className="carousel-container aspect-[4/3] sm:aspect-[16/10]">
            <div
              className="carousel-track h-full"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {highlights.map((item, index) => (
                <div key={index} className="carousel-slide h-full">
                  {item.type === 'image' ? (
                    <div className="relative w-full h-full bg-midnight">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-shield to-midnight items-center justify-center">
                        <div className="text-center">
                          <span className="text-4xl sm:text-5xl block mb-2">{item.badge.split(' ')[0]}</span>
                          <p className="text-gold font-display text-lg sm:text-xl">{item.title}</p>
                        </div>
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/20 to-transparent" />
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-midnight">
                      <video
                        src={item.src}
                        className="w-full h-full object-contain"
                        controls
                        playsInline
                        preload="metadata"
                        onClick={handleInteraction}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-shield to-midnight items-center justify-center">
                        <div className="text-center">
                          <span className="text-4xl sm:text-5xl block mb-2">🎬</span>
                          <p className="text-gold font-display text-lg sm:text-xl">{item.title}</p>
                        </div>
                      </div>
                      {/* Gradient Overlay (only on non-playing) */}
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-midnight via-midnight/40 to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Caption */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-gold/20 text-gold text-[10px] sm:text-xs font-accent tracking-wider mb-1.5">
                      {item.badge}
                    </span>
                    <h3 className="font-display font-bold text-base sm:text-xl md:text-2xl text-cream">
                      {item.title}
                    </h3>
                    <p className="text-ash text-[10px] sm:text-sm font-body">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => { prevSlide(); handleInteraction(); }}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-midnight/70 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-cream hover:bg-gold/20 hover:border-gold/40 transition-all z-10"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => { nextSlide(); handleInteraction(); }}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-midnight/70 backdrop-blur-sm border border-gold/20 flex items-center justify-center text-cream hover:bg-gold/20 hover:border-gold/40 transition-all z-10"
            aria-label="Next slide"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => { setActiveSlide(index); handleInteraction(); }}
                className={`rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'w-6 h-1.5 bg-gold'
                    : 'w-1.5 h-1.5 bg-cream/30 hover:bg-cream/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Cards Below Carousel */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6">
          {/* Seasons Played */}
          <div className="glass-card glass-card-hover p-3 sm:p-4 text-center">
            <div className="flex justify-center mb-1">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.996.436-1.75 1.37-1.75 2.514 0 1.5 1.25 2.75 2.75 2.75.37 0 .72-.07 1.04-.2M18.75 4.236c.996.436 1.75 1.37 1.75 2.514 0 1.5-1.25 2.75-2.75 2.75-.37 0-.72-.07-1.04-.2M12 2.25a4.5 4.5 0 00-4.5 4.5c0 2.486 2.014 4.5 4.5 4.5 2.485 0 4.5-2.014 4.5-4.5a4.5 4.5 0 00-4.5-4.5z" />
              </svg>
            </div>
            <span className="font-accent text-xl sm:text-2xl md:text-3xl text-gold block">2</span>
            <span className="text-ash text-[9px] sm:text-xs font-body">Seasons Played</span>
          </div>

          {/* Players Joined */}
          <div className="glass-card glass-card-hover p-3 sm:p-4 text-center">
            <div className="flex justify-center mb-1">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <span className="font-accent text-xl sm:text-2xl md:text-3xl text-gold block">50+</span>
            <span className="text-ash text-[9px] sm:text-xs font-body">Players Joined</span>
          </div>

          {/* Epic Matches */}
          <div className="glass-card glass-card-hover p-3 sm:p-4 text-center">
            <div className="flex justify-center mb-1">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <span className="font-accent text-xl sm:text-2xl md:text-3xl text-gold block">10+</span>
            <span className="text-ash text-[9px] sm:text-xs font-body">Epic Matches</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { src: '/soren_00.jpg', alt: 'Hinge cabinetry installation — Erving door style' },
  { src: '/soren_02.jpg', alt: 'Hinge cabinetry detail — Iverson door style' },
  { src: '/soren_06.jpg', alt: 'Hinge custom kitchen — Erving and Iverson doors' },
  { src: '/soren_07.jpg', alt: 'Hinge custom cabinetry project' },
  { src: '/IMG_1077_(Custom).jpg', alt: 'Hinge Custom Series installation' },
  { src: '/IMG_1151_(Custom).jpg', alt: 'Hinge Custom Series cabinetry detail' },
];

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((next: number, dir: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(next);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating]);

  const prev = useCallback(() => {
    go((current - 1 + slides.length) % slides.length, 'left');
  }, [current, go]);

  const next = useCallback(() => {
    go((current + 1) % slides.length, 'right');
  }, [current, go]);

  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, next]);

  return (
    <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-neutral-100 group select-none">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                i === current && isAnimating
                  ? direction === 'right' ? '-translate-x-3' : 'translate-x-3'
                  : 'translate-x-0'
              }`}
              loading="lazy"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-20 pointer-events-none" />
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
      >
        <ChevronLeft size={18} className="text-brand-charcoal" />
      </button>
      <button
        onClick={next}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
      >
        <ChevronRight size={18} className="text-brand-charcoal" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i, i > current ? 'right' : 'left')}
            aria-label={`Go to photo ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-5 h-1.5 bg-white'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 z-30 bg-black/40 backdrop-blur-sm text-white/80 text-xs px-2.5 py-1 rounded-full font-medium">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}

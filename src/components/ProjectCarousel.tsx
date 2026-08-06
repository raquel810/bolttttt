import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type DoorName = 'Erving' | 'Iverson';
type FinishKind = 'stain' | 'paint';
interface SlideTag {
  door: DoorName;
  finish: { kind: FinishKind; name: string; label: string; colordrop?: boolean };
}

const IV_TAG: SlideTag['finish'] = { kind: 'paint', name: 'White Sesame', label: 'ColorDrop · White Sesame SW 9586', colordrop: true };
const ER_TAG: SlideTag['finish'] = { kind: 'stain', name: 'Rye', label: 'Stain · Rye' };

const slides: { src: string; alt: string; tags: SlideTag[] }[] = [
  {
    src: '/iverson-erving_hc-project_00.jpg',
    alt: 'Hinge custom kitchen — Iverson perimeter cabinetry with Erving island',
    tags: [
      { door: 'Iverson', finish: IV_TAG },
      { door: 'Erving', finish: ER_TAG },
    ],
  },
  {
    src: '/iverson-erving_hc-project_01.jpg',
    alt: 'Hinge custom kitchen — Iverson and Erving door styles',
    tags: [
      { door: 'Iverson', finish: IV_TAG },
      { door: 'Erving', finish: ER_TAG },
    ],
  },
  {
    src: '/iverson-erving_hc-project_03.jpg',
    alt: 'Hinge custom kitchen — Iverson perimeter with Erving island detail',
    tags: [
      { door: 'Iverson', finish: IV_TAG },
      { door: 'Erving', finish: ER_TAG },
    ],
  },
  {
    src: '/iverson-erving_hc-project_06.jpg',
    alt: 'Hinge custom kitchen — Iverson cabinetry with Erving island',
    tags: [
      { door: 'Iverson', finish: IV_TAG },
      { door: 'Erving', finish: ER_TAG },
    ],
  },
  {
    src: '/iverson_hc-project_02.jpg',
    alt: 'Hinge custom kitchen — Iverson sink run detail',
    tags: [{ door: 'Iverson', finish: IV_TAG }],
  },
  {
    src: '/iverson_hc-project_04.jpg',
    alt: 'Hinge custom kitchen — Iverson perimeter cabinetry wide view',
    tags: [{ door: 'Iverson', finish: IV_TAG }],
  },
  {
    src: '/iverson_hc-project_05.jpg',
    alt: 'Hinge custom kitchen — Iverson window wall cabinetry',
    tags: [{ door: 'Iverson', finish: IV_TAG }],
  },
  {
    src: '/iverson_hc-project_07.jpg',
    alt: 'Hinge custom kitchen — Iverson cabinetry detail at windows',
    tags: [{ door: 'Iverson', finish: IV_TAG }],
  },
  {
    src: '/iverson_hc-project_08.jpg',
    alt: 'Hinge custom kitchen — Iverson sink close-up',
    tags: [{ door: 'Iverson', finish: IV_TAG }],
  },
  {
    src: '/iverson_hc-project_09.jpg',
    alt: 'Hinge custom kitchen — Iverson dishwasher and drawer bank',
    tags: [{ door: 'Iverson', finish: IV_TAG }],
  },
  {
    src: '/iverson_hc-project_010.jpg',
    alt: 'Hinge custom kitchen — Iverson cabinet close-up detail',
    tags: [{ door: 'Iverson', finish: IV_TAG }],
  },
  {
    src: '/iverson_hc-project_011.jpg',
    alt: 'Hinge custom kitchen — Iverson cabinet detail',
    tags: [{ door: 'Iverson', finish: IV_TAG }],
  },
];

function selectDoor(name: string) {
  document.getElementById('doors')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.dispatchEvent(new CustomEvent('hinge:select-door', { detail: { name } }));
}

function selectFinish(kind: FinishKind, name: string, colordrop?: boolean) {
  if (colordrop) {
    document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('hinge:open-colordrop'));
    }, 600);
  } else {
    document.getElementById('finishes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.dispatchEvent(new CustomEvent('hinge:select-finish', { detail: { kind, name } }));
  }
}

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

  const activeTags = slides[current].tags;

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none" />
      </div>

      {/* Clickable tags */}
      <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-1.5 max-w-[70%]">
        {activeTags.map((tag, idx) => (
          <div key={`${tag.door}-${idx}`} className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => selectDoor(tag.door)}
              className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-brand-charcoal text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm hover:bg-white transition-colors"
            >
              {tag.door}
            </button>
            <button
              onClick={() => selectFinish(tag.finish.kind, tag.finish.name, tag.finish.colordrop)}
              className="inline-flex items-center gap-1.5 bg-black/45 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-full hover:bg-black/65 transition-colors"
            >
              {tag.finish.label}
            </button>
          </div>
        ))}
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
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5 flex-wrap justify-end max-w-[60%]">
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

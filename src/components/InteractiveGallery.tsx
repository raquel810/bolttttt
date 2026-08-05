import { useState, useEffect, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

type Line = 'Custom' | 'Pro';

interface GalleryItem {
  src: string;
  alt: string;
  line: Line;
  door: string;
  finish: string;
}

const items: GalleryItem[] = [
  { src: '/iverson-erving_hc-project_00.jpg', alt: 'Iverson perimeter with Erving island', line: 'Custom', door: 'Iverson + Erving', finish: 'White Sesame / Rye' },
  { src: '/iverson-erving_hc-project_01.jpg', alt: 'Iverson and Erving door styles', line: 'Custom', door: 'Iverson + Erving', finish: 'White Sesame / Rye' },
  { src: '/iverson-erving_hc-project_03.jpg', alt: 'Iverson perimeter with Erving island detail', line: 'Custom', door: 'Iverson + Erving', finish: 'White Sesame / Rye' },
  { src: '/iverson-erving_hc-project_06.jpg', alt: 'Iverson cabinetry with Erving island', line: 'Custom', door: 'Iverson + Erving', finish: 'White Sesame / Rye' },
  { src: '/iverson_hc-project_02.jpg', alt: 'Iverson sink run detail', line: 'Custom', door: 'Iverson', finish: 'White Sesame' },
  { src: '/iverson_hc-project_04.jpg', alt: 'Iverson perimeter cabinetry wide view', line: 'Custom', door: 'Iverson', finish: 'White Sesame' },
  { src: '/iverson_hc-project_05.jpg', alt: 'Iverson window wall cabinetry', line: 'Custom', door: 'Iverson', finish: 'White Sesame' },
  { src: '/iverson_hc-project_07.jpg', alt: 'Iverson cabinetry detail at windows', line: 'Custom', door: 'Iverson', finish: 'White Sesame' },
  { src: '/iverson_hc-project_08.jpg', alt: 'Iverson sink close-up', line: 'Custom', door: 'Iverson', finish: 'White Sesame' },
  { src: '/iverson_hc-project_09.jpg', alt: 'Iverson dishwasher and drawer bank', line: 'Custom', door: 'Iverson', finish: 'White Sesame' },
  { src: '/iverson_hc-project_010.jpg', alt: 'Iverson cabinet close-up detail', line: 'Custom', door: 'Iverson', finish: 'White Sesame' },
  { src: '/iverson_hc-project_011.jpg', alt: 'Iverson cabinet detail', line: 'Custom', door: 'Iverson', finish: 'White Sesame' },
  { src: '/erving_hc-project2.jpg', alt: 'Erving custom kitchen installation', line: 'Custom', door: 'Erving', finish: 'Rye' },
  { src: '/erving_hc-project3.jpg', alt: 'Erving cabinetry craftsmanship', line: 'Custom', door: 'Erving', finish: 'Rye' },
  { src: '/erving_hc-project3-2.jpg', alt: 'Erving kitchen installation detail', line: 'Custom', door: 'Erving', finish: 'Rye' },
  { src: '/erving_hc-project4.jpg', alt: 'Erving custom kitchen wide view', line: 'Custom', door: 'Erving', finish: 'Rye' },
  { src: '/erving_hc-project4-2.jpg', alt: 'Erving dark kitchen', line: 'Custom', door: 'Erving', finish: 'Rye' },
  { src: '/briar_hingepro-projectexample.jpg', alt: 'Pro kitchen with dark island', line: 'Pro', door: 'Russell', finish: 'Briar' },
  { src: '/tannin_hingepro-projectexample.jpg', alt: 'Pro natural wood cabinetry', line: 'Pro', door: 'Sanders', finish: 'Tannin' },
  { src: '/pitch-jordan_hingepro-projectexample.jpg', alt: 'Pro dark wet bar with brass hardware', line: 'Pro', door: 'Jordan', finish: 'Pitch' },
];

const filters: { label: string; value: Line | 'All' }[] = [
  { label: 'All Installations', value: 'All' },
  { label: 'Custom Series', value: 'Custom' },
  { label: 'Pro Series', value: 'Pro' },
];

export default function InteractiveGallery() {
  const [filter, setFilter] = useState<Line | 'All'>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === 'All' ? items : items.filter((i) => i.line === filter)),
    [filter],
  );

  const close = useCallback(() => setLightbox(null), []);

  const step = useCallback(
    (dir: number) => {
      setLightbox((cur) => {
        if (cur === null) return cur;
        const next = cur + dir;
        if (next < 0) return visible.length - 1;
        if (next >= visible.length) return 0;
        return next;
      });
    },
    [visible.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, close, step]);

  const active = lightbox !== null ? visible[lightbox] : null;

  return (
    <>
      {/* Filter tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white rounded-lg border border-neutral-200 p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
                filter === f.value
                  ? 'bg-brand-charcoal text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-style grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
        {visible.map((item, idx) => (
          <button
            key={item.src}
            onClick={() => setLightbox(idx)}
            className="group relative w-full mb-4 md:mb-6 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 break-inside-avoid block"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold">{item.door}</p>
                  <p className="text-white/70 text-xs mt-0.5">{item.finish}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0">
                  <ZoomIn size={16} className="text-brand-charcoal" />
                </div>
              </div>
            </div>
            <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wide uppercase px-2 py-1 rounded-full bg-white/85 backdrop-blur-sm text-brand-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.line}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fade-in"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <ChevronRight size={22} className="text-white" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.src}
              alt={active.alt}
              className="max-w-full max-h-[78vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="text-white text-sm font-semibold">{active.door}</p>
              <p className="text-white/60 text-xs mt-0.5">
                {active.finish} · {active.line} Series
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

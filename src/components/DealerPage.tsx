import { useState, useEffect, useCallback, FormEvent } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Clock,
  Layers,
  Paintbrush,
  MapPinned,
  Award,
} from 'lucide-react';

const stats = [
  {
    icon: MapPinned,
    headline: 'Plainfield, Illinois',
    sub: 'Built, assembled, and finished in our own facility — no outsourced finishing, no middlemen.',
  },
  {
    icon: Award,
    headline: 'Blum Soft-Close Hinges',
    sub: 'Every unit ships with premium Blum 6-way adjustable concealed hinges with integrated soft-close.',
  },
  {
    icon: Clock,
    headline: '3–4 Week Lead',
    sub: 'Reliable scheduling your clients can count on — spec to delivery.',
  },
  {
    icon: Layers,
    headline: 'All-Plywood Construction',
    sub: '1/2" plywood box with UV-coated exterior, 3/4" adjustable plywood shelves, and 5/8" solid dovetail drawer boxes.',
  },
  {
    icon: Ruler,
    headline: 'The Duncan Door',
    sub: 'Exclusively focused on the industry\'s #1 selling style — the Duncan 5-piece shaker. Single-SKU simplicity that eliminates catalog clutter.',
  },
  {
    icon: Paintbrush,
    headline: '20+ Finishes',
    sub: 'Curated paints and wood stains, plus the ColorDrop program for custom paint and stain color matching.',
  },
];

const carouselSlides = [
  { src: '/kilcoyne-hingeselect\u00AD_photo_0.jpg', finish: 'Graphite' },
  { src: '/kilcoyne-hingeselect\u00AD_photo_1.jpg', finish: 'Graphite' },
  { src: '/kilcoyne-hingeselect\u00AD_photo_2.jpg', finish: 'Graphite' },
  { src: '/morawski-hingeselect\u00AD_photo_0.jpg', finish: 'Graphite / ColorDrop Ivory' },
  { src: '/morawski-hingeselect\u00AD_photo_1.jpg', finish: 'Graphite / ColorDrop Ivory' },
  { src: '/morawski-hingeselect\u00AD_photo_2.jpg', finish: 'Graphite / ColorDrop Ivory' },
  { src: '/morawski-hingeselect\u00AD_photo_3.jpg', finish: 'Graphite / ColorDrop Ivory' },
  { src: '/stevens-hingeselect\u00AD_photo_0.jpg', finish: 'Stone' },
  { src: '/stevens-hingeselect\u00AD_photo_1.jpg', finish: 'Stone' },
  { src: '/stevens-hingeselect\u00AD_photo_2.jpg', finish: 'Stone' },
  { src: '/stevens-hingeselect\u00AD_photo_3.jpg', finish: 'Stone' },
  { src: '/strohl-hingeselect\u00AD_photo_0.jpg', finish: 'ColorDrop Ivory / Navy' },
  { src: '/strohl-hingeselect\u00AD_photo_1.jpg', finish: 'ColorDrop Ivory / Navy' },
  { src: '/strohl-hingeselect\u00AD_photo_2.jpg', finish: 'ColorDrop Ivory / Navy' },
  { src: '/strohl-hingeselect\u00AD_photo_3.jpg', finish: 'ColorDrop Ivory / Navy' },

  { src: '/tannin_hingepro-projectexample.jpg', finish: 'Tannin' },
];

interface PaintSwatch {
  name: string;
  hex: string;
  textLight?: boolean;
}

interface StainSwatch {
  name: string;
  image: string;
}

const paints: PaintSwatch[] = [
  { name: 'Polar', hex: '#F8F7F1' },
  { name: 'Arctic', hex: '#F1EDEC' },
  { name: 'Moonlight', hex: '#DFD3C3' },
  { name: 'Stone', hex: '#CCC8BF' },
  { name: 'Slate', hex: '#7F817E', textLight: true },
  { name: 'Sage', hex: '#95978A' },
  { name: 'Basil', hex: '#626F61', textLight: true },
  { name: 'Harbor', hex: '#758B9A', textLight: true },
  { name: 'Navy', hex: '#35454E', textLight: true },
  { name: 'Onyx', hex: '#2F2F30', textLight: true },
];

const stains: StainSwatch[] = [
  { name: 'Port', image: '/port_hc-stain.jpg' },
  { name: 'Oat', image: '/oat_hc-stain.jpg' },
  { name: 'Honey', image: '/honey_hc-stain.jpg' },
  { name: 'Fawn', image: '/fawn_hc-stain.jpg' },
  { name: 'Rye', image: '/rye_hc-stain.jpg' },
  { name: 'Reed', image: '/reed_hc-stain.jpg' },
  { name: 'Cask', image: '/cask_hc-stain.jpg' },
  { name: 'Alcove', image: '/alcove_hc-stain.jpg' },
  { name: 'Pumice', image: '/pumice_hc-stain.jpg' },
  { name: 'Shale', image: '/shale_hc-stain.jpg' },
  { name: 'Graphite', image: '/graphite_hc-stain.jpg' },
];

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface DealerPageProps {
  onBack: () => void;
}

export default function DealerPage({ onBack }: DealerPageProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setErrorMessage('Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <a href="#" className="flex items-center gap-2 h-9">
            <img src="/hinge22.png" alt="Hinge Cabinetry" className="h-9 w-auto" loading="lazy" />
          </a>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-brand-charcoal transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Main Site
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-brand-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(241,90,36,0.08),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <img
            src="/hingeselect-logo_op1.png"
            alt="Hinge Select"
            className="h-12 md:h-16 w-auto mx-auto mb-8"
            loading="lazy"
          />
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-5">
            Dealer Program
          </h1>
          <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Premium cabinetry built, assembled, and finished in Plainfield, Illinois. The Select
            Series features the Duncan shaker door in solid birch — assembled from unfinished
            inventory, hand-prepared, and finished to exact client specifications with Blum
            soft-close hinges and 20+ finish options, delivered in 3 to 4 weeks.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-select-flame text-xs tracking-[0.3em] uppercase text-center mb-3">At a Glance</p>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-charcoal text-center mb-14">
            Why Dealers Choose Select
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map(({ icon: Icon, headline, sub }) => (
              <div
                key={headline}
                className="group relative bg-surface-platinum rounded-xl p-6 border border-neutral-100 hover:border-select-flame/20 transition-all duration-300 hover:shadow-lg hover:shadow-select-flame/5"
              >
                <div className="w-10 h-10 rounded-lg bg-select-flame/10 flex items-center justify-center mb-4 group-hover:bg-select-flame/15 transition-colors">
                  <Icon size={20} className="text-select-flame" />
                </div>
                <h3 className="text-brand-charcoal font-bold text-lg mb-1.5">{headline}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Specs */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <p className="text-select-flame text-xs tracking-[0.3em] uppercase text-center mb-3">Specifications</p>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-charcoal text-center mb-4">
            Construction Details
          </h2>
          <p className="text-neutral-500 text-sm text-center max-w-xl mx-auto mb-12">
            Every Select cabinet is built to the same exacting standard — no tiers, no upgrades to chase.
          </p>

          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
            <img
              src="/duncan_hc-door.jpg"
              alt="Duncan door detail — 5-piece mortise & tenon shaker"
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
            />
            <div className="bg-white px-5 py-3 text-center">
              <span className="text-sm font-semibold text-brand-charcoal">The Duncan Door</span>
              <span className="mx-2 text-neutral-300">—</span>
              <span className="text-sm text-neutral-500">5-piece mortise & tenon shaker in solid birch</span>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 overflow-hidden">
            {[
              ['Door Style', 'Duncan 5-piece mortise & tenon frame, 45\u00B0 inside bevel, flat recessed center panel'],
              ['Door Material', 'Solid birch frame with veneered center panel'],
              ['Face Frame', '1\u00BE" \u00D7 \u00BE" solid hardwood'],
              ['Cabinet Box', '\u00BD" all-plywood with UV-coated matching exterior'],
              ['Back Panel', '\u00BD" full-height plywood'],
              ['Cabinet Interior', 'UV-coated natural plywood'],
              ['Shelving', '\u00BE" adjustable plywood shelves with front edgebanding'],
              ['Drawer Box', '\u215D" solid dovetail construction'],
              ['Drawer Glides', 'Undermount full-extension soft-close'],
              ['Hinges', 'Blum 6-way adjustable concealed with integrated soft-close'],
              ['Finish Application', 'Shop-applied multi-coat spray \u2014 commercial-grade primers, topcoats & clear sealers'],
            ].map(([label, value], i) => (
              <div
                key={label}
                className={`flex flex-col sm:flex-row ${i % 2 === 0 ? 'bg-surface-platinum' : 'bg-white'}`}
              >
                <div className="sm:w-44 md:w-52 shrink-0 px-5 pt-4 pb-1 sm:py-4 font-semibold text-sm text-brand-charcoal">
                  {label}
                </div>
                <div className="px-5 pb-4 sm:py-4 text-sm text-neutral-600 leading-relaxed">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Carousel */}
      <section className="py-16 md:py-24 bg-surface-platinum border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-select-flame text-xs tracking-[0.3em] uppercase text-center mb-3">Installed</p>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-charcoal text-center mb-12">
            Select in the Field
          </h2>

          <div
            className="relative rounded-2xl overflow-hidden bg-brand-ink shadow-2xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative aspect-[16/10] md:aspect-[16/9]">
              {carouselSlides.map((slide, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: i === currentSlide ? 1 : 0 }}
                >
                  <img
                    src={slide.src}
                    alt={`Hinge Select — ${slide.finish}`}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              ))}

              {/* Finish label */}
              <div className="absolute bottom-5 left-5 md:bottom-8 md:left-8 z-10">
                <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full border border-white/20">
                  Duncan — {carouselSlides[currentSlide].finish}
                </span>
              </div>

              {/* Nav arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/20"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-colors border border-white/20"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-1.5 py-4 bg-brand-ink">
              {carouselSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-6 bg-select-flame' : 'w-1.5 bg-white/25 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-16 md:py-24 bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-select-flame text-xs tracking-[0.3em] uppercase text-center mb-3">Finishes</p>
          <h2 className="text-2xl md:text-3xl font-serif text-brand-charcoal text-center mb-4">
            Full Color Palette
          </h2>
          <p className="text-neutral-500 text-sm text-center max-w-xl mx-auto mb-14">
            Every paint and stain is available on the Duncan door. Need a color outside the palette?
            The ColorDrop program offers custom paint and stain color matching — so you never turn
            away a job due to a limited factory palette.
          </p>

          {/* Paints */}
          <div className="mb-14">
            <h3 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-6 text-center">Paints</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 max-w-3xl mx-auto">
              {paints.map((p) => (
                <div key={p.name} className="flex flex-col items-center gap-2">
                  <div
                    className="w-full aspect-square rounded-lg shadow-sm border border-neutral-200 transition-transform duration-200 hover:scale-110 hover:shadow-md cursor-default"
                    style={{ backgroundColor: p.hex }}
                  />
                  <span className="text-[10px] md:text-xs text-neutral-500 font-medium text-center leading-tight">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stains */}
          <div>
            <h3 className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-6 text-center">Stains</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-3 max-w-4xl mx-auto">
              {stains.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-2">
                  <div className="w-full aspect-square rounded-lg shadow-sm border border-neutral-200 overflow-hidden transition-transform duration-200 hover:scale-110 hover:shadow-md cursor-default">
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <span className="text-[10px] md:text-xs text-neutral-500 font-medium text-center leading-tight">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 md:py-24 bg-surface-platinum">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <p className="text-select-flame text-xs tracking-[0.3em] uppercase mb-3">Get Started</p>
            <h2 className="text-2xl md:text-3xl font-serif text-brand-charcoal mb-3">Dealer Inquiry</h2>
            <p className="text-neutral-500 max-w-md mx-auto text-sm">
              Tell us about your business and we'll follow up to discuss partnership opportunities.
            </p>
          </div>

          {status === 'success' ? (
            <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={28} className="text-emerald-600" />
              </div>
              <h3 className="text-brand-charcoal text-xl font-semibold mb-2">Inquiry Submitted</h3>
              <p className="text-neutral-500 text-sm max-w-sm mx-auto mb-6">
                Thank you for your interest. A member of our team will review your information and reach out within two business days.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-neutral-500 hover:text-brand-charcoal transition-colors underline underline-offset-4"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 p-8 md:p-10 shadow-sm space-y-6" data-netlify="true" name="Dealer Inquiry">
              <input type="hidden" name="form-name" value="Dealer Inquiry" />
              <p className="hidden">
                <label>
                  Don't fill this out: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label htmlFor="dealer-name" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                  <User size={14} className="text-neutral-400" />
                  Contact Name
                </label>
                <input
                  id="dealer-name"
                  type="text"
                  name="name"
                  required
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-select-flame/40 focus:ring-1 focus:ring-select-flame/20 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="dealer-business" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                  <Building2 size={14} className="text-neutral-400" />
                  Business Name
                </label>
                <input
                  id="dealer-business"
                  type="text"
                  name="business_name"
                  required
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-select-flame/40 focus:ring-1 focus:ring-select-flame/20 transition-colors"
                  placeholder="Company or showroom name"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dealer-email" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                    <Mail size={14} className="text-neutral-400" />
                    Email
                  </label>
                  <input
                    id="dealer-email"
                    type="email"
                    name="email"
                    required
                    className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-select-flame/40 focus:ring-1 focus:ring-select-flame/20 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="dealer-phone" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                    <Phone size={14} className="text-neutral-400" />
                    Phone
                  </label>
                  <input
                    id="dealer-phone"
                    type="tel"
                    name="phone"
                    className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-select-flame/40 focus:ring-1 focus:ring-select-flame/20 transition-colors"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="dealer-location" className="flex items-center gap-2 text-sm font-medium text-brand-charcoal mb-2">
                  <MapPin size={14} className="text-neutral-400" />
                  Location / Market Area
                </label>
                <input
                  id="dealer-location"
                  type="text"
                  name="location"
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-select-flame/40 focus:ring-1 focus:ring-select-flame/20 transition-colors"
                  placeholder="City, state, or region you serve"
                />
              </div>

              <div>
                <label htmlFor="dealer-message" className="block text-sm font-medium text-brand-charcoal mb-2">
                  Tell Us About Your Business
                </label>
                <textarea
                  id="dealer-message"
                  name="message"
                  rows={4}
                  className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:outline-none focus:border-select-flame/40 focus:ring-1 focus:ring-select-flame/20 transition-colors resize-none"
                  placeholder="Briefly describe your business, clientele, and what interests you about carrying Hinge Select..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-select-flame text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-select-rust transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Submit Inquiry
                  </>
                )}
              </button>

              <p className="text-neutral-400 text-xs text-center">
                We typically respond within two business days.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-ink py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <img src="/hingeselect-logo_op1.png" alt="Hinge Select" className="h-7 w-auto opacity-60" loading="lazy" />
          <p className="text-neutral-600 text-xs">&copy; 2026 Hinge Cabinetry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

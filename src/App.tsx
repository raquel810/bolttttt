import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Ruler, Layers, Shield, Clock, Sparkles, Phone, Mail, MapPin, Globe } from 'lucide-react';
import CompareTable from './components/CompareTable';
import ColorPalette from './components/ColorPalette';
import DoorStyles from './components/DoorStyles';
import PremiumPrograms from './components/PremiumPrograms';
import ContactForm from './components/ContactForm';
import ProDoorSelector from './components/ProDoorSelector';
import ProjectCarousel from './components/ProjectCarousel';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hero = useInView(0.1);
  const custom = useInView();
  const pro = useInView();
  const compare = useInView();
  const finishes = useInView();


  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <div className="flex items-center gap-2 relative h-9">
            <img
              src="/hinge22.png"
              alt="Hinge Cabinetry"
              className={`h-9 w-auto absolute left-0 top-0 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
            />
            <img
              src="/hinge2.png"
              alt="Hinge Cabinetry"
              className={`h-9 w-auto transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Custom', 'Doors', 'Finishes', 'Pro', 'Compare'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-pro-flame ${scrolled ? 'text-neutral-700' : 'text-white/90'}`}
              >
                {item}
              </a>
            ))}
            <a
              href="#dealers"
              className={`text-sm font-medium transition-colors hover:text-pro-flame ${scrolled ? 'text-neutral-700' : 'text-white/90'}`}
            >
              Dealers
            </a>
            <a href="#contact" className="text-sm font-medium bg-brand-charcoal text-white px-5 py-2 rounded hover:bg-brand-jet transition-colors">
              Get Started
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className={scrolled ? 'text-brand-charcoal' : 'text-white'} /> : <Menu className={scrolled ? 'text-brand-charcoal' : 'text-white'} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-100 px-6 py-4 space-y-3">
            {['Custom', 'Doors', 'Finishes', 'Pro', 'Compare'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block text-neutral-700 font-medium py-2">
                {item}
              </a>
            ))}
            <a href="#dealers" onClick={() => setMenuOpen(false)} className="block text-neutral-700 font-medium py-2">
              Dealers
            </a>
          </div>
        )}
      </nav>

      {/* Hero — Cabinet-Forward */}
      <section ref={hero.ref} className="relative min-h-screen overflow-hidden bg-brand-ink">
        {/* Full-bleed cabinet photo */}
        <div className="absolute inset-0">
          <img
            src="/IMG_7726-watermarked.jpg"
            alt="Hinge custom frameless cabinetry"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/80 via-brand-ink/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-brand-ink/30"></div>
        </div>

        <div className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full h-screen flex flex-col justify-end pb-16 md:pb-20 transition-all duration-1000 ${hero.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {/* Logo */}
          <img
            src="/hinge22.png"
            alt="Hinge Cabinetry"
            className="h-10 md:h-14 w-auto object-contain mb-6"
            loading="eager"
          />

          {/* Headline */}
          <h1 className="font-serif font-normal text-3xl md:text-5xl lg:text-6xl text-white leading-[1.15] mb-4">
            Frameless Custom<br />Cabinetry
          </h1>

          {/* Subline */}
          <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed mb-8">
            Precision-built in Plainfield, Illinois. Full 3/4" plywood construction with 1/16" micro-tolerances and integrated Blum soft-close hardware.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a href="#custom" className="group inline-flex items-center gap-2 bg-white text-brand-ink text-sm font-semibold tracking-wide uppercase px-7 py-3.5 rounded hover:bg-white/90 transition-colors">
              Explore Custom
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#pro" className="group inline-flex items-center gap-2 border border-white/40 text-white text-sm font-medium tracking-wide uppercase px-7 py-3.5 rounded hover:border-white/70 hover:bg-white/10 transition-all">
              Pro Series
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Wireframe accent — bottom right */}
        <div className="hidden lg:block absolute bottom-8 right-8 z-10 opacity-20">
          <img
            src="/Image_20260201_142934_540.png"
            alt=""
            className="h-40 w-auto object-contain invert"
          />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="text-white/40" size={24} />
        </div>
      </section>

      {/* Custom Photography Showcase */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden mt-12 md:mt-16">
        <img
          src="/IMG_1132_(Custom).jpg"
          alt="Hinge Custom cabinetry detail"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent"></div>
      </section>

      {/* Custom Series Section */}
      <section id="custom" ref={custom.ref} className="pt-8 pb-24 md:pt-10 md:pb-32 bg-white">
        <div className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-20 transition-all duration-700 ${custom.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-brand-charcoal/50 text-xs tracking-[0.3em] uppercase mb-3">Hinge Custom Series</p>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-charcoal leading-tight mb-6">
                Frameless Custom<br />Cabinetry
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                Precision-engineered frameless construction maximizes interior access and usable storage. Every component is machined to strict 1/16" micro-tolerances, delivering uniform reveals and sharp, consistent lines across the entire layout.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Ruler, title: 'Precision Sizing (Within 1/16")', desc: 'Components machined to strict micro-tolerances ensure a perfect fit with uniform reveals across the entire layout.' },
                  { icon: Layers, title: 'Flush Decorative Finished Ends', desc: 'Side panels sit flush with door and drawer faces, eliminating structural offsets for a seamless furniture-grade look.' },
                  { icon: Shield, title: '3/4" Plywood Cabinet Construction', desc: 'Full-depth plywood boxes provide exceptional structural integrity and long-term durability.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-charcoal/5 flex items-center justify-center">
                      <Icon size={18} className="text-brand-charcoal" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-charcoal mb-1">{title}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-surface-platinum rounded-xl p-8 border border-neutral-100">
                <h4 className="font-semibold text-brand-charcoal mb-4 text-sm tracking-wide uppercase">Construction Highlights</h4>
                <div className="space-y-4">
                  {[
                    'Hand-sanded dovetail drawer joinery',
                    'Blum soft-close hinges & full-extension drawer guides',
                    '5 1/8" deep drawer boxes',
                    'Premium Blum all-metal hardware',
                    'CNC-precision milled components',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-charcoal mt-2 flex-shrink-0"></div>
                      <span className="text-neutral-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full-width content below the 2-col intro */}
          <div className="mt-12 max-w-5xl mx-auto space-y-8">
            <div className="bg-brand-charcoal rounded-xl p-8">
              <h4 className="text-white/60 text-xs tracking-[0.2em] uppercase mb-5">Material Selection</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'Maple', image: '/images/materials/maple.jpeg', hardness: 90, stability: 85, grain: 55 },
                  { name: 'Cherry', image: '/images/materials/cherry.jpeg', hardness: 65, stability: 80, grain: 72 },
                  { name: 'White Oak', image: '/images/materials/whiteoak.jpeg', hardness: 85, stability: 70, grain: 92 },
                  { name: 'High-Density Fiberboard', image: null, hardness: 78, stability: 95, grain: 10 },
                ].map((material) => (
                  <div key={material.name} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden flex">
                    <div className="w-24 h-24 flex-shrink-0 bg-white/5">
                      {material.image ? (
                        <img src={material.image} alt={material.name} className="w-full h-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 20 L8 12 L12 16 L16 8 L20 14 L20 20 Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex-1 min-w-0">
                      <span className="text-white text-sm font-semibold block mb-2">{material.name}</span>
                      <div className="space-y-1.5">
                        {[
                          { label: 'Hardness', value: material.hardness },
                          { label: 'Stability', value: material.stability },
                          { label: 'Grain Character', value: material.grain },
                        ].map((stat) => (
                          <div key={stat.label} className="flex items-center gap-2">
                            <span className="text-white/50 text-[10px] w-20 flex-shrink-0">{stat.label}</span>
                            <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full rounded-full bg-white/70" style={{ width: `${stat.value}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-5">Available across all door styles and finish combinations</p>
            </div>

            {/* Door Styles */}
            <div id="doors" className="bg-surface-platinum rounded-xl p-8 border border-neutral-100">
              <DoorStyles />
            </div>

            {/* Premium Finishes */}
            <div id="finishes" ref={finishes.ref} className="bg-surface-platinum rounded-xl p-8 border border-neutral-100">
              <div className="text-center mb-8">
                <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-3">Premium Finishes</p>
                <h3 className="text-2xl font-bold text-brand-charcoal mb-3">Curated Color Collections</h3>
                <p className="text-neutral-500 max-w-lg mx-auto text-sm">Formulated to complement our entire door style collection. Ultra-flat, glass-smooth paint surfaces and versatile stain finishes that emphasize grain, tone, and natural variation.</p>
              </div>
              <ColorPalette />
            </div>

            {/* Exclusive Premium Programs */}
            <PremiumPrograms />

            {/* Custom Project Carousel */}
            <div>
              <ProjectCarousel />
              <p className="text-white/40 text-xs text-center mt-3 tracking-wide">
                Doors shown: Erving &amp; Iverson profiles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Series Hero */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="/image_(3).png"
          alt="Hinge Pro kitchen installation"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-ink/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/hinge-pro-logo-white.png" alt="Hinge Pro" className="h-16 md:h-24 w-auto object-contain drop-shadow-2xl" loading="lazy" />
        </div>
      </section>

      {/* Pro Series Section */}
      <section id="pro" ref={pro.ref} className="py-24 md:py-32 bg-surface-platinum">
        <div className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-20 transition-all duration-700 ${pro.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1 space-y-6">
              {/* Pro Product Image */}
              <div className="rounded-xl overflow-hidden bg-white border border-neutral-200 p-6 flex items-center justify-center">
                <img src="/hinge-pro1.png" alt="Hinge Pro Series cabinet" className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>

              <div className="bg-white rounded-xl p-8 border border-neutral-200">
                <h4 className="font-semibold text-pro-flame mb-4 text-sm tracking-wide uppercase">Value Proposition</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Construction', value: 'Rugged all-wood box construction' },
                    { label: 'Door Style', value: 'Full-overlay for a clean, modern look' },
                    { label: 'Hardware', value: 'Integrated Premium Blum® Soft-Close' },
                    { label: 'Lead Time', value: 'Accelerated turnaround for trade professionals' },
                    { label: 'Value', value: 'Luxury performance, value-engineered for smart equity' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-4 pb-3 border-b border-neutral-100 last:border-0 last:pb-0">
                      <span className="text-neutral-500 text-sm font-medium">{label}</span>
                      <span className="text-neutral-800 text-sm text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Door Selection */}
              <ProDoorSelector />

              <div className="bg-pro-seashell rounded-xl p-8 border border-pro-flame/10">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={18} className="text-pro-flame" />
                  <h4 className="font-semibold text-brand-charcoal">Accelerated Project Timelines</h4>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Production-efficient engineering and streamlined sizing means your project ships faster—without sacrificing build quality or the world-class Blum® hardware that defines this line.
                </p>
              </div>

              {/* Request a Quote */}
              <div className="bg-white rounded-xl border border-neutral-200 p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-pro-rust font-semibold mb-2">Request a Quote</p>
                <h4 className="text-xl font-bold text-brand-charcoal mb-2">Ready to spec your Pro project?</h4>
                <p className="text-neutral-500 text-sm mb-6 leading-relaxed">Tell us about your project and a Hinge representative will follow up with pricing and lead time details.</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-pro-flame text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-pro-rust transition-colors duration-200"
                >
                  Start Your Project
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-pro-rust text-xs tracking-[0.3em] uppercase mb-3">Hinge Pro Series</p>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-charcoal leading-tight mb-6">
                High-Efficiency,<br />Streamlined Selection
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                Engineered for builders, contractors, and design-conscious homeowners who need accelerated lead times and exceptional value without sacrificing luxury performance. The Hinge Pro Series pairs rugged all-wood box construction with full-overlay styles—delivering smart equity on every project.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Layers, title: 'Rugged All-Wood Construction', desc: 'All-wood box construction paired with full-overlay door styles delivers structural integrity and a clean, modern aesthetic built to perform.' },
                  { icon: Sparkles, title: 'Premium Blum® Soft-Close', desc: 'Integrated world-class European hardware—the exact same Blum® moving parts found in ultra-luxury custom kitchens—standard on every Pro unit.' },
                  { icon: Shield, title: 'Accelerated Lead Times', desc: 'Production-efficient engineering means your project moves faster—reliable scheduling built for trade professionals who value time as much as quality.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-pro-flame/10 flex items-center justify-center">
                      <Icon size={18} className="text-pro-flame" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-charcoal mb-1">{title}</h4>
                      <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Divider */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src="/IMG_5198-3.jpg"
          alt="Hinge cabinetry craftsmanship"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-ink/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/hinge222.png" alt="Hinge product" className="h-32 md:h-48 w-auto object-contain drop-shadow-2xl" loading="lazy" />
        </div>
      </section>

      {/* Kitchen Gallery */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-3">Real Installations</p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Crafted for Real Spaces</h2>
            <p className="text-neutral-500 max-w-lg mx-auto">A look at Hinge cabinetry installed in homes across the country—where precision engineering meets everyday living.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-xl overflow-hidden aspect-[4/3] group">
              <img src="/IMG_7736-watermarked.jpg" alt="Hinge kitchen installation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3] group">
              <img src="/IMG_5195.jpg" alt="Hinge custom kitchen" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3] group">
              <img src="/IMG_7726-watermarked.jpg" alt="Hinge frameless cabinetry" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3] group">
              <img src="/IMG_5198-3.jpg" alt="Hinge cabinetry craftsmanship" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Compare */}
      <section id="compare" ref={compare.ref} className="py-24 md:py-32 bg-white">
        <div className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-20 transition-all duration-700 ${compare.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-3">Side by Side</p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-4">Compare Our Lines</h2>
            <p className="text-neutral-500 max-w-lg mx-auto">Understanding the distinction between our Custom and Pro series helps you select the right solution for every project.</p>
          </div>
          <CompareTable />
        </div>
      </section>

      {/* Dealer CTA */}
      <section className="py-16 md:py-20 bg-surface-platinum border-t border-neutral-200">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-3">For the Trade</p>
          <h2 className="text-2xl md:text-3xl font-bold text-brand-charcoal mb-4">Interested in Carrying Hinge?</h2>
          <p className="text-neutral-500 max-w-lg mx-auto mb-8">
            We partner with showrooms, design firms, and trade professionals who share our standard of quality. Learn about our dealer program and apply to join our network.
          </p>
          <a
            href="#dealers"
            className="inline-flex items-center gap-2 bg-brand-charcoal text-white font-semibold px-8 py-3.5 rounded hover:bg-brand-jet transition-colors"
          >
            Dealer Inquiries
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="py-24 md:py-32 bg-brand-jet">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-white/50 max-w-md mx-auto">Whether you need full custom precision or high-efficiency semi-custom, we have the right solution.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Info */}
            <div className="flex flex-col justify-center gap-6">
              <a href="https://hingecabinets.com" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                    <Globe size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-0.5">Website</p>
                    <p className="text-white font-medium">hingecabinets.com</p>
                  </div>
                </div>
              </a>
              <a href="tel:8152341000" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-0.5">Phone</p>
                    <p className="text-white font-medium">(815) 234-1000</p>
                  </div>
                </div>
              </a>
              <a href="mailto:info@hingecabinets.com" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-0.5">Email</p>
                    <p className="text-white font-medium">info@hingecabinets.com</p>
                  </div>
                </div>
              </a>
              <a href="https://maps.google.com/?q=12515+Rhea+Drive+Plainfield+Illinois+60585" target="_blank" rel="noopener noreferrer" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors flex-shrink-0">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-0.5">Showroom</p>
                    <p className="text-white font-medium leading-snug">12515 Rhea Drive, Plainfield, IL 60585</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-ink py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="/hinge2.png"
                  alt="Hinge Cabinetry"
                  className="h-8 w-auto brightness-0 invert opacity-70"
                />
              </div>
              <p className="text-neutral-500 text-sm max-w-xs">Precision crafted in Plainfield, Illinois. Modern cabinetry engineered around the rhythm of your everyday life.</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h5 className="text-white/60 text-xs tracking-[0.2em] uppercase mb-3">Product Lines</h5>
                <ul className="space-y-2 text-sm text-neutral-500">
                  <li><a href="#custom" className="hover:text-white transition-colors">Custom Series</a></li>
                  <li><a href="#pro" className="hover:text-white transition-colors">Pro Series</a></li>
                  <li><a href="#finishes" className="hover:text-white transition-colors">Finishes</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white/60 text-xs tracking-[0.2em] uppercase mb-3">Resources</h5>
                <ul className="space-y-2 text-sm text-neutral-500">
                  <li><a href="#compare" className="hover:text-white transition-colors">Compare Lines</a></li>
                  <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-xs">&copy; 2026 Hinge Cabinetry. All rights reserved.</p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-neutral-600 text-xs">
              <a href="tel:8152341000" className="hover:text-white transition-colors">(815) 234-1000</a>
              <a href="mailto:info@hingecabinets.com" className="hover:text-white transition-colors">info@hingecabinets.com</a>
              <span>12515 Rhea Drive, Plainfield, IL 60585</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

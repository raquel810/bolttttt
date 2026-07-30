import { useState, useEffect } from 'react';

interface PaintFinish {
  name: string;
  hex: string;
  textLight?: boolean;
  tags: string[];
  description: string;
  custom?: boolean;
}

interface StainFinish {
  name: string;
  image: string;
  tags: string[];
  description: string;
}

const paintFinishes: PaintFinish[] = [
  {
    name: 'Polar',
    hex: '#F8F7F1',
    tags: ['Minimalist', 'Architectural', 'Luminescent'],
    description: 'A crisp, ultra-pure white designed to maximize light reflection. Perfect for creating expansive, high-contrast modern layouts.',
  },
  {
    name: 'Arctic',
    hex: '#F1EDEC',
    tags: ['Contemporary', 'Refined', 'Scandi-Chic'],
    description: 'A cool, tailored white with a delicate gray undertone. Offers a smooth, gallery-like finish that softens harsh shadows.',
  },
  {
    name: 'Moonlight',
    hex: '#DFD3C3',
    tags: ['Organic Luxury', 'Warm Minimalist', 'Serene'],
    description: 'A soft, warm linen cream that brings an organic, tactile premium feel to perimeter cabinetry without feeling heavy.',
  },
  {
    name: 'Stone',
    hex: '#CCC8BF',
    tags: ['Sophisticated', 'Mid-Century', 'Balanced'],
    description: 'A grounded, versatile greige that beautifully bridges the gap between warm wood stains and sharp, dark metallic accents.',
  },
  {
    name: 'Slate',
    hex: '#7F817E',
    textLight: true,
    tags: ['Urban Industrial', 'Sleek', 'Tailored'],
    description: 'A definitive, mid-tone structural gray. Delivers a highly disciplined, monolithic look when applied to flush frameless door panels.',
  },
  {
    name: 'Sage',
    hex: '#95978A',
    tags: ['Biophilic', 'Organic', 'Soft Editorial'],
    description: 'A muted, earthy gray-green inspired by natural flora. Brings a subtle, calming element of the outdoors into open-concept kitchens.',
  },
  {
    name: 'Basil',
    hex: '#626F61',
    textLight: true,
    tags: ['Bold Luxury', 'Moody', 'Heritage Modern'],
    description: 'A deep, rich forest green with complex dark undertones. Exceptional for anchoring large kitchen islands or statement bar areas.',
  },
  {
    name: 'Harbor',
    hex: '#758B9A',
    textLight: true,
    tags: ['Coastal Modern', 'Editorial', 'Fluid'],
    description: 'A sophisticated slate blue heavily influenced by maritime fog. Adds an elegant, serene pop of desaturated color.',
  },
  {
    name: 'Navy',
    hex: '#35454E',
    textLight: true,
    tags: ['Classic Sophisticated', 'Maritime', 'Regal'],
    description: 'An authoritative, deep ink-navy. A timeless luxury staple that pairs flawlessly with brushed brass or polished chrome hardware.',
  },
  {
    name: 'Onyx',
    hex: '#2F2F30',
    textLight: true,
    tags: ['Avant-Garde', 'High-Contrast', 'Stealth Luxury'],
    description: 'A deep, dramatic charcoal-black. Delivers maximum architectural impact and razor-sharp shadow lines across flush cabinet configurations.',
  },
  {
    name: 'White Sesame',
    hex: '#EDE7DA',
    tags: ['ColorDrop Custom', 'Sherwin-Williams', 'Warm Neutral'],
    description: 'A custom ColorDrop match of Sherwin-Williams White Sesame (SW 9586) — a soft, sun-warmed alabaster with a whisper of warm beige. Brings a quietly tailored, luminous warmth to painted perimeter cabinetry.',
    custom: true,
  },
];

const stainFinishes: StainFinish[] = [
  {
    name: 'Oat',
    image: '/oat_hc-stain.jpg',
    tags: ['Coastal Modern', 'Scandinavian', 'Clean Minimalist'],
    description: 'An exceptionally crisp, pale straw-blonde finish highlighting long, linear grain structures. Perfect for elevating modern layouts with an airy, bright, coastal feel.',
  },
  {
    name: 'Honey',
    image: '/honey_hc-stain.jpg',
    tags: ['Luminous', 'Heritage Craft', 'Vibrant Organic'],
    description: 'A bright, golden-blonde finish emphasizing bold open-grain patterns and classic cathedral character. Instantly introduces a radiant, highly tactile warmth to a space.',
  },
  {
    name: 'Fawn',
    image: '/fawn_hc-stain.jpg',
    tags: ['Warm Minimalist', 'Transitional', 'Natural Balanced'],
    description: 'A smooth, versatile mid-tone amber-tan that delivers a perfectly balanced, organic warmth. It easily bridges the gap between ultra-modern elements and natural wood framing.',
  },
  {
    name: 'Rye',
    image: '/rye_hc-stain.jpg',
    tags: ['Warm Architectural', 'Transitional', 'Organic Wheat'],
    description: 'A brilliant, mid-toned wheat amber stain that celebrates standard wood patterning with crisp, contemporary precision. Brings an incredibly inviting, luminous texture to modern architectural setups.',
  },
  {
    name: 'Reed',
    image: '/reed_hc-stain.jpg',
    tags: ['Textural Elegance', 'Tactile Minimalist', 'Architectural Depth'],
    description: 'A sophisticated, medium amber-brown finish that accentuates deep, linear grain layers. It delivers an incredibly rich, tactile dimension that prevents large expanses of custom frameless millwork from looking flat.',
  },
  {
    name: 'Cask',
    image: '/cask_hc-stain.jpg',
    tags: ['Full-Bodied', 'Timeless Luxury', 'Deep Grounded'],
    description: 'A rich, deep espresso-brown stain that showcases intense grain character and classic weight. Ideal for grounding modern islands or creating high-contrast statement sections.',
  },
  {
    name: 'Alcove',
    image: '/alcove_hc-stain.jpg',
    tags: ['Sophisticated', 'Earthy Taupe', 'Quiet Luxury'],
    description: 'A beautifully desaturated greige stain featuring delicate, muted neutral undertones. It creates a subtle, matte depth while letting the natural wood texturing softly emerge.',
  },
  {
    name: 'Pumice',
    image: '/pumice_hc-stain.jpg',
    tags: ['Earthy Modern', 'Desert Minimalist', 'Restrained Luxury'],
    description: 'A desaturated, muted clay-taupe stain inspired by weathered natural stone. It beautifully balances raw wood character with clean, modern minimalism, pairing effortlessly with heavily veined marble details.',
  },
  {
    name: 'Shale',
    image: '/shale_hc-stain.jpg',
    tags: ['Deep Mineral', 'Executive Elegance', 'Anchored Luxury'],
    description: 'A rich, smoky mineral-brown stain that feels solid and grounding. It provides an excellent, sophisticated alternative to pure black, lending an expensive, deep weight to sharp contemporary configurations.',
  },
  {
    name: 'Graphite',
    image: '/graphite_hc-stain.jpg',
    tags: ['Monolithic', 'Modern Industrial', 'Dramatic Noir'],
    description: 'An ultra-sleek, deep charcoal-black stain engineered to offer a moody, dramatic aesthetic. Unlike a flat paint, it allows subtle, dark organic grain movements to breathe through a deeply monochromatic canvas.',
  },
  {
    name: 'Port',
    image: '/port_hc-stain.jpg',
    tags: ['Cellared Depth', 'Wine Country', 'Statement Luxury'],
    description: 'A deep, oxblood-tinged mahogany stain with the cellared warmth of a vintage port. Brings a refined, wine-country richness that pairs beautifully with brass and leather accents.',
  },
];

export default function ColorPalette() {
  const [activeTab, setActiveTab] = useState<'paint' | 'stain'>('stain');
  const [selectedPaint, setSelectedPaint] = useState<PaintFinish | null>(null);
  const [selectedStain, setSelectedStain] = useState<StainFinish | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || !detail.kind) return;
      if (detail.kind === 'stain') {
        const match = stainFinishes.find((s) => s.name === detail.name);
        if (match) {
          setActiveTab('stain');
          setSelectedPaint(null);
          setSelectedStain(match);
        }
      } else if (detail.kind === 'paint') {
        const match = paintFinishes.find((p) => p.name === detail.name);
        if (match) {
          setActiveTab('paint');
          setSelectedStain(null);
          setSelectedPaint(match);
        }
      }
    };
    window.addEventListener('hinge:select-finish', handler);
    return () => window.removeEventListener('hinge:select-finish', handler);
  }, []);

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white rounded-lg border border-neutral-200 p-1">
          <button
            onClick={() => { setActiveTab('stain'); setSelectedPaint(null); }}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'stain' ? 'bg-brand-charcoal text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
          >
            Stain Finishes
          </button>
          <button
            onClick={() => { setActiveTab('paint'); setSelectedStain(null); }}
            className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${activeTab === 'paint' ? 'bg-brand-charcoal text-white shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
          >
            Paint Finishes
          </button>
        </div>
      </div>

      {/* Paint Grid */}
      {activeTab === 'paint' && (
        <>
          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-4 max-w-4xl mx-auto">
            {paintFinishes.map((finish) => (
              <button
                key={finish.name}
                onClick={() => setSelectedPaint(selectedPaint?.name === finish.name ? null : finish)}
                className={`group relative aspect-square rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${selectedPaint?.name === finish.name ? 'ring-2 ring-brand-charcoal ring-offset-2 scale-105 shadow-lg' : 'shadow-sm'}`}
                style={{ backgroundColor: finish.hex }}
              >
                <div className={`absolute inset-0 flex items-end justify-center pb-2 bg-gradient-to-t ${finish.textLight ? 'from-black/40' : 'from-black/15'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}>
                  <span className={`text-[10px] font-medium ${finish.textLight ? 'text-white' : 'text-neutral-800'}`}>
                    {finish.name}
                  </span>
                </div>
                {selectedPaint?.name === finish.name && (
                  <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow">
                    <div className="w-1.5 h-1.5 bg-brand-charcoal rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Paint Info */}
          {selectedPaint && (
            <div className="mt-8 animate-fade-in">
              <div className="max-w-lg mx-auto flex items-start gap-5">
                <div className="w-16 h-16 rounded-xl shadow-md border border-neutral-200/50 flex-shrink-0" style={{ backgroundColor: selectedPaint.hex }}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <p className="font-semibold text-brand-charcoal text-lg">{selectedPaint.name}</p>
                    <p className="text-neutral-400 text-xs font-mono">{selectedPaint.hex.toUpperCase()}</p>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed mt-1.5">{selectedPaint.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedPaint.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 border border-neutral-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="text-center text-neutral-400 text-sm mt-10 max-w-lg mx-auto">
            Classic paint finishes deliver an ultra-flat, glass-smooth surface formulated to complement our entire collection of door styles and architectural materials.
          </p>
        </>
      )}

      {/* Stain Grid */}
      {activeTab === 'stain' && (
        <>
          <div className="grid grid-cols-5 lg:grid-cols-10 gap-3 max-w-5xl mx-auto">
            {stainFinishes.map((finish) => (
              <button
                key={finish.name}
                onClick={() => setSelectedStain(selectedStain?.name === finish.name ? null : finish)}
                className={`group relative aspect-[3/4] rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:shadow-xl ${selectedStain?.name === finish.name ? 'ring-2 ring-brand-charcoal ring-offset-2 scale-[1.04] shadow-xl' : 'shadow-md'}`}
              >
                <img
                  src={finish.image}
                  alt={`${finish.name} stain finish`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="absolute bottom-2.5 left-0 right-0 text-center text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
                  {finish.name}
                </span>
                {selectedStain?.name === finish.name && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 bg-brand-charcoal rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Stain Info */}
          {selectedStain && (
            <div className="mt-8 animate-fade-in">
              <div className="max-w-2xl mx-auto flex items-start gap-5 bg-neutral-50 rounded-xl p-5 border border-neutral-100">
                <img
                  src={selectedStain.image}
                  alt={`${selectedStain.name} stain`}
                  className="w-20 h-20 rounded-lg object-cover shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-charcoal text-lg">{selectedStain.name}</p>
                  <p className="text-neutral-500 text-sm leading-relaxed mt-1">{selectedStain.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedStain.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-white text-neutral-500 border border-neutral-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="text-center text-neutral-400 text-sm mt-10 max-w-lg mx-auto">
            A versatile range of stain finishes that emphasize grain, tone, and natural variation. Custom color matching available through the ColorDrop program.
          </p>
        </>
      )}
    </div>
  );
}

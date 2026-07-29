import { useState, useEffect } from 'react';

interface DoorStyle {
  name: string;
  profile: string;
  full: string;
  category: string;
  construction: string;
  overlay: string;
  species: string[];
  thickness: string;
  description: string;
}

const doorStyles: DoorStyle[] = [
  {
    name: 'Erving',
    profile: '/erving_profile.png',
    full: '/erving_hc-door.jpg',
    category: 'Slab',
    construction: 'Slab',
    overlay: 'Full Overlay',
    species: ['Maple', 'Cherry', 'Oak', 'Quartersawn White Oak'],
    thickness: '3/4"',
    description: 'A true slab door with no frame or panel construction. The uninterrupted surface showcases the natural beauty of the wood species and provides the cleanest, most contemporary aesthetic.',
  },
  {
    name: 'Iverson',
    profile: '/iverson_profile.png',
    full: '/iverson_hc-door.jpg',
    category: 'Flat-Panel Mitered',
    construction: 'Mitered',
    overlay: 'Full Overlay',
    species: ['Maple', 'Oak', 'Quartersawn White Oak'],
    thickness: '3/4"',
    description: 'A narrow mitered frame surrounds a flat center panel, creating a subtle recessed detail. The slim frame keeps the profile minimal while adding refined dimension.',
  },
  {
    name: 'Sanders',
    profile: '/sanders_profile.png',
    full: '/sanders_hc-door.jpg',
    category: 'Flat-Panel Mitered',
    construction: 'Mitered',
    overlay: 'Full Overlay',
    species: ['Maple', 'Cherry', 'Oak', 'Hickory'],
    thickness: '3/4"',
    description: 'A flat-panel mitered door providing a balanced proportion between frame and panel. Clean mitered corners deliver a seamless, contemporary look.',
  },
  {
    name: 'Duncan',
    profile: '/duncan_profile.png',
    full: '/duncan_hc-door.jpg',
    category: 'Flat-Panel Mortise & Tenon',
    construction: 'Mortise & Tenon',
    overlay: 'Full Overlay',
    species: ['Maple', 'Cherry', 'Oak', 'Quartersawn White Oak', 'Hickory'],
    thickness: '3/4"',
    description: 'A traditional mortise and tenon flat-panel door with a generous frame. The wider stile-and-rail proportions create a strong, classic presence with superior structural integrity.',
  },
  {
    name: 'James',
    profile: '/james_profile.png',
    full: '/james_hc-door.jpg',
    category: 'Flat-Panel Mortise & Tenon',
    construction: 'Mortise & Tenon',
    overlay: 'Full Overlay',
    species: ['Maple', 'Cherry', 'Oak', 'Quartersawn White Oak', 'Hickory'],
    thickness: '3/4"',
    description: 'A mortise and tenon flat-panel door with a refined frame. Balances traditional joinery strength with slightly more modern proportions than the Duncan.',
  },
  {
    name: 'Payton',
    profile: '/payton_profile.png',
    full: '/payton_hc-door.jpg',
    category: 'Flat-Panel Mitered',
    construction: 'Mitered',
    overlay: 'Full Overlay',
    species: ['Maple', 'Cherry', 'Oak'],
    thickness: '3/4"',
    description: 'A mitered flat-panel door featuring a distinctive inside edge profile. The subtle detail adds visual interest while maintaining a clean overall silhouette.',
  },
  {
    name: 'Jordan',
    profile: '/jordan_profile.png',
    full: '/jordan_hc-door.jpg',
    category: 'Flat-Panel Mitered',
    construction: 'Mitered',
    overlay: 'Full Overlay',
    species: ['Maple', 'Cherry', 'Oak', 'Hickory'],
    thickness: '3/4"',
    description: 'A mitered flat-panel door with a shaped inside edge detail. Combines the seamless mitered corner with a transitional profile that bridges modern and traditional.',
  },
  {
    name: 'Bryant',
    profile: '/bryant_profile.png',
    full: '/bryant_hc-door.jpg',
    category: 'Flat-Panel Mitered',
    construction: 'Mitered',
    overlay: 'Full Overlay',
    species: ['Maple', 'Cherry', 'Oak'],
    thickness: '3/4"',
    description: 'A mitered flat-panel door with a more pronounced inside edge profile. Delivers bold geometric depth with confident, architectural character.',
  },
  {
    name: 'Taylor',
    profile: '/taylor_profile.png',
    full: '/taylor_hc-door.jpg',
    category: 'Flat-Panel Mitered',
    construction: 'Mitered',
    overlay: 'Full Overlay',
    species: ['Maple', 'Cherry', 'Oak', 'Hickory'],
    thickness: '3/4"',
    description: 'A mitered flat-panel door with a multi-layered inside edge. The richest mitered profile in the collection, suited for spaces demanding visual depth.',
  },
  {
    name: 'Russell',
    profile: '/russell_profile.png',
    full: '/russell_hc-door.jpg',
    category: 'Flat-Panel Mitered',
    construction: 'Mitered',
    overlay: 'Full Overlay',
    species: ['Maple', 'Cherry', 'Oak', 'Hickory'],
    thickness: '3/4"',
    description: 'A mitered flat-panel door with an applied moulding detail on the center panel. Combines flat-panel simplicity with a decorative furniture-inspired accent.',
  },
];

export default function DoorStyles() {
  const [selected, setSelected] = useState<DoorStyle>(doorStyles[0]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || !detail.name) return;
      const match = doorStyles.find((d) => d.name === detail.name);
      if (match) setSelected(match);
    };
    window.addEventListener('hinge:select-door', handler);
    return () => window.removeEventListener('hinge:select-door', handler);
  }, []);

  return (
    <div>
      <div className="text-center mb-8">
        <p className="text-neutral-400 text-xs tracking-[0.3em] uppercase mb-3">Door Styles</p>
        <h3 className="text-2xl font-bold text-brand-charcoal mb-3">10 Precision-Milled Profiles</h3>
        <p className="text-neutral-500 max-w-lg mx-auto text-sm">
          From pure slab to detailed mitered profiles — each door is CNC-milled to exacting tolerances for full overlay frameless construction.
        </p>
      </div>

      {/* Profile selector grid */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {doorStyles.map((door) => (
          <button
            key={door.name}
            onClick={() => setSelected(door)}
            className={`group relative flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
              selected.name === door.name
                ? 'bg-brand-charcoal/5 ring-1 ring-brand-charcoal/20'
                : 'hover:bg-neutral-50'
            }`}
          >
            <div className="w-full aspect-[3/4] flex items-center justify-center overflow-hidden rounded-md bg-neutral-50">
              <img
                src={door.full}
                alt={`${door.name} door`}
                className={`h-full w-full object-cover transition-all duration-200 ${
                  selected.name === door.name ? 'scale-105' : 'opacity-70 group-hover:opacity-100'
                }`}
              />
            </div>
            <span className={`text-[11px] font-medium transition-colors ${
              selected.name === door.name ? 'text-brand-charcoal' : 'text-neutral-400 group-hover:text-neutral-600'
            }`}>
              {door.name}
            </span>
          </button>
        ))}
      </div>

      {/* Selected door detail */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all duration-300">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
          {/* Full door image */}
          <div className="bg-neutral-50 p-6 flex items-center justify-center min-h-[280px]">
            <img
              key={selected.name}
              src={selected.full}
              alt={`${selected.name} door style`}
              className="max-h-[260px] w-auto object-contain animate-fade-in"
            />
          </div>

          {/* Info panel */}
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-xl font-bold text-brand-charcoal">{selected.name}</h4>
              <span className="text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 border border-neutral-200/60">
                {selected.category}
              </span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-4">
              {selected.description}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-xs">
              <div>
                <span className="text-neutral-400 uppercase tracking-wide text-[10px]">Construction</span>
                <p className="text-brand-charcoal font-medium">{selected.construction}</p>
              </div>
              <div>
                <span className="text-neutral-400 uppercase tracking-wide text-[10px]">Thickness</span>
                <p className="text-brand-charcoal font-medium">{selected.thickness}</p>
              </div>
            </div>

            {/* Profile cross-section */}
            <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
              <p className="text-neutral-400 text-[10px] tracking-[0.2em] uppercase mb-2">Edge Profile Cross-Section</p>
              <div className="h-16 flex items-center justify-center">
                <img
                  src={selected.profile}
                  alt={`${selected.name} cross-section`}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

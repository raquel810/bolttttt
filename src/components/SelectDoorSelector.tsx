import { useState } from 'react';

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
  { name: 'Port', image: '/port_hc-stain.jpg' },
];

export default function SelectDoorSelector() {
  const [activeTab, setActiveTab] = useState<'paint' | 'stain'>('paint');
  const [selectedPaint, setSelectedPaint] = useState<PaintSwatch | null>(null);
  const [selectedStain, setSelectedStain] = useState<StainSwatch | null>(null);

  return (
    <div className="bg-white rounded-xl p-8 border border-neutral-200">
      {/* Duncan Door Showcase */}
      <h4 className="font-semibold text-select-flame mb-2 text-sm tracking-wide uppercase">
        The Duncan Door
      </h4>
      <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
        A chamfer shaker door with a 2 1/2" frame — delivering a clean, contemporary aesthetic with balanced proportions. One versatile door, available in every finish we make.
      </p>

      <div className="flex gap-6 mb-8">
        <div className="w-32 flex-shrink-0 bg-surface-platinum rounded-lg border border-neutral-100 overflow-hidden shadow-sm">
          <img
            src="/hingepro_duncanunfinished.jpg"
            alt="Duncan door unfinished"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h5 className="text-lg font-semibold text-brand-charcoal mb-1">Duncan</h5>
          <p className="text-xs text-neutral-400 mb-2">Chamfer Shaker · Full Overlay · 2 1/2" Frame</p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            The chamfer shaker profile delivers a clean, modern look that pairs beautifully with any paint or stain from the Hinge palette.
          </p>
        </div>
      </div>

      {/* Full Finish Palette */}
      <div className="border-t border-neutral-100 pt-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">
            Available Finishes ({paints.length + stains.length})
          </p>
          <div className="inline-flex bg-neutral-50 rounded-md p-0.5 border border-neutral-100">
            <button
              onClick={() => { setActiveTab('paint'); setSelectedStain(null); }}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                activeTab === 'paint'
                  ? 'bg-white text-brand-charcoal shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Paints ({paints.length})
            </button>
            <button
              onClick={() => { setActiveTab('stain'); setSelectedPaint(null); }}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                activeTab === 'stain'
                  ? 'bg-white text-brand-charcoal shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Stains ({stains.length})
            </button>
          </div>
        </div>

        {activeTab === 'paint' && (
          <div className="grid grid-cols-5 gap-2 mb-4">
            {paints.map((p) => (
              <button
                key={p.name}
                onClick={() => setSelectedPaint(p)}
                className={`group relative aspect-square rounded-lg border-2 transition-all duration-200 ${
                  selectedPaint?.name === p.name
                    ? 'border-select-flame scale-105 shadow-md'
                    : 'border-neutral-200 hover:border-neutral-400 hover:shadow-sm'
                }`}
                style={{ backgroundColor: p.hex }}
                title={p.name}
              >
                <span className={`absolute bottom-0.5 left-0 right-0 text-center text-[9px] font-medium leading-tight ${
                  p.textLight ? 'text-white/80' : 'text-neutral-700/80'
                }`}>
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'stain' && (
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2 mb-4">
            {stains.map((s) => (
              <button
                key={s.name}
                onClick={() => setSelectedStain(s)}
                className={`group relative aspect-square rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                  selectedStain?.name === s.name
                    ? 'border-select-flame scale-105 shadow-md'
                    : 'border-neutral-200 hover:border-neutral-400 hover:shadow-sm'
                }`}
                title={s.name}
              >
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                <span className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[9px] font-medium text-center py-0.5">
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        )}

        {(selectedPaint || selectedStain) && (
          <div className="bg-surface-platinum rounded-lg px-4 py-3 flex items-center gap-3 animate-fade-in">
            {selectedPaint && (
              <>
                <div className="w-8 h-8 rounded-md border border-neutral-200 flex-shrink-0" style={{ backgroundColor: selectedPaint.hex }} />
                <span className="text-sm font-medium text-brand-charcoal">Duncan — {selectedPaint.name}</span>
              </>
            )}
            {selectedStain && (
              <>
                <div className="w-8 h-8 rounded-md border border-neutral-200 flex-shrink-0 overflow-hidden">
                  <img src={selectedStain.image} alt={selectedStain.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-brand-charcoal">Duncan — {selectedStain.name}</span>
              </>
            )}
          </div>
        )}

        <p className="text-neutral-400/70 text-[11px] mt-3 italic">
          Colors shown are representations and may vary from the finished product. ColorDrop custom matching also available.
        </p>
      </div>
    </div>
  );
}

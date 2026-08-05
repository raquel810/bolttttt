import { useState } from 'react';

const specs = [
  { category: 'Construction', custom: 'Frameless (European)', pro: 'Framed, Full-Overlay' },
  { category: 'Customization', custom: 'Full Custom Sizing', pro: 'Standard Sizes' },
  { category: 'Box Material', custom: '3/4" Plywood', pro: 'All-Wood Rugged Box' },
  { category: 'Drawer Construction', custom: 'Hand-Sanded Dovetail', pro: 'Standard Dovetail' },
  { category: 'Hardware', custom: 'Blum Soft-Close (Full Suite)', pro: 'Premium Blum® Soft-Close' },
  { category: 'Finished Ends', custom: 'Flush Decorative Ends', pro: 'Standard Finished Ends' },
  { category: 'Tolerances', custom: '1/16" Micro-Tolerance', pro: 'Standard Tolerances' },
  { category: 'Lead Time', custom: '6-8 Weeks', pro: '3-4 Weeks' },
  { category: 'Finish Options', custom: '10 Paints + 10 Stains + ColorDrop', pro: 'Duncan in Any Paint or Stain' },
];

export default function CompareTable() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <>
    <div className="overflow-hidden rounded-xl border border-neutral-200">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="bg-neutral-100 p-4 md:p-6">
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-medium">Specification</span>
        </div>
        <div className="bg-brand-charcoal p-4 md:p-6 text-center">
          <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase mb-0.5">Hinge</p>
          <p className="text-white font-semibold text-sm md:text-base">Custom Series</p>
        </div>
        <div className="bg-pro-flame p-4 md:p-6 text-center">
          <p className="text-white/70 text-[10px] tracking-[0.2em] uppercase mb-0.5">Hinge</p>
          <p className="text-white font-semibold text-sm md:text-base">Pro Series</p>
        </div>
      </div>

      {/* Rows */}
      {specs.map((spec, i) => (
        <div
          key={spec.category}
          className={`grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.2fr_1fr_1fr] border-t border-neutral-100 transition-colors duration-150 ${hoveredRow === i ? 'bg-neutral-50' : 'bg-white'}`}
          onMouseEnter={() => setHoveredRow(i)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <div className="p-4 md:p-5 flex items-center">
            <span className="text-sm font-medium text-neutral-700">{spec.category}</span>
          </div>
          <div className="p-4 md:p-5 flex items-center justify-center text-center border-l border-neutral-100">
            <span className="text-sm text-neutral-600">{spec.custom}</span>
          </div>
          <div className="p-4 md:p-5 flex items-center justify-center text-center border-l border-neutral-100">
            <span className="text-sm text-neutral-600">{spec.pro}</span>
          </div>
        </div>
      ))}
    </div>
    <p className="text-neutral-400/70 text-xs mt-4 text-center italic">
      Product offerings and specifications are subject to change without notice. Contact your representative for current details.
    </p>
    </>
  );
}

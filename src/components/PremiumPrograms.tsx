import { useState, useEffect } from 'react';
import { ChevronDown, Target, Box, Paintbrush2, Cpu, ScanLine } from 'lucide-react';

const optifitCorePillars = [
  {
    icon: Target,
    title: 'Defeating Tolerance Drift',
    desc: 'Every custom component is factory-machined to a strict 1/16" micro-tolerance, ensuring appliance reveals seamlessly match your custom door configuration lines.',
  },
  {
    icon: Box,
    title: 'Appliance-Grade Rigidity',
    desc: 'Engineered with full-depth 3/4" plywood boxes to provide a rock-solid, deflection-free foundation capable of effortlessly supporting heavy 300lb+ premium refrigeration columns.',
  },
  {
    icon: Paintbrush2,
    title: '3-1/2" Finished Returns',
    desc: 'Pre-engineered, color-matched interior pockets fully conceal raw cabinet structures and metallic casings when integrated appliance doors are swung wide open.',
  },
];

const optifitPlusPillars = [
  {
    icon: Cpu,
    title: 'Factory CNC Bypasses',
    desc: 'Milled ventilation paths and integrated utility tracks are precisely routed during manufacturing, preserving structural box integrity while saving hours of on-site installation labor.',
  },
  {
    icon: ScanLine,
    title: 'Laser-Accurate Site Surveys',
    desc: 'Prior to custom manufacturing, a certified technician utilizes advanced digital layout mapping to record precise wall plumbness, floor slopes, and mechanical utility coordinates.',
  },
];

export default function PremiumPrograms() {
  const [openPanel, setOpenPanel] = useState<'colordrop' | 'optifit' | null>(null);

  const toggle = (panel: 'colordrop' | 'optifit') => {
    setOpenPanel(openPanel === panel ? null : panel);
  };

  useEffect(() => {
    const handler = () => setOpenPanel('colordrop');
    window.addEventListener('hinge:open-colordrop', handler);
    return () => window.removeEventListener('hinge:open-colordrop', handler);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-charcoal/40">Exclusive Programs</span>
        <span className="bg-brand-charcoal text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-wider">CUSTOM ONLY</span>
      </div>

      {/* ColorDrop Panel */}
      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
        <button
          onClick={() => toggle('colordrop')}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-neutral-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <img src="/colordrop-logo-hinge_blue.png" alt="ColorDrop" className="h-7 w-auto" />
            <span className="text-sm font-semibold text-brand-charcoal">Custom Color Made Simple</span>
          </div>
          <ChevronDown
            size={18}
            className={`text-neutral-400 transition-transform duration-300 ${openPanel === 'colordrop' ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${openPanel === 'colordrop' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6 pt-2 border-t border-neutral-100">
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                When our curated palettes of precision-applied paints and character-enhancing stains aren't enough, ColorDrop opens up limitless design possibilities.
              </p>
              <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                Homeowners and interior designers can provide a physical paint or stain sample to create a flawless, custom-engineered color match across our premium hardwood species and stable substrates.
              </p>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200/60 rounded-lg px-4 py-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                <p className="text-xs text-amber-800">
                  Additional cost applies. See your representative for structural details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OptiFit Panel */}
      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
        <button
          onClick={() => toggle('optifit')}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-neutral-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <img src="/optifit-logo_blue.png" alt="OptiFit" className="h-6 w-auto" />
            <span className="text-sm font-semibold text-brand-charcoal">Eliminating On-Site Guesswork</span>
          </div>
          <ChevronDown
            size={18}
            className={`text-neutral-400 transition-transform duration-300 ${openPanel === 'optifit' ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-in-out ${openPanel === 'optifit' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6 pt-2 border-t border-neutral-100">
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Custom architectural millwork flawlessly shapes a space, but high-end integrated appliances introduce unpredictable job-site variables. The exclusive OptiFit program applies our signature 1/16" engineering precision directly to your appliance specifications, maximizing space down to the millimeter.
              </p>

              {/* OptiFit Core Tier */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <img src="/optifit-logo_blue.png" alt="OptiFit" className="h-4 w-auto" />
                  <span className="text-xs font-bold tracking-[0.1em] uppercase text-brand-charcoal/50">Core Engineering</span>
                </div>
                <div className="space-y-4">
                  {optifitCorePillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div key={pillar.title} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-charcoal/5 flex items-center justify-center">
                          <Icon size={14} className="text-brand-charcoal/70" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h6 className="text-sm font-semibold text-brand-charcoal mb-0.5">{pillar.title}</h6>
                          <p className="text-neutral-500 text-xs leading-relaxed">{pillar.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* OptiFit+ Upgrade Tier */}
              <div className="border-t border-neutral-100 pt-5">
                <div className="flex items-center gap-2 mb-4">
                  <img src="/optifit-plus-logo-white.png" alt="OptiFit+" className="h-4 w-auto invert opacity-70" />
                  <span className="text-xs font-bold tracking-[0.1em] uppercase text-brand-charcoal/50">Upgrade</span>
                  <span className="bg-brand-charcoal/10 text-brand-charcoal text-[9px] font-bold px-1.5 py-0.5 rounded">+</span>
                </div>
                <div className="space-y-4">
                  {optifitPlusPillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div key={pillar.title} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-charcoal/5 flex items-center justify-center">
                          <Icon size={14} className="text-brand-charcoal/70" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h6 className="text-sm font-semibold text-brand-charcoal mb-0.5">{pillar.title}</h6>
                          <p className="text-neutral-500 text-xs leading-relaxed">{pillar.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

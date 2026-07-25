import { useState } from 'react';

interface Finish {
  name: string;
  image: string;
}

interface ProDoor {
  name: string;
  profile: string;
  construction: string;
  frame: string;
  description: string;
  finishes: Finish[];
}

const proDoors: ProDoor[] = [
  {
    name: 'Duncan',
    profile: '/duncan_profile.png',
    construction: 'Mitered',
    frame: '2 1/2"',
    description: 'A flat-panel mitered door providing a balanced proportion between frame and panel. Clean mitered corners deliver a seamless, contemporary look.',
    finishes: [
      { name: 'Chalk', image: '/images/door-styles/sanders/sanders-chalk_05.png' },
      { name: 'Ivory', image: '/images/door-styles/sanders/sanders-ivory_04.png' },
      { name: 'Fog', image: '/images/door-styles/sanders/sanders-fog_02.png' },
      { name: 'Torrent', image: '/images/door-styles/sanders/sanders-torrent_00.png' },
      { name: 'Pitch', image: '/images/door-styles/sanders/sanders-pitch_01.png' },
      { name: 'Tannin', image: '/images/door-styles/sanders/sanders-tannin_03.png' },
    ],
  },
  {
    name: 'Jordan',
    profile: '/jordan_profile.png',
    construction: 'Mitered',
    frame: '2 1/2"',
    description: 'A mitered flat-panel door with a shaped inside edge detail. Combines the seamless mitered corner with a transitional profile that bridges modern and traditional.',
    finishes: [
      { name: 'Dove', image: '/images/door-styles/jordan/jordan-dove_00.png' },
      { name: 'Pitch', image: '/images/door-styles/jordan/jordan-pitch_01.png' },
    ],
  },
  {
    name: 'Russell',
    profile: '/russell_profile.png',
    construction: 'Mitered',
    frame: '2 1/2"',
    description: 'A mitered flat-panel door with an applied moulding detail on the center panel. Combines flat-panel simplicity with a decorative furniture-inspired accent.',
    finishes: [
      { name: 'Briar', image: '/images/door-styles/russell/russell-briar_00.png' },
    ],
  },
];

export default function ProDoorSelector() {
  const [selectedDoor, setSelectedDoor] = useState<ProDoor>(proDoors[0]);
  const [selectedFinish, setSelectedFinish] = useState<Finish>(proDoors[0].finishes[0]);

  const handleDoorSelect = (door: ProDoor) => {
    setSelectedDoor(door);
    setSelectedFinish(door.finishes[0]);
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-neutral-200">
      <h4 className="font-semibold text-pro-flame mb-2 text-sm tracking-wide uppercase">Door Selection</h4>
      <p className="text-neutral-500 text-sm mb-6 leading-relaxed">
        Curated full-overlay door styles engineered for the Pro Series — designed to deliver a clean, modern look with accelerated production timelines.
      </p>

      {/* Door style tabs */}
      <div className="flex gap-1 mb-6 bg-neutral-50 rounded-lg p-1">
        {proDoors.map((door) => (
          <button
            key={door.name}
            onClick={() => handleDoorSelect(door)}
            className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedDoor.name === door.name
                ? 'bg-white text-brand-charcoal shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {door.name}
          </button>
        ))}
      </div>

      {/* Selected door display */}
      <div className="flex gap-6 mb-6">
        <div className="w-24 h-32 flex-shrink-0 bg-surface-platinum rounded-lg border border-neutral-100 overflow-hidden">
          <img
            src={selectedDoor.profile}
            alt={`${selectedDoor.name} profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h5 className="text-lg font-semibold text-brand-charcoal mb-1">{selectedDoor.name}</h5>
          <p className="text-xs text-neutral-400 mb-2">
            {selectedDoor.construction} &middot; Full Overlay
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">{selectedDoor.description}</p>
        </div>
      </div>

      {/* Finish selector */}
      <div className="border-t border-neutral-100 pt-5">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-3">
          Available Finishes ({selectedDoor.finishes.length})
        </p>
        <div className="flex gap-2 flex-wrap mb-5">
          {selectedDoor.finishes.map((finish) => (
            <button
              key={finish.name}
              onClick={() => setSelectedFinish(finish)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedFinish.name === finish.name
                  ? 'bg-brand-charcoal text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {finish.name}
            </button>
          ))}
        </div>

        {/* Finish preview */}
        <div className="aspect-[4/3] bg-surface-platinum rounded-lg border border-neutral-100 overflow-hidden relative">
          <img
            key={selectedFinish.image}
            src={selectedFinish.image}
            alt={`${selectedDoor.name} in ${selectedFinish.name} finish`}
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-md px-3 py-1.5 shadow-sm">
            <span className="text-xs font-medium text-brand-charcoal">
              {selectedDoor.name} — {selectedFinish.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

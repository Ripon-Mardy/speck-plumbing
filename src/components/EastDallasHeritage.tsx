import { useState } from 'react';
import { Home, MapPin } from 'lucide-react';
import { EAST_DALLAS_IMAGE, NEIGHBORHOOD_ZONES } from '../data/speckData';

interface EastDallasHeritageProps {
  onSelectNeighborhood: (zip: string) => void;
}

export function EastDallasHeritage({ onSelectNeighborhood }: EastDallasHeritageProps) {
  const [selectedZip, setSelectedZip] = useState<string>(NEIGHBORHOOD_ZONES[0].zip);
  const [imgError, setImgError] = useState(false);

  return (
    <section id="neighborhood" className="py-16 lg:py-24 bg-[#0B1F3A] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[320px] rounded-lg overflow-hidden border border-white/15 bg-slate-900">
              {!imgError ? (
                <img
                  src={EAST_DALLAS_IMAGE}
                  alt="Historic 1920s East Dallas Craftsman home shaded by live oak trees"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-center">
                  <Home className="w-10 h-10 mb-3 text-amber-400" aria-hidden="true" />
                  <p className="font-display font-semibold">East Dallas Heritage Homes</p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5">
                <p className="text-xs font-mono text-amber-300">
                  East Dallas Service Territory · Est. Local Crew
                </p>
                <p className="text-sm font-medium text-white mt-1">
                  Experienced with 100-year-old pier-and-beam foundations &amp; tight crawlspaces.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-amber-300 tracking-wide mb-2">
                Neighborhood Familiarity
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                We know how East Dallas houses are piped before we step through the door.
              </h2>
              <p className="text-base text-slate-200 leading-relaxed max-w-[62ch] mb-8">
                Longtime East Dallas homeowners rely on Speck Plumbing because generic
                franchise crews often cut into original plaster or hardwood floors when
                they hit an unfamiliar layout. Our crew navigates tight crawlspaces and
                older cast-iron, copper, and gas piping cleanly—saving your home’s finish.
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-300 mb-3">
                Select your East Dallas area to check dispatch proximity:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {NEIGHBORHOOD_ZONES.map((zone) => {
                  const isActive = selectedZip === zone.zip;
                  return (
                    <button
                      key={zone.zip}
                      type="button"
                      onClick={() => {
                        setSelectedZip(zone.zip);
                        onSelectNeighborhood(zone.zip);
                      }}
                      className={`text-left p-4 rounded-lg border transition-colors duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-white/12 border-amber-400/70'
                          : 'bg-white/5 border-white/15 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-display font-semibold text-sm text-white">
                          {zone.name}
                        </span>
                        <span className="font-mono tabular-nums text-xs text-amber-300 shrink-0">
                          {zone.zip}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed mb-2">
                        {zone.notes}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" aria-hidden="true" />
                        <span>{zone.responseWindow}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

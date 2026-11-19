import { useState } from 'react';
import { ArrowUpRight, Check, Wrench } from 'lucide-react';
import { PLUMBING_SERVICES, type PlumbingService } from '../data/speckData';

interface ServicesBentoProps {
  onSelectService: (serviceId: string) => void;
}

export function ServicesBento({ onSelectService }: ServicesBentoProps) {
  const [imgError, setImgError] = useState(false);

  const featuredService = PLUMBING_SERVICES[0];
  const secondaryServices = PLUMBING_SERVICES.slice(1);

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#F8F9FA] border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#C84B24] mb-2">
            Residential Plumbing Capabilities
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Built for East Dallas homes, from century-old crawlspaces to modern kitchens.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col md:flex-row">
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-mono text-sm font-medium text-slate-500 mb-2">
                  {featuredService.index}
                </p>
                <h3 className="font-display text-2xl font-bold text-[#0B1F3A] tracking-tight mb-3">
                  {featuredService.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {featuredService.summary}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {featuredService.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-[#C84B24] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onSelectService(featuredService.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0B1F3A] hover:bg-[#163259] rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer"
                >
                  <span>Request Gas or Historic Line Quote</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="md:w-[44%] min-h-[260px] bg-slate-100 border-t md:border-t-0 md:border-l border-slate-200 relative">
              {!imgError && featuredService.image ? (
                <img
                  src={featuredService.image}
                  alt={featuredService.imageAlt ?? featuredService.title}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-800 text-white text-center">
                  <Wrench className="w-8 h-8 mb-2 text-amber-400" aria-hidden="true" />
                  <span className="text-sm font-medium">{featuredService.title}</span>
                </div>
              )}
            </div>
          </article>

          {secondaryServices.map((service: PlumbingService) => (
            <article
              key={service.id}
              className="bg-white border border-slate-200 rounded-lg p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <p className="font-mono text-sm font-medium text-slate-500 mb-2">
                  {service.index}
                </p>
                <h3 className="font-display text-xl font-bold text-[#0B1F3A] tracking-tight mb-2.5">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {service.summary}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-[#C84B24] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectService(service.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F3A] hover:text-[#C84B24] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Schedule This Service</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

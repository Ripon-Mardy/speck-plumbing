import { useState } from 'react';
import { ArrowRight, Phone, Star, Wrench } from 'lucide-react';
import { BUSINESS_INFO, HERO_IMAGE } from '../data/speckData';

interface HeroProps {
  onScheduleClick: () => void;
}

export function Hero({ onScheduleClick }: HeroProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 mb-5">
                <span>East Dallas, TX</span>
                <span aria-hidden="true">·</span>
                <span>{BUSINESS_INFO.street}</span>
                <span aria-hidden="true">·</span>
                <span>{BUSINESS_INFO.category}</span>
              </div>

              <h1
                className="font-display font-bold text-[#0B1F3A] tracking-tight leading-[1.08] mb-5"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  textWrap: 'balance',
                }}
              >
                East Dallas Plumbing Done Right the First Time.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-[54ch] mb-8">
                From 100-year-old pier-and-beam crawlspaces and complex gas lines to
                water heater installations and kitchen hookups—Speck Plumbing shows up
                at 8:00 AM, protects your walls and floors, and gets straight to work.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#C84B24] hover:bg-[#AD3E1B] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="font-mono tabular-nums">Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>

                <button
                  type="button"
                  onClick={onScheduleClick}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Request Estimate</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#0B1F3A]">
                <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" aria-hidden="true" />
                <span className="font-mono tabular-nums">{BUSINESS_INFO.rating.toFixed(1)}</span>
                <span>({BUSINESS_INFO.reviewCount} Google reviews)</span>
              </span>
              <span aria-hidden="true" className="hidden sm:inline text-slate-300">/</span>
              <span>Opens {BUSINESS_INFO.opensAt}</span>
              <span aria-hidden="true" className="hidden sm:inline text-slate-300">/</span>
              <span>Vickery Meadow · Lakewood · Lake Highlands</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-72 sm:h-96 lg:h-full min-h-[340px] rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
              {!imgError ? (
                <img
                  src={HERO_IMAGE}
                  alt="Precision soldered copper piping and brass shutoff manifold in an East Dallas residential utility space"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-right"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0B1F3A] to-[#1E3A5F] text-white text-center">
                  <Wrench className="w-10 h-10 mb-3 text-amber-400" aria-hidden="true" />
                  <p className="font-display font-semibold text-lg">Speck Plumbing · Dallas, TX</p>
                  <p className="text-sm text-slate-300 mt-1">Residential Copper, Gas &amp; Water Heater Craft</p>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 sm:p-6">
                <p className="text-xs font-mono text-slate-200 tracking-wide">
                  6824 Walling Ln, Dallas, TX 75231 · Plus Code V785+6F
                </p>
                <p className="text-sm sm:text-base font-medium text-white mt-1">
                  “Timely arrival and they get right to work.”
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-lg divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-[#F8F9FA]">
          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-500">Customer Rating</p>
            <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B1F3A] mt-1">
              4.9 / 5.0
            </p>
            <p className="text-xs text-slate-600 mt-1">Across 14 verified reviews</p>
          </div>
          <div className="p-5 sm:p-6 border-l border-slate-200 lg:border-l-0">
            <p className="text-xs font-medium text-slate-500">Morning Dispatch</p>
            <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B1F3A] mt-1">
              8:00 AM
            </p>
            <p className="text-xs text-slate-600 mt-1">Prompt East Dallas arrival</p>
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-xs font-medium text-slate-500">Shop Location</p>
            <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B1F3A] mt-1">
              TX 75231
            </p>
            <p className="text-xs text-slate-600 mt-1">6824 Walling Ln, Dallas</p>
          </div>
          <div className="p-5 sm:p-6 border-l border-slate-200 lg:border-l-0">
            <p className="text-xs font-medium text-slate-500">Direct Dispatch Line</p>
            <p className="font-mono tabular-nums text-xl sm:text-2xl font-semibold text-[#C84B24] mt-1.5">
              214-732-4769
            </p>
            <p className="text-xs text-slate-600 mt-1.5">Speak directly with the crew</p>
          </div>
        </div>
      </div>
    </section>
  );
}

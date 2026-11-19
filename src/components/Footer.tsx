import { BUSINESS_INFO } from '../data/speckData';

export function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-slate-300 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div>
            <p className="font-display text-lg font-bold text-white tracking-tight">
              Speck Plumbing
            </p>
            <p className="text-sm text-slate-300 mt-1">
              {BUSINESS_INFO.address} ·{' '}
              <a
                href={BUSINESS_INFO.phoneHref}
                className="font-mono tabular-nums text-white hover:underline underline-offset-4"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </p>
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#neighborhood" className="hover:text-white transition-colors">
              East Dallas
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Schedule Service
            </a>
            <a
              href={BUSINESS_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Google Maps
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Speck Plumbing · Dallas, Texas</p>
          <p className="font-mono">Plus Code: {BUSINESS_INFO.plusCode}</p>
        </div>
      </div>
    </footer>
  );
}

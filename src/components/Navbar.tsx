import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onScheduleClick: () => void;
}

export function Navbar({ onScheduleClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'East Dallas', href: '#neighborhood' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F9FA]/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-[#0B1F3A] whitespace-nowrap shrink-0"
        >
          Speck Plumbing
        </a>

        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#0B1F3A] hover:underline underline-offset-4 decoration-[#C84B24] decoration-2 transition-colors whitespace-nowrap shrink-0 py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onScheduleClick();
            }}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#C84B24] hover:bg-[#AD3E1B] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Schedule Service
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-slate-200 bg-white text-[#0B1F3A] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-md"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onScheduleClick();
              }}
              className="mt-2 w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#C84B24] hover:bg-[#AD3E1B] rounded-md transition-colors cursor-pointer"
            >
              Schedule Service
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

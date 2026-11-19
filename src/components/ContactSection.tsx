import { useEffect, useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  Clock,
  Copy,
  MapPin,
  Navigation,
  Phone,
  Share2,
} from 'lucide-react';
import { BUSINESS_INFO, PLUMBING_SERVICES, WEEKLY_SCHEDULE } from '../data/speckData';

interface ContactSectionProps {
  selectedServiceId: string;
  selectedZip: string;
  onNotify: (message: string) => void;
}

type ArrivalWindow = '8am-morning' | 'same-day' | 'flexible';

interface DispatchTicket {
  reference: string;
  name: string;
  phone: string;
  zip: string;
  serviceTitle: string;
  windowLabel: string;
}

function formatUsPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function getDallasStatusLabel(): { openNow: boolean; label: string } {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    }).formatToParts(now);

    const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Monday';
    const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? '8');

    if (weekday === 'Sunday') {
      return { openNow: false, label: 'Opens Monday at 8:00 AM CT' };
    }
    if (weekday === 'Saturday') {
      if (hour >= 8 && hour < 14) return { openNow: true, label: 'Open today · Closes 2:00 PM CT' };
      if (hour < 8) return { openNow: false, label: 'Opens soon · 8:00 AM CT' };
      return { openNow: false, label: 'Opens Monday at 8:00 AM CT' };
    }
    if (hour >= 8 && hour < 18) {
      return { openNow: true, label: 'Open today · Closes 6:00 PM CT' };
    }
    if (hour < 8) {
      return { openNow: false, label: 'Opens soon · 8:00 AM CT' };
    }
    return { openNow: false, label: 'Opens tomorrow at 8:00 AM CT' };
  } catch {
    return { openNow: false, label: 'Opens at 8:00 AM CT' };
  }
}

export function ContactSection({
  selectedServiceId,
  selectedZip,
  onNotify,
}: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressOrZip, setAddressOrZip] = useState('');
  const [serviceId, setServiceId] = useState(PLUMBING_SERVICES[0].id);
  const [arrivalWindow, setArrivalWindow] = useState<ArrivalWindow>('8am-morning');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [ticket, setTicket] = useState<DispatchTicket | null>(null);

  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
    }
  }, [selectedServiceId]);

  useEffect(() => {
    if (selectedZip) {
      setAddressOrZip(`East Dallas (${selectedZip})`);
    }
  }, [selectedZip]);

  const dallasStatus = getDallasStatusLabel();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '');
    if (!name.trim()) {
      setErrorMsg('Please enter your name so our crew knows who to ask for.');
      return;
    }
    if (digits.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit US phone number.');
      return;
    }
    if (!addressOrZip.trim()) {
      setErrorMsg('Please enter your street address or Dallas ZIP code.');
      return;
    }

    const chosenService =
      PLUMBING_SERVICES.find((s) => s.id === serviceId)?.title ?? 'General Plumbing';

    const windowMap: Record<ArrivalWindow, string> = {
      '8am-morning': '8:00 AM Morning Dispatch',
      'same-day': 'Same-Day Urgent Window',
      flexible: 'Next Available Callback',
    };

    const refCode = `SPK-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicket({
      reference: refCode,
      name: name.trim(),
      phone,
      zip: addressOrZip.trim(),
      serviceTitle: chosenService,
      windowLabel: windowMap[arrivalWindow],
    });
    setErrorMsg('');
    onNotify('Service request prepared. Reference code generated.');
  };

  const handleCopyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      onNotify(`${label} copied to clipboard.`);
    } catch {
      onNotify('Unable to copy automatically.');
    }
  };

  const handleDownloadVCard = () => {
    const vcf = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Speck Plumbing',
      'ORG:Speck Plumbing',
      'TEL;TYPE=WORK,VOICE:+12147324769',
      'ADR;TYPE=WORK:;;6824 Walling Ln;Dallas;TX;75231;United States',
      'NOTE:East Dallas Residential Plumber · Plus Code V785+6F Dallas, Texas',
      'END:VCARD',
    ].join('\n');

    const blob = new Blob([vcf], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Speck-Plumbing-Dallas.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onNotify('Saved Speck Plumbing contact card (.vcf) to your device.');
  };

  const handleShareListing = async () => {
    const shareText = `${BUSINESS_INFO.name} · ${BUSINESS_INFO.phoneDisplay} · ${BUSINESS_INFO.address}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Speck Plumbing — Dallas, TX',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }
    await handleCopyText(shareText, 'Speck Plumbing contact info');
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F8F9FA]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#C84B24] mb-2">
            Dispatch &amp; Shop Information
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Book your East Dallas service call or call us direct at 8:00 AM.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8">
            {ticket ? (
              <div className="py-4">
                <div className="flex items-center gap-3 text-emerald-800 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-2xl font-bold text-[#0B1F3A]">
                    Dispatch Request Ready
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  Your service details for <strong>{ticket.serviceTitle}</strong> are
                  logged under reference{' '}
                  <span className="font-mono font-semibold text-[#0B1F3A]">
                    {ticket.reference}
                  </span>
                  . For immediate same-morning dispatch, tap below to dial our shop
                  line directly.
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-[#F8F9FA] border border-slate-200 rounded-md text-sm mb-6">
                  <div>
                    <dt className="text-xs text-slate-500">Homeowner</dt>
                    <dd className="font-medium text-[#0B1F3A] mt-0.5">{ticket.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Callback Number</dt>
                    <dd className="font-mono tabular-nums font-medium text-[#0B1F3A] mt-0.5">
                      {ticket.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Dallas Address / ZIP</dt>
                    <dd className="font-medium text-[#0B1F3A] mt-0.5">{ticket.zip}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Arrival Preference</dt>
                    <dd className="font-medium text-[#0B1F3A] mt-0.5">{ticket.windowLabel}</dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#C84B24] hover:bg-[#AD3E1B] rounded-md transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="font-mono tabular-nums">Call {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setTicket(null)}
                    className="px-4 py-3 text-sm font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
                    Request Service or Estimate
                  </h3>
                  <span className="text-xs font-mono text-slate-500">TX 75231 · Local Crew</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Guy Harris"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      US Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(formatUsPhone(e.target.value))}
                      placeholder="(214) 555-0192"
                      className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums border border-slate-300 rounded-md bg-white text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-zip" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Street Address or Dallas ZIP
                    </label>
                    <input
                      id="contact-zip"
                      type="text"
                      required
                      value={addressOrZip}
                      onChange={(e) => setAddressOrZip(e.target.value)}
                      placeholder="e.g., Lakewood · 75214"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md bg-white text-slate-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Plumbing Service Needed
                    </label>
                    <select
                      id="contact-service"
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md bg-white text-slate-900"
                    >
                      {PLUMBING_SERVICES.map((svc) => (
                        <option key={svc.id} value={svc.id}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-slate-700 mb-2">
                    Preferred Timing
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: '8am-morning' as const, label: '8:00 AM Dispatch' },
                      { id: 'same-day' as const, label: 'Same-Day Urgent' },
                      { id: 'flexible' as const, label: 'Flexible Estimate' },
                    ].map((opt) => {
                      const active = arrivalWindow === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setArrivalWindow(opt.id)}
                          className={`py-2.5 px-3 text-xs font-semibold rounded-md border transition-colors cursor-pointer whitespace-nowrap ${
                            active
                              ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-notes" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Describe the Issue (Optional)
                  </label>
                  <textarea
                    id="contact-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about your water heater, faucet cartridge, dishwasher line, or crawlspace access..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-md bg-white text-slate-900"
                  />
                </div>

                {errorMsg && (
                  <p
                    role="alert"
                    className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-md px-3.5 py-2.5"
                  >
                    {errorMsg}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-white bg-[#C84B24] hover:bg-[#AD3E1B] rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap"
                  >
                    Confirm Service Request
                  </button>
                  <span className="text-xs text-slate-500">
                    Or call{' '}
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="font-mono font-semibold text-[#0B1F3A] underline underline-offset-2"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </span>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-display text-xl font-bold text-[#0B1F3A] mb-4">
                Dallas Shop &amp; Dispatch Details
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C84B24] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#0B1F3A]">{BUSINESS_INFO.street}</p>
                    <p className="text-slate-600">{BUSINESS_INFO.cityStateZip}, United States</p>
                    <button
                      type="button"
                      onClick={() => handleCopyText(BUSINESS_INFO.plusCode, 'Plus Code')}
                      className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-[#0B1F3A] cursor-pointer"
                    >
                      <span>{BUSINESS_INFO.plusCode}</span>
                      <Copy className="w-3 h-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C84B24] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="font-mono tabular-nums font-semibold text-base text-[#0B1F3A] hover:text-[#C84B24]"
                    >
                      +1 214-732-4769
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Direct Dallas residential plumbing line
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C84B24] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#0B1F3A]">{dallasStatus.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Central Time (Dallas, TX)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-700 mb-3">Weekly Hours</p>
              <dl className="space-y-1.5 text-xs">
                {WEEKLY_SCHEDULE.map((row) => (
                  <div key={row.day} className="flex items-center justify-between gap-4 py-1">
                    <dt className="text-slate-600 font-medium">{row.day}</dt>
                    <dd className="font-mono tabular-nums text-[#0B1F3A]">{row.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="pt-5 border-t border-slate-200 grid grid-cols-3 gap-2.5">
              <a
                href={BUSINESS_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors text-center"
              >
                <Navigation className="w-4 h-4 text-[#C84B24]" aria-hidden="true" />
                <span>Directions</span>
              </a>

              <button
                type="button"
                onClick={handleDownloadVCard}
                className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors text-center cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-[#C84B24]" aria-hidden="true" />
                <span>Save Contact</span>
              </button>

              <button
                type="button"
                onClick={handleShareListing}
                className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 text-xs font-semibold text-[#0B1F3A] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors text-center cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#C84B24]" aria-hidden="true" />
                <span>Share</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

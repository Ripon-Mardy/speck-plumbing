import { useCallback, useState } from 'react';
import { ContactSection } from './components/ContactSection';
import { EastDallasHeritage } from './components/EastDallasHeritage';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ReviewsSection } from './components/ReviewsSection';
import { ServicesBento } from './components/ServicesBento';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedZip, setSelectedZip] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage((current) => (current === message ? '' : current));
    }, 3200);
  }, []);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectService = useCallback(
    (serviceId: string) => {
      setSelectedServiceId(serviceId);
      scrollToContact();
      showToast('Service selected in the estimate form below.');
    },
    [scrollToContact, showToast]
  );

  const handleSelectNeighborhood = useCallback((zip: string) => {
    setSelectedZip(zip);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900">
      <Navbar onScheduleClick={scrollToContact} />

      <main className="flex-1">
        <Hero onScheduleClick={scrollToContact} />
        <ServicesBento onSelectService={handleSelectService} />
        <EastDallasHeritage onSelectNeighborhood={handleSelectNeighborhood} />
        <ReviewsSection onNotify={showToast} />
        <ContactSection
          selectedServiceId={selectedServiceId}
          selectedZip={selectedZip}
          onNotify={showToast}
        />
      </main>

      <Footer />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 text-sm font-medium text-white bg-[#0B1F3A] border border-white/15 rounded-md shadow-lg"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}

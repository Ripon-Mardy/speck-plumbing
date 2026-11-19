export type ReviewTopic =
  | 'All'
  | 'speedy work'
  | 'responsiveness'
  | 'quality work'
  | 'punctuality'
  | 'reliability'
  | 'water heater installation'
  | 'dishwasher';

export interface BusinessInfo {
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  street: string;
  cityStateZip: string;
  plusCode: string;
  phoneDisplay: string;
  phoneHref: string;
  opensAt: string;
  mapsQueryUrl: string;
  directionsUrl: string;
}

export interface PlumbingService {
  id: string;
  index: string;
  title: string;
  summary: string;
  scope: string[];
  featured?: boolean;
  image?: string;
  imageAlt?: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  meta: string;
  timeAgo: string;
  sortOrder: number;
  rating: number;
  text: string;
  topics: ReviewTopic[];
}

export interface NeighborhoodZone {
  name: string;
  zip: string;
  notes: string;
  responseWindow: string;
}

export interface WeeklyScheduleRow {
  day: string;
  hours: string;
  isOpen: boolean;
}

export const BUSINESS_INFO: BusinessInfo = {
  name: 'Speck Plumbing',
  category: 'Licensed Residential Plumber',
  rating: 4.9,
  reviewCount: 14,
  address: '6824 Walling Ln, Dallas, TX 75231, United States',
  street: '6824 Walling Ln',
  cityStateZip: 'Dallas, TX 75231',
  plusCode: 'V785+6F Dallas, Texas, USA',
  phoneDisplay: '(214) 732-4769',
  phoneHref: 'tel:+12147324769',
  opensAt: '8:00 AM',
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=Speck+Plumbing+6824+Walling+Ln+Dallas+TX+75231',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=6824+Walling+Ln,+Dallas,+TX+75231',
};

export const HERO_IMAGE = '/src/assets/images/hero_craftsman_plumbing_1795096604689.jpg';
export const EAST_DALLAS_IMAGE = '/src/assets/images/east_dallas_craftsman_1795096604294.jpg';
export const WATER_HEATER_IMAGE = '/src/assets/images/water_heater_service_1795096604541.jpg';

export const PLUMBING_SERVICES: PlumbingService[] = [
  {
    id: 'gas-lines-historic',
    index: '01.',
    title: 'Complex Gas Lines & Historic Homes',
    summary:
      'Specialized diagnostics and routing for 50-to-100-year-old East Dallas residences. Tight crawlspace access and creative routing engineered to protect original hardwood floors and plaster walls.',
    scope: [
      'Gas line leak detection & pressure testing',
      'Minimal-intrusion crawlspace repiping',
      'Pier-and-beam cast iron & galvanized upgrades',
    ],
    featured: true,
    image: WATER_HEATER_IMAGE,
    imageAlt: 'Clean copper piping and residential water heater manifold installed by Speck Plumbing',
  },
  {
    id: 'water-heater-installation',
    index: '02.',
    title: 'Water Heater Installation',
    summary:
      'Code-compliant tank and tankless water heater replacements with clean copper soldering, thermal expansion tanks, and pan drain lines.',
    scope: [
      'Gas & electric tank installations',
      'Pressure relief & shutoff valve upgrades',
      'Same-day haul-away & startup testing',
    ],
  },
  {
    id: 'dishwasher-kitchen',
    index: '03.',
    title: 'Dishwasher & Kitchen Hookups',
    summary:
      'Leak-free supply lines, high-loop drain routing, garbage disposals, and under-sink angle stop replacements done in a single visit.',
    scope: [
      'Dishwasher supply & drain connections',
      'Quarter-turn brass angle stop swaps',
      'Kitchen sink & disposal installations',
    ],
  },
  {
    id: 'faucet-cartridge',
    index: '04.',
    title: 'Faucet Cartridge & Fixture Repair',
    summary:
      'Prompt, tidy repair for dripping single-handle mixers, worn shower cartridges, running toilets, and outdoor hose bibbs.',
    scope: [
      'Faucet cartridge & valve stem replacement',
      'Shower mixing valve calibration',
      'Clean work area & full leak verification',
    ],
  },
  {
    id: 'general-diagnostics',
    index: '05.',
    title: 'Fast Residential Troubleshooting',
    summary:
      'Direct owner-grade troubleshooting for repeat homeowner issues—arriving on time at 8 AM and getting straight to work.',
    scope: [
      'Main shutoff & pressure regulator checks',
      'Drain clearing & trap replacements',
      'New-homeowner plumbing inspections',
    ],
  },
];

export const RATING_BREAKDOWN = [
  { stars: 5, count: 13, percent: 93 },
  { stars: 4, count: 1, percent: 7 },
  { stars: 3, count: 0, percent: 0 },
  { stars: 2, count: 0, percent: 0 },
  { stars: 1, count: 0, percent: 0 },
];

export const REVIEW_TOPICS: { label: ReviewTopic; count: number }[] = [
  { label: 'All', count: 14 },
  { label: 'speedy work', count: 3 },
  { label: 'responsiveness', count: 2 },
  { label: 'quality work', count: 2 },
  { label: 'punctuality', count: 2 },
  { label: 'reliability', count: 2 },
  { label: 'water heater installation', count: 2 },
  { label: 'dishwasher', count: 2 },
];

export const HIGHLIGHTED_SNIPPETS: string[] = [
  'Speck plumbing did a great job and we highly recommend their service.',
  'However, I can’t help but give kudos to this crew.',
  'Timely arrival and they get right to work.',
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'guy-harris',
    author: 'Guy Harris',
    meta: '6 reviews',
    timeAgo: '4 months ago',
    sortOrder: 1,
    rating: 5,
    text: 'We moved house about a year ago. We have had three plumbing problems since then. Each time we have called Speck Plumbing and each time they have provided excellent, fast service with dependable responsiveness and clean results.',
    topics: ['All', 'speedy work', 'responsiveness', 'reliability', 'punctuality'],
  },
  {
    id: 'kyle-scanlan',
    author: 'Kyle Scanlan',
    meta: '3 reviews',
    timeAgo: 'a year ago',
    sortOrder: 2,
    rating: 5,
    text: 'I almost hate to give a review as I would like to keep Speck as a hidden secret. However, I can’t help but give kudos to this crew. This team did efficient work and accomplished everything I asked including faucet cartridge replacement, dishwasher hookup, and water heater checks.',
    topics: ['All', 'speedy work', 'quality work', 'dishwasher', 'water heater installation'],
  },
  {
    id: 'matthew-harris',
    author: 'Matthew Harris',
    meta: 'Local Guide · 55 reviews · 14 photos',
    timeAgo: 'a year ago',
    sortOrder: 3,
    rating: 5,
    text: 'These are the premier go-to plumbers in east Dallas. They are very familiar with the types of homes in the area as they have been servicing the neighborhood for a very long time. Was able to solve a complex gas line issue for our 100 year old house that involved some tight crawlspaces and creativity to avoid opening walls or floors.',
    topics: ['All', 'quality work', 'reliability', 'responsiveness', 'punctuality'],
  },
  {
    id: 'east-dallas-homeowner-wh',
    author: 'Verified East Dallas Homeowner',
    meta: 'Google Review Summary',
    timeAgo: 'Verified customer quote',
    sortOrder: 4,
    rating: 5,
    text: 'Speck plumbing did a great job and we highly recommend their service. Timely arrival and they get right to work — handled our water heater installation and dishwasher connection quickly without cutting corners.',
    topics: ['All', 'speedy work', 'water heater installation', 'dishwasher'],
  },
];

export const NEIGHBORHOOD_ZONES: NeighborhoodZone[] = [
  {
    name: 'Vickery Meadow & Walling Ln',
    zip: '75231',
    notes: 'Home dispatch yard on Walling Ln — fastest morning arrival.',
    responseWindow: '10–20 min dispatch',
  },
  {
    name: 'Lake Highlands',
    zip: '75238 / 75243',
    notes: 'Slab & pier-and-beam mid-century homes, water heaters, and supply lines.',
    responseWindow: '15–25 min dispatch',
  },
  {
    name: 'Lakewood & White Rock',
    zip: '75214',
    notes: '1920s–1940s Craftsman homes, tight crawlspaces, and gas line routing.',
    responseWindow: '15–30 min dispatch',
  },
  {
    name: 'M Streets & Lower Greenville',
    zip: '75206',
    notes: 'Historic Tudor & bungalow fixture repairs without wall demolition.',
    responseWindow: '20–30 min dispatch',
  },
];

export const WEEKLY_SCHEDULE: WeeklyScheduleRow[] = [
  { day: 'Monday', hours: '8:00 AM – 6:00 PM', isOpen: true },
  { day: 'Tuesday', hours: '8:00 AM – 6:00 PM', isOpen: true },
  { day: 'Wednesday', hours: '8:00 AM – 6:00 PM', isOpen: true },
  { day: 'Thursday', hours: '8:00 AM – 6:00 PM', isOpen: true },
  { day: 'Friday', hours: '8:00 AM – 6:00 PM', isOpen: true },
  { day: 'Saturday', hours: '8:00 AM – 2:00 PM', isOpen: true },
  { day: 'Sunday', hours: 'Emergency Callbacks', isOpen: false },
];

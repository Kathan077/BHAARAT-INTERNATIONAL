import { 
  Shield, 
  ShieldCheck, 
  User, 
  Footprints, 
  Layers, 
  Activity, 
  HeartPulse, 
  Sparkles 
} from 'lucide-react';

export const productCategories = [
  {
    id: 'gown-set-contents',
    title: 'Gown Set Contents',
    icon: Layers,
    items: [
      'Wraparound Surgical Gown Level 3 & Set',
      'Reinforced Level 3 & 4 Surgical Gown & Set',
      'Breathable Viral Barrier BVB Surgical Gown & Set',
      'Eco Viral Barrier Gown & Set',
      'SSMMS + Poly Coated Breathable Gown & Set',
      'Non Woven + Poly Coated Breathable Gown & Set',
      'Basic SMS Surgical Gown & Set'
    ]
  },
  {
    id: 'disposable-3-ply-face-mask',
    title: 'DISPOSABLE 3 PLY FACE MASK',
    icon: Shield,
    items: ['Elastic Mask', 'B/W Mask', 'IIR Mask', 'Kids Mask', 'Tie-On Mask', 'Pull Out Mask']
  },
  {
    id: 'respiratory-disposable-face-mask',
    title: 'RESPIRATORY DISPOSABLE FACE MASK',
    icon: ShieldCheck,
    items: ['N95 Ear Loop', 'N95 Head Loop', 'KF 94 Mask', 'Dusk Mask', 'Kids N95 Mask', 'Cup Mask']
  },
  {
    id: 'disposable-head-cap',
    title: 'DISPOSABLE HEAD CAP',
    icon: User,
    items: ['Bouffant Cap', 'Surgeon Cap', 'Beard Cap', 'Chef Cap', 'Hood Cap', 'Shower Cap', 'Ear Cap', 'Customize Cap', 'Nylon Cap']
  },
  {
    id: 'disposable-shoe-cover',
    title: 'DISPOSABLE SHOE COVER',
    icon: Footprints,
    items: ['Non-Woven Shoe Covers', 'Plastic Shoe Covers', 'Knee-Length Shoe Covers']
  },
  {
    id: 'disposable-hand-gloves-sleeve',
    title: 'DISPOSABLE HAND GLOVES / SLEEVE',
    icon: Footprints,
    items: ['Latex Gloves', 'Nitrile Gloves', 'Surgical Gloves', 'Plastic Gloves', 'Veterinary Gloves', 'Hand Sleeves']
  },
  {
    id: 'disposable-apron-sterile',
    title: 'DISPOSABLE APRON (STERILE)',
    icon: Layers,
    items: ['Sterile Non-Woven Apron', 'Sterile PE Apron']
  },
  {
    id: 'disposable-apron-non-sterile',
    title: 'DISPOSABLE APRON (NON-STERILE)',
    icon: Layers,
    items: ['Non-Sterile Non-Woven Apron', 'Non-Sterile PE Apron']
  },
  {
    id: 'disposable-plain-sheet-bed-sheet',
    title: 'DISPOSABLE PLAIN SHEET / BED SHEET',
    icon: Activity,
    items: ['Non-Woven Bed Sheet', 'Plastic Bed Sheet', 'Bed Roll']
  },
  {
    id: 'disposable-apparel',
    title: 'DISPOSABLE APPAREL',
    icon: User,
    items: ['Lab Coat', 'Coverall', 'Scrub Suit', 'Shorts', 'Protective Gown', 'Dead Body Cover']
  },
  {
    id: 'health-hygiene-products',
    title: 'HEALTH & HYGIENE PRODUCTS',
    icon: HeartPulse,
    items: ['Underpads', 'Sweat Pads', 'Cooling Gel Sheet', 'Prep Razor']
  },
  {
    id: 'salon-and-spa-disposable-products',
    title: 'SALON AND SPA DISPOSABLE PRODUCTS',
    icon: Sparkles,
    items: ['Salon Apron', 'Spa Gown', 'Wax Strips', 'Bed Sheet', 'Wrap', 'Non-Woven Brief', 'Spun Lace Brief', 'Disposable Napkin', 'Disposable Towel', 'Head Bands']
  },
  {
    id: 'surgical-gowns',
    title: 'SURGICAL GOWNS',
    icon: Layers,
    items: [
      'Wraparound Surgical Gown',
      'Reinforced Surgical Gown',
      'Breathable Viral Barrier Gown',
      'Isolation Gown',
      'Basic Surgical Gown',
      'Cathlab Surgical Gown',
      'Patient Gown',
      'Full Gown Set (HIV Kit)'
    ]
  },
  {
    id: 'orthopaedic',
    title: 'ORTHOPAEDIC',
    icon: Activity,
    items: [
      'Hip U Drape',
      'Knee O Drape',
      'Bilateral Knee O Drape',
      'Spinal Drape',
      'Elbow O Drape',
      'Shoulder U',
      'Knee Arthroscopy Drape',
      'Orthopaedic Kits & Packs'
    ]
  },
  {
    id: 'cardiology',
    title: 'CARDIOLOGY',
    icon: HeartPulse,
    items: [
      'Angiography Drape',
      'Angioplasty Drape',
      'Cardiothoracic Drape',
      'Cardiology Kits & Packs'
    ]
  },
  {
    id: 'gynecology',
    title: 'GYNECOLOGY',
    icon: Layers,
    items: [
      'Full Gynec Drape',
      'Caesarean Drape',
      'Laparoscopy Drape',
      'O Hole Drape',
      'Gynecology Kits & Packs'
    ]
  },
  {
    id: 'urology',
    title: 'UROLOGY',
    icon: Activity,
    items: [
      'Turp Drape',
      'Pcnl Drape',
      'Major Drape',
      'O Hole Drape (Urology)',
      'Urology Kits & Packs'
    ]
  },
  {
    id: 'ophthalmology',
    title: 'OPHTHALMOLOGY',
    icon: Sparkles,
    items: [
      'Eye Drape',
      'Eye Drape Premium',
      'Poly Eye Drape',
      'Ophthalmic Kits & Packs'
    ]
  },
  {
    id: 'accessories-and-other-protectives',
    title: 'ACCESSORIES AND OTHER PROTECTIVES',
    icon: Shield,
    items: [
      'Plain Drape Sheet',
      'Adhesive Drape Sheet',
      'Steri Wrap Sheet',
      'Video Camera / Cable Drape',
      'Mayo Trolley Cover',
      'Dead Body Cover',
      'Protective Goggles',
      'Face Shield'
    ]
  },
  {
    id: 'diagnostic-kits',
    title: 'DIAGNOSTIC KITS',
    icon: Activity,
    items: [
      'Dengue NS1 Rapid Antigen Test Device',
      'Dengue IgG/IgM Rapid Test Device',
      'Malaria Pf/Pv Rapid Diagnostic Test Device',
      'Malaria Pf/Pan Antigen Rapid Test Device',
      'Typhi IgG/IgM Rapid Test Device',
      'Leptospira IgG/IgM Rapid Test Device',
      'HIV 1/2 Antibody Detection Rapid Test Device',
      'HCV Antibody Detection Test Device',
      'Troponin I Test Device',
      'Syphilis Antibody Detection Test Device',
      'HBV Antigen Detection Test Device'
    ]
  },
  {
    id: 'elisa-kits',
    title: 'ELISA KITS',
    icon: Sparkles,
    items: [
      'HIV ELISA',
      'HBV ELISA',
      'HCV ELISA',
      'Dengue NS1 ELISA',
      'HIV Tridot'
    ]
  }
];

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { 
    name: 'Products', 
    path: '/products',
    isMega: true,
    categories: productCategories
  },
  { name: 'Support', path: '/support' },
];

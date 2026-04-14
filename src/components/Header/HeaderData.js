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
    id: 'ply-face-mask',
    title: 'Ply Face Mask',
    icon: Shield,
    items: ['Elastic Mask', 'B/W Mask', 'IIR Mask', 'Kids Mask', 'Tie-On Mask', 'Pull Out Mask']
  },
  {
    id: 'disposable-face-mask',
    title: 'Disposable Face Mask',
    icon: ShieldCheck,
    items: ['N95 Ear Loop', 'N95 Head Loop', 'KF 94 Mask', 'Dust Mask', 'Kids N95 Mask', 'Cup Mask']
  },
  {
    id: 'head-cap',
    title: 'Head Cap',
    icon: User,
    items: ['Examination Lights', 'Bouffant Cap', 'Surgeon Cap', 'Beard Cap', 'Chef Cap', 'Hood Cap', 'Shower Cap', 'Ear Cap', 'Customize Cap', 'Nylon Cap']
  },
  {
    id: 'shoe-cover-gloves',
    title: 'Shoe Cover & Gloves',
    icon: Footprints,
    items: ['Disposable Shoe Covers', 'Plastic Shoe Covers', 'Knee-Length Shoe Covers', 'Latex Gloves', 'Nitrile Gloves', 'Surgical Gloves', 'Plastic Gloves', 'Veterinary Gloves', 'Hand Sleeves']
  },
  {
    id: 'disposable-apron',
    title: 'Disposable Apron',
    icon: Layers,
    items: ['Plastic', 'NON WOVEN']
  },
  {
    id: 'disposable-plain-sheet',
    title: 'Disposable Plain Sheet / Bed Sheet',
    icon: Activity,
    items: ['Lab Coat', 'Coverall', 'Dead Body Cover', 'Non-Woven Bed Sheet', 'Plastic Bed Sheet', 'Bed Rol', 'Scrub Suit', 'Shorts', 'Protective Gown']
  },
  {
    id: 'health-hygine',
    title: 'Health & Hygiene',
    icon: HeartPulse,
    items: ['Underpads']
  },
  {
    id: 'salon-spa',
    title: 'Salon & Spa',
    icon: Sparkles,
    items: ['Salon Apron', 'Spa Gown', 'Wax Strips', 'Bed Sheet', 'Wrap', 'Non-Woven Brief', 'Spun Lace Brief', 'Disposable Napkin', 'Disposable Towel', 'Head Bands']
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
  { name: 'Support', path: '/Support' },
];

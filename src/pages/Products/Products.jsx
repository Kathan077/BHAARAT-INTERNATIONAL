import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  User,
  Footprints,
  Layers,
  Activity,
  HeartPulse,
  Sparkles,
  Download,
  FileText,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

import SEO from '../../components/SEO/SEO';
import './Products.css';
import cataloguePdf from '../../assets/Bhaarat [Recovered] (2).pdf';
import dengueBroucherPdf from '../../assets/Dengue-Broucher-1.pdf';

// Import local images
import faceMaskImg from './img/face mask.png';
import disposableFaceMaskImg from './img/disposable-face-mask (1).jpg';
import headCapImg from './img/head cap.jpeg';
import shoesGlovesImg from './img/shoes and gloves.png';
import apronImg from './img/disposable apron.jpeg';
import sheetImg from './img/plain and bed sheet.png';
import hygieneImg from './img/prep pazor.png';
import salonImg from './img/salon and sap.png';

// --- TECHNICAL SPECS FROM BROCHURE ---
const productDetails = {
  // Gown Set Contents
  'surgical-gown': {
    hsn: '62104070',
    specs: {
      Material: 'SSMMS water repellent or poly coated',
      GSM: '43-50 GSM',
      Sterility: 'ETO Sterile Package',
      Features: 'Ultrasonic seam sealing, water repellent'
    },
    description: 'High-protection surgical gown designed for medical staff during clinical operations. Provides excellent fluid barrier and comfort.'
  },
  'hand-towels': {
    hsn: '62104070',
    specs: {
      Material: 'Soft non-woven absorbent fabric',
      Quantity: '2 pieces per pack',
      Sterility: 'Sterile package'
    },
    description: 'High-absorbency surgical hand towels included in gown sets for sterile hand drying.'
  },
  // 3-Ply Face Mask
  'elastic-mask': {
    hsn: '63079091',
    specs: {
      'Available Colors': 'Blue, Green, White, Black, Pink',
      Filter: 'With or Without Meltblown',
      GSM: '65 to 85 GSM',
      Packaging: 'Bulk or Individual Pack, Box/Poly Bag Pack'
    },
    description: 'Standard 3-ply protective face mask with soft elastic earloops for daily protection.'
  },
  'kids-mask': {
    hsn: '63079091',
    specs: {
      Style: 'Plain or Printed patterns',
      Filter: 'With or Without Meltblown',
      GSM: 'Greater than 75 GSM',
      Packaging: '50 Pcs/Pack or 10 Pcs/Zipper Pouch'
    },
    description: 'Comfortable, size-adjusted protective face masks designed specifically for children.'
  },
  'b-w-mask': {
    hsn: '63079091',
    specs: {
      Type: 'Elastic Type',
      Filter: 'With Meltblown',
      GSM: 'Greater than 100 GSM',
      Packaging: 'Box/Poly Bag Pack with Quality Tag/Brand Print Bag'
    },
    description: 'Premium black and white face masks providing enhanced double-sided filtration.'
  },
  'tie-on-mask': {
    hsn: '63079091',
    specs: {
      'Available Colors': 'Blue, Green, White',
      Filter: 'With or Without Meltblown',
      GSM: '65 to 85 GSM',
      Packaging: 'Bulk or Individual Pack, Box/Poly Bag Pack'
    },
    description: 'Traditional surgical-style face mask with secure tie-on straps for adjustable fit.'
  },
  'iir-mask': {
    hsn: '63079091',
    specs: {
      Type: 'Elastic Type',
      Filter: 'With Meltblown',
      GSM: 'Greater than 80 GSM',
      Features: 'Broad elastic for better comfort',
      Packaging: '50 Pcs/Box Pack'
    },
    description: 'Type IIR fluid-resistant medical masks offering high splash protection and bacterial filtration.'
  },
  'pull-out-mask': {
    hsn: '63079091',
    specs: {
      Loop: 'Soft Loop',
      Filter: 'With or Without Meltblown',
      GSM: 'Greater than 75 GSM',
      Features: 'Broad elastic for better comfort',
      Packaging: '50 Pcs or 100 Pcs/Pack'
    },
    description: 'Convenient pull-out box packaging containing soft loop surgical masks for quick dispensing.'
  },
  // N95 / Respiratory Masks
  'n95-ear-loop': {
    hsn: '63079091',
    specs: {
      Layers: '5 Layer with Meltblown',
      GSM: 'Greater than 125 GSM',
      'Available Colors': 'Grey, White, Black',
      Packaging: 'Bulk or Individual Pack, Box/Poly Bag Pack'
    },
    description: 'High-protection N95 respirator mask with comfortable ear loops, filtering at least 95% of airborne particles.'
  },
  'dusk-mask': {
    hsn: '63079090',
    specs: {
      Type: 'Head Loop',
      Layers: '3 Layer with Foam nose pad',
      GSM: 'Greater than 120 GSM',
      'Available Colors': 'Yellow',
      Packaging: 'Bulk Pack Only (5000 Pcs/parcel)'
    },
    description: 'Durable yellow dust protection mask with dual head straps and inner foam comfort lining.'
  },
  'n95-head-loop': {
    hsn: '63079091',
    specs: {
      Layers: '5 Layer with Meltblown',
      GSM: 'Greater than 125 GSM',
      'Available Colors': 'Grey, White, Black',
      Packaging: 'Bulk or Individual Pack, Box/Poly Bag Pack'
    },
    description: 'Standard N95 respirator mask utilizing dual head loops for a tight facial seal and pressure reduction on ears.'
  },
  'kids-n95-mask': {
    hsn: '63079091',
    specs: {
      Style: 'Multi Color / Printed designs',
      Type: 'Ear loop Type (Printed/Plain)',
      Filter: 'With Meltblown core',
      GSM: 'Greater than 100 GSM',
      Packaging: 'Branded Packing, Box/Poly Bag Pack'
    },
    description: 'N95 respirator custom-scaled for children, featuring fun prints and reliable multi-layer protection.'
  },
  'kf-94-mask': {
    hsn: '63079091',
    specs: {
      Layers: '5 Layer with Meltblown',
      GSM: 'Greater than 125 GSM',
      'Available Colors': 'Grey, White, Black',
      Packaging: 'Bulk or 10 Pcs/Pouch, Poly Bag Pack'
    },
    description: 'Korean-style KF94 ergonomic face mask offering 3D ventilation space and high filtration.'
  },
  'cup-mask': {
    hsn: '63079091',
    specs: {
      Type: 'Head Loop Type',
      Filter: 'With Meltblown',
      GSM: 'Greater than 250 GSM',
      Features: 'Broad elastic for better comfort, cup-shaped structural integrity',
      Packaging: '50 Pcs/Box Pack'
    },
    description: 'Cone-shaped cup mask providing solid structure that stays off the lips, ideal for industrial work.'
  },
  // Head Caps
  'bouffant-cap': {
    hsn: '62101010',
    specs: {
      'Available Colors': 'Blue, Green, White, Black',
      Size: '16, 18, 21 inches available',
      GSM: '8 or 10 GSM spunbond material',
      Packaging: 'Branded Packing available'
    },
    description: 'Lightweight and breathable round bouffant cap with elastic band to fully enclose hair.'
  },
  'chef-cap': {
    hsn: '65050090',
    specs: {
      'Available Colors': 'White',
      Material: 'Non-Woven Paper',
      Style: 'Plain or Printed pleated top',
      GSM: 'Greater than 25 GSM',
      Packaging: '50 Pcs/Pack'
    },
    description: 'Professional high-top chef hat made from non-woven paper to absorb moisture and ensure kitchen hygiene.'
  },
  'surgeon-cap': {
    hsn: '62101010',
    specs: {
      'Available Colors': 'Blue',
      Material: 'PP Spun Bond Material',
      Type: 'Elastic Type or Tie-back',
      GSM: '20, 25, or 30 GSM',
      Packaging: 'Brand Print Bag, Box/Poly Bag Pack'
    },
    description: 'Traditional surgical head cover designed to sit snugly on the head during operating room procedures.'
  },
  'hood-cap': {
    hsn: '62101010',
    specs: {
      Customization: '100% Customize Products',
      Note: 'Manufactured only upon sample/specification provided by client'
    },
    description: 'Balaclava-style full hood head cap covering the head, neck, and shoulders for high-level cleanrooms.'
  },
  'beard-cap': {
    hsn: '62101010',
    specs: {
      'Available Colors': 'Blue, White',
      Material: 'PP Spun Bond Material',
      Loop: 'Elastic Head Loop',
      GSM: '10 or 15 GSM',
      Packaging: 'Brand Print Bag, Box/Poly Bag Pack'
    },
    description: 'Disposable single-loop beard net designed to prevent facial hair shedding in food processing and labs.'
  },
  'shower-cap': {
    hsn: '39233090',
    specs: {
      Material: 'LDPE Material',
      Color: 'Transparent or Blue',
      Size: 'Standard Size',
      Gauge: 'High Gauge film',
      Packaging: '100 Pcs/bag'
    },
    description: 'Waterproof elasticized LDPE shower cap designed to keep hair completely dry.'
  },
  'ear-cap': {
    hsn: '39231090',
    specs: {
      Color: 'Transparent',
      Material: 'LDPE Material',
      Packaging: '100 Pcs/Bag'
    },
    description: 'Mini transparent elasticized covers to protect ears from water, hair dye, or chemicals.'
  },
  'customize-cap': {
    hsn: '62101010',
    specs: {
      Customization: '100% Customize Products',
      Note: 'Manufactured upon sample/specification provided by client'
    },
    description: 'Tailor-made protective headwear manufactured according to client-provided design parameters.'
  },
  'nylon-cap': {
    hsn: '54071095',
    specs: {
      Material: 'Nylon Fabric mesh',
      Style: 'Reusable Cap (Double Net Cap option)',
      Note: 'Made on Client Request with Multi Color options'
    },
    description: 'Soft, reusable, double-net mesh hair cover constructed from lightweight nylon fibers.'
  },
  // Shoe Covers
  'disposable-shoe-covers': {
    hsn: '63079091',
    specs: {
      'Available Colors': 'Blue, White',
      Material: 'Non Woven',
      GSM: '25, 40, or 50 GSM',
      Packaging: '50 Pair/bag, 2500 Pair/Parcel, Branded Packing Available',
      Certifications: 'ISO and CE Certified'
    },
    description: 'Anti-skid non-woven protective boot covers with secure elastic ankles.'
  },
  'plastic-shoe-covers': {
    hsn: '39269099',
    specs: {
      Material: 'Pure Virgin LDPE Material',
      Size: 'Standard Size',
      Gauge: '65 or 90 Gauge',
      Packaging: '50 Pair/Bag, Branded Packing Available'
    },
    description: '100% waterproof heavy-gauge virgin plastic shoe covers, ideal for wet work environments.'
  },
  'knee-length-shoe-covers': {
    hsn: '63079090',
    specs: {
      Customization: '100% Customize Products',
      Note: 'Manufactured only upon sample or specification provided by client'
    },
    description: 'Extended knee-high leg and shoe protectors designed for agricultural, veterinary, or fluid-heavy environments.'
  },
  // Gloves & Sleeves
  'latex-gloves': {
    hsn: '40151200',
    specs: {
      Style: 'Powdered white',
      Size: 'S, M, L available',
      Packaging: '100 Pcs/Bag or Box, 40 Boxes/Carton',
      Sterility: 'Non-Sterile'
    },
    description: 'Natural rubber latex examination gloves providing outstanding tactile sensitivity and barrier protection.'
  },
  'nitrile-gloves': {
    hsn: '40151900',
    specs: {
      Style: 'Pow-Free Blue',
      Size: 'S, M, L available',
      Packaging: '100 Pcs/Bag or Box, 40 Boxes/Carton',
      Sterility: 'Non-Sterile'
    },
    description: 'Allergen-free, synthetic blue nitrile gloves with high puncture and chemical resistance.'
  },
  'surgical-gloves': {
    hsn: '40151900',
    specs: {
      Style: 'Powdered or Powder-Free',
      Size: '6.0, 6.5, 7.0, 7.5, 8.0',
      Packaging: '50 Pairs/Box, 500 Pairs/Carton',
      Sterility: 'ETO Sterile'
    },
    description: 'Premium surgical gloves designed with ergonomic fit and micro-textured grip for operating rooms.'
  },
  'plastic-gloves': {
    hsn: '39269099',
    specs: {
      Material: 'HM Material',
      Size: '11, 12, 14 inches',
      Gauge: '35, 45, 65, 100 Gauge',
      Packaging: '100 Pcs/Bag'
    },
    description: 'Lightweight poly gloves for basic hygiene protection, food handling, or cosmetic styling.'
  },
  'veterinary-gloves': {
    hsn: '39269099',
    specs: {
      Length: 'Extended arm-length sleeve',
      Customization: '100% Customize Products',
      Note: 'Manufactured only upon specification provided by client'
    },
    description: 'Shoulder-length disposable gloves designed for veterinary examinations and artificial insemination.'
  },
  'hand-sleeves': {
    hsn: '62104090',
    specs: {
      Material: 'LDPE (100 Gauge) or Non Woven (25 GSM)',
      Size: '20 x 45 cm',
      Color: 'Blue or White options'
    },
    description: 'Protective arm sleeve covers with elastic cuffs to shield forearms from dirt and splashes.'
  },
  // Aprons
  'sterile-non-woven-apron': {
    hsn: '62101000',
    specs: {
      Material: 'Non-Woven Fabric',
      Sterility: 'ETO Sterile',
      GSM: '40 GSM standard',
      Packaging: 'Individual sterile peel pouch'
    },
    description: 'Sterile protective non-woven aprons offering reliable front-body splash barrier.'
  },
  'sterile-pe-apron': {
    hsn: '39231020',
    specs: {
      Material: 'PLDPE / HM Plastic Material',
      Sterility: 'ETO Sterile',
      Size: '31 x 51 inches',
      Gauge: '75 to 140 Gauge'
    },
    description: 'ETO sterilized waterproof polyethylene aprons for surgical support.'
  },
  'non-sterile-non-woven-apron': {
    hsn: '62101000',
    specs: {
      Material: 'Non-Woven Fabric',
      GSM: '40 GSM standard',
      Packaging: 'Bulk Pack'
    },
    description: 'Daily-use disposable non-woven aprons for general protection, lab testing, or kitchen service.'
  },
  'non-sterile-pe-apron': {
    hsn: '39231020',
    specs: {
      Material: 'PLDPE / HM Plastic Material',
      Size: '31 x 51 inches',
      Gauge: '75 to 140 Gauge',
      Packaging: 'Bulk Pack'
    },
    description: 'Bulk packed water-resistant polyethylene aprons for food hygiene, styling, or industrial tasks.'
  },
  // Sheets
  'non-woven-bed-sheet': {
    hsn: '56031100',
    specs: {
      Material: 'Non Woven / SMS',
      Size: 'Width (32 to 63 inches) x Length (Any)',
      GSM: '15, 25, 35, 40 GSM',
      'Available Colors': 'Blue, White'
    },
    description: 'Breathable, hygienic non-woven bed sheets designed for patient comfort on clinic stretchers.'
  },
  'plastic-bed-sheet': {
    hsn: '39269099',
    specs: {
      Material: 'LDPE Material',
      Size: '120x210 cm, 120x150 cm',
      Gauge: '75 to 140 Gauge',
      Color: 'Blue',
      Sterility: 'Sterile/Non-Sterile options'
    },
    description: '100% leak-proof LDPE plastic bed covers to protect medical mattresses from staining.'
  },
  'bed-roll': {
    hsn: '90189099',
    specs: {
      Style: 'Perforated roll layout',
      Customization: '100% Customize Products',
      Note: 'Manufactured upon specification by client'
    },
    description: 'Hygienic examination table paper rolls for quick tear-off and replacement.'
  },
  // Apparel
  'lab-coat': {
    hsn: '62113919',
    specs: {
      Size: '110 x 150 cm',
      GSM: '25 to 40 GSM',
      Style: 'With Collar & Snap button, elastic or rib on sleeve',
      Packaging: 'Individual Pack',
      'Available Colors': 'Blue, White'
    },
    description: 'Disposable long-sleeve doctor and lab coat with secure snap buttons and elastic cuffs.'
  },
  'coverall': {
    hsn: '62101000',
    specs: {
      Material: 'PP or SMS Material (Laminated/Breathable)',
      Style: 'With Zipper, Hood, and Attached Shoe Cover option',
      Packaging: 'Individual Pack'
    },
    description: 'Full body protective boiler suit offering heavy particulate and liquid splash resistance.'
  },
  'scrub-suit': {
    hsn: '62104070',
    specs: {
      Customization: '100% Customize Products',
      Style: 'Short-sleeve top and elastic waist pants',
      Note: 'Manufactured upon specification provided by client'
    },
    description: 'Disposable patient and surgeon scrub suit designed for maximum hygiene in wards.'
  },
  'shorts': {
    hsn: '62102090',
    specs: {
      Customization: '100% Customize Products',
      Style: 'Comfortable elastic waistband',
      Note: 'Manufactured upon specification provided by client'
    },
    description: 'Disposable patient shorts for medical tests, colonoscopy, or spa procedures.'
  },
  'protective-gown': {
    hsn: '62104070',
    specs: {
      Material: 'PP or SMS Material',
      GSM: '25 to 55 GSM',
      Style: 'Laminated / Breathable',
      Sterility: 'Sterile / Non-Sterile options',
      Packaging: 'Bulk or Individual Pack'
    },
    description: 'Multi-purpose splash-resistant isolation gown with back-ties.'
  },
  // Health & Hygiene
  'underpads': {
    hsn: '96190010',
    specs: {
      Layers: '5 Layer Premium Quality',
      Features: '4 Corner Adhesive tape to hold in place',
      Color: 'Blue backing',
      Size: '60 x 90 cm',
      Packaging: '10 Pcs/Pkt, 200 Pcs/Carton'
    },
    description: 'Super-absorbent leak-proof mattress pads with sticky corner tabs for secure bedding protection.'
  },
  // Salon
  'salon-apron': {
    hsn: '62101000',
    specs: {
      Material: 'PP Spun Bond Fabric',
      GSM: '20 GSM',
      Size: '63 x 37 inches',
      Packaging: '20 Pcs/Pack, Poly Bag Pack'
    },
    description: 'Disposable barber and stylist aprons protecting client clothes from hair clippings.'
  },
  'spa-gown': {
    hsn: '62101000',
    specs: {
      Material: 'PP Spun Bond Fabric',
      GSM: '25 GSM',
      Size: '63 x 35 inches',
      Packaging: '15 Pcs/Pack, Poly Bag Pack'
    },
    description: 'Comfortable wraps designed for patients and clients undergoing spa treatments.'
  },
  'wax-strips': {
    hsn: '62101000',
    specs: {
      Material: 'PP Spun Bond heavy non-woven',
      GSM: '90 to 120 GSM',
      Size: '4 x 10.50 inches',
      Packaging: '80, 90, or 100 Pcs/Pack, Poly Bag Pack'
    },
    description: 'Thick, non-tearable professional waxing strips for hair removal.'
  },
  // Surgical Gowns
  'standard-surgical-gown': {
    hsn: '62101000',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Protection: 'AAMI Level 3 protection',
      Features: 'Breathable and Comfortable, Conveniently folded'
    },
    description: 'Premium AAMI Level 3 sterile surgical gown offering comfort and reliable protection.'
  },
  'reinforced-surgical-gown': {
    hsn: '62101000',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Protection: 'AAMI Level 4 protection on critical zones',
      Features: 'Reinforced layer on chest and forearms'
    },
    description: 'Heavy-duty surgical gown with extra fluid-barrier reinforcement in high-contact areas.'
  },
  // Diagnostic Kits
  'dengue-ns1-rapid-antigen-test-device': {
    hsn: '38229090',
    specs: {
      'Product Name': 'Dengue NS1 Rapid Antigen Test Device',
      'Intended Use': 'Detection of Dengue virus NS1 antigen',
      'Specimen Type': 'Serum, Plasma or Whole Blood',
      'Specimen Volume': '2 drops (50µL) of serum or 1 drop (25µL) of Plasma/Whole Blood, 2 drops (50µL) of assay buffer with Plasma & Whole Blood',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '98%',
      'Specificity': '99%'
    },
    description: 'Dengue NS1 Rapid Antigen Test Kit is a rapid chromatographic immunoassay for the qualitative detection of NS1 rapid antigen of Dengue virus in Human serum/plasma or whole blood as an aid in the diagnosis of Dengue infections.'
  },
  'dengue-igg-igm-test-device': {
    hsn: '38229090',
    specs: {
      'Product Name': 'Dengue IgG/IgM Test Device',
      'Intended Use': 'Detection of antibodies IgG and IgM to Dengue virus',
      'Specimen Type': 'Serum, Plasma or Whole Blood',
      'Specimen Volume': '1 drop (10 µL) of Serum/Plasma/Whole Blood sample + 2 drops (50 µL) of Assay Buffer',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '98%',
      'Specificity': '97%'
    },
    description: 'Dengue IgG/IgM Antibody Detection Test (Serum/Plasma or Whole Blood) is a rapid chromatographic immunoassay for the qualitative detection of IgG and/or IgM antibodies in human whole blood, serum, or plasma as an aid in the diagnosis of primary and secondary Dengue infections.'
  },
  'malaria-pf-pv-rapid-diagnostic-test-device': {
    hsn: '38229090',
    specs: {
      'Product Name': 'Malaria Pf/Pv Rapid Diagnostic Test Device',
      'Intended Use': 'Detection of antigens specific to P. falciparum and P. vivax',
      'Specimen Type': 'Whole Blood',
      'Specimen Volume': '5 µL Whole Blood + 3 drops (75 µL) of Assay Buffer',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '99%',
      'Specificity': '99.5%'
    },
    description: 'Malaria Pf/Pv Antigen Detection Rapid Test Kit is a rapid chromatographic immunoassay for the simultaneous detection and differentiation of Plasmodium falciparum and Plasmodium vivax antigens in human whole blood as an aid in the diagnosis of malaria infection.'
  },
  'malaria-pf-pan-antigen-rapid-test-device': {
    hsn: '38229090',
    specs: {
      'Product Name': 'Malaria Pf/Pan Antigen Rapid Test Device',
      'Intended Use': 'Detection of four kinds of circulating plasmodium (P.falciparum (P.f.), P. vivax (P.v.), P. ovale (P.o.), P. malariae (P.m.) & / P.Knowlesi',
      'Specimen Type': 'Whole Blood',
      'Specimen Volume': '5 µl. (Whole blood), 3 drops (75µL) of Assay buffer',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '99%',
      'Specificity': '99.5%'
    },
    description: 'Malaria Pf/Pan Antigen Detection Rapid Test Kit is a rapid chromatographic immunoassay for the qualitative detection of four kinds of circulating plasmodium (P.falciparum (P.f.), P. vivax (P.v.), P. ovale (P.o.), P. malariae (P.m.) & / P.Knowlesi in whole blood.'
  },
  'typhi-igg-igm-rapid-test-device': {
    hsn: '30021290',
    specs: {
      'Product Name': 'Typhi IgG/IgM Rapid Test Device',
      'Intended Use': 'Detection and differentiation of anti Salmonella typhi (S. typhi) IgG and IgM antibodies against specific Salmonella typhi antigen',
      'Specimen Type': 'Human serum/plasma/whole blood',
      'Specimen Volume': '1 drop (25µL) serum/plasma/whole blood), 2 drops (50µl) Assay buffer',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '99.5%',
      'Specificity': '99.9%'
    },
    description: 'Typhoid IgG/IgM Antibody Rapid Test Kit is a lateral flow immunoassay for the qualitative detection and differentiation of anti-Salmonella typhi (S. typhi) IgG and IgM antibodies against specific Salmonella typhi antigen in human whole blood, serum or plasma.'
  },
  'leptospira-igg-igm-rapid-test-device': {
    hsn: '30021290',
    specs: {
      'Product Name': 'Leptospira IgG/IgM Rapid Test Device',
      'Intended Use': 'Detection and differentiation of IgG and IgM antibody to Leptospira Interorgan (L. interorgan)',
      'Specimen Type': 'Human serum/plasma/whole blood',
      'Specimen Volume': '1 drop (25 µL) serum/plasma/whole blood, 2 drops (50µL) Assay buffer',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '98%',
      'Specificity': '99.5%'
    },
    description: 'Leptospira IgG/IgM Ab Rapid Test kit is a lateral flow immunoassay for the simultaneous detection and differentiation of IgG and IgM antibody to Leptospira interorgan (L. interorgan) in human serum, plasma or whole blood.'
  },
  'hiv-1-2-antibody-detection-rapid-test-device': {
    hsn: '30021290',
    specs: {
      'Product Name': 'HIV 1/2 Antibody detection Rapid Test device',
      'Intended Use': 'Detection of antibodies to HIV 1 & HIV 2',
      'Specimen Type': 'Serum, Plasma or Whole Blood',
      'Specimen Volume': '1 drop (10 µL) of Serum/Plasma/Whole Blood sample + 2 drops (50 µL) of Assay Buffer',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '99.6%',
      'Specificity': '99.5%'
    },
    description: 'HIV 1/2 Antibody Detection Rapid Test kit is an Immune chromatographic based assay for the detection of antibodies to HIV 1 & HIV 2 in Human Serum/ Plasma/ Whole Blood.'
  },
  'hcv-antibody-detection-test-device': {
    hsn: '30021290',
    specs: {
      'Product Name': 'HCV Antibody detection Test device',
      'Intended Use': 'Detection of Hepatitis C virus antibodies',
      'Specimen Type': 'Serum/Plasma/Whole Blood',
      'Specimen Volume': '1 drop (25 µL) serum, 2 drops (50µL) Assay buffer',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '99.5%',
      'Specificity': '99.9%'
    },
    description: 'HCV Antibody Detection Test Kit is an immune chromatographic based assay for the detection of antibodies to HCV in Human Serum/ Plasma/ Whole Blood.'
  },
  'troponin-i-test-device': {
    hsn: '30021290',
    specs: {
      'Product Name': 'Troponin I Test device',
      'Intended Use': 'Detection of human cardiac Troponin',
      'Specimen Type': 'Human serum/plasma/whole blood',
      'Specimen Volume': '1 drop (25 µL) serum/plasma/whole blood, 2 drops (50µL) Assay buffer',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '99.6%',
      'Specificity': '99.5%'
    },
    description: 'Troponin I Rapid Test Kit is a rapid chromatographic immunoassay for the qualitative detection of human cardiac Troponin in whole blood, serum or plasma as an aid in the diagnosis of myocardial infarction (MI).'
  },
  'syphilis-antibody-detection-test-device': {
    hsn: '38229090',
    specs: {
      'Product Name': 'Syphilis Antibody Detection Test device',
      'Intended Use': 'Detection of antibodies to Treponema Pallidum',
      'Specimen Type': 'Serum, Plasma or Whole Blood',
      'Specimen Volume': '1 drop (25 µL) Serum/ Plasma/ Whole Blood sample, 2 drops (50µL) Assay buffer',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '99%',
      'Specificity': '99.5%'
    },
    description: 'Syphilis Antibody Rapid Test Kit is a lateral flow chromatographic immunoassay for the qualitative detection of antibodies to Treponema Pallidum in human whole blood, serum or plasma.'
  },
  'hbv-antigen-detection-test-device': {
    hsn: '30021290',
    specs: {
      'Product Name': 'HBV Antigen Detection Test device',
      'Intended Use': 'Detection of Hepatitis B Surface Antigen virus',
      'Specimen Type': 'Serum, Plasma or Whole Blood',
      'Specimen Volume': '2 drops (50µl) serum/Plasma/, 1 drop (25µL) Whole Blood Sample, 2 drops (50µl) Assay Buffer with Whole Blood',
      'Storage': '2-40°C',
      'Time of Result': '15-20 minutes',
      'Shelf Life': '24 months',
      'Sensitivity': '99%',
      'Specificity': '99.5%'
    },
    description: 'HBV Antigen Detection Test kit is a rapid chromatography immunoassay for the qualitative detection of Hepatitis B Surface Antigen virus in serum/plasma/whole blood samples.'
  },
  'hiv-elisa': {
    hsn: '30021290',
    specs: {
      'Product Name': 'HIV ELISA',
      'Method': 'Enzyme-linked immunosorbent assay (ELISA)',
      'Intended Use': 'Qualitative detection of antibodies to Human Immunodeficiency Viruses (HIV) type 1 and type 2',
      'Specimen Type': 'Human serum or plasma',
      'Application': 'Screening of blood donors and diagnosis of clinical conditions related to HIV infection'
    },
    description: 'HIV detection ELISA kit intended for qualitative detection of antibodies to Human Immunodeficiency Viruses (HIV) type 1 and type 2 in human serum or plasma samples.'
  },
  'hbv-elisa': {
    hsn: '30021290',
    specs: {
      'Product Name': 'HBV ELISA',
      'Method': 'Enzyme-linked immunosorbent assay (ELISA)',
      'Intended Use': 'Qualitative detection of Hepatitis B surface Antigen (HBsAg)',
      'Specimen Type': 'Human serum or plasma',
      'Application': 'Screening of blood donors and research of patients related to infection with hepatitis B virus'
    },
    description: 'HBV Detection ELISA Kit is an enzyme-linked immunosorbent assay (ELISA) in-vitro qualitative detection of Hepatitis B surface Antigen (HBsAg) in human serum or plasma.'
  },
  'hcv-elisa': {
    hsn: '30021290',
    specs: {
      'Product Name': 'HCV ELISA',
      'Method': 'Enzyme-linked immunosorbent assay (ELISA)',
      'Intended Use': 'Qualitative detection of antibodies to hepatitis C virus (HCV)',
      'Specimen Type': 'Human serum or plasma',
      'Application': 'Screening blood donors and diagnosing patients related to infection with hepatitis C virus'
    },
    description: 'HCV enzyme-linked immunosorbent assay (ELISA) for qualitative detection of antibodies to hepatitis C virus (HCV) in human serum or plasma.'
  },
  'dengue-ns1-elisa': {
    hsn: '30021290',
    specs: {
      'Product Name': 'Dengue NS1 ELISA',
      'Method': 'Enzyme-linked immunosorbent assay (ELISA)',
      'Intended Use': 'In vitro qualitative detection of Dengue NS1 antigen',
      'Specimen Type': 'Human serum or plasma',
      'Subtypes': 'Detects all four subtypes: DEN1, DEN2, DEN3 & DEN4'
    },
    description: 'Dengue NS1 Ag is designed for in vitro qualitative detection of Dengue NS1 antigen in human serum or plasma and is used as a screening test for testing of collected blood samples suspected for Dengue.'
  },
  'hiv-tridot': {
    hsn: '30021290',
    specs: {
      'Product Name': 'HIV Tridot',
      'Intended Use': 'Detection of antibodies to Human Immunodeficiency Virus',
      'Application': 'Screening and diagnosis of HIV transmissions'
    },
    description: 'HIV Tridot is a rapid screening test kit for the detection of antibodies to Human Immunodeficiency Virus (HIV).'
  },
  // --- NEW SURGICAL GOWNS SETS FROM BROCHURE (PAGES 3-9) ---
  'wraparound-surgical-gown-level-3-set': {
    hsn: '62104070',
    specs: {
      Material: '43-50 GSM SSMMS water repellent',
      Sterility: 'ETO Sterile Package',
      Components: 'Wraparound Gown, Safety Goggles, 3 Ply Mask, Head Cap, Shoe cover leggings (1 pair), Nitrile Gloves (1 pair), Absorbent Napkins (2 Nos)'
    },
    description: 'Warparound surgical gown comes with ultrasonic seam sealing and made to cover more area of the body than basic gowns. Our gowns fabric is water repellent which provides AAMI level 3 protection and are comfortable to use during long and short surgeries both.\n\nIndividual gown supplied with peel open ETO sterile package inside wrapped in nonwoven sheets and two hand towels.'
  },
  'reinforced-level-3-4-surgical-gown-set': {
    hsn: '62104070',
    specs: {
      Material: '43-50 GSM SSMMS + 28-35 GSM poly coated reinforcement',
      Sterility: 'ETO Sterile Package',
      Components: 'Wraparound Gown, Safety Goggles, 3 Ply Mask, Head Cap, Shoe cover leggings (1 pair), Nitrile Gloves (1 pair), Absorbent Napkins (2 Nos)'
    },
    description: 'Reinforced surgical gown with ultrasonic seam sealing. Offers AAMI Level 4 protection on critical reinforced contact areas.'
  },
  'breathable-viral-barrier-bvb-surgical-gown-set': {
    hsn: '62104070',
    specs: {
      Material: '50-60 GSM Breathable Viral Barrier (BVB) Fabric',
      Sterility: 'ETO Sterile Package',
      Components: 'Wraparound Gown, Safety Goggles, 3 Ply Mask, Head Cap, Shoe cover leggings (1 pair), Nitrile Gloves (1 pair), Absorbent Napkins (2 Nos)'
    },
    description: 'Premium viral barrier surgical gown featuring breathable BVB fabric for comfort and AAMI Level 4 protection all over.'
  },
  'eco-viral-barrier-gown-set': {
    hsn: '62104070',
    specs: {
      Material: '50-60 GSM Viral Barrier Fabric (Non-breathable)',
      Sterility: 'ETO Sterile Package',
      Components: 'Wraparound Gown, Safety Goggles, 3 Ply Mask, Head Cap, Shoe cover leggings (1 pair), Nitrile Gloves (1 pair), Absorbent Napkins (2 Nos)'
    },
    description: 'Cost-effective viral barrier surgical gown providing complete AAMI Level 4 fluid and viral protection.'
  },
  'ssmms-poly-coated-breathable-gown-set': {
    hsn: '62104070',
    specs: {
      Material: '43-50 GSM SSMMS + 15-20 GSM poly coated water repellent',
      Sterility: 'ETO Sterile Package',
      Components: 'Wraparound Gown, Safety Goggles, 3 Ply Mask, Head Cap, Shoe cover leggings (1 pair), Nitrile Gloves (1 pair), Absorbent Napkins (2 Nos)'
    },
    description: 'SSMMS poly coated breathable gown set providing high splash protection and surgical comfort.'
  },
  'non-woven-poly-coated-breathable-gown-set': {
    hsn: '62104070',
    specs: {
      Material: '30 GSM non woven + 15-20 GSM poly coated',
      Sterility: 'ETO Sterile Package',
      Components: 'Wraparound Gown, Safety Goggles, 3 Ply Mask, Head Cap, Shoe cover leggings (1 pair), Nitrile Gloves (1 pair), Absorbent Napkins (2 Nos)'
    },
    description: 'Laminated non-woven poly coated breathable gown set offering cost-effective and reliable barrier performance.'
  },
  'basic-sms-surgical-gown-set': {
    hsn: '62104070',
    specs: {
      Material: '43-50 GSM SMS water repellent',
      Sterility: 'ETO Sterile Package',
      Components: 'Wraparound Gown, Safety Goggles, 3 Ply Mask, Head Cap, Shoe cover leggings (1 pair), Nitrile Gloves (1 pair), Absorbent Napkins (2 Nos)'
    },
    description: 'Basic SMS surgical gown and set featuring ultrasonic seam sealing and fluid repellent SMS material.'
  },

  // --- HEALTH & HYGIENE PRODUCTS (PAGE 19) ---
  'sweat-pads': {
    hsn: '39264099',
    specs: {
      Material: '4 layer Spun Lace Material',
      Size: '130 mm x 120 mm',
      Packaging: '14 Pcs per Box'
    },
    description: 'High-absorbency disposable sweat pads designed to absorb moisture and ensure comfort under arms.'
  },
  'cooling-gel-sheet': {
    hsn: '90189022',
    specs: {
      Material: 'High Quality PVC Material',
      Size: '430 mm x 350 mm',
      Packaging: 'Individually wrapped in bag'
    },
    description: 'Soothing cooling gel sheet designed for quick fever relief and heat reduction.'
  },
  'prep-razor': {
    hsn: '90189022',
    specs: {
      Blade: 'Stainless Steel Blade with Platinum edge & Teflon Coated',
      Packaging: 'Individually wrapped, 50 Pcs per Box, 2000 Pcs per Carton'
    },
    description: 'Disposable medical prep razor designed for clean skin preparation before surgical procedures.'
  },

  // --- SPA & SALON PRODUCTS (PAGES 20-21) ---
  'non-woven-brief': {
    hsn: '61082990',
    specs: {
      Material: 'PP Spun Bond Fabric',
      GSM: '25 GSM',
      Size: 'Standard',
      Packaging: '10 Pcs/Pkt, Poly Bag Pack'
    },
    description: 'Disposable non-woven briefs designed for hygiene and comfort during spa and salon treatments.'
  },
  'wrap': {
    hsn: '62101000',
    specs: {
      Material: 'PP Spun Bond Fabric',
      GSM: '25 GSM',
      Size: '52 inch',
      Packaging: 'Individual Fold, Poly Bag Pack'
    },
    description: 'Disposable spa wrap designed to offer clean, private, and comfortable body cover.'
  },
  'bed-sheet': {
    hsn: '56031100',
    specs: {
      Material: 'PP Spun Bond Material',
      GSM: '15, 25, or 40 GSM',
      Size: '32 x 72 inches',
      Packaging: 'Individual Fold, Poly Bag Pack'
    },
    description: 'Sanitary disposable bed sheets for beauty salons, spa tables, and massage beds.'
  },
  'disposable-napkin': {
    hsn: '56031200',
    specs: {
      Material: 'Spun Lace Material',
      GSM: '40 GSM',
      Size: '9x9, 12x12 inches',
      Packaging: '90 Pcs/Pkt, Poly Bag Pack'
    },
    description: 'Ultra-soft and absorbent disposable napkins for clean skin care and facial applications.'
  },
  'disposable-towel': {
    hsn: '56031200',
    specs: {
      Material: 'Spun Lace Material',
      GSM: '40 GSM',
      Size: '30x63 inches',
      Packaging: '20 Pcs/Pkt, Poly Bag Pack'
    },
    description: 'Absorbent disposable towel made of premium spunlace fabric, perfect for hair salons and spas.'
  },
  'head-bands': {
    hsn: '40151900',
    specs: {
      Material: 'Spun Lace Material',
      GSM: '70 GSM',
      Size: '2 x 24 inches',
      Packaging: '10 Pcs/Pkt, Poly Bag Pack'
    },
    description: 'Hygienic, stretchable disposable head bands to protect client\'s hair during facials and treatments.'
  },
  'spun-lace-brief': {
    hsn: '61082990',
    specs: {
      Material: 'Spun Lace Material',
      GSM: '40 GSM',
      Size: 'Standard',
      Packaging: '10 Pcs/Pkt, Poly Bag Pack'
    },
    description: 'Premium, breathable disposable spunlace briefs offering exceptional comfort for spa services.'
  },

  // --- SURGICAL GOWNS (PAGE 22) ---
  'wraparound-surgical-gown': {
    hsn: '62101000',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Protection: 'AAMI Level 3 protection',
      Features: 'Breathable and Comfortable, Conveniently folded'
    },
    description: 'Warparound surgical gown comes with ultrasonic seam sealing and made to cover more area of the body than basic gowns. Our gowns fabric is water repellent which provides AAMI level 3 protection and are comfortable to use during long and short surgeries both.\n\nIndividual gown supplied with peel open ETO sterile package inside wrapped in nonwoven sheets and two hand towels.'
  },
  'breathable-viral-barrier-gown': {
    hsn: '62101000',
    specs: {
      Material: 'BVB water repellent material',
      Protection: 'Highest AAMI level 4 protection',
      Features: 'Breathable and Comfortable, Conveniently folded'
    },
    description: 'High-barrier breathable viral barrier surgical gown providing Level 4 virus and fluid protection.'
  },
  'isolation-gown': {
    hsn: '62101000',
    specs: {
      Material: 'Nonwoven water repellent material',
      Features: 'Breathable and Comfortable, Conveniently folded'
    },
    description: 'Fluid-resistant isolation gown designed for clinical ward use and infection control.'
  },
  'basic-surgical-gown': {
    hsn: '62101000',
    specs: {
      Material: 'SMS water repellent material',
      Protection: 'AAMI Level 3 protection',
      Features: 'Breathable and Comfortable, Conveniently folded'
    },
    description: 'Standard disposable surgical gown designed for minor surgical operations and clinical setups.'
  },
  'cathlab-surgical-gown': {
    hsn: '62101000',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Protection: 'Reinforced absorbent layer on critical zones, AAMI level 4 protection on critical zones',
      Features: 'Breathable and Comfortable, Conveniently folded'
    },
    description: 'Specialized surgical gown with absorbent zone reinforcement, designed for cardiac catheterization lab procedures.'
  },
  'patient-gown': {
    hsn: '62101000',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Protection: 'AAMI Level 3 protection',
      Features: 'Breathable and Comfortable, Conveniently folded'
    },
    description: 'Disposable patient gown offering hygiene, coverage, and fluid resistance for ward stays and clinical exams.'
  },
  'full-gown-set-hiv-kit': {
    hsn: '62101000',
    specs: {
      Contents: 'Any surgical gown as per needs, Hood cover, Safety goggles, Face mask, Surgical gloves, Long shoecover, Waste collection bag'
    },
    description: 'All-in-one sterile gown set (HIV kit) providing full body protection for high-risk surgical environments.'
  },

  // --- ORTHOPAEDIC DRAPES & PACKS (PAGE 23) ---
  'hip-u-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Size: '240 x 220 cm',
      Laysheet: 'One head laysheet 100 x 160 cm',
      Reinforcement: '120 x 120 cm',
      Pockets: '2 Nos. 20 x 30 cm'
    },
    description: 'Specialized orthopaedic Hip U-drape designed for hip surgery prep with built-in fluid control pockets.'
  },
  'knee-o-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Size: '240 x 340 cm',
      Reinforcement: 'Absorbent Reinforcement 120 x 80 cm',
      Aperture: 'Two Aperture 62 mm diameter',
      Features: 'Tube and Cable holders 2 Nos'
    },
    description: 'High-barrier Knee O-drape designed for clean knee surgeries, featuring dual apertures and cable organizers.'
  },
  'bilateral-knee-o-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Size: '240 x 340 cm',
      Aperture: 'Two Elastic Aperture 62 mm diameter',
      Reinforcement: '120 x 120 cm',
      Features: 'With Funnel, Pockets 2 Nos. 18 x 35 cm, Tube and Cable holders 2 Nos'
    },
    description: 'Bilateral Knee O-drape with fluid collection funnel and pockets, engineered for simultaneous double-knee surgeries.'
  },
  'spinal-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Size: '160 x 300 cm',
      Reinforcement: '120 x 120 cm',
      Incise: 'Incise area 16 x 36 cm',
      Features: 'Pockets 2 Nos. 18 x 35 cm, Tube and Cable holders 1 Nos'
    },
    description: 'Spinal Drape containing integrated adhesive incise film and fluid control pockets for spinal interventions.'
  },
  'elbow-o-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '160 x 300 cm',
      Reinforcement: '120 x 120 cm',
      Aperture: 'Aperture 62 mm'
    },
    description: 'Targeted Elbow O-drape providing high fluid containment and a sterile field for arm and elbow surgeries.'
  },
  'shoulder-u': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '160 x 200 cm',
      Laysheet: 'One head laysheet 160 x 100 cm',
      Reinforcement: '120 x 120 cm'
    },
    description: 'Shoulder U-drape complete with head laysheet and fluid barrier reinforcement for shoulder surgery.'
  },
  'knee-arthroscopy-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent material',
      Size: '240 x 340 cm',
      Aperture: 'Elastic Aperture 62 mm diameter',
      Reinforcement: '120 x 120 cm',
      Features: 'Pockets 2 Nos. 18 x 35 cm, Tube and Cable holders 2 Nos'
    },
    description: 'Knee Arthroscopy drape featuring fluid collection pockets, integrated tube holders, and a stretchable elastic aperture.'
  },
  'orthopaedic-kits-packs': {
    hsn: '90189099',
    specs: {
      Contents: 'Surgical Gown, Drape, Trolley Cover, Adhesive Drape Sheet - S/M/L, Plane Sheet - S/M/L, Hand Towel, Cling Drape, Stockinette, Cautery Bag',
      Kits: '1. Total Knee Replacement (T.K.R.) Kit, 2. Bi-Lateral Knee Replacement Kit, 3. Total Hip Replacement (T.H.R.) Kit, 4. Major OT Kit'
    },
    description: 'Comprehensive, sterile orthopaedic drape kits and packs designed for major joint replacements.'
  },

  // --- CARDIOLOGY (PAGE 24) ---
  'angiography-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '160 x 300 cm',
      Apertures: 'Two Femoral Apertures & Two Radial Apertures',
      Protection: 'ABS sheet around holes'
    },
    description: 'Cardiac Angiography drape featuring dual femoral and radial apertures with surrounding absorbent sheets.'
  },
  'angioplasty-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '160 x 300 cm',
      Apertures: 'Two Femoral Apertures & Two Radial Apertures',
      Protection: 'ABS sheet around holes'
    },
    description: 'Angioplasty drape designed to maintain a high-sterile barrier during coronary intervention procedures.'
  },
  'cardiothoracic-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '160 x 350 cm',
      Apertures: 'Two Femoral Apertures',
      Reinforcement: '120 x 210 cm',
      Protection: 'ABS sheet around holes'
    },
    description: 'Extensive cardiotoracic drape designed for open-heart surgeries, providing reliable fluid management.'
  },
  'cardiology-kits-packs': {
    hsn: '90189099',
    specs: {
      Contents: 'Surgical Gown, Drape, Trolley Cover, Adhesive Drape Sheet - S/M/L, Plane Sheet - S/M/L, Hand Towel, Cautery Bag',
      Packs: '1. CABG Pack, 2. Angiography Pack'
    },
    description: 'Sterile cardiology procedure packs tailored for bypass surgery and angiography operations.'
  },

  // --- GYNECOLOGY (PAGE 25) ---
  'full-gynec-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '160 x 150 cm',
      Aperture: 'Aperture 12 x 20 cm round',
      Features: 'Attached leggings'
    },
    description: 'Obstetric Full Gynecological drape with integrated leggings and round aperture for patient positioning.'
  },
  'caesarean-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '250 x 160 cm or 240 x 160 cm',
      Incise: 'Incise area 28 x 35 cm or 16 x 36 cm',
      Reinforcement: '120 x 120 cm',
      Features: 'Tube and Cable holders 5 Nos, Pockets 4 Nos or collection pouch with drainage'
    },
    description: 'Specialized Caesarean (C-Section) drape featuring integrated fluid collection pouch, drainage path, and incise area.'
  },
  'laparoscopy-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '240 x 150 cm',
      Reinforcement: '120 x 120 cm',
      Incise: 'Incise area 25 cm Dia',
      Pockets: '2 Nos. 20 x 30 cm'
    },
    description: 'Abdominal laparoscopy drape with integrated adhesive incise circle and double fluid-capture pockets.'
  },
  'o-hole-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '150 x 120 cm',
      Aperture: 'Aperture 8 cm or 16 cm'
    },
    description: 'Standard O-hole drape designed for gynecological examination and minor outpatient procedures.'
  },
  'gynecology-kits-packs': {
    hsn: '90189099',
    specs: {
      Contents: 'Wraparound Surgical Gown, Drape Sheet - S/M/L, Plane Sheet - S/M/L, Trolley Sheet, Leggings, Under Pad, Cautery Bag, Hand Towel',
      Packs: 'Delivery Pack, LSCS Pack, Laparoscopy Drape Pack, VSD Drape Pack, IVF Drape Pack'
    },
    description: 'Complete procedure kits containing specialized drapes and gowns for gynecological surgeries and childbirth.'
  },

  // --- UROLOGY (PAGE 26) ---
  'turp-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '160 x 150 cm',
      Aperture: 'Aperture 80 mm',
      Features: 'Attached leggings, with Fluid Path'
    },
    description: 'Urological TURP drape featuring pre-attached leggings and an integrated fluid path channel for irrigation.'
  },
  'pcnl-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '160 x 250 cm',
      Incise: 'Incise area 36 x 16 cm',
      Reinforcement: '120 x 120 cm'
    },
    description: 'PCNL Drape providing a safe sterile area and high fluid containment during percutaneous kidney stone extraction.'
  },
  'major-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '160 x 270 cm',
      Incise: 'Incision area 20 x 25 cm',
      Reinforcement: '120 x 120 cm',
      Features: 'With Fluid Path'
    },
    description: 'Major urology surgical drape with built-in fluid path for optimal fluid management.'
  },
  'o-hole-drape-urology': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Size: '120 x 150 cm',
      Aperture: 'Aperture 8 cm or 16 cm'
    },
    description: 'O-hole urological drape designed for outpatient procedures and routine diagnostic scans.'
  },
  'urology-kits-packs': {
    hsn: '90189099',
    specs: {
      Contents: 'Surgical Gown, Reinforced Surgical Gown, Mayo Trolley Cover, Drape Sheet - S/M/L, Plane Sheet - S/M/L, Required Drape, Adhesive Drape Sheet - S/M/L, OT Tape, Hand Towel, Hand Cover',
      Packs: 'Tur Drape Pack, PCNL Drape Pack'
    },
    description: 'Sterile urology kits containing standard drapes and gowns customized for PCNL and TUR procedures.'
  },

  // --- OPHTHALMOLOGY (PAGE 27) ---
  'eye-drape': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Sizes: '70x70cm, 80x80cm, 100x100cm, 120x120cm, 50x40cm, 100x80cm, 120x100cm, 160x120cm'
    },
    description: 'Ophthalmic eye drape designed for standard eye surgeries, ensuring a sterile field and fluid containment.'
  },
  'eye-drape-premium': {
    hsn: '90189099',
    specs: {
      Material: '5 Layer SMS water repellent',
      Features: 'Integrated fluid collection pouch, adhesive incise film'
    },
    description: 'Premium ophthalmic eye drape featuring a flexible fluid collection pouch and high-grade incise film.'
  },
  'poly-eye-drape': {
    hsn: '90189099',
    specs: {
      Material: 'Polyethylene-based fluid-proof film'
    },
    description: 'Fluid-proof poly eye drape designed to prevent strike-through during irrigation-intensive eye surgeries.'
  },
  'ophthalmic-kits-packs': {
    hsn: '90189099',
    specs: {
      Contents: 'Surgical Gown, Plane Sheet - S/M/L, Required Drape, OT Tape, Hand Towel'
    },
    description: 'Comprehensive ophthalmic procedure packs tailored for cataract and other eye surgeries.'
  },

  // --- ACCESSORIES & OTHER PROTECTIVES (PAGE 28) ---
  'plain-drape-sheet': {
    hsn: '90189099',
    specs: {
      Material: 'Hygiene Film',
      Sizes: 'Small 120 x 100 cm, Medium 120 x 160 cm, Large 120 x 210 cm'
    },
    description: 'Disposable plain drape sheet providing a clean and sterile surface for surgical tables.'
  },
  'adhesive-drape-sheet': {
    hsn: '90189099',
    specs: {
      Material: 'Adhesive border layout',
      Sizes: 'Small 100 x 80 cm, Medium 160 x 100 cm, Large 160 x 210 cm, XL 240 x 160 cm'
    },
    description: 'Adhesive surgical drape sheets designed to secure position around the surgical site.'
  },
  'steri-wrap-sheet': {
    hsn: '90189099',
    specs: {
      Sizes: '60 x 60 cm, 75 x 75 cm, 160 x 210 cm, 240 x 160 cm'
    },
    description: 'High-barrier sterilization wrap sheets to wrap medical devices before autoclaving.'
  },
  'video-camera-cable-drape': {
    hsn: '90189099',
    specs: {
      Length: '2.6 m x 15 cm',
      Material: '35 micron PE with Paper Leader',
      Features: 'Perforations on conical end for tearing off',
      Sterility: 'Sterilized by ETO'
    },
    description: 'Sterile cover for surgical cameras and cables, enabling safe manipulation inside the sterile field.'
  },
  'mayo-trolley-cover': {
    hsn: '90189099',
    specs: {
      Material: 'PE / Non-woven composite'
    },
    description: 'Sterile Mayo stand cover to provide a clean environment for operating room instruments.'
  },
  'dead-body-cover': {
    hsn: '62101000',
    specs: {
      Material: 'High-strength laminated leak-proof material',
      Features: 'Zipper closure and secure handles'
    },
    description: 'Durable, heavy-duty leak-proof body bag designed for sanitary containment and transport.'
  },
  'protective-goggles': {
    hsn: '90189099',
    specs: {
      Material: 'Polycarbonate anti-fog lenses',
      Features: 'Adjustable strap, splash-resistant'
    },
    description: 'Medical protective goggles offering high-grade eye protection against splashes, dust, and aerosols.'
  },
  'face-shield': {
    hsn: '90189099',
    specs: {
      Material: 'Optically clear polyester film (PET)',
      Size: 'Standard full-face coverage',
      Features: 'Anti-fog coating, foam headband, elastic strap'
    },
    description: 'High-clarity protective face shield designed to shield the face and eyes from splashes, sprays, and droplets.'
  },

  // --- ALIASES FOR ROBUST MATCHING ---
  'hand-sleeve': {
    aliasOf: 'hand-sleeves'
  },
  'dengue-igg-igm-rapid-test-device': {
    aliasOf: 'dengue-igg-igm-test-device'
  },
  'typhoid-igg-igm-rapid-test-device': {
    aliasOf: 'typhi-igg-igm-rapid-test-device'
  },
  'non-woven-shoe-covers': {
    aliasOf: 'disposable-shoe-covers'
  },
  'non-woven-shoe-cover': {
    aliasOf: 'disposable-shoe-covers'
  }
};

// --- DATA ---
const productCategories = [
  { 
    id: 'gown-set-contents', 
    title: 'Gown Set Contents', 
    icon: Layers, 
    color: '#1e3a8a', 
    image: apronImg,
    items: [
      'Wraparound Surgical Gown Level 3 & Set',
      'Reinforced Level 3 & 4 Surgical Gown & Set',
      'Breathable Viral Barrier BVB Surgical Gown & Set',
      'Eco Viral Barrier Gown & Set',
      'SSMMS + Poly Coated Breathable Gown & Set',
      'Non Woven + Poly Coated Breathable Gown & Set',
      'Basic SMS Surgical Gown & Set'
    ],
    description: 'Custom sterilized sets containing gowns, towels, and wrapping sheets designed for surgery prep.'
  },
  { 
    id: 'disposable-3-ply-face-mask', 
    title: 'DISPOSABLE 3 PLY FACE MASK', 
    icon: Shield, 
    color: '#1e3a8a', 
    image: faceMaskImg,
    items: ['Elastic Mask', 'B/W Mask', 'IIR Mask', 'Kids Mask', 'Tie-On Mask', 'Pull Out Mask'],
    description: 'High-filtration medical and protective 3-ply face masks with comfortable loops.'
  },
  { 
    id: 'respiratory-disposable-face-mask', 
    title: 'RESPIRATORY DISPOSABLE FACE MASK', 
    icon: ShieldCheck, 
    color: '#1e3a8a', 
    image: disposableFaceMaskImg,
    items: ['N95 Ear Loop', 'N95 Head Loop', 'KF 94 Mask', 'Dusk Mask', 'Kids N95 Mask', 'Cup Mask'],
    description: 'Certified respirator masks offering premium filtration against particulate matter.'
  },
  { 
    id: 'disposable-head-cap', 
    title: 'DISPOSABLE HEAD CAP', 
    icon: User, 
    color: '#1e3a8a', 
    image: headCapImg,
    items: ['Bouffant Cap', 'Surgeon Cap', 'Beard Cap', 'Chef Cap', 'Hood Cap', 'Shower Cap', 'Ear Cap', 'Customize Cap', 'Nylon Cap'],
    description: 'Sanitary protective head caps and covers for cleanrooms and clinical use.'
  },
  { 
    id: 'disposable-shoe-cover', 
    title: 'DISPOSABLE SHOE COVER', 
    icon: Footprints, 
    color: '#1e3a8a', 
    image: shoesGlovesImg,
    items: ['Non-Woven Shoe Covers', 'Plastic Shoe Covers', 'Knee-Length Shoe Covers'],
    description: 'Fluid-resistant shoe covers protecting sterile environments from floor contamination.'
  },
  { 
    id: 'disposable-hand-gloves-sleeve', 
    title: 'DISPOSABLE HAND GLOVES / SLEEVE', 
    icon: Footprints, 
    color: '#1e3a8a', 
    image: shoesGlovesImg,
    items: ['Latex Gloves', 'Nitrile Gloves', 'Surgical Gloves', 'Plastic Gloves', 'Veterinary Gloves', 'Hand Sleeves'],
    description: 'High-barrier medical and surgical gloves, sleeve protectors, and hand covers.'
  },
  { 
    id: 'disposable-apron-sterile', 
    title: 'DISPOSABLE APRON (STERILE)', 
    icon: Layers, 
    color: '#1e3a8a', 
    image: apronImg,
    items: ['Sterile Non-Woven Apron', 'Sterile PE Apron'],
    description: 'Ethylene Oxide sterilized body protective aprons for sterile clinical procedures.'
  },
  { 
    id: 'disposable-apron-non-sterile', 
    title: 'DISPOSABLE APRON (NON-STERILE)', 
    icon: Layers, 
    color: '#1e3a8a', 
    image: apronImg,
    items: ['Non-Sterile Non-Woven Apron', 'Non-Sterile PE Apron'],
    description: 'General protective non-sterile aprons for laboratories, testing, and cleaning.'
  },
  { 
    id: 'disposable-plain-sheet-bed-sheet', 
    title: 'DISPOSABLE PLAIN SHEET / BED SHEET', 
    icon: Activity, 
    color: '#1e3a8a', 
    image: sheetImg,
    items: ['Non-Woven Bed Sheet', 'Plastic Bed Sheet', 'Bed Roll'],
    description: 'Absorbent, sanitary plain sheets and bed covers for hospital beds and tables.'
  },
  { 
    id: 'disposable-apparel', 
    title: 'DISPOSABLE APPAREL', 
    icon: User, 
    color: '#1e3a8a', 
    image: sheetImg,
    items: ['Lab Coat', 'Coverall', 'Scrub Suit', 'Shorts', 'Protective Gown', 'Dead Body Cover'],
    description: 'Full body protective apparel including disposable lab coats, coveralls, and scrubs.'
  },
  { 
    id: 'health-hygiene-products', 
    title: 'HEALTH & HYGIENE PRODUCTS', 
    icon: HeartPulse, 
    color: '#1e3a8a', 
    image: hygieneImg,
    items: ['Underpads', 'Sweat Pads', 'Cooling Gel Sheet', 'Prep Razor'],
    description: 'High-absorbency underpads and general health hygiene products.'
  },
  { 
    id: 'salon-and-spa-disposable-products', 
    title: 'SALON AND SPA DISPOSABLE PRODUCTS', 
    icon: Sparkles, 
    color: '#1e3a8a', 
    image: salonImg,
    items: ['Salon Apron', 'Spa Gown', 'Wax Strips', 'Bed Sheet', 'Wrap', 'Non-Woven Brief', 'Spun Lace Brief', 'Disposable Napkin', 'Disposable Towel', 'Head Bands'],
    description: 'Premium soft and hygienic salon towels, robes, briefs, wraps, and waxing strips.'
  },
  { 
    id: 'surgical-gowns', 
    title: 'SURGICAL GOWNS', 
    icon: Layers, 
    color: '#1e3a8a', 
    image: apronImg,
    items: [
      'Wraparound Surgical Gown',
      'Reinforced Surgical Gown',
      'Breathable Viral Barrier Gown',
      'Isolation Gown',
      'Basic Surgical Gown',
      'Cathlab Surgical Gown',
      'Patient Gown',
      'Full Gown Set (HIV Kit)'
    ],
    description: 'High-barrier fluid-resistant surgical gowns with reinforced safety panels.'
  },
  { 
    id: 'orthopaedic', 
    title: 'ORTHOPAEDIC', 
    icon: Activity, 
    color: '#1e3a8a', 
    image: hygieneImg,
    items: [
      'Hip U Drape',
      'Knee O Drape',
      'Bilateral Knee O Drape',
      'Spinal Drape',
      'Elbow O Drape',
      'Shoulder U',
      'Knee Arthroscopy Drape',
      'Orthopaedic Kits & Packs'
    ],
    description: 'Orthopaedic drapes and joint protection gear designed for bone and joint surgery.'
  },
  { 
    id: 'cardiology', 
    title: 'CARDIOLOGY', 
    icon: HeartPulse, 
    color: '#1e3a8a', 
    image: hygieneImg,
    items: [
      'Angiography Drape',
      'Angioplasty Drape',
      'Cardiothoracic Drape',
      'Cardiology Kits & Packs'
    ],
    description: 'Sterile cardiac angiography drapes and specialized surgeon protection.'
  },
  { 
    id: 'gynecology', 
    title: 'GYNECOLOGY', 
    icon: Layers, 
    color: '#1e3a8a', 
    image: hygieneImg,
    items: [
      'Full Gynec Drape',
      'Caesarean Drape',
      'Laparoscopy Drape',
      'O Hole Drape',
      'Gynecology Kits & Packs'
    ],
    description: 'Obstetrics and C-section drapes and gynecological surgery packs.'
  },
  { 
    id: 'urology', 
    title: 'UROLOGY', 
    icon: Activity, 
    color: '#1e3a8a', 
    image: hygieneImg,
    items: [
      'Turp Drape',
      'Pcnl Drape',
      'Major Drape',
      'O Hole Drape (Urology)',
      'Urology Kits & Packs'
    ],
    description: 'Custom drapes and collections bags designed for urological surgical procedures.'
  },
  { 
    id: 'ophthalmology', 
    title: 'OPHTHALMOLOGY', 
    icon: Sparkles, 
    color: '#1e3a8a', 
    image: hygieneImg,
    items: [
      'Eye Drape',
      'Eye Drape Premium',
      'Poly Eye Drape',
      'Ophthalmic Kits & Packs'
    ],
    description: 'Sterile fluid-control ophthalmic drapes and eye surgery accessories.'
  },
  { 
    id: 'accessories-and-other-protectives', 
    title: 'ACCESSORIES AND OTHER PROTECTIVES', 
    icon: Shield, 
    color: '#1e3a8a', 
    image: sheetImg,
    items: [
      'Plain Drape Sheet',
      'Adhesive Drape Sheet',
      'Steri Wrap Sheet',
      'Video Camera / Cable Drape',
      'Mayo Trolley Cover',
      'Dead Body Cover',
      'Protective Goggles',
      'Face Shield'
    ],
    description: 'Various safety accessories, body covers, shields, and goggles.'
  },
  { 
    id: 'diagnostic-kits', 
    title: 'DIAGNOSTIC KITS', 
    icon: Activity, 
    color: '#1e3a8a', 
    image: hygieneImg,
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
    ],
    description: 'Rapid diagnostic test devices for accurate clinical screening.'
  },
  { 
    id: 'elisa-kits', 
    title: 'ELISA KITS', 
    icon: Sparkles, 
    color: '#1e3a8a', 
    image: hygieneImg,
    items: [
      'HIV ELISA',
      'HBV ELISA',
      'HCV ELISA',
      'Dengue NS1 ELISA',
      'HIV Tridot'
    ],
    description: 'ELISA detection kits and Tridot test kits for premium qualitative antigen/antibody screening.'
  }
];

// --- COMPONENTS ---
const CategoryCard = ({ cat, idx, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className="cat-selection-card-pro"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.04, type: 'spring', damping: 20 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', cursor: 'pointer' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        className="cat-card-image"
        style={{ backgroundImage: `url("${cat.image}")`, transform: 'translateZ(-20px)' }}
      />
      <div className="cat-card-overlay-pro" style={{ transform: 'translateZ(50px)' }}>
        <div className="cat-card-glass">
          <h3>{cat.title}</h3>
          <span className="explore-link">
            Explore products <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Function to map color names to hex codes for rendering swatches
const getColorHex = (colorName) => {
  const name = colorName.trim().toLowerCase();
  if (name.includes('b/w') || name.includes('black & white') || name.includes('black/white')) {
    return 'linear-gradient(135deg, #1e293b 50%, #ffffff 50%)';
  }
  if (name.includes('blue')) return '#3b82f6';
  if (name.includes('green')) return '#10b981';
  if (name.includes('white')) return '#ffffff';
  if (name.includes('black')) return '#1e293b';
  if (name.includes('pink')) return '#ec4899';
  if (name.includes('grey') || name.includes('gray')) return '#64748b';
  if (name.includes('yellow')) return '#f59e0b';
  if (name.includes('transparent')) {
    return 'linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)';
  }
  return '#cbd5e1';
};

// --- PAGE ---
const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Dynamically calculate selection depth based on the URL hash layout
  // E.g. #gown-set-contents/Surgical Gown
  const hash = location.hash.replace('#', '');
  const [catId, prodNameEncoded] = hash.split('/');

  const selectedCategory = catId ? productCategories.find(c => c.id === catId) : null;
  const selectedProductName = prodNameEncoded ? decodeURIComponent(prodNameEncoded) : null;

  // Scroll to top when selection details change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [catId, prodNameEncoded]);

  const handleCategoryClick = (catId) => {
    navigate(`/products#${catId}`);
  };

  const handleProductCardClick = (productName) => {
    const urlSafeProduct = encodeURIComponent(productName);
    navigate(`/products#${selectedCategory.id}/${urlSafeProduct}`);
  };

  const handleBackToGrid = () => {
    navigate('/products');
  };

  const handleBackToCategory = () => {
    navigate(`/products#${selectedCategory.id}`);
  };

  // Resolve specification lookup information
  const getProductDetails = (productName) => {
    let key = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let details = productDetails[key];
    
    // Resolve aliases recursively if needed
    while (details && details.aliasOf) {
      key = details.aliasOf;
      details = productDetails[key];
    }

    return details || {
      hsn: '62101000',
      specs: {
        Material: 'Medical-grade protection composite',
        Sterility: 'Non-Sterile / Sterile options available',
        Packaging: 'Bulk or custom export pack standard'
      },
      description: `High-quality, disposable ${productName.toLowerCase()} engineered to medical hygiene and safety benchmarks.`
    };
  };

  return (
    <div className="products-page-pro">
      <SEO
        title={
          selectedProductName
            ? `${selectedProductName} | ${selectedCategory.title} | Our Products`
            : selectedCategory
              ? `${selectedCategory.title} | Our Products`
              : "Our Products"
        }
        description={
          selectedProductName
            ? getProductDetails(selectedProductName).description
            : selectedCategory
              ? selectedCategory.description
              : "Explore Bhaarat International's high-quality medical supplies, face masks, protective gear, and salon hygiene products globally."
        }
        keywords="medical supplies, disposable face mask, head cap, surgical mask, Bhaarat International products"
        url="https://bhaaratinternational.org/products"
      />

      <div className="pro-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          // ==========================================
          // LEVEL 1: CATEGORY GRID VIEW
          // ==========================================
          <motion.div
            key="grid-view"
            className="category-view-pro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <section className="products-hero-pro">
              <div className="container">
                <motion.h1
                  className="hero-title-pro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Product Categories
                </motion.h1>

                <motion.p
                  className="hero-subtitle-pro"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Precision-engineered medical supplies for{' '}
                  <span className="highlight-text">global healthcare excellence</span>.
                </motion.p>
              </div>
            </section>

            <div className="container grid-container-pro">
              <div className="category-grid-pro">
                {productCategories.map((cat, idx) => (
                  <CategoryCard
                    key={cat.id}
                    cat={cat}
                    idx={idx}
                    onClick={() => handleCategoryClick(cat.id)}
                  />
                ))}
              </div>
            </div>

            {/* Download Section */}
            <motion.div
              className="catalogue-download-section"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="container">
                <div className="catalogue-download-grid">
                  <div className="catalogue-card">
                    <div className="catalogue-icon">
                      <FileText size={40} />
                    </div>
                    <div className="catalogue-text">
                      <h2>General Medical Disposables</h2>
                      <p>
                        Download our complete product catalogue to explore our full range of
                        medical-grade disposables, protective gear, and hygiene solutions.
                      </p>
                    </div>
                    <a
                      className="catalogue-download-btn"
                      href={cataloguePdf}
                      download="Bhaarat-International-Catalogue.pdf"
                    >
                      <Download size={20} />
                      Download Catalogue
                    </a>
                  </div>

                  <div className="catalogue-card">
                    <div className="catalogue-icon">
                      <FileText size={40} />
                    </div>
                    <div className="catalogue-text">
                      <h2>Diagnostics & ELISA Kits</h2>
                      <p>
                        Download our specialized diagnostics brochure to explore our full range of
                        rapid antigen/antibody test devices, ELISA kits, and Tridot tests.
                      </p>
                    </div>
                    <a
                      className="catalogue-download-btn"
                      href={dengueBroucherPdf}
                      download="Bhaarat-International-Diagnostics-Brochure.pdf"
                    >
                      <Download size={20} />
                      Download Brochure
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : !selectedProductName ? (
          // ==========================================
          // LEVEL 2: SUB-CATEGORY PRODUCTS LIST VIEW
          // ==========================================
          <motion.div
            key="list-view"
            className="product-list-view-pro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <header className="list-header-pro">
              <div className="container">
                <button className="back-btn-pro" onClick={handleBackToGrid}>
                  <ArrowLeft size={14} /> Back to Categories
                </button>

                <div className="header-flex-pro">
                  <div className="cat-badge-pro" style={{ backgroundColor: selectedCategory.color }}>
                    <selectedCategory.icon size={36} />
                  </div>
                  <div className="header-text-pro">
                    <h1>{selectedCategory.title}</h1>
                    <p>{selectedCategory.description}</p>
                  </div>
                </div>
              </div>
            </header>

            <div className="container items-grid-container-pro">
              <div className="items-grid-pro">
                {selectedCategory.items.map((item, idx) => {
                  const IconComponent = selectedCategory.icon;
                  return (
                    <motion.div
                      key={idx}
                      className="item-card-pro"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      onClick={() => handleProductCardClick(item)}
                    >
                      <div className="item-visual-pro">
                        {/* Elegant display number background */}
                        <div className="item-number-back">
                          {String(idx + 1).padStart(2, '0')}
                        </div>

                        {/* Premium certification badge */}
                        <span className="item-premium-badge">
                          {idx % 2 === 0 ? 'Certified Quality' : 'Global Grade'}
                        </span>

                        <div className="item-aura" style={{ background: selectedCategory.color }} />

                        {/* Elegant interactive floating wireframes */}
                        <div className="item-geometric-circle" style={{ borderColor: `${selectedCategory.color}25` }} />
                        <div className="item-geometric-square" style={{ borderColor: `${selectedCategory.color}15` }} />

                        <div className="item-icon-bg" style={{ color: selectedCategory.color }}>
                          <IconComponent size={56} strokeWidth={1.25} />
                        </div>
                      </div>

                      <div className="item-content-pro">
                        <span className="item-category-tag" style={{ color: selectedCategory.color, backgroundColor: `${selectedCategory.color}10` }}>
                          {selectedCategory.title}
                        </span>
                        <h3>{item}</h3>
                        <p>{getProductDetails(item).description}</p>
                        <button
                          className="item-action-btn-pro"
                          style={{ '--accent-hover': selectedCategory.color }}
                          onClick={(e) => {
                            e.stopPropagation(); // Avoid triggering card drill-down click
                            handleProductCardClick(item);
                          }}
                        >
                          View Details <ArrowRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          // ==========================================
          // LEVEL 3: PRODUCT DETAIL PAGE VIEW
          // ==========================================
          (() => {
            const details = getProductDetails(selectedProductName);
            const IconComponent = selectedCategory.icon;

            // Find if there is any color specification
            const colorSpecKey = Object.keys(details.specs).find(k => 
              k.toLowerCase() === 'available colors' || 
              k.toLowerCase() === 'available color' || 
              k.toLowerCase() === 'color'
            );
            const colorString = colorSpecKey ? details.specs[colorSpecKey] : null;
            const colorsList = colorString 
              ? colorString.split(/, | or |\/|;/).map(c => c.trim()).filter(Boolean) 
              : [];

            return (
              <motion.div
                key="detail-view"
                className="product-detail-view-pro"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              >
                <div className="container detail-container-pro">
                  <div className="detail-navigation">
                    <button className="back-btn-pro" onClick={handleBackToCategory}>
                      <ArrowLeft size={14} /> Back to {selectedCategory.title}
                    </button>
                  </div>

                  <div className="detail-grid-pro">
                    {/* Left Side: Dynamic Visual Shield */}
                    <div className="detail-visual-panel">
                      <div className="detail-aura-bg" style={{ background: selectedCategory.color }} />
                      <div className="detail-decor-grid" />

                      {/* Floating geometry rings */}
                      <div className="item-geometric-circle" style={{ width: '180px', height: '180px', borderColor: `${selectedCategory.color}15` }} />
                      <div className="item-geometric-square" style={{ width: '130px', height: '130px', borderColor: `${selectedCategory.color}10` }} />

                      <div className="detail-floating-icon" style={{ color: selectedCategory.color }}>
                        <IconComponent size={80} strokeWidth={1} />
                      </div>

                      <div className="detail-badge-row">
                        <span className="premium-tag">PREMIUM MEDICAL DEVICE</span>
                        <span className="hsn-tag">HSN: {details.hsn}</span>
                      </div>
                    </div>

                    {/* Right Side: Specifications and Description */}
                    <div className="detail-info-panel">
                      <span className="category-pill-pro" style={{ color: selectedCategory.color, backgroundColor: `${selectedCategory.color}10` }}>
                        {selectedCategory.title}
                      </span>
                      <h1>{selectedProductName}</h1>
                      <p className="detail-description">{details.description}</p>

                      {colorsList.length > 0 && (
                        <div className="detail-colors-section">
                          <h3>Available Colors</h3>
                          <div className="color-swatches-grid">
                            {colorsList.map((color, idx) => {
                              const hex = getColorHex(color);
                              const isWhite = color.toLowerCase().includes('white');
                              return (
                                <div key={idx} className="color-swatch-item">
                                  <span 
                                    className="color-swatch-circle" 
                                    style={{ 
                                      background: hex, 
                                      border: isWhite ? '1px solid #cbd5e1' : 'none',
                                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                                    }} 
                                  />
                                  <span className="color-swatch-label">{color}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="detail-specs-section">
                        <h3>Technical Specifications</h3>
                        <div className="specs-table-pro">
                          {Object.entries(details.specs).map(([key, val]) => (
                            <div key={key} className="specs-row-pro">
                              <span className="specs-key">{key}</span>
                              <span className="specs-val">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="detail-actions-pro">
                        <button
                          className="btn btn-primary enquire-now-btn-pro"
                          style={{ backgroundColor: selectedCategory.color, borderColor: selectedCategory.color }}
                          onClick={() => {
                            const urlSafeProduct = encodeURIComponent(selectedProductName);
                            const urlSafeCat = selectedCategory.id;
                            navigate(`/quote?category=${urlSafeCat}&product=${urlSafeProduct}`);
                          }}
                        >
                          Request Quote for this Product <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;

import type { CategoriesMap, CropBox } from '../types';
import rawBeautyStage from '../assets/images/beauty_stage_sheet_1793623354722.jpg';
import rawBeautyPieces from '../assets/images/beauty_pieces_sheet_1793623352508.jpg';
import rawAccStage from '../assets/images/accessories_stage_sheet_1793623350733.jpg';
import rawAccPieces from '../assets/images/accessories_pieces_sheet_1793623352879.jpg';

// Original Couture Runway & Garment Sprite Sheets
export const MODELS_COUTURE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_042056_1a704ff7-b0e5-4a9f-bbda-62392b819fb6.png&w=3840&q=85';
export const PIECES_COUTURE = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_042057_080e85b0-b4aa-4072-8eb9-2304c7baf42b.png&w=2400&q=85';

export const RAW_BEAUTY_STAGE = rawBeautyStage;
export const RAW_BEAUTY_PIECES = rawBeautyPieces;
export const RAW_ACC_STAGE = rawAccStage;
export const RAW_ACC_PIECES = rawAccPieces;

export const SHEETS: Record<string, string> = {
  coutureStage: MODELS_COUTURE,
  couturePieces: PIECES_COUTURE,
  beautyStage: RAW_BEAUTY_STAGE,
  beautyPieces: RAW_BEAUTY_PIECES,
  accStage: RAW_ACC_STAGE,
  accPieces: RAW_ACC_PIECES
};

export const COUTURE_LOOK_BOXES: CropBox[] = [
  { a: 12, b: 176, y0: 48, y1: 496, sheetW: 960, sheetH: 540, sheetKey: 'coutureStage' },
  { a: 178, b: 330, y0: 48, y1: 496, sheetW: 960, sheetH: 540, sheetKey: 'coutureStage' },
  { a: 331, b: 470, y0: 48, y1: 496, sheetW: 960, sheetH: 540, sheetKey: 'coutureStage' },
  { a: 476, b: 633, y0: 48, y1: 496, sheetW: 960, sheetH: 540, sheetKey: 'coutureStage' },
  { a: 634, b: 767, y0: 48, y1: 496, sheetW: 960, sheetH: 540, sheetKey: 'coutureStage' },
  { a: 767, b: 956, y0: 48, y1: 496, sheetW: 960, sheetH: 540, sheetKey: 'coutureStage' }
];

export const COUTURE_PIECE_BOXES: CropBox[] = [
  { a: 26, b: 224, c: 28, d: 214, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 304, b: 412, c: 22, d: 236, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 530, b: 666, c: 12, d: 242, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 752, b: 922, c: 100, d: 146, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 70, b: 176, c: 246, d: 466, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 294, b: 422, c: 294, d: 432, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 508, b: 688, c: 240, d: 452, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 780, b: 890, c: 252, d: 466, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 64, b: 178, c: 484, d: 698, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 316, b: 396, c: 482, d: 698, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 530, b: 672, c: 508, d: 682, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' },
  { a: 754, b: 916, c: 484, d: 700, sheetW: 960, sheetH: 720, sheetKey: 'couturePieces' }
];

export const BEAUTY_LOOK_BOXES: CropBox[] = [
  { a: 68, b: 180, y0: 110, y1: 445, sheetW: 960, sheetH: 540, sheetKey: 'beautyStage' },
  { a: 194, b: 314, y0: 110, y1: 445, sheetW: 960, sheetH: 540, sheetKey: 'beautyStage' },
  { a: 328, b: 500, y0: 110, y1: 445, sheetW: 960, sheetH: 540, sheetKey: 'beautyStage' },
  { a: 510, b: 598, y0: 110, y1: 445, sheetW: 960, sheetH: 540, sheetKey: 'beautyStage' },
  { a: 610, b: 736, y0: 110, y1: 445, sheetW: 960, sheetH: 540, sheetKey: 'beautyStage' },
  { a: 750, b: 924, y0: 110, y1: 445, sheetW: 960, sheetH: 540, sheetKey: 'beautyStage' }
];

export const BEAUTY_PIECE_BOXES: CropBox[] = [
  { a: 60, b: 185, c: 16, d: 232, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 310, b: 415, c: 16, d: 232, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 515, b: 685, c: 16, d: 232, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 750, b: 925, c: 16, d: 232, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 55, b: 195, c: 252, d: 468, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 315, b: 415, c: 252, d: 468, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 555, b: 650, c: 252, d: 468, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 805, b: 875, c: 252, d: 468, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 65, b: 185, c: 490, d: 706, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 305, b: 420, c: 490, d: 706, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 520, b: 680, c: 490, d: 706, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' },
  { a: 800, b: 880, c: 490, d: 706, sheetW: 960, sheetH: 720, sheetKey: 'beautyPieces' }
];

export const ACC_LOOK_BOXES: CropBox[] = [
  { a: 20, b: 186, y0: 155, y1: 385, sheetW: 960, sheetH: 540, sheetKey: 'accStage' },
  { a: 190, b: 342, y0: 155, y1: 385, sheetW: 960, sheetH: 540, sheetKey: 'accStage' },
  { a: 348, b: 474, y0: 155, y1: 385, sheetW: 960, sheetH: 540, sheetKey: 'accStage' },
  { a: 478, b: 624, y0: 155, y1: 385, sheetW: 960, sheetH: 540, sheetKey: 'accStage' },
  { a: 628, b: 796, y0: 155, y1: 385, sheetW: 960, sheetH: 540, sheetKey: 'accStage' },
  { a: 798, b: 950, y0: 155, y1: 385, sheetW: 960, sheetH: 540, sheetKey: 'accStage' }
];

export const ACC_PIECE_BOXES: CropBox[] = [
  { a: 18, b: 220, c: 20, d: 215, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 270, b: 450, c: 20, d: 215, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 500, b: 700, c: 20, d: 215, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 770, b: 910, c: 20, d: 215, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 15, b: 225, c: 265, d: 450, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 255, b: 465, c: 265, d: 450, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 495, b: 705, c: 265, d: 450, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 740, b: 940, c: 265, d: 450, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 18, b: 225, c: 490, d: 700, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 280, b: 440, c: 490, d: 700, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 495, b: 710, c: 490, d: 700, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' },
  { a: 735, b: 945, c: 490, d: 700, sheetW: 960, sheetH: 720, sheetKey: 'accPieces' }
];

export const INITIAL_CATEGORIES: CategoriesMap = {
  runway: {
    key: 'runway',
    title: 'Spring Summer 2027',
    desc: 'A study in softness and strength. The new season collection from Maison Vell blends delicate textures and modern silhouettes, crafted for a more beautiful tomorrow.',
    counterLabel: 'Look',
    shopCta: 'Shop the look',
    footerLabel: 'Maison Vell Couture',
    stageBg: 'linear-gradient(90deg,#f1f5fa 0%,#e7eff6 38%,#eef4f9 62%,#f6f9fc 100%)',
    editorial: 'Founded on principles of architectural lightness and kinetic tailoring, the Spring Summer 2027 Runway presentation was staged in Paris across an infinite atmospheric gallery. Every look represents over 180 hours of hand-pleating, feather insertion, and liquid satin draping.',
    looks: [
      { lookNum: 15, name: 'Blush Feather & Satin Suit', ...COUTURE_LOOK_BOXES[0] },
      { lookNum: 16, name: 'Sage Pleated Empire Gown', ...COUTURE_LOOK_BOXES[1] },
      { lookNum: 17, name: 'Champagne Satin Trench', ...COUTURE_LOOK_BOXES[2] },
      { lookNum: 18, name: 'Blush Billow Sleeve Ensemble', ...COUTURE_LOOK_BOXES[3] },
      { lookNum: 19, name: 'Powder Blue Long Coat', ...COUTURE_LOOK_BOXES[4] },
      { lookNum: 20, name: 'Ivory Ruffle Column Gown', ...COUTURE_LOOK_BOXES[5] }
    ],
    items: [
      { id: 'runway-15-1', lookNum: 15, name: 'Feather Jacket', price: '$2,900', priceNum: 2900, ...COUTURE_PIECE_BOXES[0] },
      { id: 'runway-15-2', lookNum: 15, name: 'Satin Wide Leg Trousers', price: '$1,450', priceNum: 1450, ...COUTURE_PIECE_BOXES[1] },
      { id: 'runway-16-1', lookNum: 16, name: 'Pleated Dress', price: '$2,200', priceNum: 2200, ...COUTURE_PIECE_BOXES[2] },
      { id: 'runway-16-2', lookNum: 16, name: 'Gold Waist Belt', price: '$420', priceNum: 420, ...COUTURE_PIECE_BOXES[3] },
      { id: 'runway-17-1', lookNum: 17, name: 'Satin Trench Dress', price: '$2,350', priceNum: 2350, ...COUTURE_PIECE_BOXES[4] },
      { id: 'runway-17-2', lookNum: 17, name: 'Top Handle Bag', price: '$980', priceNum: 980, ...COUTURE_PIECE_BOXES[5] },
      { id: 'runway-18-1', lookNum: 18, name: 'Billow Sleeve Blouse', price: '$860', priceNum: 860, ...COUTURE_PIECE_BOXES[6] },
      { id: 'runway-18-2', lookNum: 18, name: 'Tie Waist Trousers', price: '$740', priceNum: 740, ...COUTURE_PIECE_BOXES[7] },
      { id: 'runway-19-1', lookNum: 19, name: 'Powder Long Coat', price: '$1,980', priceNum: 1980, ...COUTURE_PIECE_BOXES[8] },
      { id: 'runway-19-2', lookNum: 19, name: 'Ivory Straight Trousers', price: '$690', priceNum: 690, ...COUTURE_PIECE_BOXES[9] },
      { id: 'runway-20-1', lookNum: 20, name: 'Sculpted Ruffle Top', price: '$1,120', priceNum: 1120, ...COUTURE_PIECE_BOXES[10] },
      { id: 'runway-20-2', lookNum: 20, name: 'Pleated Maxi Skirt', price: '$1,340', priceNum: 1340, ...COUTURE_PIECE_BOXES[11] }
    ]
  },

  beauty: {
    key: 'beauty',
    title: 'Maison Vell Beaute',
    desc: 'Botanical bio-peptides, rare alpine extracts, and architectural crystal flacons. Formulated in Grasse and Geneva to impart weightless runway luminescence.',
    counterLabel: 'Edition',
    shopCta: 'Shop the ritual',
    footerLabel: 'Maison Vell Beaute',
    stageBg: 'linear-gradient(90deg,#f6f1f1 0%,#f0e8e8 38%,#f5efef 62%,#faf7f7 100%)',
    editorial: 'Maison Vell Beaute unites high-potency cellular skincare with haute parfumerie. Every flacon is crafted from heavy refillable crystal and brushed brass, housing cold-pressed botanical actives harvested at peak bloom.',
    looks: [
      { lookNum: 1, name: "L'Or des Alpes Botanical Serum", ...BEAUTY_LOOK_BOXES[0] },
      { lookNum: 2, name: 'Quartz Eclat Rose Elixir', ...BEAUTY_LOOK_BOXES[1] },
      { lookNum: 3, name: 'Haute Vaguement Eau de Parfum', ...BEAUTY_LOOK_BOXES[2] },
      { lookNum: 4, name: 'Le Rouge Sculpted Velvet Column', ...BEAUTY_LOOK_BOXES[3] },
      { lookNum: 5, name: 'Sage & Rosa Cellular Dew Mist', ...BEAUTY_LOOK_BOXES[4] },
      { lookNum: 6, name: "Maison D'Or Regenerative Cream", ...BEAUTY_LOOK_BOXES[5] }
    ],
    items: [
      { id: 'beauty-1-1', lookNum: 1, name: 'Aura Peptide Serum', price: '$240', priceNum: 240, ...BEAUTY_PIECE_BOXES[0] },
      { id: 'beauty-1-2', lookNum: 1, name: 'Golden Elixir Refill', price: '$165', priceNum: 165, ...BEAUTY_PIECE_BOXES[1] },
      { id: 'beauty-2-1', lookNum: 2, name: 'Rose Quartz Extrait', price: '$310', priceNum: 310, ...BEAUTY_PIECE_BOXES[2] },
      { id: 'beauty-2-2', lookNum: 2, name: 'Gilded Compact Mirror', price: '$190', priceNum: 190, ...BEAUTY_PIECE_BOXES[3] },
      { id: 'beauty-3-1', lookNum: 3, name: 'Crystal Bloom Parfum', price: '$380', priceNum: 380, ...BEAUTY_PIECE_BOXES[4] },
      { id: 'beauty-3-2', lookNum: 3, name: 'Noir Purse Atomizer', price: '$145', priceNum: 145, ...BEAUTY_PIECE_BOXES[5] },
      { id: 'beauty-4-1', lookNum: 4, name: 'Velvet Red Lipstick', price: '$95', priceNum: 95, ...BEAUTY_PIECE_BOXES[6] },
      { id: 'beauty-4-2', lookNum: 4, name: 'Sable Lip Brush', price: '$75', priceNum: 75, ...BEAUTY_PIECE_BOXES[7] },
      { id: 'beauty-5-1', lookNum: 5, name: 'Botanical Dew Mist', price: '$130', priceNum: 130, ...BEAUTY_PIECE_BOXES[8] },
      { id: 'beauty-5-2', lookNum: 5, name: 'Jade Contour Roller', price: '$155', priceNum: 155, ...BEAUTY_PIECE_BOXES[9] },
      { id: 'beauty-6-1', lookNum: 6, name: 'Cellular Night Balm', price: '$290', priceNum: 290, ...BEAUTY_PIECE_BOXES[10] },
      { id: 'beauty-6-2', lookNum: 6, name: 'Gold Creme Spatula', price: '$85', priceNum: 85, ...BEAUTY_PIECE_BOXES[11] }
    ]
  },

  accessories: {
    key: 'accessories',
    title: 'Maroquinerie & Bijoux',
    desc: 'Architectural saddle-stitched calfskin, hand-hammered 24k gold hardware, and sculptural Italian acetate eyewear crafted in our Florentine workshops.',
    counterLabel: 'Object',
    shopCta: 'Shop accessories',
    footerLabel: 'Maison Vell Maroquinerie',
    stageBg: 'linear-gradient(90deg,#f4f2ee 0%,#ece8e1 38%,#f2efe9 62%,#f9f8f5 100%)',
    editorial: 'Each Maison Vell leather piece is cut by hand from full-grain French box calfskin and finished with solid architectural brass hardware. Designed to age with quiet nobility across decades of wear.',
    looks: [
      { lookNum: 7, name: 'Blush Structured Kelly Bag', ...ACC_LOOK_BOXES[0] },
      { lookNum: 8, name: 'Faceted Gold Belt & Cuff', ...ACC_LOOK_BOXES[1] },
      { lookNum: 9, name: 'Champagne Couture Shades', ...ACC_LOOK_BOXES[2] },
      { lookNum: 10, name: 'Sage Pleated Nappa Clutch', ...ACC_LOOK_BOXES[3] },
      { lookNum: 11, name: 'Powder Blue Leather Tote', ...ACC_LOOK_BOXES[4] },
      { lookNum: 12, name: 'Silk Carre & Pearl Bag', ...ACC_LOOK_BOXES[5] }
    ],
    items: [
      { id: 'acc-7-1', lookNum: 7, name: 'Blush Kelly Handbag', price: '$3,400', priceNum: 3400, ...ACC_PIECE_BOXES[0] },
      { id: 'acc-7-2', lookNum: 7, name: 'Saddle Cardholder', price: '$490', priceNum: 490, ...ACC_PIECE_BOXES[1] },
      { id: 'acc-8-1', lookNum: 8, name: 'Sculpted Gold Cuff', price: '$890', priceNum: 890, ...ACC_PIECE_BOXES[2] },
      { id: 'acc-8-2', lookNum: 8, name: 'Pearl Drop Earrings', price: '$760', priceNum: 760, ...ACC_PIECE_BOXES[3] },
      { id: 'acc-9-1', lookNum: 9, name: 'Couture Sunglasses', price: '$620', priceNum: 620, ...ACC_PIECE_BOXES[4] },
      { id: 'acc-9-2', lookNum: 9, name: 'Pebbled Eyewear Case', price: '$340', priceNum: 340, ...ACC_PIECE_BOXES[5] },
      { id: 'acc-10-1', lookNum: 10, name: 'Sage Leather Clutch', price: '$1,650', priceNum: 1650, ...ACC_PIECE_BOXES[6] },
      { id: 'acc-10-2', lookNum: 10, name: 'Gold Shoulder Chain', price: '$540', priceNum: 540, ...ACC_PIECE_BOXES[7] },
      { id: 'acc-11-1', lookNum: 11, name: 'Powder Galleria Tote', price: '$3,150', priceNum: 3150, ...ACC_PIECE_BOXES[8] },
      { id: 'acc-11-2', lookNum: 11, name: 'Botanical Silk Carre', price: '$580', priceNum: 580, ...ACC_PIECE_BOXES[9] },
      { id: 'acc-12-1', lookNum: 12, name: 'Ivory Satin Stiletto', price: '$1,180', priceNum: 1180, ...ACC_PIECE_BOXES[10] },
      { id: 'acc-12-2', lookNum: 12, name: 'Brushed Brass Belt', price: '$680', priceNum: 680, ...ACC_PIECE_BOXES[11] }
    ]
  },

  clothing: {
    key: 'clothing',
    title: 'Pret-a-Couture Wardrobe',
    desc: 'Fluid bias-cut silk trousers, architectural double-faced wool coats, and whisper-light organza blouses tailored for effortless day-to-evening transition.',
    counterLabel: 'Look',
    shopCta: 'Shop wardrobe',
    footerLabel: 'Maison Vell Ready-to-Wear',
    stageBg: 'linear-gradient(90deg,#f0f4f8 0%,#e5eef5 38%,#edf3f8 62%,#f7fafd 100%)',
    editorial: 'The Pret-a-Couture wardrobe translates Maison Vell runway proportions into everyday sartorial icons. Unlined double-face cashmere, washable Mulberry silk satin, and hand-rolled hems ensure unmatched comfort.',
    looks: [
      { lookNum: 21, name: 'Powder Double-Face Wool Overcoat', ...COUTURE_LOOK_BOXES[4] },
      { lookNum: 22, name: 'Blush Silk Billow Blouse & Trouser', ...COUTURE_LOOK_BOXES[3] },
      { lookNum: 23, name: 'Champagne Belted Satin Trench', ...COUTURE_LOOK_BOXES[2] },
      { lookNum: 24, name: 'Ivory Sculpted Ruffle Column', ...COUTURE_LOOK_BOXES[5] },
      { lookNum: 25, name: 'Blush Marabou Feather Jacket', ...COUTURE_LOOK_BOXES[0] },
      { lookNum: 26, name: 'Sage Sunray Pleated Silk Dress', ...COUTURE_LOOK_BOXES[1] }
    ],
    items: [
      { id: 'cloth-21-1', lookNum: 21, name: 'Powder Long Coat', price: '$1,980', priceNum: 1980, ...COUTURE_PIECE_BOXES[8] },
      { id: 'cloth-21-2', lookNum: 21, name: 'Ivory Straight Trousers', price: '$690', priceNum: 690, ...COUTURE_PIECE_BOXES[9] },
      { id: 'cloth-22-1', lookNum: 22, name: 'Billow Sleeve Blouse', price: '$860', priceNum: 860, ...COUTURE_PIECE_BOXES[6] },
      { id: 'cloth-22-2', lookNum: 22, name: 'Tie Waist Trousers', price: '$740', priceNum: 740, ...COUTURE_PIECE_BOXES[7] },
      { id: 'cloth-23-1', lookNum: 23, name: 'Satin Trench Dress', price: '$2,350', priceNum: 2350, ...COUTURE_PIECE_BOXES[4] },
      { id: 'cloth-23-2', lookNum: 23, name: 'Brushed Brass Belt', price: '$680', priceNum: 680, ...ACC_PIECE_BOXES[11] },
      { id: 'cloth-24-1', lookNum: 24, name: 'Sculpted Ruffle Top', price: '$1,120', priceNum: 1120, ...COUTURE_PIECE_BOXES[10] },
      { id: 'cloth-24-2', lookNum: 24, name: 'Pleated Maxi Skirt', price: '$1,340', priceNum: 1340, ...COUTURE_PIECE_BOXES[11] },
      { id: 'cloth-25-1', lookNum: 25, name: 'Feather Jacket', price: '$2,900', priceNum: 2900, ...COUTURE_PIECE_BOXES[0] },
      { id: 'cloth-25-2', lookNum: 25, name: 'Satin Wide Leg Trousers', price: '$1,450', priceNum: 1450, ...COUTURE_PIECE_BOXES[1] },
      { id: 'cloth-26-1', lookNum: 26, name: 'Pleated Dress', price: '$2,200', priceNum: 2200, ...COUTURE_PIECE_BOXES[2] },
      { id: 'cloth-26-2', lookNum: 26, name: 'Ivory Satin Stiletto', price: '$1,180', priceNum: 1180, ...ACC_PIECE_BOXES[10] }
    ]
  },

  collections: {
    key: 'collections',
    title: 'Capsule & Resort 2027',
    desc: 'Curated seasonal silhouettes pairing Haute Couture drapery with Florentine leather goods and fine parfum for complete head-to-toe dressing.',
    counterLabel: 'Capsule',
    shopCta: 'Shop the capsule',
    footerLabel: 'Maison Vell Capsules',
    stageBg: 'linear-gradient(90deg,#eef3f6 0%,#e4ecf2 38%,#ecf2f6 62%,#f5f8fa 100%)',
    editorial: 'The Resort 2027 Capsule brings together our most sought-after silhouettes with bespoke leather companions and signature fragrances, conceived for effortless travel from Paris to the Riviera.',
    looks: [
      { lookNum: 1, name: 'Riviera Sage Pleated Gown', ...COUTURE_LOOK_BOXES[1] },
      { lookNum: 2, name: 'Champagne Trench & Kelly Edit', ...COUTURE_LOOK_BOXES[2] },
      { lookNum: 3, name: 'Ivory Architectural Ruffle Gala', ...COUTURE_LOOK_BOXES[5] },
      { lookNum: 4, name: 'Blush Feather Evening Ensemble', ...COUTURE_LOOK_BOXES[0] },
      { lookNum: 5, name: 'Powder Blue Coat & Galleria Set', ...COUTURE_LOOK_BOXES[4] },
      { lookNum: 6, name: 'Rose Silk Lounge Tailoring', ...COUTURE_LOOK_BOXES[3] }
    ],
    items: [
      { id: 'col-1-1', lookNum: 1, name: 'Pleated Dress', price: '$2,200', priceNum: 2200, ...COUTURE_PIECE_BOXES[2] },
      { id: 'col-1-2', lookNum: 1, name: 'Sage Leather Clutch', price: '$1,650', priceNum: 1650, ...ACC_PIECE_BOXES[6] },
      { id: 'col-2-1', lookNum: 2, name: 'Satin Trench Dress', price: '$2,350', priceNum: 2350, ...COUTURE_PIECE_BOXES[4] },
      { id: 'col-2-2', lookNum: 2, name: 'Couture Sunglasses', price: '$620', priceNum: 620, ...ACC_PIECE_BOXES[4] },
      { id: 'col-3-1', lookNum: 3, name: 'Sculpted Ruffle Top', price: '$1,120', priceNum: 1120, ...COUTURE_PIECE_BOXES[10] },
      { id: 'col-3-2', lookNum: 3, name: 'Pearl Drop Earrings', price: '$760', priceNum: 760, ...ACC_PIECE_BOXES[3] },
      { id: 'col-4-1', lookNum: 4, name: 'Feather Jacket', price: '$2,900', priceNum: 2900, ...COUTURE_PIECE_BOXES[0] },
      { id: 'col-4-2', lookNum: 4, name: 'Blush Kelly Handbag', price: '$3,400', priceNum: 3400, ...ACC_PIECE_BOXES[0] },
      { id: 'col-5-1', lookNum: 5, name: 'Powder Long Coat', price: '$1,980', priceNum: 1980, ...COUTURE_PIECE_BOXES[8] },
      { id: 'col-5-2', lookNum: 5, name: 'Powder Galleria Tote', price: '$3,150', priceNum: 3150, ...ACC_PIECE_BOXES[8] },
      { id: 'col-6-1', lookNum: 6, name: 'Billow Sleeve Blouse', price: '$860', priceNum: 860, ...COUTURE_PIECE_BOXES[6] },
      { id: 'col-6-2', lookNum: 6, name: 'Rose Quartz Extrait', price: '$310', priceNum: 310, ...BEAUTY_PIECE_BOXES[2] }
    ]
  },

  maison: {
    key: 'maison',
    title: 'The Maison & Savoir-Faire',
    desc: 'Established at 14 Place Vendome, Maison Vell unites Parisian Haute Couture drapery, Florentine leather mastery, and Grasse botanical perfumery.',
    counterLabel: 'Archive',
    shopCta: 'Acquire archival piece',
    footerLabel: '14 Place Vendome, Paris',
    stageBg: 'linear-gradient(90deg,#f3f1ee 0%,#eae6e0 38%,#f0ede8 62%,#f8f7f5 100%)',
    editorial: 'At 14 Place Vendome, forty-two master petites mains shape silk gazar, hand-dye ostrich plumage, and assemble numbered crystal flacons. Walk the line to explore the six pillars of the Maison.',
    looks: [
      { lookNum: 1, name: 'Pillar I: Plume & Silk Tailoring', ...COUTURE_LOOK_BOXES[0] },
      { lookNum: 2, name: 'Pillar II: Florentine Saddle Calfskin', ...ACC_LOOK_BOXES[0] },
      { lookNum: 3, name: 'Pillar III: Haute Parfumerie de Grasse', ...BEAUTY_LOOK_BOXES[2] },
      { lookNum: 4, name: 'Pillar IV: Architectural Sunray Pleating', ...COUTURE_LOOK_BOXES[1] },
      { lookNum: 5, name: 'Pillar V: 24k Sculpted Brass Hardware', ...ACC_LOOK_BOXES[1] },
      { lookNum: 6, name: 'Pillar VI: Cellular Rose Quartz Alchemy', ...BEAUTY_LOOK_BOXES[1] }
    ],
    items: [
      { id: 'maison-1-1', lookNum: 1, name: 'Atelier Feather Jacket', price: '$2,900', priceNum: 2900, ...COUTURE_PIECE_BOXES[0] },
      { id: 'maison-1-2', lookNum: 1, name: 'Satin Wide Leg Trousers', price: '$1,450', priceNum: 1450, ...COUTURE_PIECE_BOXES[1] },
      { id: 'maison-2-1', lookNum: 2, name: 'Blush Kelly Handbag', price: '$3,400', priceNum: 3400, ...ACC_PIECE_BOXES[0] },
      { id: 'maison-2-2', lookNum: 2, name: 'Saddle Cardholder', price: '$490', priceNum: 490, ...ACC_PIECE_BOXES[1] },
      { id: 'maison-3-1', lookNum: 3, name: 'Crystal Bloom Parfum', price: '$380', priceNum: 380, ...BEAUTY_PIECE_BOXES[4] },
      { id: 'maison-3-2', lookNum: 3, name: 'Noir Purse Atomizer', price: '$145', priceNum: 145, ...BEAUTY_PIECE_BOXES[5] },
      { id: 'maison-4-1', lookNum: 4, name: 'Pleated Silk Gown', price: '$2,200', priceNum: 2200, ...COUTURE_PIECE_BOXES[2] },
      { id: 'maison-4-2', lookNum: 4, name: 'Gold Waist Belt', price: '$420', priceNum: 420, ...COUTURE_PIECE_BOXES[3] },
      { id: 'maison-5-1', lookNum: 5, name: 'Sculpted Gold Cuff', price: '$890', priceNum: 890, ...ACC_PIECE_BOXES[2] },
      { id: 'maison-5-2', lookNum: 5, name: 'Gold Shoulder Chain', price: '$540', priceNum: 540, ...ACC_PIECE_BOXES[7] },
      { id: 'maison-6-1', lookNum: 6, name: 'Rose Quartz Extrait', price: '$310', priceNum: 310, ...BEAUTY_PIECE_BOXES[2] },
      { id: 'maison-6-2', lookNum: 6, name: 'Aura Peptide Serum', price: '$240', priceNum: 240, ...BEAUTY_PIECE_BOXES[0] }
    ]
  },

  lookbook: {
    key: 'lookbook',
    title: 'Editorial Lookbook 2027',
    desc: 'An intimate visual study of proportion, shadow, and movement across the complete Maison Vell wardrobe, beauty objects, and leather silhouettes.',
    counterLabel: 'Plate',
    shopCta: 'Shop this plate',
    footerLabel: 'Maison Vell Lookbook',
    stageBg: 'linear-gradient(90deg,#edf2f7 0%,#e2eaf2 38%,#ebf1f6 62%,#f4f8fb 100%)',
    editorial: 'Photographed in natural northern daylight, the 2027 Lookbook pairs our sculptural garments with their companion accessories and beauty elixirs.',
    looks: [
      { lookNum: 1, name: 'Plate I: Ivory Ruffle & Satin Stiletto', ...COUTURE_LOOK_BOXES[5] },
      { lookNum: 2, name: 'Plate II: Champagne Trench & Eyewear', ...COUTURE_LOOK_BOXES[2] },
      { lookNum: 3, name: 'Plate III: Sage Pleats & Nappa Clutch', ...COUTURE_LOOK_BOXES[1] },
      { lookNum: 4, name: 'Plate IV: Blush Plume & Rose Parfum', ...COUTURE_LOOK_BOXES[0] },
      { lookNum: 5, name: 'Plate V: Powder Overcoat & Galleria', ...COUTURE_LOOK_BOXES[4] },
      { lookNum: 6, name: 'Plate VI: Silk Billow & Gold Cuff', ...COUTURE_LOOK_BOXES[3] }
    ],
    items: [
      { id: 'lb-1-1', lookNum: 1, name: 'Sculpted Ruffle Top', price: '$1,120', priceNum: 1120, ...COUTURE_PIECE_BOXES[10] },
      { id: 'lb-1-2', lookNum: 1, name: 'Ivory Satin Stiletto', price: '$1,180', priceNum: 1180, ...ACC_PIECE_BOXES[10] },
      { id: 'lb-2-1', lookNum: 2, name: 'Satin Trench Dress', price: '$2,350', priceNum: 2350, ...COUTURE_PIECE_BOXES[4] },
      { id: 'lb-2-2', lookNum: 2, name: 'Couture Sunglasses', price: '$620', priceNum: 620, ...ACC_PIECE_BOXES[4] },
      { id: 'lb-3-1', lookNum: 3, name: 'Pleated Dress', price: '$2,200', priceNum: 2200, ...COUTURE_PIECE_BOXES[2] },
      { id: 'lb-3-2', lookNum: 3, name: 'Sage Leather Clutch', price: '$1,650', priceNum: 1650, ...ACC_PIECE_BOXES[6] },
      { id: 'lb-4-1', lookNum: 4, name: 'Feather Jacket', price: '$2,900', priceNum: 2900, ...COUTURE_PIECE_BOXES[0] },
      { id: 'lb-4-2', lookNum: 4, name: 'Rose Quartz Extrait', price: '$310', priceNum: 310, ...BEAUTY_PIECE_BOXES[2] },
      { id: 'lb-5-1', lookNum: 5, name: 'Powder Long Coat', price: '$1,980', priceNum: 1980, ...COUTURE_PIECE_BOXES[8] },
      { id: 'lb-5-2', lookNum: 5, name: 'Powder Galleria Tote', price: '$3,150', priceNum: 3150, ...ACC_PIECE_BOXES[8] },
      { id: 'lb-6-1', lookNum: 6, name: 'Billow Sleeve Blouse', price: '$860', priceNum: 860, ...COUTURE_PIECE_BOXES[6] },
      { id: 'lb-6-2', lookNum: 6, name: 'Sculpted Gold Cuff', price: '$890', priceNum: 890, ...ACC_PIECE_BOXES[2] }
    ]
  },

  shop: {
    key: 'shop',
    title: 'Flagship Boutique Edit',
    desc: 'Immediate flagship availability across our most coveted runway garments, iconic calfskin handbags, and cellular beauty formulations.',
    counterLabel: 'Edit',
    shopCta: 'Add edit to bag',
    footerLabel: 'Maison Vell Flagship Boutique',
    stageBg: 'linear-gradient(90deg,#f2f5f9 0%,#e9eff5 38%,#f0f4f8 62%,#f8fafc 100%)',
    editorial: 'Curated by our Paris Flagship directors, the Boutique Edit brings together six icons across Couture, Maroquinerie, and Beaute ready for complimentary white-glove dispatch.',
    looks: [
      { lookNum: 1, name: 'Icon 01: Blush Feather Jacket & Satin', ...COUTURE_LOOK_BOXES[0] },
      { lookNum: 2, name: 'Icon 02: Blush Kelly Top-Handle Bag', ...ACC_LOOK_BOXES[0] },
      { lookNum: 3, name: "Icon 03: L'Or des Alpes Peptide Serum", ...BEAUTY_LOOK_BOXES[0] },
      { lookNum: 4, name: 'Icon 04: Sage Pleated Empire Gown', ...COUTURE_LOOK_BOXES[1] },
      { lookNum: 5, name: 'Icon 05: Powder Blue Galleria Tote', ...ACC_LOOK_BOXES[4] },
      { lookNum: 6, name: 'Icon 06: Haute Vaguement Extrait', ...BEAUTY_LOOK_BOXES[2] }
    ],
    items: [
      { id: 'shop-1-1', lookNum: 1, name: 'Feather Jacket', price: '$2,900', priceNum: 2900, ...COUTURE_PIECE_BOXES[0] },
      { id: 'shop-1-2', lookNum: 1, name: 'Satin Wide Leg Trousers', price: '$1,450', priceNum: 1450, ...COUTURE_PIECE_BOXES[1] },
      { id: 'shop-2-1', lookNum: 2, name: 'Blush Kelly Handbag', price: '$3,400', priceNum: 3400, ...ACC_PIECE_BOXES[0] },
      { id: 'shop-2-2', lookNum: 2, name: 'Saddle Cardholder', price: '$490', priceNum: 490, ...ACC_PIECE_BOXES[1] },
      { id: 'shop-3-1', lookNum: 3, name: 'Aura Peptide Serum', price: '$240', priceNum: 240, ...BEAUTY_PIECE_BOXES[0] },
      { id: 'shop-3-2', lookNum: 3, name: 'Golden Elixir Refill', price: '$165', priceNum: 165, ...BEAUTY_PIECE_BOXES[1] },
      { id: 'shop-4-1', lookNum: 4, name: 'Pleated Dress', price: '$2,200', priceNum: 2200, ...COUTURE_PIECE_BOXES[2] },
      { id: 'shop-4-2', lookNum: 4, name: 'Gold Waist Belt', price: '$420', priceNum: 420, ...COUTURE_PIECE_BOXES[3] },
      { id: 'shop-5-1', lookNum: 5, name: 'Powder Galleria Tote', price: '$3,150', priceNum: 3150, ...ACC_PIECE_BOXES[8] },
      { id: 'shop-5-2', lookNum: 5, name: 'Botanical Silk Carre', price: '$580', priceNum: 580, ...ACC_PIECE_BOXES[9] },
      { id: 'shop-6-1', lookNum: 6, name: 'Crystal Bloom Parfum', price: '$380', priceNum: 380, ...BEAUTY_PIECE_BOXES[4] },
      { id: 'shop-6-2', lookNum: 6, name: 'Velvet Red Lipstick', price: '$95', priceNum: 95, ...BEAUTY_PIECE_BOXES[6] }
    ]
  },

  'our-world': {
    key: 'our-world',
    title: 'Our World & Sustainability',
    desc: '100% traceable Ahimsa peace silk, refillable crystal flacons, vegetable-tanned leathers, and zero-waste pattern architecture.',
    counterLabel: 'Pillar',
    shopCta: 'Explore conscious luxury',
    footerLabel: 'Maison Vell Responsibility',
    stageBg: 'linear-gradient(90deg,#eff5f2 0%,#e5efe9 38%,#edf4f0 62%,#f6faf8 100%)',
    editorial: 'Every Maison Vell creation carries a digital provenance passport. From organic botanical fields in the Swiss Alps to closed-loop water recycling in our silk mills, we craft beauty that honors the earth.',
    looks: [
      { lookNum: 1, name: 'Ahimsa Peace-Silk Pleated Gown', ...COUTURE_LOOK_BOXES[1] },
      { lookNum: 2, name: 'Refillable Sage & Rosa Glass Mist', ...BEAUTY_LOOK_BOXES[4] },
      { lookNum: 3, name: 'Vegetable-Tanned Sage Nappa Clutch', ...ACC_LOOK_BOXES[3] },
      { lookNum: 4, name: 'Organic Mulberry Satin Trench', ...COUTURE_LOOK_BOXES[2] },
      { lookNum: 5, name: 'Refillable Porcelain Night Balm', ...BEAUTY_LOOK_BOXES[5] },
      { lookNum: 6, name: 'Zero-Waste Ruffle Column Gown', ...COUTURE_LOOK_BOXES[5] }
    ],
    items: [
      { id: 'world-1-1', lookNum: 1, name: 'Peace-Silk Gown', price: '$2,200', priceNum: 2200, ...COUTURE_PIECE_BOXES[2] },
      { id: 'world-1-2', lookNum: 1, name: 'Recycled Brass Belt', price: '$420', priceNum: 420, ...COUTURE_PIECE_BOXES[3] },
      { id: 'world-2-1', lookNum: 2, name: 'Botanical Dew Mist', price: '$130', priceNum: 130, ...BEAUTY_PIECE_BOXES[8] },
      { id: 'world-2-2', lookNum: 2, name: 'Jade Contour Roller', price: '$155', priceNum: 155, ...BEAUTY_PIECE_BOXES[9] },
      { id: 'world-3-1', lookNum: 3, name: 'Sage Leather Clutch', price: '$1,650', priceNum: 1650, ...ACC_PIECE_BOXES[6] },
      { id: 'world-3-2', lookNum: 3, name: 'Botanical Silk Carre', price: '$580', priceNum: 580, ...ACC_PIECE_BOXES[9] },
      { id: 'world-4-1', lookNum: 4, name: 'Organic Satin Trench', price: '$2,350', priceNum: 2350, ...COUTURE_PIECE_BOXES[4] },
      { id: 'world-4-2', lookNum: 4, name: 'Top Handle Bag', price: '$980', priceNum: 980, ...COUTURE_PIECE_BOXES[5] },
      { id: 'world-5-1', lookNum: 5, name: 'Cellular Night Balm', price: '$290', priceNum: 290, ...BEAUTY_PIECE_BOXES[10] },
      { id: 'world-5-2', lookNum: 5, name: 'Golden Elixir Refill', price: '$165', priceNum: 165, ...BEAUTY_PIECE_BOXES[1] },
      { id: 'world-6-1', lookNum: 6, name: 'Sculpted Ruffle Top', price: '$1,120', priceNum: 1120, ...COUTURE_PIECE_BOXES[10] },
      { id: 'world-6-2', lookNum: 6, name: 'Pleated Maxi Skirt', price: '$1,340', priceNum: 1340, ...COUTURE_PIECE_BOXES[11] }
    ]
  }
};

// Depth table stops from d = -1 (leaving past the rail) to d = 5 (arriving out of the haze)
export const KX = [1.2, 0.744, 0.496, 0.346, 0.235, 0.15, 0.085];
export const KF = [1.14, 0.89, 0.777, 0.704, 0.651, 0.616, 0.59];
export const KH = [1.18, 0.832, 0.574, 0.436, 0.334, 0.258, 0.19];
export const KB = [0, 0, 1.5, 4, 8, 12, 17];
export const KO = [1, 1, 1, 1, 0.86, 0.5, 0];


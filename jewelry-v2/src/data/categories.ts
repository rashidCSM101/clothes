import type { CategoriesMap } from '../types';
import { STAGE_IMAGES, PIECE_IMAGES } from '../config/imagePaths';

/**
 * ============================================================================
 * HOW TO ADD OR EDIT A LOOK OR JEWELRY PIECE (COPY-PASTE GUIDE):
 *
 * 1. To change an image across the site, edit `src/config/imagePaths.ts`
 *    OR replace the image directly inside `public/jewelry-images/`.
 *
 * 2. To add a new Look to any category below, copy-paste a look block into `looks`:
 *    { lookNum: 21, name: 'My Custom Diamond Suite', image: '/jewelry-images/stage/my-look.png' }
 *
 * 3. And copy-paste 2 matching companion pieces into `items`:
 *    { id: 'custom-21-1', lookNum: 21, name: 'Diamond Ring', price: '$14,500', priceNum: 14500, image: '/jewelry-images/pieces/my-piece1.png' },
 *    { id: 'custom-21-2', lookNum: 21, name: 'Diamond Earrings', price: '$9,800', priceNum: 9800, image: '/jewelry-images/pieces/my-piece2.png' }
 * ============================================================================
 */

export const INITIAL_CATEGORIES: CategoriesMap = {
  runway: {
    key: 'runway',
    title: 'Haute Joaillerie 2027',
    desc: 'A study in fire, brilliance, and architectural gold. The High Jewelry collection from Maison Vell unites rare gemstones with Place Vendôme master craftsmanship.',
    counterLabel: 'Parure',
    shopCta: 'Acquire the parure',
    footerLabel: 'Maison Vell Haute Joaillerie',
    stageBg: 'linear-gradient(90deg,#f1f5fa 0%,#e7eff6 38%,#eef4f9 62%,#f6f9fc 100%)',
    editorial: 'Conceived at 14 Place Vendôme, the 2027 Haute Joaillerie presentation showcases six extraordinary parures. Each creation requires over 600 hours of stone matching, articulated platinum mounting, and microscopic pavé setting.',
    looks: [
      { lookNum: 15, name: 'Jardin d’Émeraude Imperial Collar', image: STAGE_IMAGES.look1 },
      { lookNum: 16, name: 'Soleil d’Or 24k Architectural Torque', image: STAGE_IMAGES.look2 },
      { lookNum: 17, name: 'Nuit de Ceylan Royal Sapphire Suite', image: STAGE_IMAGES.look3 },
      { lookNum: 18, name: 'Nacre Céleste South Sea Pearl Cascade', image: STAGE_IMAGES.look4 },
      { lookNum: 19, name: 'Calibre Vendôme Tourbillon & Diamonds', image: STAGE_IMAGES.look5 },
      { lookNum: 20, name: 'Étoile Polaire 10ct Diamond Rivière', image: STAGE_IMAGES.look6 }
    ],
    items: [
      { id: 'hj-15-1', lookNum: 15, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'hj-15-2', lookNum: 15, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'hj-16-1', lookNum: 16, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'hj-16-2', lookNum: 16, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'hj-17-1', lookNum: 17, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'hj-17-2', lookNum: 17, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'hj-18-1', lookNum: 18, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'hj-18-2', lookNum: 18, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 },
      { id: 'hj-19-1', lookNum: 19, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 },
      { id: 'hj-19-2', lookNum: 19, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 },
      { id: 'hj-20-1', lookNum: 20, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'hj-20-2', lookNum: 20, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 }
    ]
  },

  rings: {
    key: 'rings',
    title: 'Bagues & Solitaires',
    desc: 'GIA-certified Type IIa diamonds, vivid Colombian emeralds, and hand-forged platinum bands engineered to capture light from every angle.',
    counterLabel: 'Ring',
    shopCta: 'Shop this suite',
    footerLabel: 'Maison Vell Joaillerie — Rings',
    stageBg: 'linear-gradient(90deg,#f6f1f1 0%,#f0e8e8 38%,#f5efef 62%,#faf7f7 100%)',
    editorial: 'Each Maison Vell ring is hand-forged from 950 platinum or 18k ethical gold. Our master setters carve bespoke gallery under-bezels that allow 360-degree light entry into the heart of every gemstone.',
    looks: [
      { lookNum: 1, name: 'Étoile 8ct Oval Diamond Solitaire', image: STAGE_IMAGES.look6 },
      { lookNum: 2, name: 'Muzo Step-Cut Emerald Cocktail Suite', image: STAGE_IMAGES.look1 },
      { lookNum: 3, name: 'Ceylon Royal Sapphire Halo Suite', image: STAGE_IMAGES.look3 },
      { lookNum: 4, name: '24k Sculpted Gold & Pavé Signet Edit', image: STAGE_IMAGES.look2 },
      { lookNum: 5, name: 'Rose Gold & Pearl Imperial Ensemble', image: STAGE_IMAGES.look4 },
      { lookNum: 6, name: 'Baguette Eternity & Timepiece Pairing', image: STAGE_IMAGES.look5 }
    ],
    items: [
      { id: 'ring-1-1', lookNum: 1, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'ring-1-2', lookNum: 1, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 },
      { id: 'ring-2-1', lookNum: 2, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'ring-2-2', lookNum: 2, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'ring-3-1', lookNum: 3, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'ring-3-2', lookNum: 3, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'ring-4-1', lookNum: 4, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'ring-4-2', lookNum: 4, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'ring-5-1', lookNum: 5, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'ring-5-2', lookNum: 5, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 },
      { id: 'ring-6-1', lookNum: 6, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 },
      { id: 'ring-6-2', lookNum: 6, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 }
    ]
  },

  necklaces: {
    key: 'necklaces',
    title: 'Colliers & Rivières',
    desc: 'Articulated diamond rivières, sculpted 24k gold torques, and multi-strand South Sea pearl colliers that drape like liquid silk across the collarbone.',
    counterLabel: 'Collier',
    shopCta: 'Shop colliers',
    footerLabel: 'Maison Vell Joaillerie — Colliers',
    stageBg: 'linear-gradient(90deg,#f4f2ee 0%,#ece8e1 38%,#f2efe9 62%,#f9f8f5 100%)',
    editorial: 'A Maison Vell collier is engineered with ratusan micro-articulated links so that solid platinum and heavy gold move with the suppleness of haute couture fabric.',
    looks: [
      { lookNum: 7, name: 'Jardin d’Émeraude High-Jewelry Collier', image: STAGE_IMAGES.look1 },
      { lookNum: 8, name: 'Royal Kashmir Sapphire Pendant Suite', image: STAGE_IMAGES.look3 },
      { lookNum: 9, name: 'Nacre Céleste Baroque Pearl Opera Necklace', image: STAGE_IMAGES.look4 },
      { lookNum: 10, name: 'Soleil 24k Hammered Gold Choker', image: STAGE_IMAGES.look2 },
      { lookNum: 11, name: 'Étoile Polaire Graduated Diamond Rivière', image: STAGE_IMAGES.look6 },
      { lookNum: 12, name: 'Vendôme Rose Gold & Diamond Ensemble', image: STAGE_IMAGES.look5 }
    ],
    items: [
      { id: 'neck-7-1', lookNum: 7, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'neck-7-2', lookNum: 7, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'neck-8-1', lookNum: 8, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'neck-8-2', lookNum: 8, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'neck-9-1', lookNum: 9, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'neck-9-2', lookNum: 9, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 },
      { id: 'neck-10-1', lookNum: 10, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'neck-10-2', lookNum: 10, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'neck-11-1', lookNum: 11, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'neck-11-2', lookNum: 11, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 },
      { id: 'neck-12-1', lookNum: 12, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 },
      { id: 'neck-12-2', lookNum: 12, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 }
    ]
  },

  earrings: {
    key: 'earrings',
    title: 'Boucles d’Oreilles & Pendants',
    desc: ' kinetics of light in motion: pear-cut diamond chandeliers, Australian South Sea pearl drops, and hand-hammered 24k gold ear sculptures.',
    counterLabel: 'Edition',
    shopCta: 'Shop earrings',
    footerLabel: 'Maison Vell Joaillerie — Earrings',
    stageBg: 'linear-gradient(90deg,#f0f4f8 0%,#e5eef5 38%,#edf3f8 62%,#f7fafd 100%)',
    editorial: 'Designed to frame the visage with effortless poise, our chandelier and drop earrings balance dramatic carat weight with feather-light titanium-reinforced platinum clasps.',
    looks: [
      { lookNum: 21, name: 'Pear-Cut Diamond Chandelier Suite', image: STAGE_IMAGES.look6 },
      { lookNum: 22, name: 'South Sea Pearl & Rose Gold Drops', image: STAGE_IMAGES.look4 },
      { lookNum: 23, name: '24k Architectural Gold Ear Sculptures', image: STAGE_IMAGES.look2 },
      { lookNum: 24, name: 'Emerald & Pavé Diamond Cascade', image: STAGE_IMAGES.look1 },
      { lookNum: 25, name: 'Royal Sapphire & Marquise Drops', image: STAGE_IMAGES.look3 },
      { lookNum: 26, name: 'Rose Gold Diamond Pavé Suite', image: STAGE_IMAGES.look5 }
    ],
    items: [
      { id: 'ear-21-1', lookNum: 21, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 },
      { id: 'ear-21-2', lookNum: 21, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'ear-22-1', lookNum: 22, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'ear-22-2', lookNum: 22, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 },
      { id: 'ear-23-1', lookNum: 23, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'ear-23-2', lookNum: 23, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'ear-24-1', lookNum: 24, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'ear-24-2', lookNum: 24, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'ear-25-1', lookNum: 25, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'ear-25-2', lookNum: 25, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'ear-26-1', lookNum: 26, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 },
      { id: 'ear-26-2', lookNum: 26, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 }
    ]
  },

  bracelets: {
    key: 'bracelets',
    title: 'Bracelets & Manchettes',
    desc: 'Sculptural 24k gold cuffs, calibrated baguette diamond tennis bracelets, and luminous Akoya pearl strands.',
    counterLabel: 'Manchette',
    shopCta: 'Shop bracelets',
    footerLabel: 'Maison Vell Joaillerie — Manchettes',
    stageBg: 'linear-gradient(90deg,#eef3f6 0%,#e4ecf2 38%,#ecf2f6 62%,#f5f8fa 100%)',
    editorial: 'From bold hammered-gold cuffs inspired by classical antiquity to invisible-set diamond rivières, every Maison Vell bracelet is fitted with a concealed security clasp.',
    looks: [
      { lookNum: 1, name: 'Soleil 24k Gold & Pavé Manchette', image: STAGE_IMAGES.look2 },
      { lookNum: 2, name: 'Baguette Diamond Eternity Line', image: STAGE_IMAGES.look5 },
      { lookNum: 3, name: 'Double-Strand Akoya Pearl & Rose Gold', image: STAGE_IMAGES.look4 },
      { lookNum: 4, name: 'Muzo Emerald & Platinum Wrist Suite', image: STAGE_IMAGES.look1 },
      { lookNum: 5, name: 'Ceylon Sapphire & Diamond Line', image: STAGE_IMAGES.look3 },
      { lookNum: 6, name: 'Bridal Diamond Rivière Suite', image: STAGE_IMAGES.look6 }
    ],
    items: [
      { id: 'brac-1-1', lookNum: 1, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'brac-1-2', lookNum: 1, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'brac-2-1', lookNum: 2, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 },
      { id: 'brac-2-2', lookNum: 2, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 },
      { id: 'brac-3-1', lookNum: 3, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 },
      { id: 'brac-3-2', lookNum: 3, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'brac-4-1', lookNum: 4, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'brac-4-2', lookNum: 4, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'brac-5-1', lookNum: 5, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'brac-5-2', lookNum: 5, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'brac-6-1', lookNum: 6, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'brac-6-2', lookNum: 6, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 }
    ]
  },

  timepieces: {
    key: 'timepieces',
    title: 'Haute Horlogerie',
    desc: ' Geneva-hallmarked flying tourbillons, openworked rose gold bridges, and baguette-cut diamond bezels crafted in our Swiss manufacture.',
    counterLabel: 'Calibre',
    shopCta: 'Acquire timepiece',
    footerLabel: 'Maison Vell Horlogerie — Geneva',
    stageBg: 'linear-gradient(90deg,#f3f1ee 0%,#eae6e0 38%,#f0ede8 62%,#f8f7f5 100%)',
    editorial: 'Uniting Geneva mechanical horology with Parisian high-jewelry stone setting, every Maison Vell timepiece is assembled by a single master watchmaker over nine months.',
    looks: [
      { lookNum: 1, name: 'Calibre MV-01 Rose Gold Skeleton Tourbillon', image: STAGE_IMAGES.look5 },
      { lookNum: 2, name: 'L’Impératrice Emerald & Diamond Secret Watch', image: STAGE_IMAGES.look1 },
      { lookNum: 3, name: 'Soleil d’Or 24k Cuff Timepiece Suite', image: STAGE_IMAGES.look2 },
      { lookNum: 4, name: 'Astrale Sapphire & Platinum Tourbillon', image: STAGE_IMAGES.look3 },
      { lookNum: 5, name: 'Nacre & Rose Gold Jewellery Watch Edit', image: STAGE_IMAGES.look4 },
      { lookNum: 6, name: 'Platine Baguette Diamond Haute Joaillerie', image: STAGE_IMAGES.look6 }
    ],
    items: [
      { id: 'time-1-1', lookNum: 1, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 },
      { id: 'time-1-2', lookNum: 1, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 },
      { id: 'time-2-1', lookNum: 2, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'time-2-2', lookNum: 2, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'time-3-1', lookNum: 3, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'time-3-2', lookNum: 3, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'time-4-1', lookNum: 4, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'time-4-2', lookNum: 4, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'time-5-1', lookNum: 5, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 },
      { id: 'time-5-2', lookNum: 5, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'time-6-1', lookNum: 6, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'time-6-2', lookNum: 6, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 }
    ]
  },

  bridal: {
    key: 'bridal',
    title: 'Mariage & Engagement',
    desc: 'D-flawless solitaire engagement rings, diamond rivières, and luminous South Sea pearl parures conceived for eternal milestones.',
    counterLabel: 'Suite',
    shopCta: 'Shop bridal suite',
    footerLabel: 'Maison Vell Bridal Salon',
    stageBg: 'linear-gradient(90deg,#eff5f2 0%,#e5efe9 38%,#edf4f0 62%,#f6faf8 100%)',
    editorial: 'Every Maison Vell bridal diamond is hand-selected for D-to-F color and Internally Flawless clarity, accompanied by a bespoke Place Vendôme leather presentation trunk.',
    looks: [
      { lookNum: 1, name: 'Étoile Polaire 10ct Diamond Bridal Suite', image: STAGE_IMAGES.look6 },
      { lookNum: 2, name: 'Nacre Céleste Pearl & Rose Gold Parure', image: STAGE_IMAGES.look4 },
      { lookNum: 3, name: 'Royal Blue Sapphire “Something Blue” Suite', image: STAGE_IMAGES.look3 },
      { lookNum: 4, name: 'Jardin d’Émeraude Imperial Gala Suite', image: STAGE_IMAGES.look1 },
      { lookNum: 5, name: 'Soleil d’Or 24k Ceremonial Gold Suite', image: STAGE_IMAGES.look2 },
      { lookNum: 6, name: 'His & Hers Haute Horlogerie Bridal Edit', image: STAGE_IMAGES.look5 }
    ],
    items: [
      { id: 'bridal-1-1', lookNum: 1, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'bridal-1-2', lookNum: 1, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 },
      { id: 'bridal-2-1', lookNum: 2, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'bridal-2-2', lookNum: 2, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 },
      { id: 'bridal-3-1', lookNum: 3, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'bridal-3-2', lookNum: 3, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'bridal-4-1', lookNum: 4, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'bridal-4-2', lookNum: 4, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'bridal-5-1', lookNum: 5, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'bridal-5-2', lookNum: 5, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'bridal-6-1', lookNum: 6, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 },
      { id: 'bridal-6-2', lookNum: 6, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 }
    ]
  },

  maison: {
    key: 'maison',
    title: 'The Maison & Savoir-Faire',
    desc: 'Established at 14 Place Vendôme, Maison Vell unites high-jewelry lapidary artistry, architectural goldsmithing, and Geneva haute horlogerie.',
    counterLabel: 'Archive',
    shopCta: 'Acquire archival piece',
    footerLabel: '14 Place Vendôme, Paris',
    stageBg: 'linear-gradient(90deg,#f3f1ee 0%,#eae6e0 38%,#f0ede8 62%,#f8f7f5 100%)',
    editorial: 'In our sunlit workshops overlooking Place Vendôme, master lapidaries, gemologists, and goldsmiths transform rough stones into timeless heirlooms.',
    looks: [
      { lookNum: 1, name: 'Pillar I: Muzo Emerald Lapidary Mastery', image: STAGE_IMAGES.look1 },
      { lookNum: 2, name: 'Pillar II: 24k Architectural Goldsmithing', image: STAGE_IMAGES.look2 },
      { lookNum: 3, name: 'Pillar III: Kashmir & Ceylon Sapphires', image: STAGE_IMAGES.look3 },
      { lookNum: 4, name: 'Pillar IV: South Sea Nacre & Rose Gold', image: STAGE_IMAGES.look4 },
      { lookNum: 5, name: 'Pillar V: Geneva Skeleton Horology', image: STAGE_IMAGES.look5 },
      { lookNum: 6, name: 'Pillar VI: Type IIa Diamond Brilliance', image: STAGE_IMAGES.look6 }
    ],
    items: [
      { id: 'maison-1-1', lookNum: 1, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'maison-1-2', lookNum: 1, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'maison-2-1', lookNum: 2, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'maison-2-2', lookNum: 2, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'maison-3-1', lookNum: 3, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'maison-3-2', lookNum: 3, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'maison-4-1', lookNum: 4, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'maison-4-2', lookNum: 4, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 },
      { id: 'maison-5-1', lookNum: 5, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 },
      { id: 'maison-5-2', lookNum: 5, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 },
      { id: 'maison-6-1', lookNum: 6, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'maison-6-2', lookNum: 6, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 }
    ]
  },

  lookbook: {
    key: 'lookbook',
    title: 'High Jewelry Lookbook 2027',
    desc: 'An intimate visual study of refraction, fire, and sculptural proportion across the complete Maison Vell Haute Joaillerie archive.',
    counterLabel: 'Plate',
    shopCta: 'Shop this plate',
    footerLabel: 'Maison Vell Joaillerie Lookbook',
    stageBg: 'linear-gradient(90deg,#edf2f7 0%,#e2eaf2 38%,#ebf1f6 62%,#f4f8fb 100%)',
    editorial: 'Photographed on custom porcelain bust sculptures, the 2027 High Jewelry Lookbook pairs our statement colliers with their companion rings, bracelets, and earrings.',
    looks: [
      { lookNum: 1, name: 'Plate I: Diamond Rivière & Oval Solitaire', image: STAGE_IMAGES.look6 },
      { lookNum: 2, name: 'Plate II: Royal Sapphire Diadem & Halo', image: STAGE_IMAGES.look3 },
      { lookNum: 3, name: 'Plate III: 24k Gold Torque & Manchette', image: STAGE_IMAGES.look2 },
      { lookNum: 4, name: 'Plate IV: Muzo Emerald Collar & Step-Cut', image: STAGE_IMAGES.look1 },
      { lookNum: 5, name: 'Plate V: Rose Gold Tourbillon & Baguettes', image: STAGE_IMAGES.look5 },
      { lookNum: 6, name: 'Plate VI: South Sea Pearls & Chandeliers', image: STAGE_IMAGES.look4 }
    ],
    items: [
      { id: 'lb-1-1', lookNum: 1, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'lb-1-2', lookNum: 1, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 },
      { id: 'lb-2-1', lookNum: 2, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'lb-2-2', lookNum: 2, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'lb-3-1', lookNum: 3, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'lb-3-2', lookNum: 3, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'lb-4-1', lookNum: 4, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'lb-4-2', lookNum: 4, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'lb-5-1', lookNum: 5, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 },
      { id: 'lb-5-2', lookNum: 5, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 },
      { id: 'lb-6-1', lookNum: 6, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'lb-6-2', lookNum: 6, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 }
    ]
  },

  shop: {
    key: 'shop',
    title: 'Place Vendôme Boutique Edit',
    desc: 'Immediate salon availability across our most coveted diamond solitaires, emerald colliers, 24k gold cuffs, and Geneva tourbillons.',
    counterLabel: 'Edit',
    shopCta: 'Add edit to bag',
    footerLabel: 'Maison Vell Flagship Salon',
    stageBg: 'linear-gradient(90deg,#f2f5f9 0%,#e9eff5 38%,#f0f4f8 62%,#f8fafc 100%)',
    editorial: 'Curated by our Place Vendôme Salon directors, the Boutique Edit brings together six icons across Haute Joaillerie and Horlogerie ready for armoured white-glove dispatch.',
    looks: [
      { lookNum: 1, name: 'Icon 01: Jardin d’Émeraude Collar & Ring', image: STAGE_IMAGES.look1 },
      { lookNum: 2, name: 'Icon 02: Soleil 24k Gold Torque & Cuff', image: STAGE_IMAGES.look2 },
      { lookNum: 3, name: 'Icon 03: Nuit de Ceylan Sapphire Parure', image: STAGE_IMAGES.look3 },
      { lookNum: 4, name: 'Icon 04: Nacre Céleste South Sea Pearl Set', image: STAGE_IMAGES.look4 },
      { lookNum: 5, name: 'Icon 05: Calibre Vendôme Rose Gold Tourbillon', image: STAGE_IMAGES.look5 },
      { lookNum: 6, name: 'Icon 06: Étoile 10ct Diamond Bridal Suite', image: STAGE_IMAGES.look6 }
    ],
    items: [
      { id: 'shop-1-1', lookNum: 1, name: 'Muzo Emerald & Diamond Collier', price: '$48,000', priceNum: 48000, image: PIECE_IMAGES.piece1 },
      { id: 'shop-1-2', lookNum: 1, name: 'Octagon Emerald Platinum Ring', price: '$19,500', priceNum: 19500, image: PIECE_IMAGES.piece2 },
      { id: 'shop-2-1', lookNum: 2, name: '24k Sculpted Gold & Pavé Cuff', price: '$14,200', priceNum: 14200, image: PIECE_IMAGES.piece3 },
      { id: 'shop-2-2', lookNum: 2, name: 'Architectural Gold Drop Earrings', price: '$6,800', priceNum: 6800, image: PIECE_IMAGES.piece4 },
      { id: 'shop-3-1', lookNum: 3, name: 'Royal Kashmir Sapphire Pendant', price: '$32,000', priceNum: 32000, image: PIECE_IMAGES.piece5 },
      { id: 'shop-3-2', lookNum: 3, name: 'Velvet Sapphire Halo Ring', price: '$21,400', priceNum: 21400, image: PIECE_IMAGES.piece6 },
      { id: 'shop-4-1', lookNum: 4, name: 'South Sea Pearl Chandelier Drops', price: '$8,900', priceNum: 8900, image: PIECE_IMAGES.piece7 },
      { id: 'shop-4-2', lookNum: 4, name: 'Double-Strand Akoya Pearl Bracelet', price: '$7,400', priceNum: 7400, image: PIECE_IMAGES.piece8 },
      { id: 'shop-5-1', lookNum: 5, name: 'Rose Gold Skeleton Tourbillon', price: '$64,000', priceNum: 64000, image: PIECE_IMAGES.piece9 },
      { id: 'shop-5-2', lookNum: 5, name: 'Baguette Diamond Tennis Bracelet', price: '$18,600', priceNum: 18600, image: PIECE_IMAGES.piece10 },
      { id: 'shop-6-1', lookNum: 6, name: '8ct Oval Diamond Solitaire Ring', price: '$52,000', priceNum: 52000, image: PIECE_IMAGES.piece11 },
      { id: 'shop-6-2', lookNum: 6, name: 'Pear-Cut Diamond Bridal Chandeliers', price: '$24,500', priceNum: 24500, image: PIECE_IMAGES.piece12 }
    ]
  }
};

// Depth table stops from d = -1 (leaving past the rail) to d = 5 (arriving out of the haze)
export const KX = [1.2, 0.744, 0.496, 0.346, 0.235, 0.15, 0.085];
export const KF = [1.14, 0.89, 0.777, 0.704, 0.651, 0.616, 0.59];
export const KH = [1.18, 0.832, 0.574, 0.436, 0.334, 0.258, 0.19];
export const KB = [0, 0, 1.5, 4, 8, 12, 17];
export const KO = [1, 1, 1, 1, 0.86, 0.5, 0];


export interface Look {
  lookNum: number;
  name: string;
  /**
   * Direct image path (e.g. '/jewelry-images/stage/look-1.png')
   * Just change this path to swap the image! No crop coordinates needed.
   */
  image: string;
  /** Optional aspect ratio (width / height). Auto-detected if omitted. */
  aspectRatio?: number;
}

export interface Item {
  id: string;
  lookNum: number;
  name: string;
  price: string;
  priceNum: number;
  /**
   * Direct image path (e.g. '/jewelry-images/pieces/piece-1.png')
   * Just change this path to swap the product image!
   */
  image: string;
  catKey?: string;
  catTitle?: string;
  lookIdx?: number;
}

export interface BespokeConfig {
  metal: '950 Platinum' | '18k Yellow Gold' | '18k Rose Gold';
  size: string;
  engraving: string;
}

export interface Category {
  key: string;
  title: string;
  desc: string;
  counterLabel: string;
  shopCta: string;
  footerLabel: string;
  stageBg: string;
  editorial: string;
  looks: Look[];
  items: Item[];
}

export type CategoriesMap = Record<string, Category>;

export type ModalType =
  | null
  | 'cart'
  | 'wishlist'
  | 'search'
  | 'lookbook'
  | 'add-look'
  | 'story'
  | 'account'
  | 'bespoke';

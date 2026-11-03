export interface CropBox {
  a: number;
  b: number;
  y0?: number;
  y1?: number;
  c?: number;
  d?: number;
  sheetW?: number;
  sheetH?: number;
  sheetKey: string;
}

export interface Look extends CropBox {
  lookNum: number;
  name: string;
}

export interface Item extends CropBox {
  id: string;
  lookNum: number;
  name: string;
  price: string;
  priceNum: number;
  catKey?: string;
  catTitle?: string;
  lookIdx?: number;
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
  | 'account';


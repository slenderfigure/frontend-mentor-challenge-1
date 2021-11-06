export type ProductImage = { 
  thumbnail: string;
  original: string 
};

export type ProductMedia = {
  images: { thumbnail: string, original: string }[]
}

export interface Product {
  id: number;
  name: string;
  vendor: string;
  description: string;
  stockPrice: number;
  currentPrice: number;
  media: ProductMedia
  stock: number;
  discounted?: boolean;
}

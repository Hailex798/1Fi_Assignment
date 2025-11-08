export interface ProductCard {
  name: string;
  brand: string;
  slug: string;
  image: string;
  priceRange: { min: number; max: number };
}

export interface Variant {
  _id: string;
  name: string;
  mrp: number;
  price: number;
  images: string[];
}

export interface ProductDetail {
  _id: string;
  name: string;
  brand: string;
  slug: string;
  description?: string;
  variants: Variant[];
}

export interface EMIPlan {
  _id: string;
  tenureMonths: number;
  interestAPR: number;
  monthlyAmount: number;
  cashback?: number;
  provider?: string;
}

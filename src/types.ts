export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductSize {
  id: number;
  size: number;
}

export interface ProductColor {
  id: number;
  color: string;
}

export interface Product {
  id: string;
  created_at: string;
  brand: string;
  name: string;
  price: number;
  images: ProductImage[];
  sizes: ProductSize[];
  colors: ProductColor[];
}

export interface WilayaTarif {
  id: number;
  wilaya: string;
  office_delevery_classique: number;
  home_delevery_classic: number;
}

export interface Carts {
  id: string;
  created_at: string;
  user_id: string;
  updated_at: string;
}


export interface CartItems {
  cart_id: string;
  color: string;
  created_at: string;
  id: string;
  product_id: string;
  products: Product;
  quantity: number;
  size: number;
}
export type Commune = {
  id: number;
  commune: string;
  wilaya_id: number;
};
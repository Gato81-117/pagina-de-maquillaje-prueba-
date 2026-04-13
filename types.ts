export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice: number;
  wholesaleMin: number;
  category: string;
  image: string;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

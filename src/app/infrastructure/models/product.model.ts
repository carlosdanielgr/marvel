export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  isFavorite: boolean;
  modified: string;
  productId: string;
}

export interface Favorite {
  id: string;
  productId: string;
  userId: string;
}

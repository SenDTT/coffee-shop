export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  stock: number;
  images: string[];
  active: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
}

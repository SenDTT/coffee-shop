import { Category } from "./Product";

export interface Ingredient {
  _id: string;
  name: string;
  price: number;
  sku: string;
  description: string;
  category: Category;
  stock: number;
  images: string[];
  active: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

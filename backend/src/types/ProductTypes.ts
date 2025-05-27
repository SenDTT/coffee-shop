import { Category } from "../models/Category";

export interface IProductRequest {
  name: string;
  price: number;
  description: string;
  categoryId: string;
  stock: number;
  material: string;
  sku: string;
}

export interface IProductImages {
  images: string[];
}

export interface IProduct {
  name: string;
  price: number;
  description: string;
  category: Category;
  stock: number;
  images?: string[];
  material: string;
  sku: string;
}
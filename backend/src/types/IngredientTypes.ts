import { Category } from "../models/Category";
import { IProduct, IProductRequest } from "./ProductTypes";

export interface IIngredientRequest
  extends Pick<
    IProductRequest,
    | "name"
    | "price"
    | "description"
    | "categoryId"
    | "stock"
    | "sku"
    | "images"
    | "deletedImages"
  > {}

export interface IIngredientImages {
  images: string[];
}

export interface IIngredient {
  name: string;
  price: number;
  description: string;
  category: Category;
  stock: number;
  images?: string[];
  sku: string;
}

export interface IDeleteMultipleIngredientsRequest {
  ids: string[];
}

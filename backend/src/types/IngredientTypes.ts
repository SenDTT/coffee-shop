import { IProduct, IProductRequest } from "./ProductTypes";

export interface IIngredientRequest
  extends Pick<
    IProductRequest,
    "name" | "price" | "description" | "categoryId" | "stock" | "sku"
  > {}

export interface IIngredientImages {
  images: string[];
}

export interface IIngredient
  extends Pick<
    IProduct,
    "name" | "price" | "description" | "category" | "stock" | "sku" | "images"
  > {}

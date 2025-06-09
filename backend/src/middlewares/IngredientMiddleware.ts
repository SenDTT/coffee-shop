import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import validator from "validator";
import { getCategoryById } from "../services/CategoryService";
import { IIngredientRequest } from "../types/IngredientTypes";
import { Ingredient } from "../models/Ingredient";
import {
  getProductBySKU,
  getIngredientById,
} from "../services/IngredientService";

export const add_ingredient_validator: RequestHandler<
  { id?: string },
  IResponseData | IErrorResponse,
  IIngredientRequest
> = async (req, res, next) => {
  const { name, price, description, stock, categoryId, sku } = req.body;
  const errors: Record<string, string> = {};
  const { id } = req.params;

  if (typeof id === "undefined") {
    const existingProduct = await getProductBySKU(sku);
    if (existingProduct) {
      errors.sku = "SKU must be unique. This SKU already exists.";
    }
  }

  if (validator.isEmpty(name)) {
    errors.name = "Name is required";
  }

  if (validator.isEmpty(description)) {
    errors.description = "Description is required";
  }

  if (validator.isEmpty(categoryId)) {
    errors.categoryId = "Category is required";
  }

  if (validator.isEmpty(sku) || validator.isEmpty(sku.split("-")[1])) {
    errors.sku = "SKU is required";
  }

  if (!validator.isFloat(price.toString())) {
    errors.price = "Price must be a valid number";
  }

  if (!validator.isNumeric(stock.toString())) {
    errors.stock = "Stock must be a valid number";
  }

  if (categoryId) {
    const category = await getCategoryById(categoryId);
    if (!category) {
      errors.categoryId = "Category does not exist";
    }
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      success: false,
      errors,
      message: "Validate Errors",
    });
    return;
  }
  next();
};

export const is_existed_validator: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const { id } = req.params;

  const model: Ingredient | null = await getIngredientById(id);
  if (model === null) {
    res.status(404).json({
      success: false,
      message: "is_existed_validator The Ingredient is not existed",
    });
    return;
  }
  next();
};

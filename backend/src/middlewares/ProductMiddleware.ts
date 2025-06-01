import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import validator from "validator";
import { IProductRequest } from "../types/ProductTypes";
import { Product } from "../models/Product";
import { getProductById, getProductBySKU } from "../services/ProductService";
import { getCategoryById } from "../services/CategoryService";

export const add_product_validator: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  IProductRequest
> = async (req, res, next) => {
  const { name, price, description, stock, categoryId, material, sku } =
    req.body;
  const errors: Record<string, string> = {};

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

  if (validator.isEmpty(material)) {
    errors.material = "Material must be required";
  }

  if (!validator.isNumeric(stock.toString())) {
    errors.stock = "Stock must be a valid number";
  }

  const existingProduct = await getProductBySKU(sku);
  if (existingProduct) {
    errors.sku = "SKU must be unique. This SKU already exists.";
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

  const model: Product | null = await getProductById(id);
  if (model === null) {
    res.status(404).json({
      success: false,
      message: "is_existed_validator The Product is not existed",
    });
    return;
  }
  next();
};

import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import validator from "validator";
import { IProductRequest } from "../types/ProductTypes";
import { Product } from "../models/Product";
import { getProductById } from "../services/ProductService";
import { getCategoryById } from "../services/CategoryService";

export const add_product_validator: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  IProductRequest
> = async (req, res, next) => {
  const { name, price, description, stock, categoryId } = req.body;

  if (validator.isEmpty(name) || validator.isEmpty(description)) {
    res
      .status(400)
      .json({
        success: false,
        message: "Name and Description fields must be requried",
      });
    return;
  }

  if (
    !validator.isCurrency(price.toString()) ||
    !validator.isNumeric(stock.toString())
  ) {
    res.status(400).json({
      success: false,
      message: "Price and Stock fields must be number",
    });
    return;
  }

  const category = await getCategoryById(categoryId);
  if (!category) {
    res.status(400).json({
      success: false,
      message: "Category is not existed",
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
    res
      .status(404)
      .json({
        success: false,
        message: "is_existed_validator The Product is not existed",
      });
    return;
  }
  next();
};

import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import validator from "validator";
import { getCategoryById } from "../services/CategoryService";
import { IIngredientRequest } from "../types/IngredientTypes";
import { Ingredient } from "../models/Ingredient";
import { getIngredientById } from "../services/IngredientService";

export const add_ingredient_validator: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  IIngredientRequest
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

  const model: Ingredient | null = await getIngredientById(id);
  if (model === null) {
    res
      .status(404)
      .json({
        success: false,
        message: "is_existed_validator The Ingredient is not existed",
      });
    return;
  }
  next();
};

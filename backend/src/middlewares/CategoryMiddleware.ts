import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import { ICategory } from "../types/CategoryTypes";
import validator from "validator";
import { getCategoryById } from "../services/CategoryService";
import { Category } from "../models/Category";

export const add_category_validator: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  ICategory
> = async (req, res, next) => {
  const { name, description, type } = req.body;

  if (
    validator.isEmpty(name) ||
    validator.isEmpty(description) ||
    validator.isEmpty(type)
  ) {
    res
      .status(400)
      .json({ success: false, message: "The fields must be requried" });
    return;
  }

  next();
};

export const edit_category_validator: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse,
  ICategory
> = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const model: Category | null = await getCategoryById(id);
  if (model === null) {
    res
      .status(404)
      .json({ success: false, message: "The Category is not existed" });
    return;
  }

  if (validator.isEmpty(name) || validator.isEmpty(description)) {
    res
      .status(400)
      .json({ success: false, message: "Both fields must be requried" });
    return;
  }

  next();
};

export const is_existed_validator: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const { id } = req.params;

  const model: Category | null = await getCategoryById(id);
  if (model === null) {
    res
      .status(404)
      .json({ success: false, message: "The Category is not existed" });
    return;
  }
  next();
};

import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import { ICategory } from "../types/CategoryTypes";
import {
    activeOrDeactiveCategory,
  addCatetory,
  deleteCatetory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../services/CategoryService";

export const addCategoryController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  ICategory
> = async (req, res, next) => {
  try {
    const catetory = await addCatetory(req.body);
    res.json({ success: true, data: catetory });
  } catch (err) {
    next(err);
  }
};

export const updateCategoryController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse,
  ICategory
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    await updateCategory(id, req.body);

    const newModel = await getCategoryById(id);

    res.json({ success: true, data: newModel });
  } catch (err) {
    next(err);
  }
};

export const getAllCategoriesController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const catetories = await getAllCategories();
    res.json({ success: true, data: catetories });
  } catch (err) {
    next(err);
  }
};

export const activeOrDeactiveCategoryController: RequestHandler<{id: string}, IResponseData | IErrorResponse> = async (req, res, next) => {
    const { id } = req.params;
    try {
        const newModel = await getCategoryById(id);
        if (!newModel) {
            res.status(404).json({ success: false, message: "Category is not existed." });
            return;
        }

        await activeOrDeactiveCategory(id, newModel?.active ? 0 : 1);

        res.json({
          success: true,
          data: null,
          message: (newModel?.active ? "Active" : "Deactive") + " Category Successfully",
        });
    } catch (err) {

    }
}

export const deleteCategoryController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteCatetory(id);
    res.json({
      success: true,
      data: null,
      message: "Deleted Category Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getCategoryController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getCategoryById(id);
    res.json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};
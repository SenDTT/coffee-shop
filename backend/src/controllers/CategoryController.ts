import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import {
  ICategory,
  IDeleteMultipleCategoriesRequest,
} from "../types/CategoryTypes";
import {
  activeOrDeactiveCategory,
  addCatetory,
  deleteCatetory,
  deleteMutipleCategories,
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
    const { name, description, type, parentId } = req.body;
    let data: any = {
      name,
      description,
      type,
    };

    if (parentId) {
      const parent = await getCategoryById(parentId);
      if (parent == null) {
        res
          .status(400)
          .json({ success: false, message: "Parent Category is not found" });
        return;
      }

      data.parent = parent;
    }

    const catetory = await addCatetory(data);
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
  const { name, description, type, parentId } = req.body;
  let data: any = {
    name,
    description,
    type,
  };

  if (parentId) {
    const parent = await getCategoryById(parentId);
    if (parent == null) {
      res
        .status(400)
        .json({ success: false, message: "Parent Category is not found" });
      return;
    }

    data.parent = parent;
  }

  try {
    await updateCategory(id, data);

    const newModel = await getCategoryById(id);

    res.json({ success: true, data: newModel });
  } catch (err) {
    next(err);
  }
};

export const getAllCategoriesController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  {
    limit: number;
    skip: number;
    search?: string;
    type?: string;
  }
> = async (req, res, next) => {
  try {
    const { skip, limit, search } = req.query;
    const filter: Record<string, any> = {};
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
    if (req.query.type) {
      filter.type = req.query.type;
    }
    const catetories = await getAllCategories(
      filter,
      Number(skip) || 0,
      Number(limit) || 10
    );
    res.json({ success: true, data: catetories });
  } catch (err) {
    next(err);
  }
};

export const activeOrDeactiveCategoryController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const newModel = await getCategoryById(id);
    if (!newModel) {
      res
        .status(404)
        .json({ success: false, message: "Category is not existed." });
      return;
    }

    await activeOrDeactiveCategory(id, newModel?.active ? 0 : 1);

    res.json({
      success: true,
      data: null,
      message:
        (!newModel?.active ? "Active" : "Deactive") + " Category Successfully",
    });
  } catch (err) {}
};

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

export const deleteMultiCategoriesController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  IDeleteMultipleCategoriesRequest
> = async (req, res, next) => {
  try {
    const { ids } = req.body;

    await deleteMutipleCategories(ids);
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
      data,
    });
  } catch (err) {
    next(err);
  }
};

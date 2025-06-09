import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import { getCategoryById } from "../services/CategoryService";
import fs from "fs";
import path from "path";
import {
  IDeleteMultipleIngredientsRequest,
  IIngredientRequest,
} from "../types/IngredientTypes";
import {
  activeOrDeactiveIngredient,
  addImagesIngredient,
  addIngredient,
  deleteIngredient,
  deleteMutipleIngredients,
  getAllIngredients,
  getIngredientById,
  updateIngredient,
} from "../services/IngredientService";
import { unlinkImages } from "./ProductController";

export const addIngredientController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  IIngredientRequest
> = async (req, res, next) => {
  try {
    const { categoryId } = req.body;

    const category = await getCategoryById(categoryId);
    if (category == null) {
      res
        .status(400)
        .json({ success: false, message: "Category is not found" });
      return;
    }

    const newImages = req.files as Express.Multer.File[];
    let imageUrls: string[] = [];
    if (newImages) {
      imageUrls = newImages.map((file) => file.path);
    }

    const ingredient = await addIngredient({
      ...req.body,
      images: imageUrls,
      category,
    });
    res.json({ success: true, data: ingredient });
  } catch (err) {
    next(err);
  }
};

export const updateIngredientController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse,
  IIngredientRequest
> = async (req, res, next) => {
  const { id } = req.params;
  const { categoryId, deletedImages } = req.body;
  try {
    const category = await getCategoryById(categoryId);
    let model = await getIngredientById(id);
    if (category == null) {
      res
        .status(400)
        .json({ success: false, message: "Category is not found" });
      return;
    }

    const newImages = req.files as Express.Multer.File[];
    let imageUrls: string[] = [];
    if (newImages) {
      imageUrls = newImages.map((file) => file.path);
    }

    // delete images
    let images = model.images;
    if (deletedImages && deletedImages.length > 0) {
      unlinkImages(deletedImages);

      images = images.filter((item) => !deletedImages.includes(item));
    }

    await updateIngredient(id, {
      ...req.body,
      images: [...images, ...imageUrls],
      category,
    });

    const newModel = await getIngredientById(id);

    res.json({ success: true, data: newModel });
  } catch (err) {
    next(err);
  }
};

export const getAllIngredientsController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  { limit: number; skip: number; search?: string }
> = async (req, res, next) => {
  try {
    const { limit, skip, search } = req.query;

    const filter: Record<string, any> = {};

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    const data = await getAllIngredients(
      filter,
      Number(skip) || 0,
      Number(limit) || 10
    );
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const activeOrDeactiveIngredientController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const newModel = await getIngredientById(id);
    if (!newModel) {
      res
        .status(404)
        .json({ success: false, message: "Ingredient is not existed." });
      return;
    }

    await activeOrDeactiveIngredient(id, newModel?.active ? 0 : 1);

    res.json({
      success: true,
      data: null,
      message:
        (!newModel?.active ? "Active" : "Deactive") +
        " Ingredient Successfully",
    });
  } catch (err) {}
};

export const deleteMultiIngredientsController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  IDeleteMultipleIngredientsRequest
> = async (req, res, next) => {
  try {
    const { ids } = req.body;

    await deleteMutipleIngredients(ids);
    res.json({
      success: true,
      data: null,
      message: "Deleted Ingredient Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteIngredientController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteIngredient(id);
    res.json({
      success: true,
      data: null,
      message: "Deleted Ingredient Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getIngredientController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getIngredientById(id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const addIngredientImageController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const newModel = await getIngredientById(id);
    if (!newModel) {
      res
        .status(404)
        .json({ success: false, message: "Ingredient is not existed." });
      return;
    }

    const newImages = req.files as Express.Multer.File[];
    if (newImages) {
      const imageUrls = newImages.map((file) => file.path);

      await addImagesIngredient(id, {
        images: [...newModel.images, ...imageUrls],
      });
    }
    const updatedIngredient = await getIngredientById(id);

    res.json({ success: true, data: updatedIngredient });
  } catch (err) {
    next(err);
  }
};

export const deleteIngredientImageController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse,
  { image: string }
> = async (req, res, next) => {
  const { id } = req.params;
  const image_path = req.body?.image;
  try {
    const ingredient = await getIngredientById(id);
    if (!ingredient) {
      res
        .status(404)
        .json({ success: false, message: "Ingredient is not existed." });
      return;
    }

    if (!ingredient.images.includes(image_path)) {
      res.status(404).json({
        success: false,
        message: "Image not found for this ingredient.",
      });
      return;
    }

    const newImages = ingredient.images.filter((item) => item !== image_path);
    await addImagesIngredient(id, {
      images: newImages,
    });

    const filePath = path.join(__dirname, "uploads", image_path);

    // Check if the file exists before attempting to delete
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        console.log(`Image ${image_path} has been deleted.`);
      }
    });
    const updatedIngredient = await getIngredientById(id);

    res.json({ success: true, data: updatedIngredient });
  } catch (err) {
    next(err);
  }
};

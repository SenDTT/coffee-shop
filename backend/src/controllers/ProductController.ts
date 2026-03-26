import { RequestHandler } from "express";
import { IErrorResponse, IResponseData } from "../types/Common";
import {
  IDeleteMultipleProductsRequest,
  IProductRequest,
} from "../types/ProductTypes";
import {
  activeOrDeactiveProduct,
  addImagesProduct,
  addProduct,
  deleteMutipleProducts,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/ProductService";
import { getCategoryById } from "../services/CategoryService";
import fs from "fs";
import path from "path";
import { ProductModel } from "../models/Product";
import mongoose from "mongoose";

const uploadsDir = path.join(process.cwd());

export const unlinkImages = (images: string[]) => {
  for (const image_path of images) {
    const filePath = path.join(uploadsDir, image_path);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      } else {
        console.log(`Image ${filePath} has been deleted.`);
      }
    });
  }
};

export const addProductController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  IProductRequest
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

    const product = await addProduct({
      ...req.body,
      images: imageUrls,
      category,
    });
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const updateProductController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse,
  IProductRequest
> = async (req, res, next) => {
  const { id } = req.params;
  const { categoryId, deletedImages } = req.body;
  try {
    const category = await getCategoryById(categoryId);
    let model = await getProductById(id);
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

    await updateProduct(id, {
      ...req.body,
      images: [...images, ...imageUrls],
      category,
    });

    model = await getProductById(id); // refresh

    res.json({ success: true, data: model, message: "Updated Product Successfully" });
  } catch (err) {
    next(err);
  }
};

export const getAllProductsController: RequestHandler<
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

    const data = await getAllProducts(
      filter,
      Number(skip) || 0,
      Number(limit) || 10
    );
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getMockRecommendationController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  {
    customerName?: string;
    mood?: string;
    temperature?: "hot" | "iced";
    category?: string;
  }
> = async (req, res, next) => {
  try {
    const { customerName, mood, temperature, category } = req.body;

    const normalizedTemperature = temperature === "iced" ? "iced" : "hot";
    const normalizedCategory = (category || "coffee").toLowerCase();

    const recommendationMap: Record<
      string,
      { name: string; price: number; size: string; upsell: string }
    > = {
      coffee: {
        name: normalizedTemperature === "iced" ? "Iced Latte" : "Cappuccino",
        price: normalizedTemperature === "iced" ? 5.5 : 4.75,
        size: "medium",
        upsell: "butter croissant",
      },
      tea: {
        name: normalizedTemperature === "iced" ? "Iced Matcha" : "Chai Latte",
        price: normalizedTemperature === "iced" ? 5.25 : 4.5,
        size: "medium",
        upsell: "blueberry muffin",
      },
      dessert: {
        name: "Tiramisu Slice",
        price: 6.25,
        size: "single serve",
        upsell: "espresso shot",
      },
    };

    const selected =
      recommendationMap[normalizedCategory] || recommendationMap.coffee;

    res.json({
      success: true,
      data: {
        requestId: `mock-${Date.now()}`,
        customerName: customerName || "Guest",
        mood: mood || "curious",
        recommendation: {
          category: normalizedCategory,
          name: selected.name,
          size: selected.size,
          temperature:
            normalizedCategory === "dessert" ? "n/a" : normalizedTemperature,
          price: selected.price,
        },
        internalNotes:
          "Mock internal API response for n8n HTTP Request node demos.",
        suggestedUpsell: selected.upsell,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const activeOrDeactiveProductController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const newModel = await getProductById(id);
    if (!newModel) {
      res
        .status(404)
        .json({ success: false, message: "Product is not existed." });
      return;
    }

    await activeOrDeactiveProduct(id, newModel?.active ? 0 : 1);

    res.json({
      success: true,
      data: null,
      message:
        (!newModel?.active ? "Active" : "Deactive") + " Product Successfully",
    });
  } catch (err) {}
};

export const deleteProductController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getProductById(id);
    if (data && data.images.length > 0) {
      unlinkImages(data.images);
    }

    await deleteProduct(id);
    res.json({
      success: true,
      data: null,
      message: "Deleted Product Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMultiProductsController: RequestHandler<
  unknown,
  IResponseData | IErrorResponse,
  IDeleteMultipleProductsRequest
> = async (req, res, next) => {
  try {
    const { ids } = req.body;

    // 1. Get products
    const products = await ProductModel.find({
      _id: { $in: ids.map((id) => new mongoose.Types.ObjectId(id)) },
    });

    // 2. Collect all image paths in a flat array
    const imagePaths = products.flatMap((product) => product.images);

    // 3. Delete all images
    for (const image_path of imagePaths) {
      const filePath = path.join(uploadsDir, image_path);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting image:", err);
        } else {
          console.log(`Image ${filePath} has been deleted.`);
        }
      });
    }

    await deleteMutipleProducts(ids);
    res.json({
      success: true,
      data: null,
      message: "Deleted Product Successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getProductController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getProductById(id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const addProductImageController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse
> = async (req, res, next) => {
  const { id } = req.params;
  try {
    const newModel = await getProductById(id);
    if (!newModel) {
      res
        .status(404)
        .json({ success: false, message: "Product is not existed." });
      return;
    }

    const newImages = req.files as Express.Multer.File[];
    if (newImages) {
      const imageUrls = newImages.map((file) => file.path);

      await addImagesProduct(id, {
        images: [...newModel.images, ...imageUrls],
      });
    }
    const updatedProduct = await getProductById(id);

    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    next(err);
  }
};

export const deleteProductImageController: RequestHandler<
  { id: string },
  IResponseData | IErrorResponse,
  { image: string }
> = async (req, res, next) => {
  const { id } = req.params;
  const image_path = req.body?.image;
  try {
    const product = await getProductById(id);
    if (!product) {
      res
        .status(404)
        .json({ success: false, message: "Product is not existed." });
      return;
    }

    if (!product.images.includes(image_path)) {
      res
        .status(404)
        .json({ success: false, message: "Image not found for this product." });
      return;
    }

    const newImages = product.images.filter((item) => item !== image_path);
    await addImagesProduct(id, {
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
    const updatedProduct = await getProductById(id);

    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    next(err);
  }
};

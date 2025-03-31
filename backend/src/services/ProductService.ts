import { ProductModel } from "../models/Product";
import { IProduct } from "../types/ProductTypes";

export const addProduct = async (data: IProduct) => {
  try {
    const model = await ProductModel.create(data);

    await model.populate("category", "name description _id");

    return model;
  } catch (err) {
    console.log("Adding new Product failed: ", err);
    throw err;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const result = await ProductModel.deleteOne({ _id: id });
    return result;
  } catch (err) {
    console.log("Adding new Product failed: ", err);
    throw err;
  }
};

export const getAllProducts = async (
  filter: Record<string, any>,
  skip: number = 0,
  limit: number = 10
) => {
  try {
    const results = await ProductModel.find(filter)
      .populate("category", "name description _id")
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await ProductModel.countDocuments(filter);
    return { data: results, total };
  } catch (err) {
    console.log("Adding new Product failed: ", err);
    throw err;
  }
};

export const getProductById = async (id: string) => {
  try {
    const model = await ProductModel.findById(id);
    if (model == null) {
      throw new Error("Product is not existed");
    }

    await model.populate("category", "name description _id");

    return model;
  } catch (err) {
    console.log("Fetching a Product failed: ", err);
    throw err;
  }
};

export const updateProduct = async (id: string, data: IProduct) => {
  try {
    const results = await ProductModel.updateOne({ _id: id }, data);
    return results;
  } catch (err) {
    console.log("Updating Product failed: ", err);
    throw err;
  }
};

export const activeOrDeactiveProduct = async (id: string, active: Number) => {
  try {
    const results = await ProductModel.updateOne({ _id: id }, { active });
    return results;
  } catch (err) {
    console.log("Active or Deactive Product failed: ", err);
    throw err;
  }
};

export const addImagesProduct = async (
  id: string,
  data: { images: string[] }
) => {
  try {
    const results = await ProductModel.updateOne({ _id: id }, data);
    return results;
  } catch (err) {
    console.log("Add Product Images failed: ", err);
    throw err;
  }
};

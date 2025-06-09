import mongoose from "mongoose";
import { IngredientModel } from "../models/Ingredient";
import { IIngredient } from "../types/IngredientTypes";

export const addIngredient = async (data: IIngredient) => {
  try {
    const model = await IngredientModel.create(data);

    await model.populate("category", "name description _id");

    return model;
  } catch (err) {
    console.log("Adding new Ingredient failed: ", err);
    throw err;
  }
};

export const deleteIngredient = async (id: string) => {
  try {
    const result = await IngredientModel.deleteOne({ _id: id });
    return result;
  } catch (err) {
    console.log("Adding new Ingredient failed: ", err);
    throw err;
  }
};

export const deleteMutipleIngredients = async (ids: string[]) => {
  try {
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
    const result = await IngredientModel.deleteMany({ _id: { $in: objectIds } });
    return result;
  } catch (err) {
    console.log("Delete multiple Categories failed: ", err);
    throw err;
  }
};

export const getAllIngredients = async (
  filter: Record<string, any>,
  skip: number = 0,
  limit: number = 10
) => {
  try {
    const results = await IngredientModel.find(filter)
      .populate("category", "name description _id")
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await IngredientModel.countDocuments(filter);
    return { data: results, total };
  } catch (err) {
    console.log("Adding new Ingredient failed: ", err);
    throw err;
  }
};

export const getProductBySKU = async (sku: string) => {
  try {
    return await IngredientModel.findOne({ sku });
  } catch (err) {
    console.log("Fetching a Ingredient by SKU failed: ", err);
    throw err;
  }
};


export const getIngredientById = async (id: string) => {
  try {
    const model = await IngredientModel.findById(id);
    if (model == null) {
      throw new Error("Ingredient is not existed");
    }

    await model.populate("category", "name description _id");

    return model;
  } catch (err) {
    console.log("Fetching a Ingredient failed: ", err);
    throw err;
  }
};

export const updateIngredient = async (id: string, data: IIngredient) => {
  try {
    const results = await IngredientModel.updateOne(
      { _id: id },
      { $set: data }
    );
    return results;
  } catch (err) {
    console.log("Updating Ingredient failed: ", err);
    throw err;
  }
};

export const activeOrDeactiveIngredient = async (id: string, active: Number) => {
  try {
    const results = await IngredientModel.updateOne(
      { _id: id },
      { $set: { active } }
    );
    return results;
  } catch (err) {
    console.log("Active or Deactive Ingredient failed: ", err);
    throw err;
  }
};

export const addImagesIngredient = async (
  id: string,
  data: { images: string[] }
) => {
  try {
    const results = await IngredientModel.updateOne(
      { _id: id },
      { $set: data }
    );
    return results;
  } catch (err) {
    console.log("Add Ingredient Images failed: ", err);
    throw err;
  }
};

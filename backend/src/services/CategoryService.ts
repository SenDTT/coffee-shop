import mongoose from "mongoose";
import { CategoryModel } from "../models/Category";
import { ICategory } from "../types/CategoryTypes";

export const addCatetory = async (data: ICategory) => {
  try {
    const model = await CategoryModel.create(data);
    return model;
  } catch (err) {
    console.log("Adding new category failed: ", err);
    throw err;
  }
};

export const deleteCatetory = async (id: string) => {
  try {
    const result = await CategoryModel.deleteOne({ _id: id });
    return result;
  } catch (err) {
    console.log("Adding new category failed: ", err);
    throw err;
  }
};

export const deleteMutipleCategories = async (ids: string[]) => {
  try {
    const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));
    const result = await CategoryModel.deleteMany({ _id: { $in: objectIds } });
    return result;
  } catch (err) {
    console.log("Delete multiple Categories failed: ", err);
    throw err;
  }
};

export const getAllCategories = async (
  filter: Record<string, any>,
  skip: number = 0,
  limit: number = 10
) => {
  try {
    const results = await CategoryModel.find(filter).skip(skip).limit(limit);
    const total = await CategoryModel.countDocuments(filter);
    return { data: results, total };
  } catch (err) {
    console.log("Adding new category failed: ", err);
    throw err;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const model = await CategoryModel.findById(id);
    return model;
  } catch (err) {
    console.log("Fetching a category failed: ", err);
    throw err;
  }
};

export const updateCategory = async (id: string, data: ICategory) => {
  try {
    const results = await CategoryModel.updateOne({ _id: id }, { $set: data });
    return results;
  } catch (err) {
    console.log("Updating category failed: ", err);
    throw err;
  }
};

export const activeOrDeactiveCategory = async (id: string, active: Number) => {
  try {
    const results = await CategoryModel.updateOne(
      { _id: id },
      { $set: { active } }
    );
    return results;
  } catch (err) {
    console.log("Active or Deactive Category failed: ", err);
    throw err;
  }
};

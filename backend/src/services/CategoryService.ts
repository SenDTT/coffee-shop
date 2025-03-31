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
}

export const deleteCatetory = async (id: string) => {
  try {
    const result = await CategoryModel.deleteOne({ _id: id });
    return result;
  } catch (err) {
    console.log("Adding new category failed: ", err);
    throw err;
  }
};

export const getAllCategories = async (skip: number = 0, limit: number = 10) => {
  try {
    const results = await CategoryModel.find().skip(skip).limit(limit);
    return results;
  } catch (err) {
    console.log("Adding new category failed: ", err);
    throw err;
  }
}

export const getCategoryById = async (id: string) => {
    try {
        const model = await CategoryModel.findById(id);
        return model;
    } catch (err) {
        console.log("Fetching a category failed: ", err);
        throw err;
    }
}

export const updateCategory = async (id: string, data: ICategory) => {
    try {
        const results = await CategoryModel.updateOne({ _id: id }, data);
        return results;
    } catch (err) {
        console.log("Updating category failed: ", err);
        throw err;
    }
}

export const activeOrDeactiveCategory = async (id: string, active: Number) => {
    try {
        const results = await CategoryModel.updateOne({ _id: id}, { active });
        return results;
    } catch (err) {
        console.log("Active or Deactive Category failed: ", err);
        throw err;
    }
}
import mongoose from "mongoose";
import dotenv from "dotenv";
import { CategoryModel } from "../models/Category"; // Adjust the import path
import categorySeedData from "../data/categories"; // Should be an array of categories

dotenv.config();

export async function seedCategories() {
  try {
    console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    for (const category of categorySeedData) {
      await CategoryModel.updateOne(
        { _id: category._id }, // Preserve original IDs
        { $setOnInsert: category },
        { upsert: true }
      );
    }

    console.log("✅ Categories seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding categories failed:", error);
    process.exit(1);
  }
}

seedCategories();

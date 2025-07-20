import mongoose from "mongoose";
import dotenv from "dotenv";
import { ProductModel } from "../models/Product"; // Adjust the import path
import productSeedData from "../data/products"; // Should be an array of products

dotenv.config();

export async function seedProducts() {
  try {
    console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    for (const product of productSeedData) {
      await ProductModel.updateOne(
        { sku: product.sku }, // Use SKU as unique identifier
        { $setOnInsert: product },
        { upsert: true }
      );
    }

    console.log("✅ Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding products failed:", error);
    process.exit(1);
  }
}

seedProducts();

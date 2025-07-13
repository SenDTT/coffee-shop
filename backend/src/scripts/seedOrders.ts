import mongoose from "mongoose";
import dotenv from "dotenv";
import { OrderModel } from "../models/Order";
import exampleOrders from "../data/orders";

dotenv.config();

async function seedOrders() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    // Clear existing orders if needed
    await OrderModel.deleteMany({});
    console.log("🧹 Cleared existing orders");

    // Insert new orders
    await OrderModel.insertMany(exampleOrders);
    console.log("🌱 Orders seeded successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed orders:", error);
    process.exit(1);
  }
}

seedOrders();

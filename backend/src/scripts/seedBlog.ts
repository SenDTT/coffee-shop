import mongoose from "mongoose";
import dotenv from "dotenv";
import { BlogModel } from "../models/Blog"; // Adjust import path as needed
import newBlogSeedData from "../data/blogs";

dotenv.config();

export async function seedBlogs() {
  try {
    console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    for (const blog of newBlogSeedData) {
      await BlogModel.updateOne(
        { slug: blog.slug }, // use slug to identify unique blog post
        { $setOnInsert: blog },
        { upsert: true }
      );
    }

    console.log("✅ Blog posts seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedBlogs();

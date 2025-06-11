import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserModel } from "../models/User";

dotenv.config();

export async function seedAdminAccount() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    await UserModel.create({
      name: "Admin",
      username: "Admin",
      email: "admin@gmail.com",
      password: "Admin1234",
      role: "admin",
      profileImage: '',
      subcribedEmail: 1,
    });

    console.log("✅ Default settings seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

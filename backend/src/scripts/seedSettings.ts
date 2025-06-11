import mongoose from "mongoose";
import dotenv from "dotenv";
import { defaultSettings } from "./defaultSettings";
import { SettingModel } from "../models/Settings";

dotenv.config();

export async function seedSettings() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ Connected to MongoDB");

    for (const setting of defaultSettings) {
      await SettingModel.updateOne(
        { group: setting.group, key: setting.key },
        { $setOnInsert: setting },
        { upsert: true }
      );
    }

    console.log("✅ Default settings seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedSettings();
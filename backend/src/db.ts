const mongoose = require("mongoose");
require("dotenv").config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://mongodb:27017/coffee_shop");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  }
};

import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";
import cors from "cors";
import auth_routes from "./routes/authRoute";
import { connectDB } from "./db";
import category_routes from "./routes/categoryRoute";
import product_routes from "./routes/productRoute";
import admin_routes from "./routes/adminRoute";
import account_routes from "./routes/accountRoute";
import blog_routes from "./routes/blogRoute";
import ingredient_routes from "./routes/ingredientRoute";
import path from "path";

// MongoDB Connection
connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const prefix = "/api/" + process.env.API_VERSION;

// auth api
app.use(prefix + "/auth", auth_routes);

// admin
app.use(prefix + "/admin", admin_routes);
app.use(prefix + "/account", account_routes);

// Category api
app.use(prefix + "/categories", category_routes);

// Product api
app.use(prefix + "/products", product_routes);

// Blog api
app.use(prefix + "/blogs", blog_routes);

// Ingredient api
app.use(prefix + "/ingredients", ingredient_routes);

// access to uploads folder
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

const error_handler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: "An unknown error occurred" });
  }
};
app.use(error_handler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

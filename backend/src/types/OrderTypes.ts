import mongoose from "mongoose";
import { User } from "../models/User";

export interface IOrderRequest {
  product: string;
  price: string;
  quantity: number;
}

export interface IOrderBody {
  user: User;
  products: { product: mongoose.Schema.Types.ObjectId | string; quantity: number }[];
  totalAmount: number;
  status: "draft" | "paid" | "refunded" | "deleted";
}

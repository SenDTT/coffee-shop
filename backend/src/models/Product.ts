import { InferSchemaType, model, Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    sku: { type: String, required: true },
    weight: { type: Number, required: true },
    material: { type: String, required: true },
    stock: { type: Number, default: 10 },
    images: [{ type: String }],
    active: { type: Number, enum: [0, 1], default: 0 },
  },
  { timestamps: true }
);

export type ProductSchemaType = InferSchemaType<typeof ProductSchema>;
export type Product = ProductSchemaType & { _id: Schema.Types.ObjectId };

export const ProductModel = model<Product>("products", ProductSchema);
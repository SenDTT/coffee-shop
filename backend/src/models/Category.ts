import { InferSchemaType, model, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["ingredient", "product", "blog"], required: true },
    parent: { type: Schema.Types.ObjectId, ref: "categories" },
    active: { type: Number, enum: [0, 1], default: 0 }
}, { timestamps: true });

export type CategorySchemaType = InferSchemaType<typeof CategorySchema>;
export type Category = CategorySchemaType & { _id: Schema.Types.ObjectId };

export const CategoryModel = model<Category>("categories", CategorySchema);
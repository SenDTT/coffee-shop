import { InferSchemaType, model, Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "users", required: true },
    image: { type: String },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type BlogSchemaType = InferSchemaType<typeof BlogSchema>;
export type Blog = BlogSchemaType & { _id: Schema.Types.ObjectId };

export const BlogModel = model<Blog>("blogs", BlogSchema);

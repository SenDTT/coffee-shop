import { InferSchemaType, model, Schema } from "mongoose";
import {
  extractMetaDescription,
  extractMetaKeywords,
  extractMetaTitle,
  slugify,
} from "../utils/commonUtil";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    tags: [{ type: String }],
    slug: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    metaImage: { type: String },
    metaUrl: { type: String },
    metaAuthor: { type: String },
    metaPublishedAt: { type: Date, default: null },
    metaPublished: { type: Boolean, default: false },
    metaRobots: { type: String, enum: ["index", "noindex"], default: "index" },
    metaCanonical: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "users", required: true },
    image: { type: String },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

BlogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title);
  }

  if (!this.metaTitle) {
    this.metaTitle = extractMetaTitle(this.title);
  }

  if (!this.metaDescription) {
    this.metaDescription = extractMetaDescription(this.content);
  }

  if (!this.metaKeywords && Array.isArray(this.tags)) {
    this.metaKeywords = this.tags.join(", ");
  }

  this.metaKeywords = extractMetaKeywords(this.content);
  if (!this.metaImage) {
    this.metaImage = this.image || "https://yourdomain.com/default-image.jpg"; // default image URL
  }

  if (!this.metaCanonical) {
    this.metaCanonical = `https://yourdomain.com/blog/${this.slug}`;
  }

  if (!this.metaUrl) {
    this.metaUrl = `https://yourdomain.com/blog/${this.slug}`;
  }

  if (!this.metaAuthor && this.author?.toString) {
    this.metaAuthor = this.author.toString(); // or fetch the user's name if available
  }

  next();
});

export type BlogSchemaType = InferSchemaType<typeof BlogSchema>;
export type Blog = BlogSchemaType & { _id: Schema.Types.ObjectId };

export const BlogModel = model<Blog>("blogs", BlogSchema);

import { InferSchemaType, model, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["product", "blog"], required: true },
    parent: { type: Schema.Types.ObjectId, ref: "categories" },
    image: { type: String },
    slug: { type: String, required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    metaImage: { type: String },
    metaUrl: { type: String },
    metaType: { type: String, enum: ["product", "blog"], default: "product" },
    metaAuthor: { type: String },
    metaPublishedAt: { type: Date, default: Date.now },
    metaPublished: { type: Boolean, default: true },
    metaRobots: { type: String, enum: ["index", "noindex"], default: "index" },
    metaCanonical: { type: String },
    metaOgTitle: { type: String },
    metaOgDescription: { type: String },
    metaOgImage: { type: String },
    metaOgUrl: { type: String },
    metaOgType: { type: String, enum: ["product", "blog"], default: "product" },
    metaOgSiteName: { type: String },
    metaOgLocale: { type: String }, 
    active: { type: Number, enum: [0, 1], default: 0 }
}, { timestamps: true });

export type CategorySchemaType = InferSchemaType<typeof CategorySchema>;
export type Category = CategorySchemaType & { _id: Schema.Types.ObjectId };

export const CategoryModel = model<Category>("categories", CategorySchema);
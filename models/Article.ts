import { IArticle } from "interfaces";
import mongoose, { Schema, model, Model } from "mongoose";

const articleSchema = new Schema(
  {
    content: { type: String, required: true },
    images: [{ type: String }],
    footImages: [{ type: String }],
    activated: { type: String, required: true, default: "true" },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

articleSchema.index({ title: "text", tags: "text" });

const Article: Model<IArticle> =
  mongoose.models.Article || model("Article", articleSchema);

export default Article;

import { IArticle } from "interfaces";
import mongoose, { Schema, model, Model } from "mongoose";

const articleSchema = new Schema(
  {
    content: { type: String, required: true, default: "" },
    images: [{ type: String }],
    footImages: [{ type: String }],
    activated: { type: String, required: true, default: "true" },
    slug: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    title: { type: String, required: true, default: "" },
    author: { type: String, required: true, default: "" },
    category: { type: String, required: true, default: "novedades" },
    subtitle: { type: String, required: true, default: "" },
  },
  {
    timestamps: true,
  }
);

articleSchema.index({ title: "text", tags: "text" });

const Article: Model<IArticle> =
  mongoose.models.Article || model("Article", articleSchema);

export default Article;

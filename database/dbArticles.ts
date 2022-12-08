import { db } from "./";
import Article from "../models/Article";
import { IArticle } from "../interfaces";

export const getArticleBySlug = async (
  slug: string
): Promise<IArticle | undefined> => {
  await db.connect();
  const article = await Article.findOne({ slug }).lean();
  await db.disconnect();

  if (!article) {
    return undefined;
  }

  return JSON.parse(JSON.stringify(article));
};

interface ArticleSlug {
  slug: string;
}

export const getAllArticlesSlugs = async (): Promise<ArticleSlug[]> => {
  await db.connect();
  const slugs = await Article.find().select("slug -_id");
  await db.disconnect();

  return slugs;
};

export const getArticlesByTerm = async (term: string): Promise<IArticle[]> => {
  term = term.toString().toLowerCase();

  await db.connect();
  const articles = await Article.find({
    $text: { $search: term },
  })
    .select("title content images footImages activated slug -_id")
    .lean();

  await db.disconnect();

  const updatedArticles = articles.map((article) => {
    article.images = article.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOSTNAME}articles/${image}`;
    });
    return article;
  });

  return updatedArticles;
};

export const getArticlesBySlug = async (
  slug: string
): Promise<IArticle | null> => {
  await db.connect();
  const article = await Article.findOne({
    slug,
  }).lean();

  await db.disconnect();

  if (!article) {
    return null;
  }

  article.images = article.images.map((image) => {
    return image.includes("http")
      ? image
      : `${process.env.HOSTNAME}articles/${image}`;
  });

  return JSON.parse(JSON.stringify(article));
};

export const getAllArticles = async (): Promise<IArticle[]> => {
  await db.connect();
  const articles = await Article.find().lean();

  await db.disconnect();

  const updatedArticles = articles.map((article) => {
    article.images = article.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOSTNAME}articles/${image}`;
    });
    return article;
  });

  return JSON.parse(JSON.stringify(updatedArticles));
};

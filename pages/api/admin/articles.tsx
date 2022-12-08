import type { NextApiRequest, NextApiResponse } from "next";

import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

import { db } from "../../../database";
import { isValidObjectId } from "mongoose";
import { IArticle } from "../../../interfaces/articles";
import { Article } from "models";

type Data =
  | {
      message: string;
    }
  | IArticle[]
  | IArticle;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getArticles(req, res);
    case "PUT":
      return updateArticles(req, res);
    case "POST":
      return createArticle(req, res);
    default:
      return res.status(400).json({ message: "Bad Request" });
  }
}

const getArticles = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const articles = await Article.find().sort({ title: "asc" }).lean();
  await db.disconnect();

  const updatedArticles = articles.map((article) => {
    article.images = article.images.map((image) => {
      return image.includes("http")
        ? image
        : `${process.env.HOSTNAME}articles/${image}`;
    });
    return article;
  });

  return res.status(200).json(updatedArticles);
};

const updateArticles = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = "", images = [] } = req.body as IArticle;

  if (!isValidObjectId(_id)) {
    return res
      .status(400)
      .json({ message: "Bad Request, el Id del articulo no es válido" });
  }

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "Bad Request, son necesarias al menos dos imágenes" });
  }

  try {
    await db.connect();
    const article = await Article.findById(_id);

    if (!article) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Bad Request,no existe articulo con este id" });
    }

    article.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf("/") + 1)
          .split(".");
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await article.updateOne(req.body);
    await db.disconnect();

    return res.status(200).json(article);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "Bad Request,revisar la consola del servidor" });
  }
};

const createArticle = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IArticle;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: "Bad Request, son necesarias al menos dos imágenes" });
  }

  try {
    await db.connect();

    const articleInDB = await Article.findOne({ slug: req.body.slug });
    if (articleInDB) {
      await db.disconnect();
      return res
        .status(400)
        .json({ message: "Bad Request,el slug de este articulo ya existe" });
    }
    const article = new Article(req.body);
    await article.save();

    await db.disconnect();

    return res.status(200).json(article);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res
      .status(400)
      .json({ message: "Bad Request,revisar la consola del servidor" });
  }
};

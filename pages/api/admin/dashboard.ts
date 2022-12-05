import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Article, User } from "../../../models/";

type Data = {
  numberOfArticles: number;
  numberOsUsers: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();

  //add modules admin here
  const [numberOfArticles, numberOsUsers] = await Promise.all([
    await Article.count(),
    await User.count(),
  ]);

  await db.disconnect();

  res.status(200).json({ numberOfArticles, numberOsUsers });
}

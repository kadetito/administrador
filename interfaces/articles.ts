export interface IArticle {
  _id: string;
  content: string;
  images: string[];
  footImages: string[];
  activated: number;
  author: string;
  slug: string;
  tags: string[];
  title: string;
  category: "novedades" | "opinion" | "consejos" | "unisex";
  subtitle: string;
  createdAt: string;
  updatedAt: string;
}

import type { NextPage } from "next";
import { useArticles } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { ArticlesList } from "../../components/articles/ArticlesList";

const NewsPage: NextPage = () => {
  const { articles, isLoading } = useArticles("/articles?category=news");

  return (
    <AdminLayout title={"News Page"} subTitle={"Encuentra NewsPage"}>
      <h1>News Page</h1>

      {isLoading ? <FullScreenLoading /> : <ArticlesList articles={articles} />}
    </AdminLayout>
  );
};

export default NewsPage;

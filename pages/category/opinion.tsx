import type { NextPage } from "next";
import { useArticles } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { ArticlesList } from "../../components/articles/ArticlesList";

const OpinionPage: NextPage = () => {
  const { articles, isLoading } = useArticles("/articles?category=opinion");

  return (
    <AdminLayout title={"Opinion"} subTitle={"Encuentra opinion"}>
      <h1>Opinion</h1>

      {isLoading ? <FullScreenLoading /> : <ArticlesList articles={articles} />}
    </AdminLayout>
  );
};

export default OpinionPage;

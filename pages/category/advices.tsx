import type { NextPage } from "next";
import { useArticles } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { ArticlesList } from "../../components/articles/ArticlesList";

const AdvicesPage: NextPage = () => {
  const { articles, isLoading } = useArticles("/articles?category=advices");

  return (
    <AdminLayout title={"Advices"} subTitle={"Encuentra Advices"}>
      <h1>Advices</h1>

      {isLoading ? <FullScreenLoading /> : <ArticlesList articles={articles} />}
    </AdminLayout>
  );
};

export default AdvicesPage;

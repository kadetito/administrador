import { FC } from "react";

import { IArticle } from "../../interfaces";
import { ArticleCard } from "./";
import { Row } from "react-bootstrap";

interface Props {
  articles: IArticle[];
}

export const ArticlesList: FC<Props> = ({ articles }) => {
  return (
    <Row>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </Row>
  );
};

import { FC, useMemo, useState } from "react";
import NextLink from "next/link";

import { IArticle } from "../../interfaces";
import { Col, Row, Card, Badge } from "react-bootstrap";

interface Props {
  article: IArticle;
}

export const ArticleCard: FC<Props> = ({ article }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const articleImage = useMemo(() => {
    return `/articles/${article.images[0]}`;
  }, [article.images]);

  return (
    <Row>
      <Col>
        <Card>
          <NextLink href={`/product/${article.slug}`} passHref prefetch={false}>
            {article.activated === 0 && <Badge color="primary" />}
            {isImageLoaded && (
              <Card.Img
                className="fadeIn"
                src={articleImage}
                alt={article.title}
                onLoad={() => setIsImageLoaded(true)}
              />
            )}
          </NextLink>
        </Card>
      </Col>
    </Row>
  );
};

import { Col, Card } from "react-bootstrap";
import { FC } from "react";

interface Props {
  title: string | number;
  subTitle: string;
  icon?: JSX.Element;
}

export const SummaryCard: FC<Props> = ({ title, subTitle, icon }) => {
  return (
    <Col>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>{icon}</div>
            <div className="ms-3 text-end">
              <h2>{title}</h2>
              <h6>{subTitle}</h6>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

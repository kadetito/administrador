import { FC } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface Props {
  currentValue: number;
  maxValue: number;

  // Methods
  updatedQuantity: (newValue: number) => void;
}

export const ItemCounter: FC<Props> = ({
  currentValue,
  updatedQuantity,
  maxValue,
}) => {
  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;

      return updatedQuantity(currentValue - 1);
    }

    if (currentValue >= maxValue) return;

    updatedQuantity(currentValue + 1);
  };

  return (
    <Row>
      <Col display="flex">
        <Button onClick={() => addOrRemove(-1)}>Remove</Button>
        <span> {currentValue} </span>
        <Button onClick={() => addOrRemove(+1)}>Add</Button>
      </Col>
    </Row>
  );
};

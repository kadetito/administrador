import React from "react";
import { Col, Row } from "react-bootstrap";

export const FullScreenLoading = () => {
  return (
    <div
      aria-label="loader"
      id="pause"
      className="d-flex align-items-center justify-content-center"
    >
      <div id="spinner"></div>
    </div>
  );
};

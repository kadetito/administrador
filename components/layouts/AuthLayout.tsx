import { FC, ReactNode } from "react";
import Head from "next/head";
import { Row, Col, Container } from "react-bootstrap";

interface Props {
  title: string;
  children: ReactNode;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Container>
          <Row>
            <Col></Col>
            <Col className="d-flex align-items-center vh-100">{children}</Col>
            <Col></Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

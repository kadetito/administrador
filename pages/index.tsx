import type { NextPage } from "next";
import { AdminLayout } from "../components/layouts";
import { Row, Col } from "react-bootstrap";
import NextLink from "next/link";

export default function HomePage() {
  return (
    <AdminLayout title="Admin Dashboard" subTitle="Estadísticas generales">
      <Row>
        <Col>
          <NextLink href="/admin/dashboard" passHref>
            Administrador
          </NextLink>
        </Col>
      </Row>
    </AdminLayout>
  );
}

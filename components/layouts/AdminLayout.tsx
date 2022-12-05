import { FC, ReactNode } from "react";
import Head from "next/head";

// import { Navbar, SideMenu } from "../ui";
import { AdminNavbar } from "../admin/AdminNavbar";

import { Container } from "react-bootstrap";

interface Props {
  title: string;
  subTitle: string;
  children: ReactNode;
}

export const AdminLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <AdminNavbar />

      <main>
        <Container>{children}</Container>
      </main>
    </>
  );
};

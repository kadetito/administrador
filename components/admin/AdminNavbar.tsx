import { useContext } from "react";

import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Offcanvas from "react-bootstrap/Offcanvas";

import { AuthContext } from "../../context";
import { useRouter } from "next/router";

export const AdminNavbar = () => {
  const router = useRouter();

  const { user, isLoggedIn, logout } = useContext(AuthContext);

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <Navbar key="sm" bg="light" expand="sm" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Administration</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Offcanvas placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {user?.role === "admin" && (
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={() => navigateTo(`/admin/`)}>
                    Home
                  </Nav.Link>
                  <Nav.Link onClick={() => navigateTo(`/admin/users`)}>
                    Usuarios
                  </Nav.Link>
                  <Nav.Link onClick={() => navigateTo(`/admin/users`)}>
                    Artículos
                  </Nav.Link>
                </Nav>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

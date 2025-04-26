"use client";

// signOut({ callbackUrl: "/login" })
import { Container, Nav, Navbar } from "react-bootstrap";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type Props = {
  session: Session;
};

export const NavMenu = ({ session }: Props) => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Hobbies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/notes">Notes</Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <div>{session.user.name}</div>
            <Nav.Link
              onClick={() => {
                signOut({ callbackUrl: "/login" });
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

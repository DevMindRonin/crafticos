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
    <Navbar expand="lg" bg="dark" variant="dark" className="p-3">
      <Container>
        <Navbar.Brand className="text-white">Fighter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="underline" className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/new-lesson">New lesson</Nav.Link>
            <Nav.Link href="/notes">Notes</Nav.Link>
          </Nav>
          <Nav variant="underline" className="d-flex align-items-center">
            <Nav.Link className="text-white" href="/account">
              {session.user.name}
            </Nav.Link>
            <Nav.Link
              className="text-white"
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

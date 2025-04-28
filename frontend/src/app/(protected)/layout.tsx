import { NavMenu } from "@/components/NavMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import { Container } from "react-bootstrap";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavMenu session={session} />
      <Container className="flex-grow-1">
        <main className="container mt-4">{children}</main>
      </Container>
      <Footer />
    </div>
  );
}

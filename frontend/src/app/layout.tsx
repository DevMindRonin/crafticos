import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hobbies App",
  description:
    "Information about lessons, ordering lessons, overview of activities",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

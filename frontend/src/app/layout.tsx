import type { Metadata } from "next";
import { Providers } from "./providers"; // import té komponenty z kroku 1
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: "Hobbies App",
  description:
    "Information about lessons, ordering lessons, overview of activities",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

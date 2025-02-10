import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/HeaderComponent";
import Footer from "@/components/FooterComponent";

export const metadata: Metadata = {
  title: "UNICORE",
  description: "Meke Ed Easy",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-silver">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

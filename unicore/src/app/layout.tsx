import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/HeaderComponent";
import Footer from "@/components/FooterComponent";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "UNICORE",
  description: "Meke Ed Easy",
};

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} bg-silver font-roboto`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

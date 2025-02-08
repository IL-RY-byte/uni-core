import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/HeaderComponent";
import Footer from "@/components/FooterComponent";
import { Montserrat } from "next/font/google";

export const metadata: Metadata = {
  title: "UNICORE",
  description: "Meke Ed Easy",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} bg-silver font-montserrat pt-[80px] md:pt-[60px] sm:pt-[50px]`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

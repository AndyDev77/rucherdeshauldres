import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Rucher des Hauldres | Miel artisanal en Seine-et-Marne (77)",
  description:
    "Miel artisanal français récolté en Seine-et-Marne (77). Apiculture locale, respect des abeilles, produits naturels du rucher.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${playfair.variable} bg-neutral-50 text-neutral-900`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
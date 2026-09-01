import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

const title = "Rucher des Hauldres | Miel artisanal en Seine-et-Marne (77)";
const description =
  "Miel artisanal français récolté en Seine-et-Marne (77). Apiculture locale, respect des abeilles, produits naturels du rucher.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rucherdeshauldres.vercel.app"),
  title,
  description,
  // Aperçu soigné lorsque le lien est partagé sur Facebook ou WhatsApp.
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_FR",
    siteName: "Rucher des Hauldres",
    images: [
      {
        url: "/images/home/home-1.jpg",
        width: 1200,
        height: 630,
        alt: "Cadre de miel operculé au rucher des Hauldres",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Sans JavaScript, les sections animées au défilement doivent
            rester visibles plutôt que de disparaître. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${playfair.variable} bg-cream text-ink antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
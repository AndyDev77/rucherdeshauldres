import type { Metadata } from "next";
import {Geist, Geist_Mono, Playfair_Display} from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-playfair",
});

export const metadata: Metadata = {
    title: "Rucher des Hauldres - Miel d'Exception",
    description: "Miel artisanal français, récolté avec passion et respect des abeilles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${playfair.variable} bg-neutral-50 text-neutral-900`}>
        <Navbar />
            {children}
        <Footer />
        </body>
    </html>
  );
}

"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const NAV_ITEMS = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/#propos" },
    { label: "Nos miels", href: "/#miels" },
    { label: "Notre travail", href: "/#travail" },
    { label: "Galerie", href: "/galerie" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Sur l'accueil, la barre se fond dans la photo du hero tant qu'on
    // n'a pas défilé. Ailleurs, elle reste toujours pleine.
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const solid = scrolled || !isHome || isMenuOpen;

    const handleLinkClick = () => setIsMenuOpen(false);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${
                solid
                    ? "bg-bark/95 backdrop-blur-md py-3 shadow-lg shadow-bark/20"
                    : "bg-gradient-to-b from-bark/70 to-transparent py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group" aria-label="Rucher des Hauldres, accueil">
                        <Image
                            src="/images/logo/logo-honey.png"
                            alt="Rucher des Hauldres"
                            width={200}
                            height={40}
                            priority
                            style={{ height: "auto" }}
                            className="w-[150px] sm:w-[180px] transition-transform duration-500 group-hover:scale-105"
                        />
                    </Link>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="relative px-4 py-2 text-sm tracking-wide text-cream/85 hover:text-honey-light transition-colors group"
                                onClick={handleLinkClick}
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-honey-light -translate-x-1/2 transition-all duration-300 group-hover:w-2/3" />
                            </Link>
                        ))}

                        <Link href="/#contact" onClick={handleLinkClick}>
                            <Button className="ml-4 rounded-full bg-honey text-cream font-medium px-6 hover:bg-honey-light hover:text-bark transition-all duration-300 shadow-md shadow-bark/30">
                                Nous contacter
                            </Button>
                        </Link>
                    </div>

                    {/* Bouton Menu Mobile */}
                    <button
                        className="md:hidden p-2 text-cream hover:bg-cream/10 rounded-full transition-colors"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Menu Mobile */}
                <div
                    id="mobile-menu"
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen
                            ? "max-h-[420px] opacity-100 visible"
                            : "max-h-0 opacity-0 invisible overflow-hidden"
                    }`}
                >
                    <div className="pt-6 pb-4 space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-3 text-base text-cream/85 hover:text-honey-light hover:bg-cream/5 rounded-lg transition-colors"
                                onClick={handleLinkClick}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="pt-4 px-4">
                            <Link href="/#contact" onClick={handleLinkClick}>
                                <Button className="w-full rounded-full bg-honey text-cream font-medium py-6 hover:bg-honey-light hover:text-bark transition-all duration-300">
                                    Nous contacter
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

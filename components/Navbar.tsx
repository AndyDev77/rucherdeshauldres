"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const NAV_ITEMS = [
    { label: "ACCUEIL", href: "/" },
    { label: "PROPOS", href: "#propos" },
    { label: "MIELS", href: "#miels" },
    { label: "TRAVAIL", href: "#travail" },
    { label: "GALERIE", href: "#galerie" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    const navBgClass = scrolled
        ? "bg-black/95 backdrop-blur-md py-2 shadow-lg"
        : "bg-black/95 py-4";

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${navBgClass}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <Image
                            src="/images/logo/logo-honey.png"
                            alt="Rucher des Hauldres Logo"
                            width={200}
                            height={40}
                            className="transition-transform duration-300 group-hover:scale-110"
                        />
                    </Link>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex items-center space-x-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-orange-200 transition-colors group"
                                onClick={handleLinkClick}
                            >
                                {item.label}
                                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-orange-200 transform -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}

                        <Link href="#contact" onClick={handleLinkClick}>
                            <Button className="ml-4 bg-orange-200 text-black font-medium hover:bg-text-50 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-amber-400/20">
                                CONTACTEZ-NOUS
                            </Button>
                        </Link>
                    </div>

                    {/* Bouton Menu Mobile */}
                    <button
                        className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        aria-label="Ouvrir le menu"
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
                            ? "max-h-[400px] opacity-100 visible"
                            : "max-h-0 opacity-0 invisible overflow-hidden"
                    }`}
                >
                    <div className="pt-4 pb-6 space-y-4">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-2 text-sm font-medium text-white/90 hover:text-orange-200 transition-colors"
                                onClick={handleLinkClick}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="pt-4 px-4">
                            <Link href="#contact" onClick={handleLinkClick}>
                                <Button className="w-full bg-orange-200 text-black font-medium hover:bg-text-50 transition-all duration-300">
                                    CONTACTEZ-NOUS
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

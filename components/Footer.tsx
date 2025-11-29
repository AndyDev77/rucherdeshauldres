"use client";

import { Facebook, Mail, MapPin, Phone, PhoneForwarded } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo et Description */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div>
                                <Image
                                    src="/images/logo/logo-honey.png"
                                    alt="Rucher des Hauldres Logo"
                                    width={200}
                                    height={50}
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm">
                            Producteur de miel artisanal depuis 2010, nous vous proposons des miels naturels, non
                            chauffés et non agités, issus de nos ruches en Seine-et-Marne.
                        </p>
                    </div>

                    {/* Navigation Rapide */}
                    <div>
                        <h3 className="text-lg font-semibold text-orange-200 mb-6">Navigation</h3>
                        <ul className="space-y-4">
                            {["ACCUEIL", "PROPOS", "MIELS", "TRAVAIL", "GALERIE"].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={
                                            item === "ACCUEIL"
                                                ? "/"
                                                : item === "GALERIE"
                                                    ? `/${item.toLowerCase()}`
                                                    : `#${item.toLowerCase()}`
                                        }
                                        className="text-white/60 hover:text-orange-200 transition-colors text-sm"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-orange-200 mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="tel:0680369887"
                                    className="flex items-center space-x-3 text-white/60 hover:text-orange-200 transition-colors text-sm group"
                                >
                                    <Phone className="w-4 h-4 text-orange-200 group-hover:scale-110 transition-transform" />
                                    <span>06 80 36 98 87</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:michel.clarion@hotmail.fr"
                                    className="flex items-center space-x-3 text-white/60 hover:text-orange-200 transition-colors text-sm group"
                                >
                                    <Mail className="w-4 h-4 text-orange-200 group-hover:scale-110 transition-transform" />
                                    <span>michel.clarion@hotmail.fr</span>
                                </a>
                            </li>
                            <li className="flex items-center space-x-3 text-white/60 text-sm">
                                <MapPin className="w-4 h-4 text-orange-200" />
                                <span>
                  151 rue des Hauldres <br /> Moissy-Cramayel (77550)
                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Réseaux Sociaux */}
                    <div>
                        <h3 className="text-lg font-semibold text-orange-200 mb-6">Suivez-nous</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://fr-fr.facebook.com/people/Michel-Clarion/pfbid0hMcL7wnptxbnqCBd89BCm2roDCmPMrv82DA4DBpezLaqCdSJ8SfrWmptWLrPrb94l/"
                                target="_blank"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-200 transition-colors group"
                            >
                                <Facebook className="w-5 h-5 text-white/60 group-hover:text-black transition-colors" />
                            </a>
                            <a
                                href="https://api.whatsapp.com/send/?phone=33680369887&text&type=phone_number&app_absent=0"
                                target="_blank"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-200 transition-colors group"
                            >
                                <PhoneForwarded className="w-5 h-5 text-white/60 group-hover:text-black transition-colors" />
                            </a>
                        </div>
                        <div className="mt-6">
                            <p className="text-white/60 text-sm">
                                Inscrivez-vous à notre newsletter pour suivre nos actualités
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-white/40 text-sm">
                            © {new Date().getFullYear()} Rucher des Hauldres. Tous droits réservés.
                        </p>
                        <div className="flex space-x-6">
                            <Link
                                href="/mentions-legales"
                                className="text-white/40 hover:text-orange-200 transition-colors text-sm"
                            >
                                Mentions légales
                            </Link>
                            <Link
                                href="/politique-de-confidentialite"
                                className="text-white/40 hover:text-orange-200 transition-colors text-sm"
                            >
                                Politique de confidentialité
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

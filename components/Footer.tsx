import { Facebook, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/#propos" },
    { label: "Nos miels", href: "/#miels" },
    { label: "Notre travail", href: "/#travail" },
    { label: "Galerie", href: "/galerie" },
];

export default function Footer() {
    return (
        <footer className="bg-bark text-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo et description */}
                    <div className="space-y-5">
                        <Link href="/" className="inline-block group" aria-label="Rucher des Hauldres, accueil">
                            <Image
                                src="/images/logo/logo-honey.png"
                                alt="Rucher des Hauldres"
                                width={200}
                                height={50}
                                style={{ height: "auto" }}
                                className="w-[180px] transition-transform duration-500 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-cream/60 text-sm leading-relaxed">
                            Producteur de miel artisanal depuis 2010. Des miels naturels, non chauffés et non
                            agités, issus de nos ruches en Seine-et-Marne.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-serif text-lg text-honey-light mb-5">Navigation</h3>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-cream/60 hover:text-honey-light transition-colors text-sm"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-serif text-lg text-honey-light mb-5">Contact</h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="tel:+33680369887"
                                    className="flex items-center gap-3 text-cream/60 hover:text-honey-light transition-colors text-sm group"
                                >
                                    <Phone className="w-4 h-4 text-honey flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span>06 80 36 98 87</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:michel.clarion@hotmail.fr"
                                    className="flex items-center gap-3 text-cream/60 hover:text-honey-light transition-colors text-sm group"
                                >
                                    <Mail className="w-4 h-4 text-honey flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="break-all">michel.clarion@hotmail.fr</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-cream/60 text-sm">
                                <MapPin className="w-4 h-4 text-honey flex-shrink-0 mt-0.5" />
                                <span>
                                    151 rue des Hauldres
                                    <br />
                                    77550 Moissy-Cramayel
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Réseaux sociaux */}
                    <div>
                        <h3 className="font-serif text-lg text-honey-light mb-5">Suivez-nous</h3>
                        <div className="flex gap-3">
                            <a
                                href="https://fr-fr.facebook.com/people/Michel-Clarion/pfbid0hMcL7wnptxbnqCBd89BCm2roDCmPMrv82DA4DBpezLaqCdSJ8SfrWmptWLrPrb94l/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Suivez-nous sur Facebook"
                                className="w-11 h-11 rounded-full bg-cream/10 flex items-center justify-center hover:bg-honey transition-colors group"
                            >
                                <Facebook className="w-5 h-5 text-cream/70 group-hover:text-cream transition-colors" />
                            </a>
                            <a
                                href="https://api.whatsapp.com/send/?phone=33680369887&text&type=phone_number&app_absent=0"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Nous écrire sur WhatsApp"
                                className="w-11 h-11 rounded-full bg-cream/10 flex items-center justify-center hover:bg-honey transition-colors group"
                            >
                                <MessageCircle className="w-5 h-5 text-cream/70 group-hover:text-cream transition-colors" />
                            </a>
                        </div>
                        <p className="mt-5 text-cream/60 text-sm leading-relaxed">
                            Commandes à retirer au rucher, sur rendez-vous.
                        </p>
                    </div>
                </div>

                <div className="mt-14 pt-8 border-t border-cream/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-cream/40 text-sm">
                            © {new Date().getFullYear()} Rucher des Hauldres. Tous droits réservés.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                href="/mentions-legales"
                                className="text-cream/40 hover:text-honey-light transition-colors text-sm"
                            >
                                Mentions légales
                            </Link>
                            <Link
                                href="/politique-de-confidentialite"
                                className="text-cream/40 hover:text-honey-light transition-colors text-sm"
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

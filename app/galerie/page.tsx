import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GalleryGrid, { type GalleryImage } from "@/components/GalleryGrid";

export const metadata: Metadata = {
    title: "Galerie | Rucher des Hauldres",
    description:
        "Découvrez en images le travail au rucher des Hauldres : ruches, cadres operculés, récolte du miel en Seine-et-Marne (77).",
};

const images: GalleryImage[] = [
    { src: "/images/gal/1.jpg", alt: "L'apiculteur inspecte une hausse au rucher" },
    { src: "/images/gal/2.jpg", alt: "Cadre operculé recouvert d'abeilles, prêt pour la récolte" },
    { src: "/images/gal/3.jpg", alt: "Ouverture d'une ruche et observation des cadres" },
    { src: "/images/gal/4.jpg", alt: "Cadre de hausse recouvert d'abeilles butineuses" },
    { src: "/images/gal/5.jpg", alt: "Le rucher installé en lisière des champs, à l'ombre des arbres" },
    { src: "/images/gal/6.jpg", alt: "Essaim d'abeilles agglutiné sur une ruche" },
    { src: "/images/gal/7.jpg", alt: "Plusieurs ruches réparties dans les hautes herbes" },
    { src: "/images/gal/8.jpg", alt: "Ruches installées à l'abri d'une haie" },
    { src: "/images/gal/9.jpg", alt: "Vue d'ensemble de plusieurs ruches du rucher" },
];

export default function GaleriePage() {
    return (
        <main className="bg-cream min-h-screen pt-36 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-ink-soft hover:text-honey transition-colors mb-10"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm">Retour à l&apos;accueil</span>
                </Link>

                <div className="text-center mb-14">
                    <p className="text-honey tracking-[0.25em] text-xs uppercase mb-4">En images</p>
                    <h1 className="text-3xl sm:text-4xl font-serif text-ink mb-5">Notre galerie</h1>
                    <p className="text-ink-soft max-w-2xl mx-auto leading-relaxed">
                        Un aperçu du travail quotidien au rucher des Hauldres : nos ruches, nos cadres et nos
                        abeilles, en Seine-et-Marne.
                    </p>
                    <div className="rule-honey mx-auto mt-7" />
                </div>

                <GalleryGrid images={images} />
            </div>
        </main>
    );
}

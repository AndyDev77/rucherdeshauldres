"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Reveal from "./Reveal";

const products = [
    {
        id: 1,
        name: "Miel de Printemps",
        price: "9.00",
        image: "/images/miels/miel-printemps.png",
        description: "Récolte de miel à Chanteloup, Bréviande et Mardilly. Pot de 500 g.",
        stock: true,
    },
    {
        id: 2,
        name: "Miel d'Acacia",
        price: "10.00",
        image: "/images/miels/miel-acacia.png",
        description: "Récolte de miel à Chanteloup et Bréviande. Pot de 500 g.",
        stock: true,
    },
    {
        id: 3,
        name: "Miel de Tilleul",
        price: "9.00",
        image: "/images/miels/miel-tilleuls.png",
        description: "Récolte de miel à Chanteloup. Pot de 500 g.",
        stock: true,
    },
    {
        id: 5,
        name: "Miel Toutes Fleurs",
        price: "9.00",
        image: "/images/miels/miel-fleurs.png",
        description: "Récolte de miel à Chanteloup, Bréviande et Mardilly.",
        stock: true,
    },
    {
        id: 6,
        name: "Miel de Forêt",
        price: "10.00",
        image: "/images/miels/miel-foret.png",
        description: "Récolte de miel à Bréviande. Pot de 500 g.",
        stock: true,
    },
];

export function selectProduct(name: string) {
    const objet = `Commande : ${name}`;
    sessionStorage.setItem("produitInteret", objet);
    window.dispatchEvent(new CustomEvent("produit-interet", { detail: objet }));
}

export default function Products() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            "(min-width: 768px)": { slidesToScroll: 2 },
            "(min-width: 1024px)": { slidesToScroll: 3 },
        },
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        // Synchronisation initiale différée d'une frame : évite la cascade
        // de rendus d'un setState synchrone dans l'effet.
        const syncFrame = requestAnimationFrame(onSelect);

        return () => {
            cancelAnimationFrame(syncFrame);
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="py-24 sm:py-28 bg-cream" id="miels">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="text-center mb-14">
                        <p className="text-honey tracking-[0.25em] text-xs uppercase mb-4">Nos miels</p>
                        <h2 className="text-3xl sm:text-4xl font-serif text-ink mb-5">
                            Notre collection de miels
                        </h2>
                        <p className="text-ink-soft max-w-2xl mx-auto leading-relaxed">
                            Tarifs sans frais de port. Toutes les commandes sont à retirer directement au
                            rucher des Hauldres.
                        </p>
                        <div className="rule-honey mx-auto mt-7" />
                    </div>
                </Reveal>

                <Reveal delay={120}>
                    <div className="relative">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex gap-6 md:gap-8">
                                {products.map((product) => (
                                    <article
                                        key={product.id}
                                        className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.33%-21.33px)]"
                                    >
                                        <div
                                            className={`group h-full flex flex-col rounded-2xl bg-white border border-sand-deep/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-bark/10 hover:-translate-y-1 ${
                                                !product.stock ? "opacity-80" : ""
                                            }`}
                                        >
                                            <div className="relative h-64 bg-sand/60">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className={`object-contain p-6 transition-transform duration-500 ${
                                                        product.stock ? "group-hover:scale-105" : "grayscale"
                                                    }`}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                <span
                                                    className={`absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-medium ${
                                                        product.stock
                                                            ? "bg-honey/15 text-honey"
                                                            : "bg-ink/10 text-ink-soft"
                                                    }`}
                                                >
                                                    {product.stock ? "En stock" : "Rupture"}
                                                </span>
                                            </div>

                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex-grow">
                                                    <h3 className="text-xl font-serif text-ink mb-2">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-ink-soft leading-relaxed">
                                                        {product.description}
                                                    </p>
                                                </div>

                                                <div className="mt-6 pt-5 border-t border-sand-deep/70 flex items-center justify-between">
                                                    <span className="text-2xl font-serif text-honey">
                                                        {product.price}€
                                                    </span>
                                                    {product.stock ? (
                                                        <a
                                                            href="#contact"
                                                            onClick={() => selectProduct(product.name)}
                                                            className="rounded-full px-5 py-2.5 text-sm font-medium bg-bark text-cream hover:bg-honey transition-colors"
                                                        >
                                                            Commander
                                                        </a>
                                                    ) : (
                                                        <span className="rounded-full px-5 py-2.5 text-sm font-medium bg-sand-deep text-ink-soft cursor-not-allowed">
                                                            Indisponible
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <button
                            className="absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white text-ink shadow-lg shadow-bark/10 hover:bg-honey hover:text-cream transition-colors disabled:opacity-0 disabled:pointer-events-none z-10"
                            onClick={scrollPrev}
                            disabled={!prevBtnEnabled}
                            aria-label="Miels précédents"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <button
                            className="absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white text-ink shadow-lg shadow-bark/10 hover:bg-honey hover:text-cream transition-colors disabled:opacity-0 disabled:pointer-events-none z-10"
                            onClick={scrollNext}
                            disabled={!nextBtnEnabled}
                            aria-label="Miels suivants"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

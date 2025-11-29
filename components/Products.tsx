"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

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
        stock: false,
    },
];

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
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section className="py-24 bg-neutral-900" id="miels">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif text-white mb-4">Notre Collection de Miels</h2>
                    <p className="text-lg text-white/80 max-w-3xl mx-auto">
                        Les tarifs sont sans frais de port. <br /> Toutes commandes sont à retirer au rucher des
                        hauldres;
                    </p>
                    <div className="w-20 h-1 bg-orange-200/60 rounded-full mx-auto mt-6" />
                </div>

                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-8">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.33%-21.33px)]"
                                >
                                    <Card
                                        className={`group bg-neutral-900 border-none overflow-hidden h-full flex flex-col ${
                                            !product.stock ? "opacity-75" : ""
                                        }`}
                                    >
                                        <div className="relative h-72 bg-neutral-800">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className={`object-contain p-4 transition-transform duration-300 ${
                                                        product.stock ? "group-hover:scale-105" : "grayscale"
                                                    }`}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                            <div className="absolute top-4 right-4 z-10">
                                                <Badge
                                                    className={
                                                        product.stock ? "bg-green-500 text-white" : "bg-red-500 text-white"
                                                    }
                                                >
                                                    {product.stock ? "En stock" : "Rupture"}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex-grow">
                                                <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                                                <p className="text-white/60">{product.description}</p>
                                            </div>
                                            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
                                                <span className="text-2xl font-bold text-orange-200">{product.price}€</span>
                                                <a href="#contact">
                                                    <button
                                                        className={`px-4 py-2 rounded-md font-medium transition-colors ${
                                                            product.stock
                                                                ? "bg-orange-200 text-black hover:bg-text-50"
                                                                : "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                                                        }`}
                                                        disabled={!product.stock}
                                                    >
                                                        {product.stock ? "Commander" : "Indisponible"}
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
                        onClick={scrollPrev}
                        disabled={!prevBtnEnabled}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
                        onClick={scrollNext}
                        disabled={!nextBtnEnabled}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}

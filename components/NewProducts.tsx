"use client";

import Image from "next/image";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

const newProducts = [
    {
        id: 1,
        name: "Baume hydratant cire d'abeille maison",
        price: "8.00",
        image: "/images/new/baume.png",
        description:
            "Un pot de baume hydratant de 100g est composé de 12g de cire d'abeille pure, 60ml d'huile d'olive vierge et 8 gouttes d'huile essentielle bio de lavande.",
        isNew: true,
        stock: true,
    },
    {
        id: 2,
        name: "Évènement festif",
        price: "1.00",
        image: "/images/new/event.png",
        description:
            "Pour vos évènements festifs, nous vous proposons un pot de miel de 80g dans un sac en organza selon la couleur de votre choix (blanc, dorée, gris, argent, etc...).",
        isNew: true,
        stock: true,
    },
    {
        id: 3,
        name: "Proposition de cadeau",
        price: "15.00",
        image: "/images/new/sac-recto.png",
        description: "Pochette comprenant un pot de miel 250g, un pain d'épice et 2 sucres d'orge.",
        isNew: true,
        stock: true,
    },
    {
        id: 4,
        name: "Pain d'épice",
        price: "7.00",
        image: "/images/new/sac-recto.png",
        description: "Pochette comprenant un pot de miel 250g, un pain d'épice et 2 sucres d'orge.",
        isNew: true,
        stock: true,
    },
    {
        id: 5,
        name: "Miel en rayon",
        price: "10.00",
        image: "/images/new/rayon.png",
        description: "Miel issu de cadres operculés",
        isNew: true,
        stock: true,
    },
];

export default function NewProducts() {
    return (
        <section className="py-24 bg-neutral-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif text-white mb-4">Nos Nouveautés</h2>
                    <div className="w-20 h-1 bg-orange-200/60 rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="group bg-neutral-900 border-none overflow-hidden flex flex-col"
                        >
                            <div className="relative h-72 bg-neutral-800">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="absolute top-4 right-4 z-10">
                                    <Badge className="bg-orange-200 text-black font-medium">Nouveau</Badge>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                                <p className="text-white/60 mb-6 flex-grow">{product.description}</p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
                                    <span className="text-2xl font-bold text-orange-200">{product.price}€</span>
                                    <a href="#contact">
                                        <button className="px-4 py-2 bg-orange-200 text-black rounded-md font-medium hover:bg-text-50 transition-colors">
                                            Commander
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

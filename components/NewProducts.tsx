"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { selectProduct } from "./Products";

const newProducts = [
    {
        id: 1,
        name: "Baume hydratant cire d'abeille maison",
        price: "8.00",
        image: "/images/new/baume.png",
        description:
            "Un pot de baume hydratant de 100 g composé de 12 g de cire d'abeille pure, 60 ml d'huile d'olive vierge et 8 gouttes d'huile essentielle bio de lavande.",
    },
    {
        id: 2,
        name: "Évènement festif",
        price: "1.00",
        image: "/images/new/event.png",
        description:
            "Pour vos évènements festifs, un pot de miel de 80 g dans un sac en organza, selon la couleur de votre choix (blanc, doré, gris, argent…).",
    },
    {
        id: 3,
        name: "Proposition de cadeau",
        price: "15.00",
        image: "/images/new/sac-recto.png",
        description: "Pochette comprenant un pot de miel 250 g, un pain d'épice et 2 sucres d'orge.",
    },
    {
        id: 4,
        name: "Pain d'épice",
        price: "7.00",
        image: "/images/new/sac-recto.png",
        description: "Pochette comprenant un pot de miel 250 g, un pain d'épice et 2 sucres d'orge.",
    },
    {
        id: 5,
        name: "Miel en rayon",
        price: "10.00",
        image: "/images/new/rayon.png",
        description: "Miel issu de cadres operculés.",
    },
];

export default function NewProducts() {
    return (
        <section className="py-24 sm:py-28 bg-sand">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="text-center mb-14">
                        <p className="text-honey tracking-[0.25em] text-xs uppercase mb-4">
                            Les produits du rucher
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-serif text-ink">Nos nouveautés</h2>
                        <div className="rule-honey mx-auto mt-7" />
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {newProducts.map((product, index) => (
                        <Reveal key={product.id} delay={index * 80}>
                            <article className="group h-full flex flex-col rounded-2xl bg-cream border border-sand-deep/60 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-bark/10 hover:-translate-y-1">
                                <div className="relative h-64 bg-white/70">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <span className="absolute top-4 right-4 z-10 rounded-full bg-honey px-3 py-1 text-xs font-medium text-cream">
                                        Nouveau
                                    </span>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-serif text-ink mb-2">{product.name}</h3>
                                    <p className="text-sm text-ink-soft leading-relaxed flex-grow">
                                        {product.description}
                                    </p>

                                    <div className="mt-6 pt-5 border-t border-sand-deep/70 flex items-center justify-between">
                                        <span className="text-2xl font-serif text-honey">{product.price}€</span>
                                        <a
                                            href="#contact"
                                            onClick={() => selectProduct(product.name)}
                                            className="rounded-full px-5 py-2.5 text-sm font-medium bg-bark text-cream hover:bg-honey transition-colors"
                                        >
                                            Commander
                                        </a>
                                    </div>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import useEmblaCarousel from "embla-carousel-react";
import type {EmblaCarouselType} from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";


type Slide = {
    image: string;
    title: string;
    subtitle: string;
};

const SLIDES: Slide[] = [
    {
        image: "/images/home/home-1.jpg",
        title: "Bienvenue au rucher des Hauldres",
        subtitle:
            "Nos miels sont naturels, non chauffés, non agités, de grande qualité et savoureux !",
    },
    {
        image: "/images/home/home-3.jpg",
        title: "Découvrez nos différentes variétés de miels",
        subtitle:
            "Issues du domaine de Chanteloup, de la maison forestière du bois de Bréviande et Mardilly.",
    },
];

const AUTOPLAY_INTERVAL = 15000; // 15 secondes

export default function Hero() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const autoplayRef = useRef<number | null>(null);

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clearAutoplay = () => {
        if (autoplayRef.current !== null) {
            window.clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    };

    const startAutoplay = useCallback(
        (api: EmblaCarouselType | undefined) => {
            if (!api || prefersReducedMotion) return;
            clearAutoplay();
            autoplayRef.current = window.setInterval(() => {
                api.scrollNext();
            }, AUTOPLAY_INTERVAL);
        },
        [prefersReducedMotion]
    );



    const scrollPrev = useCallback(
        () => emblaApi && emblaApi.scrollPrev(),
        [emblaApi]
    );
    const scrollNext = useCallback(
        () => emblaApi && emblaApi.scrollNext(),
        [emblaApi]
    );

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        // Autoplay initial
        startAutoplay(emblaApi);

        // Stop / restart autoplay en cas d'interaction
        const stopAndRestart = () => {
            clearAutoplay();
            startAutoplay(emblaApi);
        };

        emblaApi.on("pointerDown", stopAndRestart);
        emblaApi.on("scroll", stopAndRestart);

        return () => {
            clearAutoplay();
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
            emblaApi.off("pointerDown", stopAndRestart);
            emblaApi.off("scroll", stopAndRestart);
        };
    }, [emblaApi, onSelect, startAutoplay]);

    return (
        <section
            className="relative h-screen overflow-hidden"
            aria-roledescription="carousel"
            aria-label="Mise en avant du rucher des Hauldres"
        >
            <div className="absolute inset-0" ref={emblaRef}>
                <div className="flex h-full touch-pan-y">
                    {SLIDES.map((slide, index) => (
                        <div
                            key={slide.title}
                            className="relative flex-[0_0_100%] min-w-0"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${index + 1} / ${SLIDES.length}`}
                        >
                            {/* Image + overlay */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                            </div>

                            {/* Contenu */}
                            <div className="relative h-full flex items-center justify-center px-4">
                                <div className="text-center max-w-5xl animate-fade-in">
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                                        {slide.subtitle}
                                    </p>
                                    <Link href="#miels">
                                        <Button
                                            className="px-8 py-3 rounded-full text-base md:text-lg font-medium
                                           bg-white/95 text-black shadow-lg shadow-black/40
                                           hover:bg-white hover:shadow-amber-400/40
                                           transition-transform duration-300 hover:scale-105 border border-white/60"
                                        >
                                            Voir nos miels
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Flèches */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                aria-label="Slide précédent"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                aria-label="Slide suivant"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        aria-label={`Aller au slide ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all ${
                            index === selectedIndex
                                ? "w-6 bg-text-50"
                                : "w-2.5 bg-white/60 hover:bg-white"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

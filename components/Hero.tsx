"use client";

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);

        // Synchronisation initiale différée d'une frame : évite la cascade
        // de rendus d'un setState synchrone dans l'effet.
        const syncFrame = requestAnimationFrame(onSelect);

        startAutoplay(emblaApi);

        const stopAndRestart = () => {
            clearAutoplay();
            startAutoplay(emblaApi);
        };

        emblaApi.on("pointerDown", stopAndRestart);
        emblaApi.on("scroll", stopAndRestart);

        return () => {
            cancelAnimationFrame(syncFrame);
            clearAutoplay();
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
            emblaApi.off("pointerDown", stopAndRestart);
            emblaApi.off("scroll", stopAndRestart);
        };
    }, [emblaApi, onSelect, startAutoplay]);

    return (
        <section
            className="relative h-[100svh] overflow-hidden"
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
                            {/* Image + voile chaleureux */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-bark/75 via-bark/45 to-bark/85" />
                                <div className="absolute inset-0 bg-honey/10 mix-blend-overlay" />
                            </div>

                            {/* Contenu */}
                            <div className="relative h-full flex items-center justify-center px-6">
                                <div className="text-center max-w-4xl">
                                    <p className="text-honey-light tracking-[0.3em] text-xs sm:text-sm uppercase mb-6">
                                        Apiculteur en Seine-et-Marne
                                    </p>
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-cream leading-[1.15] mb-6 text-balance">
                                        {slide.title}
                                    </h2>
                                    <p className="text-base sm:text-lg text-cream/85 mb-10 max-w-2xl mx-auto leading-relaxed">
                                        {slide.subtitle}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <Link
                                            href="#miels"
                                            className="px-8 py-3.5 rounded-full bg-honey text-cream font-medium
                                                       shadow-lg shadow-bark/40 hover:bg-honey-light hover:text-bark
                                                       transition-all duration-300 hover:scale-105"
                                        >
                                            Voir nos miels
                                        </Link>
                                        <Link
                                            href="#contact"
                                            className="px-8 py-3.5 rounded-full border border-cream/40 text-cream
                                                       hover:bg-cream hover:text-bark transition-all duration-300"
                                        >
                                            Commander
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Flèches — masquées sur mobile, où le glissement et les points suffisent */}
            <button
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-cream/30 text-cream/80 hover:bg-cream hover:text-bark transition-colors"
                onClick={scrollPrev}
                aria-label="Slide précédent"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <button
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border border-cream/30 text-cream/80 hover:bg-cream hover:text-bark transition-colors"
                onClick={scrollNext}
                aria-label="Slide suivant"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Points */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5">
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        aria-label={`Aller au slide ${index + 1}`}
                        aria-current={index === selectedIndex}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === selectedIndex ? "w-8 bg-honey-light" : "w-4 bg-cream/50 hover:bg-cream/80"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

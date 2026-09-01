"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type GalleryImage = {
    src: string;
    alt: string;
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const close = useCallback(() => setOpenIndex(null), []);
    const showPrev = useCallback(
        () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
        [images.length]
    );
    const showNext = useCallback(
        () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
        [images.length]
    );

    useEffect(() => {
        if (openIndex === null) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [openIndex, close, showPrev, showNext]);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {images.map((image, index) => (
                    <button
                        key={image.src}
                        type="button"
                        onClick={() => setOpenIndex(index)}
                        className="group relative aspect-square overflow-hidden rounded-2xl bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                        aria-label={`Agrandir la photo : ${image.alt}`}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-bark/0 group-hover:bg-bark/25 transition-colors duration-300" />
                    </button>
                ))}
            </div>

            {openIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-bark/95 px-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Visionneuse de photo"
                    onClick={close}
                >
                    <button
                        type="button"
                        onClick={close}
                        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 flex items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/25 transition-colors"
                        aria-label="Fermer la visionneuse"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            showPrev();
                        }}
                        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/25 transition-colors"
                        aria-label="Photo précédente"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div
                        className="relative w-full max-w-4xl h-[70vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[openIndex].src}
                            alt={images[openIndex].alt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                        <p className="absolute -bottom-10 left-0 right-0 text-center text-sm text-cream/70">
                            {images[openIndex].alt} — {openIndex + 1} / {images.length}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            showNext();
                        }}
                        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/25 transition-colors"
                        aria-label="Photo suivante"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            )}
        </>
    );
}

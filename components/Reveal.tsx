"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
    children: React.ReactNode;
    /** Retard avant l'apparition, en millisecondes. */
    delay?: number;
    className?: string;
};

/**
 * Fait apparaître son contenu en douceur lorsqu'il entre dans l'écran.
 * L'animation ne se joue qu'une fois, et est désactivée pour les
 * visiteurs qui préfèrent limiter les animations (voir globals.css).
 */
export default function Reveal({ children, delay = 0, className = "" }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${className}`}
            data-visible={visible}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
}

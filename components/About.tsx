"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
    return (
        <section className="py-24 bg-neutral-900" id="propos">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="relative h-[600px] rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-[1.02]">
                        <Image
                            src="/images/about/about-1.jpg"
                            alt="Apiculteur au travail"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-serif text-white">Notre Histoire</h2>
                            <div className="w-20 h-1 bg-orange-200/60 rounded-full" />
                        </div>

                        <p className="text-lg text-white/80 leading-relaxed">
                            Depuis l&apos;enfance, très respectueux de l&apos;environnement, j&apos;ai toujours
                            été attiré par la vie des abeilles et leurs organisations.
                        </p>

                        <p className="text-lg text-white/80 leading-relaxed">
                            Dès 2010, j&apos;ai suivi une formation d&apos;apiculteur au sein du GABI (Groupement
                            d&apos;apiculture de Bréviande Intercommunal).
                        </p>

                        <p className="text-lg text-white/80 leading-relaxed">
                            Actuellement, mes ruches (18 au total) sont reparties à Moissy-Cramayel, au domaine de
                            Chanteloup, face au potager bio de la commune. À la maison forestière du bois de
                            Bréviande et à Évry-Grégy-sur-Yerre.
                        </p>

                        <div className="pt-4">
                            <Link
                                href="/galerie"
                                className="inline-flex items-center space-x-2 text-orange-200 border-b-2 border-amber-400/30 hover:border-amber-400/30 transition-all duration-300 pb-1 group hover:scale-105"
                            >
                                <span className="text-lg font-medium">Découvrir nos ruches</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

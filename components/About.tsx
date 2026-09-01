import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function About() {
    return (
        <section className="py-24 sm:py-28 bg-sand" id="propos">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <Reveal>
                        <div className="relative">
                            {/* Cadre décoratif décalé */}
                            <div
                                aria-hidden="true"
                                className="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-honey/40"
                            />
                            <div className="relative h-[440px] sm:h-[560px] rounded-2xl overflow-hidden shadow-xl shadow-bark/10">
                                <Image
                                    src="/images/about/about-1.jpg"
                                    alt="Michel Clarion, apiculteur, au travail parmi ses ruches"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bark/40 to-transparent" />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="space-y-7">
                            <div>
                                <p className="text-honey tracking-[0.25em] text-xs uppercase mb-4">
                                    Notre histoire
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-serif text-ink leading-tight">
                                    Une passion pour les abeilles, depuis toujours
                                </h2>
                                <div className="rule-honey mt-6" />
                            </div>

                            <p className="text-ink-soft leading-relaxed text-[1.0625rem]">
                                Depuis l&apos;enfance, très respectueux de l&apos;environnement, j&apos;ai
                                toujours été attiré par la vie des abeilles et leurs organisations.
                            </p>

                            <p className="text-ink-soft leading-relaxed text-[1.0625rem]">
                                Dès 2010, j&apos;ai suivi une formation d&apos;apiculteur au sein du GABI
                                (Groupement d&apos;apiculture de Bréviande Intercommunal).
                            </p>

                            <p className="text-ink-soft leading-relaxed text-[1.0625rem]">
                                Actuellement, mes ruches (18 au total) sont réparties à Moissy-Cramayel, au
                                domaine de Chanteloup, face au potager bio de la commune, à la maison forestière
                                du bois de Bréviande et à Évry-Grégy-sur-Yerre.
                            </p>

                            <div className="pt-2">
                                <Link
                                    href="/galerie"
                                    className="group inline-flex items-center gap-2 text-honey font-medium border-b border-honey/30 hover:border-honey pb-1 transition-colors"
                                >
                                    <span>Découvrir nos ruches en images</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

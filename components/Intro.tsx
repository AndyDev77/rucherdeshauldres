import Reveal from "./Reveal";

const FIGURES = [
    { value: "18", label: "ruches en activité" },
    { value: "2010", label: "année de nos débuts" },
    { value: "5", label: "variétés de miel" },
    { value: "3", label: "sites de récolte" },
];

export default function Intro() {
    return (
        <section className="bg-cream py-24 sm:py-28">
            <div className="max-w-4xl mx-auto px-6">
                <Reveal>
                    <div className="text-center">
                        <p className="text-honey tracking-[0.25em] text-xs uppercase mb-6">
                            Moissy-Cramayel · Seine-et-Marne (77)
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif text-ink leading-tight text-balance">
                            Miel artisanal français, récolté au cœur de la Seine-et-Marne
                        </h1>
                        <div className="rule-honey mx-auto mt-8" />
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    <div className="mt-12 space-y-6 text-center text-ink-soft leading-relaxed text-[1.0625rem]">
                        <p>
                            Le Rucher des Hauldres est un rucher situé à Moissy-Cramayel (77550), en
                            Seine-et-Marne. Nous produisons du miel artisanal français, récolté localement avec
                            une apiculture respectueuse des abeilles.
                        </p>
                        <p>
                            Nos miels sont naturels, non chauffés et issus des floraisons de la région
                            (Chanteloup, Bréviande, Mardilly). Découvrez nos variétés — acacia, tilleul, toutes
                            fleurs — et nos produits du rucher.
                        </p>
                        <p>
                            Vous cherchez un apiculteur en Seine-et-Marne pour acheter du miel local ? Consultez
                            nos miels et contactez-nous pour une commande à retirer au rucher.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 border-t border-sand-deep pt-12">
                        {FIGURES.map((figure) => (
                            <div key={figure.label} className="text-center">
                                <dt className="sr-only">{figure.label}</dt>
                                <dd>
                                    <span className="block text-3xl sm:text-4xl font-serif text-honey">
                                        {figure.value}
                                    </span>
                                    <span className="mt-2 block text-xs sm:text-sm text-ink-soft tracking-wide">
                                        {figure.label}
                                    </span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </section>
    );
}

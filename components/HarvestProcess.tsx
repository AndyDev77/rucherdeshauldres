import Image from "next/image";
import Reveal from "./Reveal";

const harvestSteps = [
    {
        id: 1,
        title: "Récolte des cadres",
        description:
            "Au printemps, nous plaçons soigneusement des cadres vides dans les hausses, dans le but d'obtenir du miel. Une fois remplis, les cadres sont operculés de cire pure par les abeilles. L'apiculteur peut alors les récupérer afin d'extraire le miel dans un local appelé miellerie.",
        image: "/images/work/img-chanteloup-2.jpg",
    },
    {
        id: 2,
        title: "Désoperculation",
        description:
            "La deuxième étape consiste à retirer la fine couche de cire (l'opercule) que les abeilles déposent sur chaque alvéole. Nous utilisons un peigne à désoperculer afin de libérer le miel stocké. La cire récupérée sera recyclée pour la création de nouveaux cadres cirés.",
        image: "/images/work/desoperculation.jpg",
    },
    {
        id: 3,
        title: "Extraction",
        description:
            "Pour extraire le miel des alvéoles, nous utilisons un extracteur qui, grâce à sa vitesse de rotation, expulse le miel en le projetant contre les parois de la cuve.",
        image: "/images/home/home-1.jpg",
    },
    {
        id: 4,
        title: "Mise en pots",
        description:
            "Pour la dernière étape, le miel est stocké quelques jours dans un maturateur, afin d'extraire les fines particules de cire. La mise en pots se fait ensuite en contenants de 1 kg, 500 g ou 250 g.",
        image: "/images/work/pots_miels.jpeg",
    },
];

export default function HarvestProcess() {
    return (
        <section className="py-24 sm:py-28 bg-bark" id="travail">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="text-center mb-16">
                        <p className="text-honey-light tracking-[0.25em] text-xs uppercase mb-4">
                            Notre savoir-faire
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-serif text-cream mb-5">
                            Le processus de récolte
                        </h2>
                        <p className="text-cream/70 max-w-2xl mx-auto leading-relaxed">
                            Découvrez les étapes minutieuses de notre récolte de miel, un savoir-faire artisanal
                            transmis de génération en génération.
                        </p>
                        <div className="rule-honey mx-auto mt-7" />
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {harvestSteps.map((step, index) => (
                        <Reveal key={step.id} delay={index * 90}>
                            <article className="group h-full rounded-2xl overflow-hidden bg-bark-soft/60 border border-cream/10 transition-all duration-500 hover:border-honey/40">
                                <div className="relative h-60">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-bark via-bark/40 to-transparent" />
                                    <div className="absolute bottom-5 left-5 right-5 flex items-center gap-4">
                                        <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-honey text-cream font-serif text-lg">
                                            {step.id}
                                        </span>
                                        <h3 className="text-xl font-serif text-cream">{step.title}</h3>
                                    </div>
                                </div>
                                <div className="p-6 sm:p-7">
                                    <p className="text-cream/70 leading-relaxed text-[0.9375rem]">
                                        {step.description}
                                    </p>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

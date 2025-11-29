"use client";

import Image from "next/image";
import {Card} from "@/components/ui/card";


const harvestSteps = [
  {
    id: 1,
    title: " Récolte des cadres",
    description:
      "Au printemps, nous plaçons soigneusement des cadres vides, dans les rehausses dans le but d'obtenir du miel. Les cadres une fois remplis de miel, sont operculés de cire pure par les abeilles. L'apiculteur peut donc les récupérer afin d'extraire le miel dans un local appelé miellerie.",
    image: "/images/work/img-chanteloup-2.jpg",
  },
  {
    id: 2,
    title: "Désoperculation",
    description:
      "La deuxième étape consiste à retirer la fine couche de cire (l'opercule) que les abeilles déposent sur chaque alvéole. Nous utilisons un peigne à désoperculer afin d'extraire le miel stocké dans les alvéoles. La cire libérée (opercule) sera recyclée et réutilisée pour la création de cadres cirés.",
    image: "/images/work/desoperculation.jpg",
  },
  {
    id: 3,
    title: "Extraction",
    description:
      "Pour extraire le miel des alvéoles, nous utilisons un extracteur qui, grâce à sa vitesse de rotation, peut expulser le miel des alvéoles en le projetant contre les parois de celui-ci.",
    image: "/images/home/home-1.jpg",
  },
  {
    id: 4,
    title: "Mise en pots",
    description:
      "Pour la dernière étape, le miel est stocké dans un maturateur quelques jours, afin d'extraire les fines particules de cires. La mise en pots peut se faire dans des pots de 1 kg, 500 g ou de 250 g.",
    image: "/images/work/pots_miels.jpeg",
  },
];

export default function HarvestProcess() {
  return (
    <section className="py-24 bg-neutral-950" id="travail">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-white mb-4">Le Processus de Récolte</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Découvrez les étapes minutieuses de notre récolte de miel, un savoir-faire artisanal
            transmis de génération en génération.
          </p>
          <div className="w-20 h-1 bg-orange-200/60 rounded-full mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {harvestSteps.map((step) => (
            <Card
              key={step.id}
              className="group bg-neutral-900 border-none overflow-hidden hover:shadow-2xl hover:shadow-amber-400/10 transition-all duration-500"
            >
              <div className="relative h-64">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-200 text-black font-bold">
                      {step.id}
                    </span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-white/80 leading-relaxed">{step.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

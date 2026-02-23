import Hero from "@/components/Hero";
import About from "@/components/About";
import NewProducts from "@/components/NewProducts";
import Products from "@/components/Products";
import HarvestProcess from "@/components/HarvestProcess";
import ContactForm from "@/components/ContactForm";

export default function Home() {
    return (
        <main>
            <Hero />
                  <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    name: "Rucher des Hauldres",
                    description:
                    "Apiculteur en Seine-et-Marne (77) : miel artisanal français, récolte locale, produits naturels du rucher.",
                    address: {
                    "@type": "PostalAddress",
                    streetAddress: "151 rue des Hauldres",
                    addressLocality: "Moissy-Cramayel",
                    postalCode: "77550",
                    addressRegion: "Île-de-France",
                    addressCountry: "FR",
                    },
                    telephone: "+33680369887",
                    email: "michel.clarion@hotmail.fr",
                    url: "https://rucherdeshauldres.vercel.app",
                }),
                }}
            />
             {/* ✅ Bloc SEO serveur (visible, très important pour Google) */}
            <section className="mx-auto max-w-5xl px-4 py-14 text-center">
                <h1 className="text-3xl md:text-4xl font-serif mb-6">
                Rucher des Hauldres — Miel artisanal à Moissy-Cramayel (Seine-et-Marne 77)
                </h1>

                <p className="mb-4">
                Le Rucher des Hauldres est un rucher situé à Moissy-Cramayel (77550), en Seine-et-Marne (77).
                Nous produisons du miel artisanal français, récolté localement avec une apiculture respectueuse des abeilles.
                </p>

                <p className="mb-4">
                Nos miels sont naturels, non chauffés et issus des floraisons de la région (Chanteloup, Bréviande, Mardilly).
                Découvrez nos variétés (acacia, tilleul, toutes fleurs…) et nos produits du rucher.
                </p>

                <p>
                Vous cherchez un apiculteur en Seine-et-Marne pour acheter du miel local ? Consultez nos miels et contactez-nous
                pour une commande à retirer au rucher.
                </p>
            </section>
            <About />
            <NewProducts />
            <Products />
            <HarvestProcess />
            <ContactForm />
        </main>
    );
}

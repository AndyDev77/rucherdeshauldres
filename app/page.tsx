import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
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

            <Intro />
            <About />
            <Products />
            <NewProducts />
            <HarvestProcess />
            <ContactForm />
        </main>
    );
}

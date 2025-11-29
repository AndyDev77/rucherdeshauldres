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
            <About />
            <NewProducts />
            <Products />
            <HarvestProcess />
            <ContactForm />
        </main>
    );
}

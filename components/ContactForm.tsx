"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Reveal from "./Reveal";

const formSchema = z.object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    email: z.string().email("Email invalide"),
    telephone: z.string().min(10, "Numéro de téléphone invalide"),
    objet: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
    message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormValues = z.infer<typeof formSchema>;

const fieldClass =
    "bg-white border-sand-deep text-ink placeholder:text-ink-soft/60 focus-visible:ring-honey/40 focus-visible:border-honey";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [sentByMail, setSentByMail] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    // Pré-remplit l'objet si le visiteur arrive depuis un bouton "Commander".
    // Le formulaire étant déjà monté (ancre de page, pas de navigation), on
    // écoute aussi l'événement émis au clic en plus de la vérification initiale.
    useEffect(() => {
        const applyProduit = (produit: string) => {
            setValue("objet", produit);
            sessionStorage.removeItem("produitInteret");
        };

        const produit = sessionStorage.getItem("produitInteret");
        if (produit) applyProduit(produit);

        const onProduitInteret = (e: Event) => {
            const produit = (e as CustomEvent<string>).detail;
            if (produit) applyProduit(produit);
        };
        window.addEventListener("produit-interet", onProduitInteret);
        return () => window.removeEventListener("produit-interet", onProduitInteret);
    }, [setValue]);

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi du message");
            }

            setSentByMail(false);
            setShowSuccessModal(true);
            reset();
        } catch {
            // Le service d'envoi n'est pas encore configuré : on ouvre
            // la messagerie du visiteur avec le message pré-rempli, pour
            // que la demande ne soit jamais perdue.
            const subject = encodeURIComponent(`[Site] ${data.objet}`);
            const body = encodeURIComponent(
                `Nom : ${data.nom} ${data.prenom}\nEmail : ${data.email}\nTéléphone : ${data.telephone}\n\n${data.message}`
            );
            window.location.href = `mailto:michel.clarion@hotmail.fr?subject=${subject}&body=${body}`;

            setSentByMail(true);
            setShowSuccessModal(true);
            reset();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section className="py-24 sm:py-28 bg-cream" id="contact">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-14 lg:gap-20">
                        {/* Formulaire */}
                        <Reveal>
                            <div>
                                <div className="mb-10">
                                    <p className="text-honey tracking-[0.25em] text-xs uppercase mb-4">
                                        Commander
                                    </p>
                                    <h2 className="text-3xl sm:text-4xl font-serif text-ink mb-4">
                                        Pour l&apos;achat de pots
                                    </h2>
                                    <p className="text-ink-soft">
                                        Appelez-nous au{" "}
                                        <a
                                            href="tel:+33680369887"
                                            className="text-honey font-medium hover:underline"
                                        >
                                            06 80 36 98 87
                                        </a>{" "}
                                        ou remplissez le formulaire ci-dessous.
                                    </p>
                                    <div className="rule-honey mt-6" />
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="nom" className="block text-sm text-ink-soft mb-2">
                                                Nom
                                            </label>
                                            <Input
                                                id="nom"
                                                {...register("nom")}
                                                placeholder="Votre nom"
                                                className={fieldClass}
                                                disabled={isSubmitting}
                                                aria-invalid={!!errors.nom}
                                            />
                                            {errors.nom && (
                                                <p className="mt-1.5 text-sm text-red-600">{errors.nom.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="prenom" className="block text-sm text-ink-soft mb-2">
                                                Prénom
                                            </label>
                                            <Input
                                                id="prenom"
                                                {...register("prenom")}
                                                placeholder="Votre prénom"
                                                className={fieldClass}
                                                disabled={isSubmitting}
                                                aria-invalid={!!errors.prenom}
                                            />
                                            {errors.prenom && (
                                                <p className="mt-1.5 text-sm text-red-600">
                                                    {errors.prenom.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="email" className="block text-sm text-ink-soft mb-2">
                                                Email
                                            </label>
                                            <Input
                                                id="email"
                                                {...register("email")}
                                                type="email"
                                                autoComplete="email"
                                                placeholder="vous@exemple.fr"
                                                className={fieldClass}
                                                disabled={isSubmitting}
                                                aria-invalid={!!errors.email}
                                            />
                                            {errors.email && (
                                                <p className="mt-1.5 text-sm text-red-600">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="telephone"
                                                className="block text-sm text-ink-soft mb-2"
                                            >
                                                Téléphone
                                            </label>
                                            <Input
                                                id="telephone"
                                                {...register("telephone")}
                                                type="tel"
                                                autoComplete="tel"
                                                placeholder="06 12 34 56 78"
                                                className={fieldClass}
                                                disabled={isSubmitting}
                                                aria-invalid={!!errors.telephone}
                                            />
                                            {errors.telephone && (
                                                <p className="mt-1.5 text-sm text-red-600">
                                                    {errors.telephone.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="objet" className="block text-sm text-ink-soft mb-2">
                                            Objet
                                        </label>
                                        <Input
                                            id="objet"
                                            {...register("objet")}
                                            placeholder="Objet de votre message"
                                            className={fieldClass}
                                            disabled={isSubmitting}
                                            aria-invalid={!!errors.objet}
                                        />
                                        {errors.objet && (
                                            <p className="mt-1.5 text-sm text-red-600">{errors.objet.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm text-ink-soft mb-2">
                                            Message
                                        </label>
                                        <Textarea
                                            id="message"
                                            {...register("message")}
                                            placeholder="Dites-nous ce qui vous ferait plaisir…"
                                            className={`${fieldClass} min-h-[170px]`}
                                            disabled={isSubmitting}
                                            aria-invalid={!!errors.message}
                                        />
                                        {errors.message && (
                                            <p className="mt-1.5 text-sm text-red-600">
                                                {errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full rounded-full bg-bark text-cream hover:bg-honey font-medium py-6 text-base transition-all duration-300 ${
                                            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <span className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin mr-2" />
                                                Envoi en cours…
                                            </span>
                                        ) : (
                                            "Envoyer ma demande"
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </Reveal>

                        {/* Informations de contact */}
                        <Reveal delay={120}>
                            <div className="lg:pt-4">
                                <div className="mb-10">
                                    <h2 className="text-3xl sm:text-4xl font-serif text-ink mb-4">
                                        Nous trouver
                                    </h2>
                                    <p className="text-ink-soft">
                                        Une question ?{" "}
                                        <span className="text-honey">N&apos;hésitez pas.</span>
                                    </p>
                                    <div className="rule-honey mt-6" />
                                </div>

                                <div className="rounded-2xl bg-sand p-7 sm:p-8 space-y-7">
                                    <div className="flex items-start gap-4">
                                        <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-cream">
                                            <MapPin className="w-5 h-5 text-honey" />
                                        </span>
                                        <div>
                                            <h3 className="font-medium text-ink mb-1">Localisation</h3>
                                            <p className="text-ink-soft text-sm leading-relaxed">
                                                151 rue des Hauldres
                                                <br />
                                                77550 Moissy-Cramayel
                                            </p>
                                            <a
                                                href="https://www.google.com/maps/search/?api=1&query=151+rue+des+Hauldres+77550+Moissy-Cramayel"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-2 inline-block text-sm text-honey hover:underline"
                                            >
                                                Voir sur la carte
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-cream">
                                            <Phone className="w-5 h-5 text-honey" />
                                        </span>
                                        <div>
                                            <h3 className="font-medium text-ink mb-1">Téléphone</h3>
                                            <a
                                                href="tel:+33680369887"
                                                className="text-ink-soft text-sm hover:text-honey transition-colors"
                                            >
                                                06 80 36 98 87
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-cream">
                                            <Mail className="w-5 h-5 text-honey" />
                                        </span>
                                        <div className="min-w-0">
                                            <h3 className="font-medium text-ink mb-1">Email</h3>
                                            <a
                                                href="mailto:michel.clarion@hotmail.fr"
                                                className="text-ink-soft text-sm hover:text-honey transition-colors break-all"
                                            >
                                                michel.clarion@hotmail.fr
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-6 text-sm text-ink-soft leading-relaxed">
                                    Toutes les commandes sont à retirer directement au rucher. Contactez-nous
                                    pour convenir d&apos;un rendez-vous.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Modale de confirmation */}
            <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogContent className="bg-cream text-ink border-sand-deep">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl font-serif">
                            <CheckCircle2 className="w-6 h-6 text-honey" />
                            {sentByMail ? "Votre messagerie s'est ouverte" : "Message envoyé avec succès !"}
                        </DialogTitle>
                        <DialogDescription className="text-ink-soft pt-2 leading-relaxed">
                            {sentByMail
                                ? "Il ne reste plus qu'à cliquer sur « Envoyer » dans votre messagerie pour que votre demande nous parvienne. Vous pouvez aussi nous appeler directement au 06 80 36 98 87."
                                : "Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <Button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full rounded-full bg-bark text-cream hover:bg-honey"
                        >
                            Fermer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

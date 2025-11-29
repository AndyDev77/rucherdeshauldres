"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";


const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Numéro de téléphone invalide"),
  objet: z.string().min(3, "L'objet doit contenir au moins 3 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      // Afficher la modale de succès
      setShowSuccessModal(true);
      // Réinitialiser le formulaire
      reset();
    } catch {
      // En cas d'erreur, afficher une alerte
      alert("Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-24 bg-neutral-900" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Formulaire */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl font-serif text-white mb-4">Pour l&apos;achat de pots</h2>
                <p className="text-white/80">
                  Contactez-nous au{" "}
                  <a href="tel:0680369887" className="text-orange-200 hover:underline">
                    06 80 36 98 87
                  </a>{" "}
                  ou remplissez le formulaire !
                </p>
                <div className="w-20 h-1 bg-orange-200/60 rounded-full mt-6" />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      {...register("nom")}
                      placeholder="Nom"
                      className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                      disabled={isSubmitting}
                    />
                    {errors.nom && (
                      <p className="mt-1 text-sm text-red-400">{errors.nom.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("prenom")}
                      placeholder="Prénom"
                      className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                      disabled={isSubmitting}
                    />
                    {errors.prenom && (
                      <p className="mt-1 text-sm text-red-400">{errors.prenom.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="Email"
                      className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("telephone")}
                      type="tel"
                      placeholder="Téléphone"
                      className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                      disabled={isSubmitting}
                    />
                    {errors.telephone && (
                      <p className="mt-1 text-sm text-red-400">{errors.telephone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Input
                    {...register("objet")}
                    placeholder="Objet du message"
                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
                    disabled={isSubmitting}
                  />
                  {errors.objet && (
                    <p className="mt-1 text-sm text-red-400">{errors.objet.message}</p>
                  )}
                </div>

                <div>
                  <Textarea
                    {...register("message")}
                    placeholder="Message"
                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 min-h-[200px]"
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-orange-200 text-black hover:bg-text-50 font-medium py-6 text-lg transition-all duration-300 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </div>
                  ) : (
                    "ENVOYER"
                  )}
                </Button>
              </form>
            </div>

            {/* Informations de contact */}
            <div className="lg:pl-16">
              <div className="mb-12">
                <h2 className="text-4xl font-serif text-white mb-4">Contactez-nous</h2>
                <p className="text-white/80">
                  Si vous aviez des questions,{" "}
                  <span className="text-orange-200">n&apos;hésitez pas !</span>
                </p>
                <div className="w-20 h-1 bg-orange-200/60 rounded-full mt-6" />
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-orange-200 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Localisation</h3>
                    <p className="text-white/80">151 rue des Hauldres, Moissy-Cramayel (77550)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-orange-200 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Adresse-mail</h3>
                    <a
                      href="mailto:michel.clarion@hotmail.fr"
                      className="text-white/80 hover:text-orange-200 transition-colors"
                    >
                      michel.clarion@hotmail.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-orange-200 mt-1" />
                  <div>
                    <h3 className="text-lg font-medium text-white mb-2">Appelez-nous</h3>
                    <a
                      href="tel:0680369887"
                      className="text-white/80 hover:text-orange-200 transition-colors"
                    >
                      06 80 36 98 87
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modale de succès */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="bg-neutral-900 text-white border-neutral-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              Message envoyé avec succès !
            </DialogTitle>
            <DialogDescription className="text-white/60 pt-2">
              Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-amber-400 text-black hover:bg-amber-500"
            >
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

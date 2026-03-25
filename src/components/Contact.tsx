/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import type { ChangeEvent, FormEvent, ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { VIEWPORT_ONCE } from "../data/animations";
import { SOCIAL_LINKS } from "../data/socialLinks";
import type { SocialPlatform } from "../data/socialLinks";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ContactDetail {
  readonly label: string;
  readonly value: string;
  readonly icon: ReactElement;
}

interface ContactProps {
  readonly onOpenMatchStudio: () => void;
}

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  message: "",
};

const CONTACT_DETAILS: readonly ContactDetail[] = [
  {
    label: "Email",
    value: "dianasofiaroserol@gmail.com",
    icon: <Mail size={24} />,
  },
  {
    label: "Teléfono",
    value: "+57 315 6268049",
    icon: <Phone size={24} />,
  },
  {
    label: "Ubicación",
    value: "San Juan de Pasto, Colombia",
    icon: <MapPin size={24} />,
  },
];

const SOCIAL_ICONS: Record<SocialPlatform, ReactElement> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
};

export default function Contact({
  onOpenMatchStudio,
}: ContactProps): ReactElement {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
    }

    submitTimerRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState(INITIAL_FORM_STATE);
    }, 1500);
  };

  return (
    <section id="contacto" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
          >
            <SectionHeading
              eyebrow="Contacto"
              title="¿Tienes un proyecto en mente?"
              description="Estoy siempre abierta a discutir nuevos proyectos, ideas creativas o oportunidades para ser parte de tus visiones."
              descriptionClassName="text-foreground/60 text-lg mb-12 leading-relaxed"
            />

            <motion.button
              type="button"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenMatchStudio}
              className="mb-10 px-6 py-3 rounded-xl border border-primary/40 bg-linear-to-r from-primary/20 to-cyan-300/15 text-primary font-bold inline-flex items-center gap-2 hover:from-primary/30 hover:to-cyan-300/25 transition-all shadow-[0_10px_30px_rgba(161,137,255,0.2)]"
            >
              Abrir Project Match Studio <Sparkles size={16} />
            </motion.button>

            <div className="space-y-8">
              {CONTACT_DETAILS.map((detail) => (
                <div key={detail.label} className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-primary">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="text-sm text-foreground/50 uppercase tracking-widest font-bold mb-1">
                      {detail.label}
                    </p>
                    <p className="text-lg font-medium">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-12">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.href}
                  whileHover={{
                    y: -5,
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                  }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noreferrer noopener" : undefined}
                  aria-label={social.label}
                >
                  {SOCIAL_ICONS[social.platform]}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            className="p-8 md:p-12 rounded-3xl bg-white/5 border border-white/5 relative overflow-hidden"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <Send size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-2">¡Mensaje Enviado!</h4>
                <p className="text-foreground/60 mb-8">
                  Gracias por contactarme. Te responderé lo antes posible.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-primary font-bold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/70 ml-1">
                    Nombre Completo
                  </label>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/70 ml-1">
                    Email
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground/70 ml-1">
                    Mensaje
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Cuéntame sobre tu proyecto..."
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className="w-full bg-primary text-background font-bold py-5 rounded-xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}{" "}
                  <Send size={18} />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

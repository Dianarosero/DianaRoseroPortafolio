/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactElement } from "react";
import SectionHeading from "./SectionHeading";
import { EASE_OUT, BATCH_START } from "../data/animations";
import { SOCIAL_LINKS } from "../data/socialLinks";
import type { SocialPlatform } from "../data/socialLinks";

/* ── Formspree endpoint ── */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeojvdyw";

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

const CONTACT_DETAILS: readonly ContactDetail[] = [
  { label: "Email",     value: "dianasofiaroserol@gmail.com", icon: <Mail size={18} /> },
  { label: "Teléfono",  value: "+57 315 6268049",             icon: <Phone size={18} /> },
  { label: "Ubicación", value: "San Juan de Pasto, Colombia",  icon: <MapPin size={18} /> },
];

const SOCIAL_ICONS: Record<SocialPlatform, ReactElement> = {
  github:   <Github size={16} />,
  linkedin: <Linkedin size={16} />,
};

export default function Contact(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.from(".contact-form-col", {
        opacity: 0, x: -30, duration: 0.7, ease: EASE_OUT,
        scrollTrigger: { trigger: ".contact-form-col", start: BATCH_START, once: true },
      });
      gsap.from(".contact-info-col", {
        opacity: 0, x: 30, duration: 0.7, ease: EASE_OUT,
        scrollTrigger: { trigger: ".contact-info-col", start: BATCH_START, once: true },
      });
    },
    { scope: containerRef }
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setSubmitError("No se pudo enviar el mensaje. Intenta de nuevo.");
      }
    } catch {
      setSubmitError("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} id="contacto" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-16">
          <SectionHeading
            eyebrow="Contacto"
            title="¿Tienes un proyecto en mente?"
            description="Estoy abierta a nuevos proyectos, oportunidades y colaboraciones. Escríbeme."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Form column ── */}
          <div className="contact-form-col">
            {submitted ? (
              <div className="glass-card ghost-border rounded-xl p-10 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-teal/15 flex items-center justify-center">
                  <Send size={20} className="text-teal" />
                </div>
                <h4 className="font-headline text-2xl font-bold">¡Mensaje enviado!</h4>
                <p className="text-text-muted text-sm leading-relaxed max-w-xs">
                  Gracias por escribirme. Te responderé lo antes posible.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    Nombre
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    className="bg-surface ghost-border rounded-sm px-4 py-3 font-body text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className="bg-surface ghost-border rounded-sm px-4 py-3 font-body text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntame sobre tu proyecto..."
                    className="bg-surface ghost-border rounded-sm px-4 py-3 font-body text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  />
                </div>

                {submitError && (
                  <p className="font-mono text-[10px] text-red-400 uppercase tracking-wider">{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="accent-glow text-white font-mono text-xs uppercase tracking-[0.18em] px-8 py-3.5 rounded-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
                >
                  {isSubmitting ? "Enviando…" : (<>Enviar mensaje <Send size={13} /></>)}
                </button>
              </form>
            )}
          </div>

          {/* ── Info column ── */}
          <div className="contact-info-col flex flex-col gap-8">
            {/* Contact details */}
            <div className="space-y-5">
              {CONTACT_DETAILS.map((detail) => (
                <div key={detail.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-sm ghost-border flex items-center justify-center text-teal bg-teal/10 shrink-0">
                    {detail.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-dim mb-0.5">
                      {detail.label}
                    </p>
                    <p className="font-mono text-sm text-text">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CV download */}
            <a
              href="/CV_Diana_Rosero.pdf"
              className="group inline-flex items-center gap-3 ghost-border rounded-sm px-6 py-3.5 text-text-muted hover:text-text hover:border-accent/40 transition-all"
              aria-label="Descargar CV de Diana Rosero"
            >
              <Download size={16} className="text-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.18em]">Descargar CV</span>
            </a>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  className="w-11 h-11 rounded-sm ghost-border flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 hover:border-accent/30 hover:-translate-y-1 transition-all duration-200 bg-surface"
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noreferrer noopener" : undefined}
                  aria-label={social.label}
                >
                  {SOCIAL_ICONS[social.platform]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

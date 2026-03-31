/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import type { ReactElement } from "react";
import SectionHeading from "./SectionHeading";
import { EASE_OUT, BATCH_START } from "../data/animations";

const TECH_STACK = [
  "React.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "SQL / PostgreSQL",
  "Git / GitHub",
  "Figma",
  "Scrum / Agile",
  "REST APIs",
  "Node.js",
];

const STATS = [
  { value: "3+", label: "Años exp." },
  { value: "10+", label: "Proyectos" },
  { value: "2026", label: "Graduación" },
];

export default function About(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-heading", {
        opacity: 0, x: -30, duration: 0.6, ease: EASE_OUT,
        scrollTrigger: { trigger: ".about-heading", start: BATCH_START, once: true },
      });

      gsap.from(".about-bio", {
        opacity: 0, y: 24, duration: 0.65, ease: EASE_OUT,
        scrollTrigger: { trigger: ".about-bio", start: BATCH_START, once: true },
      });

      gsap.from(".about-stats", {
        opacity: 0, y: 20, duration: 0.5, ease: EASE_OUT,
        scrollTrigger: { trigger: ".about-stats", start: BATCH_START, once: true },
      });

      ScrollTrigger.batch(".about-tech-tag", {
        start: BATCH_START,
        once: true,
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            scale: 0.85,
            y: 10,
            duration: 0.4,
            ease: EASE_OUT,
            stagger: 0.04,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="sobre-mi" className="py-28 relative">
      <div className="absolute inset-0 bg-surface/50 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-16 items-start">

          {/* ── Left col — bio ── */}
          <div className="md:col-span-7 space-y-8">
            <div className="about-heading">
              <SectionHeading
                eyebrow="IDENTITY_CORE"
                title="Ingeniería y gestión, de principio a fin."
              />
            </div>

            <div className="about-bio glass-card ghost-border rounded-xl p-8 space-y-5">
              <p className="text-text-muted text-base leading-relaxed">
                Soy Ingeniera de Sistemas con Especialización en Gerencia de Proyectos. Me especializo
                en el desarrollo y gestión de soluciones TI — desde el levantamiento de requisitos
                hasta la entrega funcional, asegurando que cada proyecto cumpla los objetivos de negocio.
              </p>
              <p className="text-text-muted/80 text-base leading-relaxed">
                Combino desarrollo frontend con React.js con una visión estratégica de proyecto que me
                permite participar tanto en la implementación técnica como en la planificación,
                coordinación y comunicación con stakeholders.
              </p>
            </div>

            {/* Stats row */}
            <div className="about-stats grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="glass-card ghost-border rounded-xl px-5 py-5 text-center">
                  <p className="font-headline text-3xl font-bold text-accent leading-none">{s.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right col — tech stack ── */}
          <div className="md:col-span-5 md:mt-16">
            <div className="glass-card ghost-border rounded-xl p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal mb-6 pb-4 border-b border-border">
                Stack Tecnológico
              </p>
              <div className="flex flex-wrap gap-2.5">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="about-tech-tag font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-sm bg-surface-alt ghost-border text-text-muted hover:text-accent hover:border-accent/30 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Secondary note */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal mb-4">
                  Metodologías
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Scrum", "Kanban", "Análisis de Requisitos", "UML", "Documentación TI"].map((m) => (
                    <span
                      key={m}
                      className="about-tech-tag font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-sm bg-teal/10 text-teal/80 ghost-border border-teal/20"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

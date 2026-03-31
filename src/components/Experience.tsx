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

interface ExperienceEntry {
  readonly period: string;
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly current?: boolean;
}

const EXPERIENCES: readonly ExperienceEntry[] = [
  {
    period: "2024 — Presente",
    role: "Desarrolladora Frontend & Analista TI",
    company: "Proyectos Freelance",
    location: "Pasto, Colombia · Remoto",
    description:
      "Desarrollo de aplicaciones web con React, TypeScript y Tailwind CSS. Levantamiento de requisitos, diseño de soluciones y entrega de interfaces funcionales orientadas a resultados de negocio. Integración con APIs REST y bases de datos SQL.",
    tags: ["React", "TypeScript", "Tailwind CSS", "SQL", "REST APIs"],
    current: true,
  },
  {
    period: "2023 — 2024",
    role: "Analista de Sistemas",
    company: "Práctica Profesional — Sector Público",
    location: "Pasto, Colombia",
    description:
      "Análisis y documentación de procesos de negocio. Elaboración de requerimientos funcionales, casos de uso y diagramas de flujo. Soporte en la gestión de proyectos TI con metodología ágil y coordinación con equipos multidisciplinarios.",
    tags: ["Análisis de Sistemas", "UML", "Scrum", "Documentación TI"],
    current: false,
  },
  {
    period: "2021 — 2023",
    role: "Ingeniería de Sistemas",
    company: "Universidad Mariana",
    location: "Pasto, Colombia",
    description:
      "Formación técnica en desarrollo de software, bases de datos relacionales, redes y gestión de proyectos. Proyectos académicos con Java, Python y desarrollo web. Participación en grupos de investigación en ingeniería de software.",
    tags: ["Java", "Python", "Bases de Datos", "Redes", "Algoritmos"],
    current: false,
  },
];

export default function Experience(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".exp-heading", {
        opacity: 0, x: -30, duration: 0.6, ease: EASE_OUT,
        scrollTrigger: { trigger: ".exp-heading", start: BATCH_START, once: true },
      });

      ScrollTrigger.batch(".exp-entry", {
        start: BATCH_START,
        once: true,
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            x: -30,
            duration: 0.65,
            ease: EASE_OUT,
            stagger: 0.14,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="experiencia" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6">

        <div className="exp-heading mb-16">
          <SectionHeading eyebrow="Trayectoria" title="Experiencia & Formación" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-3 bottom-0 w-px timeline-line" />

          <div className="flex flex-col gap-12">
            {EXPERIENCES.map((entry) => (
              <div key={entry.role} className="exp-entry relative pl-10">
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    entry.current
                      ? "bg-teal border-teal shadow-[0_0_8px_rgba(52,211,153,0.6)] pulse-dot"
                      : "bg-surface-high border-accent/50"
                  }`}
                />

                {/* Card */}
                <div className="glass-card ghost-border rounded-xl p-7 hover:border-accent/25 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="font-headline text-xl font-bold leading-snug mb-1">{entry.role}</p>
                      <p className="font-mono text-xs text-accent tracking-wide">{entry.company}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim bg-surface-high px-3 py-1 rounded-sm inline-block">
                        {entry.period}
                      </span>
                      {entry.current && (
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-teal mt-1">
                          Activo
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim mb-4">
                    {entry.location}
                  </p>

                  <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {entry.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-sm bg-surface-alt ghost-border text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

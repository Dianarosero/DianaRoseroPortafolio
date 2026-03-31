/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowDown, Download, FolderOpen } from "lucide-react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { ReactElement } from "react";
import dianitaAvatar from "../assets/Dianita_Avatar.png";
import { EASE_OUT } from "../data/animations";

export default function Hero(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });

      tl.from(".hero-badge",   { opacity: 0, y: -12, duration: 0.45 })
        .from(".hero-h1",      { opacity: 0, x: -50, duration: 0.75 }, "-=0.2")
        .from(".hero-sub",     { opacity: 0, x: -30, duration: 0.5  }, "-=0.45")
        .from(".hero-desc",    { opacity: 0, y: 18, stagger: 0.12, duration: 0.5 }, "-=0.3")
        .from(".hero-btn",     { opacity: 0, y: 18, stagger: 0.1, duration: 0.4  }, "-=0.3")
        .from(".hero-avatar",  { opacity: 0, scale: 0.88, duration: 0.75 }, "<0.15")
        .from(".hero-stat",    { opacity: 0, y: 16, stagger: 0.1, duration: 0.45 }, "-=0.4")
        .from(".hero-scroll",  { opacity: 0, y: 10, duration: 0.4 }, "-=0.2");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Dot-grid background */}
      <div className="absolute inset-0 dot-grid opacity-[0.07] -z-10" />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/8 blur-[140px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-12 items-center">

        {/* ── Left col — 7/12 ── */}
        <div className="md:col-span-7 flex flex-col gap-7">

          {/* Availability badge */}
          <div className="hero-badge inline-flex items-center gap-2.5 self-start">
            <span className="w-2 h-2 rounded-full bg-teal pulse-dot shrink-0" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal">
              Disponible para nuevos proyectos
            </span>
          </div>

          {/* Headline */}
          <div className="hero-h1 space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
              Hola, soy
            </p>
            <h1 className="font-headline font-black leading-[0.9] tracking-tighter text-[clamp(3.5rem,9vw,6rem)]">
              Diana<br />
              <span className="italic text-accent">Rosero</span>
            </h1>
          </div>

          {/* Role line */}
          <div className="hero-sub flex items-center gap-4">
            <span className="w-8 h-px bg-teal shrink-0" />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
              Analista &amp; Desarrolladora · Proyectos TI
            </p>
          </div>

          {/* Stack tags */}
          <div className="hero-desc flex flex-wrap gap-2">
            {["Ing. Sistemas", "Esp. Gerencia de Proyectos", "React", "TypeScript", "SQL"].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-sm bg-surface-alt text-text-muted ghost-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="hero-desc text-text-muted text-base leading-relaxed max-w-lg">
            Construyo soluciones TI de principio a fin — desde el análisis de
            requisitos hasta la entrega. Desarrollo con React, gestiono con
            metodología y entrego con calidad.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#proyectos"
              className="hero-btn inline-flex items-center gap-2 accent-glow text-white font-mono text-xs uppercase tracking-[0.18em] px-8 py-3.5 rounded-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-accent/20"
              aria-label="Ver proyectos"
            >
              Ver proyectos <FolderOpen size={14} />
            </a>

            <a
              href="/CV_Diana_Rosero.pdf"
              className="hero-btn group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] px-8 py-3.5 rounded-sm text-text-muted hover:text-text ghost-border hover:border-teal/50 transition-all"
              aria-label="Descargar CV"
            >
              Descargar CV <Download size={14} />
            </a>
          </div>
        </div>

        {/* ── Right col — 5/12 ── */}
        <div className="md:col-span-5 flex flex-col items-center md:items-end gap-6">

          {/* Avatar */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 hero-avatar">
            {/* Glow halo */}
            <div className="absolute -inset-6 bg-accent/10 rounded-full blur-2xl" />
            {/* Frame */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden ghost-border shadow-2xl shadow-accent/10">
              <img
                src={dianitaAvatar}
                alt="Diana Rosero"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Overlay tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-base/40 via-transparent to-transparent" />
            </div>
            {/* Corner accents */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-accent/40 rounded-tr-xl" />
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-teal/40 rounded-bl-xl" />
          </div>

          {/* Stats row */}
          <div className="flex gap-4 w-full md:w-auto">
            {[
              { value: "3+", label: "Años de experiencia" },
              { value: "10+", label: "Proyectos entregados" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="hero-stat flex-1 glass-card ghost-border rounded-xl px-5 py-4 text-center"
              >
                <p className="font-headline text-3xl font-bold text-accent leading-none">{stat.value}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted mt-2 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-dim">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}

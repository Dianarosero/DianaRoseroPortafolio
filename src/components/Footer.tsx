/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Linkedin } from "lucide-react";
import type { ReactElement } from "react";
import { SOCIAL_LINKS } from "../data/socialLinks";
import type { SocialPlatform } from "../data/socialLinks";

const SOCIAL_ICON: Record<SocialPlatform, ReactElement> = {
  github:   <Github size={15} />,
  linkedin: <Linkedin size={15} />,
};

const NAV_COLS = [
  {
    heading: "Navegación",
    links: [
      { label: "Inicio",      href: "#inicio" },
      { label: "Proyectos",   href: "#proyectos" },
      { label: "Experiencia", href: "#experiencia" },
      { label: "Sobre mí",    href: "#sobre-mi" },
      { label: "Contacto",    href: "#contacto" },
    ],
  },
  {
    heading: "Contacto",
    links: [
      { label: "dianasofiaroserol@gmail.com", href: "mailto:dianasofiaroserol@gmail.com" },
      { label: "+57 315 6268049",             href: "tel:+573156268049" },
      { label: "Pasto, Colombia",             href: "#contacto" },
    ],
  },
];

export default function Footer(): ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* 3-col grid */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <a href="#inicio" className="inline-block">
              <span className="font-headline italic text-2xl text-text leading-none">
                Diana <span className="text-accent">Rosero</span>
              </span>
            </a>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim leading-relaxed max-w-[200px]">
              Analista &amp; Desarrolladora<br />Pasto, Colombia
            </p>
            <div className="flex gap-3 mt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  className="w-9 h-9 rounded-sm ghost-border flex items-center justify-center text-text-muted hover:text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-200 bg-surface-high"
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noreferrer noopener" : undefined}
                  aria-label={social.label}
                >
                  {SOCIAL_ICON[social.platform]}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Nav links */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal mb-5">
              {NAV_COLS[0].heading}
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_COLS[0].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted hover:text-text transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact links */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-teal mb-5">
              {NAV_COLS[1].heading}
            </p>
            <ul className="flex flex-col gap-3">
              {NAV_COLS[1].links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-[11px] text-text-muted hover:text-text transition-colors break-all"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
            © {currentYear} Diana Sofia Rosero — Engineered with precision.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
            React · TypeScript · GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "../data/navigation";
import { EASE_OUT } from "../data/animations";

export default function Navbar(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
      tl.from(".nav-logo", { opacity: 0, x: -20, duration: 0.5 })
        .from(".nav-link", { opacity: 0, y: -10, stagger: 0.08, duration: 0.4 }, "-=0.3")
        .from(".nav-cta", { opacity: 0, x: 20, duration: 0.4 }, "-=0.3");

      if (menuRef.current) {
        gsap.set(menuRef.current, { height: 0, opacity: 0, overflow: "hidden" });
      }
    },
    { scope: navRef }
  );

  const openMenu = contextSafe(() => {
    setIsOpen(true);
    gsap.to(menuRef.current, { height: "auto", opacity: 1, duration: 0.3, ease: EASE_OUT });
  });

  const closeMenu = contextSafe(() => {
    gsap.to(menuRef.current, {
      height: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setIsOpen(false),
    });
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass-panel border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#inicio" className="nav-logo flex items-center gap-2 group" aria-label="Ir al inicio">
          <span className="font-headline italic text-xl text-text leading-none">
            Diana <span className="text-accent">Rosero</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted hover:text-text transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-teal transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/CV_Diana_Rosero.pdf"
          className="nav-cta hidden md:inline-flex items-center gap-2 accent-glow text-white font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-sm hover:opacity-90 active:scale-95 transition-all"
          aria-label="Descargar CV"
        >
          Curriculum
        </a>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden text-text-muted hover:text-text transition-colors"
          onClick={isOpen ? closeMenu : openMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="md:hidden border-b border-border bg-surface"
        id="mobile-navigation"
      >
        <div className="flex flex-col px-6 py-5 gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={closeMenu}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="/CV_Diana_Rosero.pdf"
            className="mt-2 self-start accent-glow text-white font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-sm"
          >
            Curriculum
          </a>
        </div>
      </div>
    </nav>
  );
}

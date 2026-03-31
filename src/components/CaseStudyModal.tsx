/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Code2,
  GitBranch,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import type { CaseStudy } from "../data/caseStudies";
import { formatRepoName } from "../lib/github";
import { EASE_OUT } from "../data/animations";

interface CaseStudyModalProps {
  readonly repoName: string;
  readonly caseStudy: CaseStudy;
  readonly onClose: () => void;
}

interface SectionProps {
  readonly icon: ReactElement;
  readonly color: string;
  readonly label: string;
  readonly children: ReactElement;
}

function Section({ icon, color, label, children }: SectionProps): ReactElement {
  return (
    <div className="modal-section glass-card ghost-border p-6 rounded-xl">
      <p
        className="font-label text-xs font-bold uppercase tracking-[0.2em] mb-3 flex items-center gap-2"
        style={{ color }}
      >
        {icon}
        {label}
      </p>
      {children}
    </div>
  );
}

export default function CaseStudyModal({
  repoName,
  caseStudy,
  onClose,
}: CaseStudyModalProps): ReactElement {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
      tl.from(backdropRef.current, { opacity: 0, duration: 0.25 })
        .from(panelRef.current, { opacity: 0, y: 24, scale: 0.97, duration: 0.3 }, "-=0.15")
        .from(".modal-section", { opacity: 0, y: 12, stagger: 0.06, duration: 0.35 }, "-=0.15");
    },
    { scope: modalRef }
  );

  const handleClose = contextSafe(() => {
    gsap.to(panelRef.current, {
      opacity: 0, y: 24, scale: 0.97, duration: 0.25,
      ease: "power2.in", onComplete: onClose,
    });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" });
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6"
    >
      {/* Backdrop */}
      <button
        ref={backdropRef}
        type="button"
        aria-label="Cerrar caso de estudio"
        onClick={handleClose}
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Caso de estudio: ${formatRepoName(repoName)}`}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl glass-panel shadow-2xl"
      >
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 rounded-xl bg-[radial-gradient(circle_at_30%_0%,rgba(210,187,255,0.06),transparent_50%)]" />

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-8 pt-8 pb-4 glass-panel border-b border-outline-variant/15">
          <div>
            <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-1">
              Caso de estudio
            </p>
            <h3 className="font-headline text-2xl font-bold leading-tight">
              {formatRepoName(repoName)}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Cerrar"
            className="shrink-0 w-9 h-9 rounded-sm ghost-border flex items-center justify-center text-foreground-muted hover:text-primary hover:bg-surface-container-high transition-colors mt-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 flex flex-col gap-4">
          <Section icon={<AlertCircle size={13} />} color="#f87171" label="El problema">
            <p className="text-foreground-muted text-sm leading-relaxed">{caseStudy.problema}</p>
          </Section>

          <Section icon={<GitBranch size={13} />} color="#60a5fa" label="Proceso de solución">
            <p className="text-foreground-muted text-sm leading-relaxed">{caseStudy.proceso}</p>
          </Section>

          <Section icon={<Code2 size={13} />} color="#a78bfa" label="Decisiones técnicas">
            <ul className="flex flex-col gap-2">
              {caseStudy.decisiones.map((decision, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground-muted">
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-label text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {decision}
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={<CheckCircle2 size={13} />} color="#34d399" label="Resultado final">
            <p className="text-foreground-muted text-sm leading-relaxed">{caseStudy.resultado}</p>
          </Section>

          <Section icon={<BookOpen size={13} />} color="#fbbf24" label="Lo que aprendí">
            <p className="text-foreground-muted text-sm leading-relaxed">{caseStudy.aprendizajes}</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

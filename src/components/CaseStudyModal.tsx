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
} from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import type { CaseStudy } from '../data/caseStudies';
import { formatRepoName } from '../lib/github';

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
  readonly delay: number;
}

function Section({ icon, color, label, children, delay }: SectionProps): ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-2xl border border-white/5 bg-white/5 p-6"
    >
      <p
        className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
        style={{ color }}
      >
        {icon}
        {label}
      </p>
      {children}
    </motion.div>
  );
}

export default function CaseStudyModal({
  repoName,
  caseStudy,
  onClose,
}: CaseStudyModalProps): ReactElement {
  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar caso de estudio"
        onClick={onClose}
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Caso de estudio: ${formatRepoName(repoName)}`}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-background/98 shadow-2xl"
      >
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(circle_at_30%_0%,rgba(16,185,129,0.08),transparent_50%)]" />

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-8 pt-8 pb-4 bg-background/95 backdrop-blur-sm border-b border-white/5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
              Caso de estudio
            </p>
            <h3 className="text-2xl font-bold leading-tight">
              {formatRepoName(repoName)}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/30 transition-colors mt-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 flex flex-col gap-4">

          {/* Problema */}
          <Section
            icon={<AlertCircle size={14} />}
            color="#f87171"
            label="El problema"
            delay={0.05}
          >
            <p className="text-foreground/70 text-sm leading-relaxed">
              {caseStudy.problema}
            </p>
          </Section>

          {/* Proceso */}
          <Section
            icon={<GitBranch size={14} />}
            color="#60a5fa"
            label="Proceso de solución"
            delay={0.1}
          >
            <p className="text-foreground/70 text-sm leading-relaxed">
              {caseStudy.proceso}
            </p>
          </Section>

          {/* Decisiones técnicas */}
          <Section
            icon={<Code2 size={14} />}
            color="#a78bfa"
            label="Decisiones técnicas"
            delay={0.15}
          >
            <ul className="flex flex-col gap-2">
              {caseStudy.decisiones.map((decision, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground/70"
                >
                  <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {decision}
                </li>
              ))}
            </ul>
          </Section>

          {/* Resultado */}
          <Section
            icon={<CheckCircle2 size={14} />}
            color="#34d399"
            label="Resultado final"
            delay={0.2}
          >
            <p className="text-foreground/70 text-sm leading-relaxed">
              {caseStudy.resultado}
            </p>
          </Section>

          {/* Aprendizajes */}
          <Section
            icon={<BookOpen size={14} />}
            color="#fbbf24"
            label="Lo que aprendí"
            delay={0.25}
          >
            <p className="text-foreground/70 text-sm leading-relaxed">
              {caseStudy.aprendizajes}
            </p>
          </Section>

        </div>
      </motion.div>
    </motion.div>
  );
}

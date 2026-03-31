/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BriefcaseBusiness,
  CheckCircle2,
  Gauge,
  ShieldAlert,
  Sparkles,
  Target,
  Timer,
  Wallet,
  Waypoints,
  X,
} from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';

import SectionHeading from './SectionHeading';
import { EASE_OUT, BATCH_START } from '../data/animations';
import { PROJECTS } from '../data/projects';
import { buildMatchReport, scoreProjects } from '../lib/projectMatcher';
import type { MatchAnswers, MatchOption } from '../types/matchStudio';
import type { ProjectDomain, ProjectGoal } from '../types/project';

interface ProjectMatchStudioProps {
  readonly inModal?: boolean;
  readonly onClose?: () => void;
}

interface DraftAnswers {
  domain: MatchAnswers['domain'] | null;
  goal: MatchAnswers['goal'] | null;
  priority: MatchAnswers['priority'] | null;
  timeline: MatchAnswers['timeline'] | null;
  budget: MatchAnswers['budget'] | null;
}

const DOMAIN_OPTIONS: readonly MatchOption<ProjectDomain | 'unsure'>[] = [
  { value: 'ecommerce', label: 'E-commerce', helper: 'Catalogo, carrito y conversion.' },
  { value: 'analytics', label: 'Data & analytics', helper: 'Dashboards, KPIs y decisiones.' },
  { value: 'operations', label: 'Operaciones', helper: 'Automatizacion de procesos internos.' },
  { value: 'branding', label: 'Marca digital', helper: 'Posicionamiento y captacion.' },
  { value: 'unsure', label: 'No lo tengo claro', helper: 'Te orienta en una direccion inicial.' },
];

const GOAL_OPTIONS: readonly MatchOption<ProjectGoal>[] = [
  { value: 'conversion', label: 'Conversion', helper: 'Vender o captar mas leads.' },
  { value: 'insights', label: 'Insights', helper: 'Ver datos para decidir mejor.' },
  { value: 'automation', label: 'Automatizacion', helper: 'Reducir trabajo manual.' },
  { value: 'engagement', label: 'Engagement', helper: 'Mejorar interaccion y uso.' },
  { value: 'retention', label: 'Retencion', helper: 'Aumentar recurrencia y fidelidad.' },
];

const PRIORITY_OPTIONS: readonly MatchOption<MatchAnswers['priority']>[] = [
  { value: 'speed', label: 'Velocidad', helper: 'Salir rapido con MVP.' },
  { value: 'quality', label: 'Calidad', helper: 'Estabilidad y mantenibilidad.' },
  { value: 'scale', label: 'Escala', helper: 'Arquitectura para crecer.' },
  { value: 'experience', label: 'Experiencia UX', helper: 'Interaccion premium.' },
];

const TIMELINE_OPTIONS: readonly MatchOption<MatchAnswers['timeline']>[] = [
  { value: '2-4', label: '2 a 4 semanas', helper: 'Alcance acotado y agil.' },
  { value: '5-8', label: '5 a 8 semanas', helper: 'Balance entre alcance y tiempo.' },
  { value: '9-12', label: '9 a 12 semanas', helper: 'Mayor profundidad funcional.' },
];

const BUDGET_OPTIONS: readonly MatchOption<MatchAnswers['budget']>[] = [
  { value: 'starter', label: 'Starter', helper: 'Priorizar lo esencial.' },
  { value: 'growth', label: 'Growth', helper: 'Escalar con base solida.' },
  { value: 'scale', label: 'Scale', helper: 'Expansion robusta y sostenible.' },
];

const INITIAL_ANSWERS: DraftAnswers = {
  domain: null,
  goal: null,
  priority: null,
  timeline: null,
  budget: null,
};

interface OptionGroupProps<TValue extends string> {
  readonly title: string;
  readonly options: readonly MatchOption<TValue>[];
  readonly selectedValue: TValue | null;
  readonly icon: ReactElement;
  readonly onSelect: (value: TValue) => void;
}

function isAnswersComplete(answers: DraftAnswers): answers is MatchAnswers {
  return Boolean(
    answers.domain && answers.goal && answers.priority && answers.timeline && answers.budget,
  );
}

function OptionGroup<TValue extends string>({
  title,
  options,
  selectedValue,
  icon,
  onSelect,
}: OptionGroupProps<TValue>): ReactElement {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm uppercase tracking-wider text-foreground/60 font-bold mb-1 inline-flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        {title}
      </legend>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const isActive = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isActive}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 ${
                isActive
                  ? 'border-primary bg-primary/15 shadow-[0_0_24px_rgba(161,137,255,0.2)] -translate-y-0.5'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-foreground">{option.label}</p>
                <span
                  className={`w-4 h-4 rounded-full border ${
                    isActive ? 'border-primary bg-primary' : 'border-white/40'
                  }`}
                />
              </div>
              <p className="text-xs text-foreground/60 mt-2">{option.helper}</p>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function ProjectMatchStudio({
  inModal = false,
  onClose,
}: ProjectMatchStudioProps): ReactElement {
  const [answers, setAnswers] = useState<DraftAnswers>(INITIAL_ANSWERS);
  const sectionRef = useRef<HTMLElement>(null);

  const selectedCount = Object.values(answers).filter(Boolean).length;
  const isComplete = isAnswersComplete(answers);

  const matchData = useMemo(() => {
    if (!isAnswersComplete(answers)) {
      return null;
    }

    const scoredProjects = scoreProjects(PROJECTS, answers);
    const report = buildMatchReport(answers, scoredProjects);
    const topMatches = scoredProjects.slice(0, 3);

    return {
      topMatches,
      report,
      labels: {
        domain: DOMAIN_OPTIONS.find((item) => item.value === answers.domain)?.label ?? '-',
        goal: GOAL_OPTIONS.find((item) => item.value === answers.goal)?.label ?? '-',
        timeline: TIMELINE_OPTIONS.find((item) => item.value === answers.timeline)?.label ?? '-',
        budget: BUDGET_OPTIONS.find((item) => item.value === answers.budget)?.label ?? '-',
      },
    };
  }, [answers]);

  const updateAnswer = <TKey extends keyof DraftAnswers>(key: TKey, value: DraftAnswers[TKey]) => {
    setAnswers((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  useGSAP(
    () => {
      gsap.from('.pms-heading', {
        opacity: 0, y: 20, duration: 0.6, ease: EASE_OUT,
        scrollTrigger: { trigger: '.pms-heading', start: BATCH_START, once: true },
      });
      gsap.from('.pms-form', {
        opacity: 0, x: -24, duration: 0.6, ease: EASE_OUT,
        scrollTrigger: { trigger: '.pms-form', start: BATCH_START, once: true },
      });
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (!isComplete) return;
      gsap.from('.pms-result', { opacity: 0, y: 24, duration: 0.4, ease: EASE_OUT });
    },
    { dependencies: [isComplete] }
  );

  const studioContent = (
    <>
      <div className={`pms-heading ${inModal ? 'mb-8' : 'mb-12'}`}>
        <SectionHeading
          eyebrow="Innovacion"
          title="Project Match Studio"
          description="Selecciona tus criterios y desbloquea el resultado inteligente al final del formulario."
        />
      </div>

      <div className="pms-form rounded-3xl border border-white/10 bg-surface/70 backdrop-blur-xl p-6 md:p-8 space-y-6"
      >
        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <Sparkles className="text-primary mt-0.5" size={20} />
          <p className="text-foreground/70 text-sm leading-relaxed">
            Completa los 5 criterios para mostrar el resultado inteligente debajo.
          </p>
        </div>

        <OptionGroup
          title="Tipo de proyecto"
          options={DOMAIN_OPTIONS}
          selectedValue={answers.domain}
          icon={<BriefcaseBusiness size={14} />}
          onSelect={(value) => updateAnswer('domain', value)}
        />

        <OptionGroup
          title="Objetivo principal"
          options={GOAL_OPTIONS}
          selectedValue={answers.goal}
          icon={<Target size={14} />}
          onSelect={(value) => updateAnswer('goal', value)}
        />

        <OptionGroup
          title="Prioridad de entrega"
          options={PRIORITY_OPTIONS}
          selectedValue={answers.priority}
          icon={<Gauge size={14} />}
          onSelect={(value) => updateAnswer('priority', value)}
        />

        <OptionGroup
          title="Ventana de tiempo"
          options={TIMELINE_OPTIONS}
          selectedValue={answers.timeline}
          icon={<Timer size={14} />}
          onSelect={(value) => updateAnswer('timeline', value)}
        />

        <OptionGroup
          title="Rango de inversion"
          options={BUDGET_OPTIONS}
          selectedValue={answers.budget}
          icon={<Wallet size={14} />}
          onSelect={(value) => updateAnswer('budget', value)}
        />

        <div className="rounded-2xl border border-white/10 bg-background/40 p-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-xs uppercase tracking-wider text-foreground/50">Progreso del diagnostico</p>
            <p className="text-sm font-semibold text-foreground">{selectedCount}/5</p>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-cyan-300"
              style={{ width: `${(selectedCount / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {isComplete && matchData ? (
        <aside
          className="pms-result mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
          aria-live="polite"
        >
          <div className="flex items-center gap-2 mb-6 text-primary">
            <CheckCircle2 size={18} />
            <p className="uppercase tracking-[0.2em] text-xs font-bold">Resultado inteligente</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              {matchData.labels.domain}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              {matchData.labels.goal}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              {matchData.labels.timeline}
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
              {matchData.labels.budget}
            </span>
          </div>

          <p className="text-lg text-foreground mb-5 leading-relaxed">{matchData.report.summary}</p>

          <div className="space-y-4 mb-6">
            {matchData.topMatches.map(({ project, score }) => (
              <div key={project.id} className="rounded-2xl border border-white/10 bg-background/50 p-4">
                <div className="flex justify-between items-center gap-3">
                  <h4 className="font-semibold text-foreground">{project.title}</h4>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/20 text-primary">
                    {score}% fit
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-cyan-300"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="text-xs text-foreground/60 mt-2">{project.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-5">
            <p className="text-xs uppercase tracking-wider text-foreground/50 mb-2">Stack recomendado</p>
            <div className="flex flex-wrap gap-2">
              {matchData.report.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-background/30 p-4">
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-2 inline-flex items-center gap-2">
                <ShieldAlert size={13} /> Riesgos
              </p>
              <ul className="space-y-2 text-sm text-foreground/70">
                {matchData.report.risks.map((risk) => (
                  <li key={risk}>- {risk}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-background/30 p-4">
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-2 inline-flex items-center gap-2">
                <Waypoints size={13} /> Roadmap
              </p>
              <ul className="space-y-2 text-sm text-foreground/70">
                {matchData.report.roadmap.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );

  if (inModal) {
    return (
      <div className="fixed inset-0 z-[120] p-4 md:p-6 flex items-center justify-center">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar Project Match Studio"
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project Match Studio"
          className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-background/95"
        >
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar modal"
              className="sticky top-4 ml-auto mr-4 z-10 w-10 h-10 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm flex items-center justify-center text-foreground/70 hover:text-primary"
            >
              <X size={18} />
            </button>
          ) : null}

          <div className="relative overflow-hidden px-6 pb-6 md:px-8 md:pb-8">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(161,137,255,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(100,190,255,0.22),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.14),transparent_42%)]" />
            {studioContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section ref={sectionRef} id="match-studio" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(161,137,255,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(100,190,255,0.22),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.14),transparent_42%)]" />
      <div className="max-w-7xl mx-auto px-6">{studioContent}</div>
    </section>
  );
}

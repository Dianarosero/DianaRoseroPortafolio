/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrainCircuit, Sparkles, Target } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactElement } from 'react';
import { useMemo, useState } from 'react';

import SectionHeading from './SectionHeading';
import { VIEWPORT_ONCE } from '../data/animations';
import { PROJECTS } from '../data/projects';
import { GEMINI_ENABLED, generateAiProposal } from '../lib/geminiAdvisor';
import { buildMatchReport, scoreProjects } from '../lib/projectMatcher';
import type { MatchOption, MatchAnswers } from '../types/matchStudio';
import type { ProjectDomain, ProjectGoal } from '../types/project';

const DOMAIN_OPTIONS: readonly MatchOption<ProjectDomain | 'unsure'>[] = [
  {
    value: 'ecommerce',
    label: 'E-commerce',
    helper: 'Catálogo, carrito, checkout y conversión.',
  },
  {
    value: 'analytics',
    label: 'Data & analytics',
    helper: 'Dashboards, KPIs y visualización de datos.',
  },
  {
    value: 'operations',
    label: 'Operaciones',
    helper: 'Automatización de procesos internos.',
  },
  {
    value: 'branding',
    label: 'Marca digital',
    helper: 'Sitios de posicionamiento y captación.',
  },
  {
    value: 'unsure',
    label: 'No lo tengo claro',
    helper: 'El asistente sugiere una dirección inicial.',
  },
];

const GOAL_OPTIONS: readonly MatchOption<ProjectGoal>[] = [
  { value: 'conversion', label: 'Conversión', helper: 'Vender o captar más leads.' },
  { value: 'insights', label: 'Insights', helper: 'Ver datos para tomar decisiones.' },
  { value: 'automation', label: 'Automatización', helper: 'Reducir tareas manuales.' },
  { value: 'engagement', label: 'Engagement', helper: 'Mejorar interacción y retención.' },
  { value: 'retention', label: 'Retención', helper: 'Incrementar recurrencia y fidelidad.' },
];

const PRIORITY_OPTIONS: readonly MatchOption<MatchAnswers['priority']>[] = [
  { value: 'speed', label: 'Velocidad', helper: 'Salir rápido con un MVP sólido.' },
  { value: 'quality', label: 'Calidad', helper: 'Enfoque en estabilidad y mantenibilidad.' },
  { value: 'scale', label: 'Escala', helper: 'Preparar arquitectura para crecer.' },
  {
    value: 'experience',
    label: 'Experiencia UX',
    helper: 'Interacciones y percepción premium.',
  },
];

const TIMELINE_OPTIONS: readonly MatchOption<MatchAnswers['timeline']>[] = [
  { value: '2-4', label: '2 a 4 semanas', helper: 'Entrega ágil y alcance acotado.' },
  { value: '5-8', label: '5 a 8 semanas', helper: 'Balance entre alcance y velocidad.' },
  { value: '9-12', label: '9 a 12 semanas', helper: 'Mayor profundidad funcional.' },
];

const BUDGET_OPTIONS: readonly MatchOption<MatchAnswers['budget']>[] = [
  { value: 'starter', label: 'Starter', helper: 'Priorizar lo más crítico.' },
  { value: 'growth', label: 'Growth', helper: 'Escalar con base sólida.' },
  { value: 'scale', label: 'Scale', helper: 'Producto robusto y preparado para expansión.' },
];

const INITIAL_ANSWERS: MatchAnswers = {
  domain: 'unsure',
  goal: 'conversion',
  priority: 'quality',
  timeline: '5-8',
  budget: 'growth',
};

interface OptionGroupProps<TValue extends string> {
  readonly title: string;
  readonly options: readonly MatchOption<TValue>[];
  readonly selectedValue: TValue;
  readonly onSelect: (value: TValue) => void;
}

function OptionGroup<TValue extends string>({
  title,
  options,
  selectedValue,
  onSelect,
}: OptionGroupProps<TValue>): ReactElement {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm uppercase tracking-wider text-foreground/60 font-bold mb-1">{title}</legend>
      <div className="grid sm:grid-cols-2 gap-3">
        {options.map((option) => {
          const isActive = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isActive}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'border-primary bg-primary/10 shadow-[0_0_24px_rgba(161,137,255,0.2)]'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <p className="font-semibold text-foreground">{option.label}</p>
              <p className="text-xs text-foreground/60 mt-1">{option.helper}</p>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function buildAiPrompt(answers: MatchAnswers, summary: string, topMatches: readonly string[]): string {
  return [
    'Eres una consultora senior de producto digital.',
    'Redacta una propuesta en español para una cliente potencial.',
    'Entrega el resultado en 4 bloques cortos: Enfoque, Arquitectura sugerida, Riesgos y Próximos pasos.',
    'Tono profesional, directo y sin relleno.',
    `Contexto: ${summary}`,
    `Preferencias: dominio=${answers.domain}, objetivo=${answers.goal}, prioridad=${answers.priority}, timeline=${answers.timeline}, presupuesto=${answers.budget}.`,
    `Proyectos de referencia: ${topMatches.join(', ')}.`,
  ].join('\n');
}

export default function ProjectMatchStudio(): ReactElement {
  const [answers, setAnswers] = useState<MatchAnswers>(INITIAL_ANSWERS);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiText, setAiText] = useState('');
  const [aiError, setAiError] = useState('');

  const scoredProjects = useMemo(() => scoreProjects(PROJECTS, answers), [answers]);
  const report = useMemo(() => buildMatchReport(answers, scoredProjects), [answers, scoredProjects]);

  const topMatches = scoredProjects.slice(0, 3);

  const updateAnswer = <TKey extends keyof MatchAnswers>(
    key: TKey,
    value: MatchAnswers[TKey],
  ) => {
    setAnswers((previous) => ({
      ...previous,
      [key]: value,
    }));
    setAiError('');
  };

  const handleGenerateAi = async () => {
    setIsAiLoading(true);
    setAiError('');

    try {
      const prompt = buildAiPrompt(
        answers,
        report.summary,
        topMatches.map((item) => item.project.title),
      );
      const content = await generateAiProposal(prompt);
      setAiText(content);
    } catch (error) {
      if (error instanceof Error) {
        setAiError(error.message);
      } else {
        setAiError('No fue posible generar la propuesta con IA.');
      }
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section id="match-studio" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(161,137,255,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(100,190,255,0.22),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.14),transparent_42%)]" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          className="mb-12"
        >
          <SectionHeading
            eyebrow="Innovación"
            title="Project Match Studio"
            description="Un laboratorio interactivo que transforma tus objetivos en una propuesta técnica, roadmap y stack recomendado en segundos."
          />
        </motion.div>

        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            className="rounded-3xl border border-white/10 bg-surface/70 backdrop-blur-xl p-6 md:p-8 space-y-6"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="text-primary mt-0.5" size={20} />
              <p className="text-foreground/70 text-sm leading-relaxed">
                Ajusta tus criterios y el motor calcula el fit con casos reales del portafolio.
              </p>
            </div>

            <OptionGroup
              title="Tipo de proyecto"
              options={DOMAIN_OPTIONS}
              selectedValue={answers.domain}
              onSelect={(value) => updateAnswer('domain', value)}
            />

            <OptionGroup
              title="Objetivo principal"
              options={GOAL_OPTIONS}
              selectedValue={answers.goal}
              onSelect={(value) => updateAnswer('goal', value)}
            />

            <OptionGroup
              title="Prioridad de entrega"
              options={PRIORITY_OPTIONS}
              selectedValue={answers.priority}
              onSelect={(value) => updateAnswer('priority', value)}
            />

            <OptionGroup
              title="Ventana de tiempo"
              options={TIMELINE_OPTIONS}
              selectedValue={answers.timeline}
              onSelect={(value) => updateAnswer('timeline', value)}
            />

            <OptionGroup
              title="Rango de inversión"
              options={BUDGET_OPTIONS}
              selectedValue={answers.budget}
              onSelect={(value) => updateAnswer('budget', value)}
            />
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
            aria-live="polite"
          >
            <div className="flex items-center gap-2 mb-6 text-primary">
              <Target size={18} />
              <p className="uppercase tracking-[0.2em] text-xs font-bold">Resultado inteligente</p>
            </div>

            <p className="text-lg text-foreground mb-5 leading-relaxed">{report.summary}</p>

            <div className="space-y-4 mb-6">
              {topMatches.map(({ project, score }) => (
                <div key={project.id} className="rounded-2xl border border-white/10 bg-background/50 p-4">
                  <div className="flex justify-between items-center gap-3">
                    <h4 className="font-semibold text-foreground">{project.title}</h4>
                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary/20 text-primary">
                      {score}% fit
                    </span>
                  </div>
                  <p className="text-xs text-foreground/60 mt-2">{project.description}</p>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <p className="text-xs uppercase tracking-wider text-foreground/50 mb-2">Stack recomendado</p>
              <div className="flex flex-wrap gap-2">
                {report.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl border border-white/10 bg-background/30 p-4">
                <p className="text-xs uppercase tracking-wider text-foreground/50 mb-2">Riesgos</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  {report.risks.map((risk) => (
                    <li key={risk}>- {risk}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-background/30 p-4">
                <p className="text-xs uppercase tracking-wider text-foreground/50 mb-2">Roadmap</p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  {report.roadmap.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="text-sm text-foreground/80">
                  Asesor IA opcional para convertir este resultado en una mini propuesta.
                </p>
                <button
                  type="button"
                  disabled={isAiLoading}
                  onClick={handleGenerateAi}
                  className="px-4 py-2 rounded-xl bg-primary text-background font-bold text-sm disabled:opacity-50 flex items-center gap-2"
                >
                  <BrainCircuit size={16} />
                  {isAiLoading ? 'Generando...' : 'Generar versión IA'}
                </button>
              </div>
              {!GEMINI_ENABLED ? (
                <p className="text-xs text-foreground/60 mt-3">
                  Si acabas de configurar la clave, reinicia `npm run dev` para activar Gemini.
                  Si no hay clave, el botón mostrará un error de configuración.
                </p>
              ) : (
                <p className="text-xs text-foreground/60 mt-3">
                  Gemini activo. Puedes generar propuestas IA en modo free tier según tu cuota.
                </p>
              )}
              {aiError ? <p className="text-xs text-red-300 mt-3">{aiError}</p> : null}
              {aiText ? (
                <div className="mt-4 rounded-xl border border-white/10 bg-background/60 p-4">
                  <p className="text-xs uppercase tracking-wider text-foreground/50 mb-2">Propuesta IA</p>
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap">{aiText}</p>
                </div>
              ) : null}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

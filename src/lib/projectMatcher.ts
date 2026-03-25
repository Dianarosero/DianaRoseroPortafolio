/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Project, ProjectComplexity } from '../types/project';
import type {
  MatchAnswers,
  StudioBudget,
  StudioPriority,
  StudioTimeline,
} from '../types/matchStudio';

export interface ProjectScore {
  readonly project: Project;
  readonly score: number;
  readonly reasons: readonly string[];
}

export interface MatchReport {
  readonly summary: string;
  readonly stack: readonly string[];
  readonly risks: readonly string[];
  readonly roadmap: readonly string[];
}

const TIMELINE_WEEKS: Record<StudioTimeline, number> = {
  '2-4': 3,
  '5-8': 7,
  '9-12': 11,
};

const BUDGET_TO_COMPLEXITY: Record<StudioBudget, readonly ProjectComplexity[]> = {
  starter: ['low', 'medium'],
  growth: ['medium', 'high'],
  scale: ['high'],
};

function computePriorityScore(project: Project, priority: StudioPriority): number {
  switch (priority) {
    case 'speed':
      return project.timelineWeeks <= 6 ? 12 : 4;
    case 'quality':
      return project.impactScore >= 4 ? 12 : 6;
    case 'scale':
      return project.complexity === 'high' ? 12 : 5;
    case 'experience':
      return project.tags.some((tag) => tag === 'Framer Motion' || tag === 'Tailwind') ? 12 : 4;
    default:
      return 0;
  }
}

function matchComplexity(project: Project, budget: StudioBudget): number {
  const preferredComplexities = BUDGET_TO_COMPLEXITY[budget];
  return preferredComplexities.includes(project.complexity) ? 10 : 3;
}

function buildReasons(project: Project, answers: MatchAnswers): readonly string[] {
  const reasons: string[] = [];

  if (answers.domain !== 'unsure' && project.domains.includes(answers.domain)) {
    reasons.push('Coincide con el tipo de producto que necesitas.');
  }

  if (project.goals.includes(answers.goal)) {
    reasons.push('Está alineado con el objetivo principal del proyecto.');
  }

  if (answers.priority === 'speed' && project.timelineWeeks <= 6) {
    reasons.push('Tiene un alcance apto para una salida rápida al mercado.');
  }

  if (answers.priority === 'scale' && project.complexity === 'high') {
    reasons.push('Su arquitectura está preparada para crecimiento y volumen.');
  }

  if (answers.priority === 'experience' && project.tags.some((tag) => tag === 'Framer Motion')) {
    reasons.push('Incluye enfoque fuerte en interacción y experiencia visual.');
  }

  if (reasons.length === 0) {
    reasons.push('Tiene señales de compatibilidad técnica con tus criterios.');
  }

  return reasons;
}

function toPercentage(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function scoreProjects(
  projects: readonly Project[],
  answers: MatchAnswers,
): readonly ProjectScore[] {
  return projects
    .map((project) => {
      const domainScore =
        answers.domain === 'unsure'
          ? 10
          : project.domains.includes(answers.domain)
            ? 30
            : 0;
      const goalScore = project.goals.includes(answers.goal) ? 24 : 4;
      const timelineScore = Math.max(
        0,
        18 - Math.abs(project.timelineWeeks - TIMELINE_WEEKS[answers.timeline]) * 2,
      );
      const complexityScore = matchComplexity(project, answers.budget);
      const priorityScore = computePriorityScore(project, answers.priority);
      const impactScore = project.impactScore * 2;

      const score =
        domainScore + goalScore + timelineScore + complexityScore + priorityScore + impactScore;

      return {
        project,
        score: toPercentage(score),
        reasons: buildReasons(project, answers),
      };
    })
    .sort((a, b) => b.score - a.score);
}

function rankTags(scoredProjects: readonly ProjectScore[]): readonly string[] {
  const frequency = new Map<string, number>();

  scoredProjects.slice(0, 3).forEach(({ project }, index) => {
    const weight = 3 - index;
    project.tags.forEach((tag) => {
      const current = frequency.get(tag) ?? 0;
      frequency.set(tag, current + weight);
    });
  });

  return [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag]) => tag);
}

function buildRisks(answers: MatchAnswers): readonly string[] {
  const risks: string[] = [];

  if (answers.timeline === '2-4') {
    risks.push('Riesgo de sobrealcance: conviene definir MVP y backlog para fase 2.');
  }

  if (answers.budget === 'starter') {
    risks.push('Presupuesto acotado: priorizar integraciones críticas y métricas clave.');
  }

  if (answers.priority === 'scale') {
    risks.push('Escalabilidad temprana: diseñar arquitectura modular desde el inicio.');
  }

  if (answers.priority === 'experience') {
    risks.push('UX premium: validar interacción en móvil antes de cerrar diseño final.');
  }

  if (risks.length === 0) {
    risks.push('Principal foco: mantener alcance controlado con hitos semanales.');
  }

  return risks;
}

function buildRoadmap(answers: MatchAnswers): readonly string[] {
  return [
    'Fase 1: Discovery y definición de métricas de éxito.',
    `Fase 2: Sprint de implementación enfocado en ${answers.goal}.`,
    'Fase 3: QA funcional + optimización de rendimiento y accesibilidad.',
    'Fase 4: Lanzamiento, analítica en producción y mejora continua.',
  ];
}

export function buildMatchReport(
  answers: MatchAnswers,
  scoredProjects: readonly ProjectScore[],
): MatchReport {
  const [bestMatch] = scoredProjects;

  return {
    summary: `La propuesta más alineada es ${bestMatch.project.title} con ${bestMatch.score}% de ajuste para un proyecto orientado a ${answers.goal}.`,
    stack: rankTags(scoredProjects),
    risks: buildRisks(answers),
    roadmap: buildRoadmap(answers),
  };
}

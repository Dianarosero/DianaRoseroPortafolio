/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import rawProjects from './projects.json';
import type {
  Project,
  ProjectComplexity,
  ProjectDomain,
  ProjectGoal,
} from '../types/project';

type RawProject = Record<string, unknown>;

const ALLOWED_DOMAINS: readonly ProjectDomain[] = [
  'ecommerce',
  'analytics',
  'productivity',
  'operations',
  'branding',
];

const ALLOWED_GOALS: readonly ProjectGoal[] = [
  'conversion',
  'insights',
  'automation',
  'engagement',
  'retention',
];

const ALLOWED_COMPLEXITY: readonly ProjectComplexity[] = ['low', 'medium', 'high'];

function isDomain(value: unknown): value is ProjectDomain {
  return typeof value === 'string' && ALLOWED_DOMAINS.includes(value as ProjectDomain);
}

function isGoal(value: unknown): value is ProjectGoal {
  return typeof value === 'string' && ALLOWED_GOALS.includes(value as ProjectGoal);
}

function isComplexity(value: unknown): value is ProjectComplexity {
  return typeof value === 'string' && ALLOWED_COMPLEXITY.includes(value as ProjectComplexity);
}

function toStringArray(value: unknown): readonly string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string');
}

function normalizeProject(project: RawProject): Project {
  return {
    id: typeof project.id === 'number' ? project.id : Number(project.id ?? 0),
    title: typeof project.title === 'string' ? project.title : 'Proyecto sin título',
    description:
      typeof project.description === 'string' ? project.description : 'Descripción no disponible.',
    image: typeof project.image === 'string' ? project.image : '',
    tags: toStringArray(project.tags),
    demo: typeof project.demo === 'string' ? project.demo : '#',
    github: typeof project.github === 'string' ? project.github : '#',
    domains: Array.isArray(project.domains)
      ? project.domains.filter((item): item is ProjectDomain => isDomain(item))
      : ['branding'],
    goals: Array.isArray(project.goals)
      ? project.goals.filter((item): item is ProjectGoal => isGoal(item))
      : ['engagement'],
    complexity: isComplexity(project.complexity) ? project.complexity : 'medium',
    timelineWeeks:
      typeof project.timelineWeeks === 'number' ? Math.max(1, project.timelineWeeks) : 6,
    impactScore: typeof project.impactScore === 'number' ? Math.max(1, project.impactScore) : 3,
  };
}

const safeRawProjects: readonly RawProject[] = Array.isArray(rawProjects)
  ? (rawProjects as unknown[]).filter(
      (item): item is RawProject => typeof item === 'object' && item !== null,
    )
  : [];

export const PROJECTS: readonly Project[] = safeRawProjects.map((item) => normalizeProject(item));

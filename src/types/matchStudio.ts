/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ProjectDomain, ProjectGoal } from './project';

export type StudioPriority = 'speed' | 'quality' | 'scale' | 'experience';
export type StudioTimeline = '2-4' | '5-8' | '9-12';
export type StudioBudget = 'starter' | 'growth' | 'scale';

export interface MatchAnswers {
  readonly domain: ProjectDomain | 'unsure';
  readonly goal: ProjectGoal;
  readonly priority: StudioPriority;
  readonly timeline: StudioTimeline;
  readonly budget: StudioBudget;
}

export interface MatchOption<TValue extends string> {
  readonly value: TValue;
  readonly label: string;
  readonly helper: string;
}

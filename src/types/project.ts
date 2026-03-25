/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectDomain =
  | 'ecommerce'
  | 'analytics'
  | 'productivity'
  | 'operations'
  | 'branding';

export type ProjectGoal =
  | 'conversion'
  | 'insights'
  | 'automation'
  | 'engagement'
  | 'retention';

export type ProjectComplexity = 'low' | 'medium' | 'high';

export interface Project {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly tags: readonly string[];
  readonly demo: string;
  readonly github: string;
  readonly domains: readonly ProjectDomain[];
  readonly goals: readonly ProjectGoal[];
  readonly complexity: ProjectComplexity;
  readonly timelineWeeks: number;
  readonly impactScore: number;
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SocialPlatform = 'github' | 'linkedin';

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly platform: SocialPlatform;
  readonly external: boolean;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Dianarosero',
    platform: 'github',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/diana-sofia-rosero-lópez-044150207/',
    platform: 'linkedin',
    external: true,
  },
];

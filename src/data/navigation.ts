/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavLink {
  readonly name: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { name: 'Inicio',      href: '#inicio' },
  { name: 'Proyectos',   href: '#proyectos' },
  { name: 'Experiencia', href: '#experiencia' },
  { name: 'Sobre mí',    href: '#sobre-mi' },
  { name: 'Contacto',    href: '#contacto' },
];

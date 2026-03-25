/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavLink {
  readonly name: string;
  readonly href: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Sobre mí', href: '#sobre-mi' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Match Studio', href: '#match-studio' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contacto', href: '#contacto' },
];

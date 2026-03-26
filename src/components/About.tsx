/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClipboardList, Code2, Layers } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactElement } from 'react';
import SectionHeading from './SectionHeading';
import { VIEWPORT_ONCE } from '../data/animations';

interface Feature {
  readonly icon: ReactElement;
  readonly title: string;
  readonly description: string;
}

const FEATURES: readonly Feature[] = [
  {
    icon: <Layers className="text-primary" />,
    title: 'Ciclo completo',
    description:
      'Del análisis de requisitos al desarrollo y entrega. Programo, documento y comunico con equipos reales.',
  },
  {
    icon: <ClipboardList className="text-primary" />,
    title: 'Gestión de proyectos',
    description:
      'Scrum, levantamiento de requisitos, documentación técnica y coordinación con stakeholders.',
  },
  {
    icon: <Code2 className="text-primary" />,
    title: 'Frontend funcional',
    description:
      'Interfaces con React.js y JavaScript, integradas con APIs y bases de datos SQL.',
  },
];

export default function About(): ReactElement {
  return (
    <section id="sobre-mi" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              eyebrow="Sobre mí"
              title="Ingeniería y gestión de proyectos, de principio a fin."
              className="mb-8"
            />
            <p className="text-foreground/60 text-lg mb-6 leading-relaxed">
              Soy Ingeniera de Sistemas graduada en 2026 con Especialización en Gerencia de
              Proyectos. Me especializo en el desarrollo y gestión de soluciones TI — desde el
              levantamiento de requisitos hasta la entrega funcional.
            </p>
            <p className="text-foreground/60 text-lg leading-relaxed">
              Combino desarrollo frontend con React.js con formación en gestión de proyectos, lo
              que me permite participar tanto en la implementación técnica como en la planificación
              y coordinación de proyectos de software.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-foreground/50">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

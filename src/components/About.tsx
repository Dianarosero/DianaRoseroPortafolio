/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Code2, Palette, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactElement } from 'react';
import SectionHeading from './SectionHeading';
import { VIEWPORT_ONCE } from '../data/animations';

interface Feature {
  readonly icon: ReactElement;
  readonly title: string;
  readonly description: string;
}

interface Stat {
  readonly value: string;
  readonly label: string;
}

const FEATURES: readonly Feature[] = [
  {
    icon: <Code2 className="text-primary" />,
    title: 'Desarrollo limpio',
    description:
      'Escribo código semántico, escalable y fácil de mantener siguiendo las mejores prácticas.',
  },
  {
    icon: <Palette className="text-primary" />,
    title: 'Diseño UI/UX',
    description: 'Enfoque en la estética y la usabilidad para crear interfaces que los usuarios amen.',
  },
  {
    icon: <Zap className="text-primary" />,
    title: 'Performance',
    description:
      'Optimización de carga y rendimiento para asegurar una experiencia fluida en cualquier dispositivo.',
  },
];

const STATS: readonly Stat[] = [
  { value: '15+', label: 'Proyectos completados' },
  { value: '3+', label: 'Años de experiencia' },
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
              title="Apasionada por la tecnología y el diseño centrado en el usuario."
              className="mb-8"
            />
            <p className="text-foreground/60 text-lg mb-6 leading-relaxed">
              Con más de 3 años de experiencia en el ecosistema de React, he trabajado en diversos
              proyectos
              que van desde startups innovadoras hasta soluciones corporativas robustas.
            </p>
            <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
              Mi objetivo es siempre superar las expectativas, no solo entregando un producto
              funcional,
              sino una pieza de software que sea un placer de usar y de mantener.
            </p>

            <div className="grid grid-cols-2 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <h4 className="text-3xl font-bold text-primary mb-1">{stat.value}</h4>
                  <p className="text-sm text-foreground/50 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
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

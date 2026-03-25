/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import type { ReactElement } from 'react';
import SectionHeading from './SectionHeading';
import { VIEWPORT_ONCE } from '../data/animations';

interface Skill {
  readonly name: string;
  readonly icon: string;
}

const SKILLS: readonly Skill[] = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Framer Motion', icon: 'https://www.framer.com/images/favicons/favicon.png' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
];

const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function Skills(): ReactElement {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          className="mb-16"
        >
          <SectionHeading eyebrow="Habilidades" title="Mi stack tecnológico" align="center" />
        </motion.div>

        <motion.div
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.name}
              variants={ITEM_VARIANTS}
              whileHover={{ y: -5, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
              className="p-8 rounded-2xl border border-white/5 bg-white/5 flex flex-col items-center justify-center gap-4 transition-colors"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 object-contain"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <span className="font-medium text-foreground/70">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

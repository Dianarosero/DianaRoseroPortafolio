/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RefreshCw } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import type { ReactElement } from "react";
import SectionHeading from "./SectionHeading";
import { EASE_OUT, BATCH_START } from "../data/animations";

interface Skill {
  readonly name: string;
  readonly icon: string;
  readonly iconElement?: ReactElement;
}

const SKILLS: readonly Skill[] = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  {
    name: "Scrum",
    icon: "",
    iconElement: <RefreshCw size={40} className="text-secondary" />,
  },
];

export default function Skills(): ReactElement {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".skills-heading", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: EASE_OUT,
        scrollTrigger: { trigger: ".skills-heading", start: BATCH_START, once: true },
      });

      ScrollTrigger.batch(".skill-card", {
        start: BATCH_START,
        once: true,
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            scale: 0.85,
            y: 15,
            duration: 0.5,
            ease: EASE_OUT,
            stagger: 0.07,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="skills-heading mb-16">
          <SectionHeading eyebrow="Habilidades" title="Mi stack tecnológico" align="center" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="skill-card glass-card ghost-border p-8 rounded-xl flex flex-col items-center justify-center gap-4 group hover:bg-surface-container-high/60 hover:-translate-y-1 transition-all duration-200"
            >
              {skill.iconElement ? (
                <div className="w-12 h-12 flex items-center justify-center">
                  {skill.iconElement}
                </div>
              ) : (
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-12 h-12 object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              )}
              <span className="font-label text-sm font-medium text-foreground-muted tracking-tight">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

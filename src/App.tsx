/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjectMatchStudio from "./components/ProjectMatchStudio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App(): ReactElement {
  const { scrollYProgress } = useScroll();
  const [isMatchStudioOpen, setIsMatchStudioOpen] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    document.body.style.overflow = isMatchStudioOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMatchStudioOpen]);

  useEffect(() => {
    if (!isMatchStudioOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMatchStudioOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isMatchStudioOpen]);

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-100 origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact onOpenMatchStudio={() => setIsMatchStudioOpen(true)} />
      </main>

      <AnimatePresence>
        {isMatchStudioOpen ? (
          <ProjectMatchStudio
            inModal
            onClose={() => setIsMatchStudioOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

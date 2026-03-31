/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Clock, ExternalLink, GitFork, Github, Loader2, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ReactElement } from "react";
import { Fragment, useEffect, useRef, useState } from "react";

import SectionHeading from "./SectionHeading";
import CaseStudyModal from "./CaseStudyModal";
import { EASE_OUT, BATCH_START } from "../data/animations";
import { CASE_STUDIES } from "../data/caseStudies";
import {
  fetchFilteredRepos,
  formatRepoName,
  buildRepoTags,
  timeAgo,
  type GitHubRepo,
} from "../lib/github";

/* ─── Language color map ────────────────────────────────────────────────── */

const LANG_COLOR: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python:     "#3572A5",
  Go:         "#00ADD8",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  PHP:        "#777bb4",
  Java:       "#b07219",
  Kotlin:     "#A97BFF",
  Dart:       "#00B4AB",
};

/* ─── GitHub repo card ──────────────────────────────────────────────────── */

function GitHubRepoCard({
  repo,
  onOpenCaseStudy,
  offset = false,
}: {
  repo: GitHubRepo;
  onOpenCaseStudy?: () => void;
  offset?: boolean;
}): ReactElement {
  const tags = buildRepoTags(repo);
  const langColor = repo.language ? (LANG_COLOR[repo.language] ?? "#34d399") : null;
  const hasCaseStudy = Boolean(onOpenCaseStudy);

  return (
    <article
      className={`project-card glass-card ghost-border group rounded-xl flex flex-col p-7 gap-5 hover:border-accent/30 transition-all duration-500 ${
        offset ? "md:translate-y-10" : ""
      }`}
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-accent/10 text-accent-light font-mono text-[9px] font-bold px-2.5 py-1 rounded-sm tracking-widest uppercase"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h4 className="font-headline text-xl font-bold tracking-tight group-hover:text-accent transition-colors leading-snug">
        {formatRepoName(repo.name)}
      </h4>

      {/* Description */}
      <p className="text-text-muted text-sm leading-relaxed flex-1">
        {repo.description ?? "Sin descripción — agrégala en la configuración del repo en GitHub."}
      </p>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] text-text-dim">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: langColor ?? "#34d399" }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star size={10} /> {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork size={10} /> {repo.forks_count}
          </span>
        )}
        <span className="flex items-center gap-1 ml-auto">
          <Clock size={10} /> {timeAgo(repo.updated_at)}
        </span>
      </div>

      {/* Links */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
        <a
          href={repo.html_url}
          className="font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 text-text-muted hover:text-teal transition-colors"
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Ver repositorio ${repo.name} en GitHub`}
        >
          GitHub <Github size={12} />
        </a>

        {repo.homepage && (
          <a
            href={repo.homepage}
            className="font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 text-text-muted hover:text-teal transition-colors"
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Ver demo de ${repo.name}`}
          >
            Demo <ExternalLink size={12} />
          </a>
        )}

        {hasCaseStudy && (
          <button
            type="button"
            onClick={onOpenCaseStudy}
            className="ml-auto flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-sm ghost-border text-accent hover:bg-accent/10 hover:border-accent/40 active:scale-[0.97] transition-all"
          >
            <BookOpen size={11} />
            Caso de estudio
          </button>
        )}
      </div>
    </article>
  );
}

/* ─── Main section ──────────────────────────────────────────────────────── */

export default function Projects(): ReactElement {
  const [githubRepos, setGithubRepos] = useState<readonly GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCaseStudy, setOpenCaseStudy] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchFilteredRepos()
      .then(setGithubRepos)
      .catch(() => setError("No se pudieron cargar los repositorios. Intenta de nuevo más tarde."))
      .finally(() => setIsLoading(false));
  }, []);

  useGSAP(
    () => {
      gsap.from(".projects-heading", {
        opacity: 0, x: -30, duration: 0.6, ease: EASE_OUT,
        scrollTrigger: { trigger: ".projects-heading", start: BATCH_START, once: true },
      });
      gsap.from(".projects-github-link", {
        opacity: 0, x: 30, duration: 0.6, ease: EASE_OUT,
        scrollTrigger: { trigger: ".projects-github-link", start: BATCH_START, once: true },
      });
    },
    { scope: containerRef }
  );

  useGSAP(
    () => {
      if (githubRepos.length === 0) return;
      ScrollTrigger.batch(".project-card", {
        start: BATCH_START,
        once: true,
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: EASE_OUT,
            stagger: 0.08,
          });
        },
      });
    },
    { scope: containerRef, dependencies: [githubRepos] }
  );

  const activeCaseStudy =
    openCaseStudy !== null ? CASE_STUDIES[openCaseStudy] : undefined;

  return (
    <section ref={containerRef} id="proyectos" className="py-28 relative">
      {/* Subtle section bg */}
      <div className="absolute inset-0 bg-surface/50 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="projects-heading">
            <SectionHeading
              eyebrow="DEPLOYMENT_ARCHIVE_V2.0"
              title="Proyectos en GitHub"
            />
          </div>

          <a
            href="https://github.com/Dianarosero"
            target="_blank"
            rel="noreferrer noopener"
            className="projects-github-link font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted hover:text-teal transition-colors flex items-center gap-2"
          >
            Ver perfil completo <Github size={13} />
          </a>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24 text-text-dim gap-3">
            <Loader2 size={18} className="animate-spin" />
            <span className="font-mono text-[11px] uppercase tracking-widest">Cargando repositorios…</span>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <p className="text-center text-text-dim font-mono text-xs py-16">{error}</p>
        )}

        {/* Cards — masonry offset grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {githubRepos.map((repo, i) => (
              <Fragment key={repo.id}>
                <GitHubRepoCard
                  repo={repo}
                  offset={i % 3 === 1}
                  onOpenCaseStudy={
                    CASE_STUDIES[repo.name]
                      ? () => setOpenCaseStudy(repo.name)
                      : undefined
                  }
                />
              </Fragment>
            ))}
            {githubRepos.length === 0 && (
              <p className="text-text-dim font-mono text-xs col-span-full text-center py-16">
                No se encontraron repositorios públicos.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Case study modal */}
      {openCaseStudy !== null && activeCaseStudy !== undefined && (
        <CaseStudyModal
          repoName={openCaseStudy}
          caseStudy={activeCaseStudy}
          onClose={() => setOpenCaseStudy(null)}
        />
      )}
    </section>
  );
}

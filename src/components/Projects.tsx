/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Clock, ExternalLink, GitFork, Github, Loader2, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { ReactElement } from 'react';
import { Fragment, useEffect, useState } from 'react';

import SectionHeading from './SectionHeading';
import CaseStudyModal from './CaseStudyModal';
import { VIEWPORT_ONCE } from '../data/animations';
import { CASE_STUDIES } from '../data/caseStudies';
import {
  fetchFilteredRepos,
  formatRepoName,
  buildRepoTags,
  timeAgo,
  type GitHubRepo,
} from '../lib/github';

/* ─── Language color map ────────────────────────────────────────────────── */

const LANG_COLOR: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  Go:         '#00ADD8',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  PHP:        '#777bb4',
  Java:       '#b07219',
  Kotlin:     '#A97BFF',
  Dart:       '#00B4AB',
};

/* ─── GitHub repo card ──────────────────────────────────────────────────── */

function GitHubRepoCard({
  repo,
  index,
  onOpenCaseStudy,
}: {
  repo: GitHubRepo;
  index: number;
  onOpenCaseStudy?: () => void;
}): ReactElement {
  const tags = buildRepoTags(repo);
  const langColor = repo.language ? (LANG_COLOR[repo.language] ?? '#10b981') : null;
  const hasCaseStudy = Boolean(onOpenCaseStudy);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ delay: index * 0.1 }}
      className="group rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 transition-all duration-500 flex flex-col p-8 gap-5"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-primary/10 text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h4 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
        {formatRepoName(repo.name)}
      </h4>

      {/* Description */}
      <p className="text-foreground/60 text-sm leading-relaxed flex-1">
        {repo.description ?? 'Sin descripción — agrégala en la configuración del repo en GitHub.'}
      </p>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/40">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: langColor ?? '#10b981' }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star size={12} /> {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork size={12} /> {repo.forks_count}
          </span>
        )}
        <span className="flex items-center gap-1 ml-auto">
          <Clock size={12} /> {timeAgo(repo.updated_at)}
        </span>
      </div>

      {/* Links + Case study button */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
        <a
          href={repo.html_url}
          className="text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors"
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Ver repositorio ${repo.name} en GitHub`}
        >
          Ver en GitHub <Github size={14} />
        </a>

        {repo.homepage && (
          <a
            href={repo.homepage}
            className="text-sm font-bold flex items-center gap-2 hover:text-primary transition-colors"
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Ver demo de ${repo.name}`}
          >
            Demo <ExternalLink size={14} />
          </a>
        )}

        {hasCaseStudy && (
          <motion.button
            type="button"
            onClick={onOpenCaseStudy}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="ml-auto flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-all"
          >
            <BookOpen size={14} />
            Ver caso de estudio
          </motion.button>
        )}
      </div>
    </motion.article>
  );
}

/* ─── Main section ──────────────────────────────────────────────────────── */

export default function Projects(): ReactElement {
  const [githubRepos, setGithubRepos] = useState<readonly GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCaseStudy, setOpenCaseStudy] = useState<string | null>(null);

  useEffect(() => {
    fetchFilteredRepos()
      .then(setGithubRepos)
      .catch(() => setError('No se pudieron cargar los repositorios. Intenta de nuevo más tarde.'))
      .finally(() => setIsLoading(false));
  }, []);

  const activeCaseStudy =
    openCaseStudy !== null ? CASE_STUDIES[openCaseStudy] : undefined;

  return (
    <section id="proyectos" className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
          >
            <SectionHeading eyebrow="Portafolio" title="Proyectos en GitHub" />
          </motion.div>

          <motion.a
            href="https://github.com/Dianarosero"
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT_ONCE}
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2 text-sm font-bold text-foreground/50 hover:text-primary transition-colors"
          >
            Ver perfil completo <Github size={16} />
          </motion.a>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-24 text-foreground/40 gap-3">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Cargando repositorios desde GitHub…</span>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <p className="text-center text-foreground/40 text-sm py-16">{error}</p>
        )}

        {/* Cards grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {githubRepos.map((repo, i) => (
              <Fragment key={repo.id}>
                <GitHubRepoCard
                  repo={repo}
                  index={i}
                  onOpenCaseStudy={
                    CASE_STUDIES[repo.name]
                      ? () => setOpenCaseStudy(repo.name)
                      : undefined
                  }
                />
              </Fragment>
            ))}
            {githubRepos.length === 0 && (
              <p className="text-foreground/40 text-sm col-span-full text-center py-16">
                No se encontraron repositorios públicos con esos nombres.
              </p>
            )}
          </div>
        )}

      </div>

      {/* Case study modal */}
      <AnimatePresence>
        {openCaseStudy !== null && activeCaseStudy !== undefined && (
          <CaseStudyModal
            repoName={openCaseStudy}
            caseStudy={activeCaseStudy}
            onClose={() => setOpenCaseStudy(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

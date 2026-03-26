/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GitHubRepo {
  readonly id: number;
  readonly name: string;
  readonly description: string | null;
  readonly html_url: string;
  readonly homepage: string | null;
  readonly language: string | null;
  readonly topics: readonly string[];
  readonly stargazers_count: number;
  readonly forks_count: number;
  readonly updated_at: string;   // ISO 8601
}

const GITHUB_USERNAME = 'Dianarosero';

// Solo estos repositorios aparecerán en el portafolio.
// Para agregar uno nuevo, basta con añadir su nombre aquí.
export const ALLOWED_REPOS: readonly string[] = [
  'Proyecto_Saberquest',
  'CESMAPS_RESPONSIVE',
  'Learn_Go',
];

/** "Proyecto_Saberquest" → "Proyecto Saberquest" */
export function formatRepoName(name: string): string {
  return name.replace(/_/g, ' ');
}

/**
 * Construye los tags del repo: lenguaje principal + topics (máx. 3).
 * Si no hay ninguno, devuelve ['GITHUB'].
 */
export function buildRepoTags(repo: GitHubRepo): readonly string[] {
  const tags: string[] = [];
  if (repo.language) tags.push(repo.language.toUpperCase());
  for (const topic of repo.topics.slice(0, 3)) {
    tags.push(topic.toUpperCase());
  }
  return tags.length > 0 ? tags : ['GITHUB'];
}

/**
 * Convierte una fecha ISO 8601 en texto relativo en español.
 * Ej: "Actualizado hace 5 días"
 */
export function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60_000);
  const hours   = Math.floor(diff / 3_600_000);
  const days    = Math.floor(diff / 86_400_000);
  const weeks   = Math.floor(days / 7);
  const months  = Math.floor(days / 30);

  if (minutes < 60)  return `hace ${minutes} min`;
  if (hours   < 24)  return `hace ${hours} h`;
  if (days    < 7)   return `hace ${days} día${days !== 1 ? 's' : ''}`;
  if (weeks   < 5)   return `hace ${weeks} semana${weeks !== 1 ? 's' : ''}`;
  if (months  < 12)  return `hace ${months} mes${months !== 1 ? 'es' : ''}`;
  const years = Math.floor(months / 12);
  return `hace ${years} año${years !== 1 ? 's' : ''}`;
}

/**
 * Obtiene los repos públicos del usuario y filtra por ALLOWED_REPOS.
 */
export async function fetchFilteredRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { headers: { Accept: 'application/vnd.github+json' } },
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const all = (await response.json()) as GitHubRepo[];
  return all.filter((repo) => ALLOWED_REPOS.includes(repo.name));
}

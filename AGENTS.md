# Agent Coding Guide for This Repository

Welcome, agent! This document defines the build/lint commands, code style, and conventions for this codebase. It is designed to keep contributions clear, idiomatic, and easy to maintain. If you deviate, do so only with strong justification and document your rationale.

---

## 1. Build, Lint, and Test Commands

### Installation
Run dependency install before any other command:
```
npm install
```

### Development & Production Builds
- **Start Dev Server:**
  ```bash
  npm run dev
  # Runs Vite. App at http://localhost:3000
  ```
- **Build Production:**
  ```bash
  npm run build
  # Output in dist/
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  # Serves the dist/ output
  ```
- **Clean Build Artifacts:**
  ```bash
  npm run clean
  # Removes dist/
  ```

### Linting
- **Run type-checker as linter:**
  ```bash
  npm run lint
  # TypeScript type-check (no emit)
  ```
- **To check only a single file:** Edit the file, run `npm run lint` (all files checked; no single-file mode available).

### Testing
- **No tests are currently implemented.**
  - Add tests with your preferred React/TS test runner (Jest, Vitest) if testing is required.

---

## 2. Code Style Guidelines

### Imports
- Always use ES module imports: `import ... from ...`.
- Import React and any external modules first, then internal modules, then styles.
- Use relative imports for sibling files; use `@/` alias for root-relative imports if needed (configured in Vite/tsconfig).
- Side-effect imports (e.g. `import "tailwindcss";`) go at the top or after main imports.

### Formatting
- Indentation: **2 spaces**
- Quotes: **Single quotes** for JS/TS, **double quotes** for HTML/JSX attributes when necessary.
- Trailing commas: Allowed/match idiomatic Prettier.
- Semicolons: Required at the end of every statement.
- Spaces around operators, after commas, inside curly braces in JSX.
- Max line length: 100-120 chars; split as needed for readability.
- Remove all unused imports and variables before commit.
- Write JSDoc/TSdoc for public functions/components.
- File headers:
  ```js
  /**
   * @license
   * SPDX-License-Identifier: Apache-2.0
   */
  ```
- For CSS, use Tailwind classes for utility-first layout; keep custom properties in `@theme` (see `index.css`).

### TypeScript and Typing
- Prefer explicit types for all states, props, and arguments.
- Use interfaces for objects with properties, use `type` for unions and aliases.
- Component props and state types/interfaces should be co-located (or imported from `types.ts` if reused).
- Avoid `any`; use `unknown` only if justified and narrowed.
- React components should be typed explicitly:
  ```tsx
  export default function MyComponent(props: MyComponentProps): JSX.Element { ... }
  ```
- Use enums for finite sets; use string union types where appropriate.

### Structure & Naming
- Component files: **PascalCase** (e.g., `ContactForm.tsx`)
- Component/prop names: **PascalCase** for components, **camelCase** for variables/functions.
- Constants: **UPPER_CASE**.
- CSS variables: `--color-primary`, `--color-background` etc. Live in `@theme` in `index.css`.
- Directory structure:
  - `src/components/`: One component per file, no index barrels unless justified.
  - `src/data/`, `src/assets/`: Data and static assets.

### Error Handling
- Defensive checks: Use optional chaining and null checks where values may be missing.
- For user input (e.g., contact form): always validate and handle edge cases in UI state.
- No backend or async error boundaries yet; if you add fetches, always surface error state in the UI.

### Animations & UI
- Use Framer Motion’s idioms for enter/exit/fade/stagger; configure animations declaratively.
- Use Lucide icons consistently; never use unlicensed icon sets.

### Commit/PR Etiquette (for other agents)
- Run the lint/typecheck (`npm run lint`) before submitting.
- Ensure build (`npm run build`) works; preview in browser for layout and color.
- PRs must summarize the *why* and link to any discussion/issues.

---

## 3. Cursor & Copilot Rules
- **No `.cursorrules`, `.cursor/rules/`, or Copilot-instructions.md found.**
- Follow these AGENTS.md guidelines unless/until custom agent instructions are provided in the future.

---

## 4. Notes for Future Agents
- When adding new dependencies, prefer well-maintained, popular packages, matching the modern stack style.
- Try to keep bundle size low.
- Always update this file if you introduce new tooling or configuration.

---

Happy Coding! 🎉

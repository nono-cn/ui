# @nono/ui

Component library on top of ui-sdk: framework-agnostic logic in `src/core`, adapters per framework (`src/vue`), Tailwind v4 styles.

## Conventions

- Code, comments, test names, commit messages and PR descriptions in English.
- Avoid comments. Write one only when the code would be misread without it (a browser quirk, a trade-off), in one or two lines.
- `src/core` imports no framework.
- Relative imports inside `src/`. Docs and tests consume the package by name (`@nono/ui/*`), like an external consumer.
- A new package export needs `package.json#exports`, the `vite.config.ts` lib entry, `aliases.ts` and, for TypeScript, `tsconfig.base.json#paths`.
- Work on a branch, never directly on `master`.

## Commands

- `npm run dev`: docs with live reload.
- `npm run check`: lint, format check, typecheck, tests and build. Run it before committing.
- Browser tests run in Docker Chromium (`npm run browser:up`).

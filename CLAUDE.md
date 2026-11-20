# @nono/ui

Vue component library on top of ui-sdk, with Tailwind v4 styles: `src/components` (one folder per component with its `.vue`, logic, types, variants and tests), `src/composables`, `src/icons` and `src/styles`.

## Conventions

- Code, comments, test names, commit messages and PR descriptions in English.
- Avoid comments. Write one only when the code would be misread without it (a browser quirk, a trade-off), in one or two lines.
- No relative imports, not even `./`: `@/` maps to `src/`, `@docs/` to `docs/`, `@test/` to `tests/`. ESLint enforces it. Docs and tests consume the package by name (`@nono/ui`), like an external consumer.
- Inside `src`, import from the module file (`@/composables/useTheme`), never from an `index.ts` barrel; barrels only re-export. ESLint enforces it.
- Every node a component renders gets `data-ui`: `<component>-root` on the root and `<component>-<node>` inside, named after its `ui` key in kebab case (`alert-close-button`). `data-slot` belongs to ui-sdk; never set it.
- A new package export needs `package.json#exports`, the `vite.config.ts` lib entry, `aliases.ts` and, for TypeScript, `tsconfig.base.json#paths`.
- Work on a branch, never directly on `master`.

## Commands

- `npm run dev`: docs with live reload.
- `npm run check`: lint, format check, typecheck, tests and build. Run it before committing.
- Browser tests run in Docker Chromium (`npm run browser:up`).

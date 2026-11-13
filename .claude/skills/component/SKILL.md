---
name: component
description: Builds or extends a component of @nono/ui on top of ui-sdk — framework-agnostic primitive and Tailwind styles in src/core, Vue adapter in src/vue, tests, showcase and docs demo. Use when asked to create a component, add a prop, slot, part or variant to one, or port a component from nono-ui.
argument-hint: <Component> [what to add]
---

# Build a component in @nono/ui

Arguments: `$ARGUMENTS` — the component (e.g. `Badge`) and, optionally, the part to add or change. If a part is given, touch only that part.

## Read first

1. The ui-sdk skill: `node_modules/@ui-sdk/core/skills/ui-sdk/SKILL.md`, then `references/create-component.md` and `references/testing.md` next to it. Its rules apply here; this skill only adds what is specific to this repo.
2. `node_modules/@ui-sdk/vue/docs/llms.txt`, and only the pages the task needs (`docs/rendering.md`, `docs/components/<name>.md`). Search `docs/core.md` by heading; never read it whole or read `dist/*.js`.
3. If the component exists in nono-ui (`../nono-ui/src/components/<Name>`), read it for the public API (props, slots, `ui` keys, variants) and keep it unless the user says otherwise. Its implementation is on reka-ui and is not ported: behavior comes from ui-sdk.
4. If ui-sdk already ships the component, compose it instead of writing a primitive.

## Where things go

| What                                                             | Path                                            |
| ---------------------------------------------------------------- | ----------------------------------------------- |
| Primitive, constants, Tailwind class recipes (no framework code) | `src/core/components/<name>/`                   |
| Shared framework-agnostic helpers                                | `src/core/composables/` (`cn`, `useUi`)         |
| Vue adapter (renders only)                                       | `src/vue/components/<Name>/`                    |
| Palette and Tailwind theme                                       | `src/styles/tokens.css`, `src/styles/theme.css` |
| Demo                                                             | `docs/demos/vue/`                               |

- `src/core` never imports a framework. A "composable" there is a plain function.
- Export every public piece from `src/core/index.ts` or `src/vue/index.ts`.
- Imports inside `src/` are relative. Docs and tests import the package by name (`@nono/ui/core`, `@nono/ui/vue`, `@nono/ui/styles.css`), like an external consumer.

## Styling

- Tailwind utilities composed with `cn`; a consumer class always wins over ours.
- Only palette tokens: `bg-primary`, `text-error-foreground`, `border-border`, `ring-ring`… Never raw colors or Tailwind's color scale in a component. Add a token to `tokens.css` and `theme.css` when one is missing.
- Light and dark come from the tokens (`light-dark()` + `data-color-scheme`). Use `dark:` only when a token can't express the difference.
- State from ui-sdk attributes (`data-[open]:`, `data-[pressed]:`, `aria-disabled:`), never from JS-computed classes or inline styles.
- `ui` prop: one function per inner node, `(context) => attrs`, resolved with `useUi` and passed as-is (no normalization). Merge its `class` with the node's own through `cn`.

## Tests

| What                      | File                                           | Vitest project    |
| ------------------------- | ---------------------------------------------- | ----------------- |
| Pure logic                | `src/**/__tests__/<name>.spec.ts`              | `unit` (jsdom)    |
| Primitive / core behavior | `src/core/**/__tests__/<name>.spec.browser.ts` | `core` (Chromium) |
| Vue component             | `src/vue/**/__tests__/<Name>.spec.browser.tsx` | `vue` (Chromium)  |

- Helpers: `@test/vue` (`render`, `showcase`, `Part`, `attrsTests`, `invalidValueTests`) and `@test/shared`. Don't add component-specific cases to them.
- If it shows in a screenshot, it goes in a `showcase` story; tests cover what a screenshot can't: ARIA, keyboard, focus, events, slot props, attrs and `ui` reaching their node.
- Never assert classes: measure computed styles, rects and attributes.
- Test names in English and descriptive; no comments in tests.
- Browser tests need Docker (`npm run browser:up`, done by `pretest`). Refresh screenshots with `npm run test:update` only when the visual change is intended, and say so.

## When you're done

1. `npm run check` (lint, format check, typecheck, tests, build). Report each failure with its output.
2. Re-read every comment in the diff and delete it unless the code would be misread without it.
3. Report what you couldn't verify and any gap in ui-sdk you had to work around.

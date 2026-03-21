# Dashboard Widget Library – Integration Plan

This document describes how to bring the **Dashboard Widget Library** (source: `WidgetLib` at `/Users/aryan/WidgetLib`) into the main website project as a **dedicated route/page**. No code changes have been made yet; this is the plan only.

---

## 1. Integration approach

**Recommendation: dedicated route/page**

- Add a new app route so the dashboard demo lives at a URL like `/projects/dashboard-widgets`.
- This matches the existing pattern for project demos (e.g. `/projects/solarscope`) and keeps the demo self-contained with its own layout and “Back to Home” navigation.
- **Recommended route path:** `/projects/dashboard-widgets` (i.e. `app/projects/dashboard-widgets/page.tsx` and optional `layout.tsx`).

---

## 2. Main entry page/component for the dashboard demo

| Item | Source path |
|------|-------------|
| **Entry component** | `WidgetLib/src/pages/DemoDashboard.tsx` |
| **Bootstrap** | The Vite app mounts via `main.tsx` → `App.tsx` → `DemoDashboard`. In Next.js, the page will import and render `DemoDashboard` directly (no need to copy `main.tsx` or `App.tsx`). |

So the **single component that represents the dashboard demo** is `DemoDashboard.tsx`. All other files listed below are required because they are directly or indirectly imported by it.

---

## 3. Directly imported local files (from DemoDashboard)

| DemoDashboard imports | Source file(s) |
|-----------------------|----------------|
| `../components/primitives` (Badge, Button, Card) | `components/primitives/index.ts`, `Badge.tsx`, `Badge.css`, `Button.tsx`, `Button.css`, `Card.tsx`, `Card.css` |
| `../config/navigation` (HOME_URL) | `config/navigation.ts` |
| `../components/widgets` (BarChart, DataTable, FilterBar, LineChart, StatCard) | `components/widgets/index.ts`, each widget’s `.tsx` + `.css` |
| `../types` (TableColumn, UserRow) | `types/index.ts`, `types/dashboard.ts` |
| `../mock` (barChartData, lineChartData, statCards, statusFilterOptions, userTableRows) | `mock/index.ts`, `mock/dashboardData.ts` |
| `./DemoDashboard.css` | `pages/DemoDashboard.css` |

---

## 4. Dependency chain (shared deps used by those files)

- **React** – All components use `react` (and some `react-dom` for the Vite root; not needed in Next.js). The website already has React 19; the library was built with React 18. No extra npm dependency; minor version difference is typically compatible.
- **Primitives** – Only React and co-located CSS. No other local imports.
- **Widgets:**
  - **StatCard** – imports `Badge`, `Card` from `../primitives/Badge` and `../primitives/Card`, plus `StatCard.css`.
  - **FilterBar** – imports `Button`, `Input`, `Select` from `../primitives`, plus `FilterBar.css`.
  - **DataTable** – imports `TableColumn` from `../../types/dashboard`, plus `DataTable.css`.
  - **LineChart**, **BarChart** – only React and their own `.css`.
- **mock/dashboardData.ts** – imports types from `../types/dashboard`.
- **types/dashboard.ts** – imports `ReactNode` from `react` only.

No external UI or chart libraries (no Recharts, etc.); the library is CSS-only for charts and theme.

---

## 5. CSS / theme / token files required

| File | Purpose |
|------|--------|
| `WidgetLib/src/theme/tokens.css` | Design tokens (CSS variables) for light/dark: `:root` (light) and `[data-theme='dark']`. Defines `--background`, `--surface`, `--text`, `--primary`, etc. |
| `WidgetLib/src/index.css` | Imports `./theme/tokens.css` and sets `box-sizing`, `body` base. Required so the dashboard has the correct theme variables. |
| **Not required for demo** | `App.css` – Not imported by `App.tsx` or `DemoDashboard`; omit from copy. |

The demo shell uses `data-theme={theme}` on the root div; tokens must be in scope for that subtree (see “Styling/theme issues” below).

---

## 6. Mock / type / config files required

| Kind | Source files | Purpose |
|------|--------------|---------|
| **Config** | `src/config/navigation.ts` | Exports `HOME_URL` (used for “Back to Home” link). Set to `'/'` when embedded. |
| **Types** | `src/types/dashboard.ts`, `src/types/index.ts` | Shared types: `StatItem`, `TableColumn<T>`, `UserRow`, `FilterOption`, `LineSeriesPoint`, `BarSeriesDatum`. |
| **Mock data** | `src/mock/dashboardData.ts`, `src/mock/index.ts` | Stat cards, user table rows, filter options, line/bar chart data. |

No Vite-specific or Node-only config is required at runtime; `vite-env.d.ts` can be omitted or replaced by a minimal declaration if the build complains.

---

## 7. Source files to copy and destination paths

Assume **website root** = `aryanswebsite` (this repo). **Source root** = `WidgetLib` (sibling directory `/Users/aryan/WidgetLib`).

### 7.1 Route and layout (new files, content from this plan)

| Destination | Notes |
|-------------|--------|
| `app/projects/dashboard-widgets/page.tsx` | Next.js page: `"use client";` and render `<DemoDashboard />` (import from new location). |
| `app/projects/dashboard-widgets/layout.tsx` | Optional; mirror `solarscope` layout: nav with “Back to Home” link to `/`. |

### 7.2 Demo page and styles

| Source | Destination |
|--------|-------------|
| `WidgetLib/src/pages/DemoDashboard.tsx` | `src/components/dashboard-widgets/DemoDashboard.tsx` |
| `WidgetLib/src/pages/DemoDashboard.css` | `src/components/dashboard-widgets/DemoDashboard.css` |

### 7.3 Primitives (all required for widgets + demo)

| Source | Destination |
|--------|-------------|
| `WidgetLib/src/components/primitives/index.ts` | `src/components/dashboard-widgets/primitives/index.ts` |
| `WidgetLib/src/components/primitives/Badge.tsx` | `src/components/dashboard-widgets/primitives/Badge.tsx` |
| `WidgetLib/src/components/primitives/Badge.css` | `src/components/dashboard-widgets/primitives/Badge.css` |
| `WidgetLib/src/components/primitives/Button.tsx` | `src/components/dashboard-widgets/primitives/Button.tsx` |
| `WidgetLib/src/components/primitives/Button.css` | `src/components/dashboard-widgets/primitives/Button.css` |
| `WidgetLib/src/components/primitives/Card.tsx` | `src/components/dashboard-widgets/primitives/Card.tsx` |
| `WidgetLib/src/components/primitives/Card.css` | `src/components/dashboard-widgets/primitives/Card.css` |
| `WidgetLib/src/components/primitives/Input.tsx` | `src/components/dashboard-widgets/primitives/Input.tsx` |
| `WidgetLib/src/components/primitives/Input.css` | `src/components/dashboard-widgets/primitives/Input.css` |
| `WidgetLib/src/components/primitives/Select.tsx` | `src/components/dashboard-widgets/primitives/Select.tsx` |
| `WidgetLib/src/components/primitives/Select.css` | `src/components/dashboard-widgets/primitives/Select.css` |

### 7.4 Widgets

| Source | Destination |
|--------|-------------|
| `WidgetLib/src/components/widgets/index.ts` | `src/components/dashboard-widgets/widgets/index.ts` |
| `WidgetLib/src/components/widgets/StatCard.tsx` | `src/components/dashboard-widgets/widgets/StatCard.tsx` |
| `WidgetLib/src/components/widgets/StatCard.css` | `src/components/dashboard-widgets/widgets/StatCard.css` |
| `WidgetLib/src/components/widgets/FilterBar.tsx` | `src/components/dashboard-widgets/widgets/FilterBar.tsx` |
| `WidgetLib/src/components/widgets/FilterBar.css` | `src/components/dashboard-widgets/widgets/FilterBar.css` |
| `WidgetLib/src/components/widgets/DataTable.tsx` | `src/components/dashboard-widgets/widgets/DataTable.tsx` |
| `WidgetLib/src/components/widgets/DataTable.css` | `src/components/dashboard-widgets/widgets/DataTable.css` |
| `WidgetLib/src/components/widgets/LineChart.tsx` | `src/components/dashboard-widgets/widgets/LineChart.tsx` |
| `WidgetLib/src/components/widgets/LineChart.css` | `src/components/dashboard-widgets/widgets/LineChart.css` |
| `WidgetLib/src/components/widgets/BarChart.tsx` | `src/components/dashboard-widgets/widgets/BarChart.tsx` |
| `WidgetLib/src/components/widgets/BarChart.css` | `src/components/dashboard-widgets/widgets/BarChart.css` |

### 7.5 Theme and global dashboard CSS

| Source | Destination |
|--------|-------------|
| `WidgetLib/src/theme/tokens.css` | `src/components/dashboard-widgets/theme/tokens.css` |
| `WidgetLib/src/index.css` | `src/components/dashboard-widgets/dashboard-base.css` (optional name to avoid clashing with app-level `index.css`; see below) |

Import strategy: either import `dashboard-base.css` (which should `@import './theme/tokens.css';`) only from the dashboard page/layout, or import `theme/tokens.css` directly in the dashboard layout so tokens are scoped to the dashboard route.

### 7.6 Config, types, mock data

| Source | Destination |
|--------|-------------|
| `WidgetLib/src/config/navigation.ts` | `src/config/dashboard-navigation.ts` (or `src/lib/dashboard-config.ts`) |
| `WidgetLib/src/types/dashboard.ts` | `src/types/dashboard.ts` |
| `WidgetLib/src/types/index.ts` | Either merge dashboard exports into a single `src/types/dashboard.ts` or add `src/types/index.ts` that re-exports from `dashboard.ts`. |
| `WidgetLib/src/mock/dashboardData.ts` | `src/data/dashboard-mock.ts` (keeps mock data next to existing `src/data/projects.ts`) |
| `WidgetLib/src/mock/index.ts` | Not needed if the page/components import from `src/data/dashboard-mock.ts` directly. |

---

## 8. Imports that will need path updates

After copying, update imports as follows (conceptually; paths relative to each file’s new location).

### 8.1 In `DemoDashboard.tsx` (now under `src/components/dashboard-widgets/`)

| Current import | New import (example) |
|----------------|------------------------|
| `from '../components/primitives'` | `from './primitives'` or `from '@/src/components/dashboard-widgets/primitives'` |
| `from '../config/navigation'` | `from '@/src/config/dashboard-navigation'` (or chosen config path) |
| `from '../components/widgets'` | `from './widgets'` or `@/src/components/dashboard-widgets/widgets` |
| `from '../types'` | `from '@/src/types'` or `from '@/src/types/dashboard'` (depending on where types live) |
| `from '../mock'` | `from '@/src/data/dashboard-mock'` |
| `from './DemoDashboard.css'` | `from './DemoDashboard.css'` (unchanged if same dir) |

### 8.2 In primitives `index.ts`

| Current | New |
|---------|-----|
| `from './Badge'` etc. | Unchanged (same dir). |

### 8.3 In widgets

| File | Current | New |
|------|---------|-----|
| `StatCard.tsx` | `from '../primitives/Badge'`, `from '../primitives/Card'` | `from '../primitives/Badge'`, `from '../primitives/Card'` (unchanged if structure preserved). |
| `FilterBar.tsx` | `from '../primitives'` | Unchanged. |
| `DataTable.tsx` | `from '../../types/dashboard'` | `from '@/src/types/dashboard'` or `from '../../../types/dashboard'` depending on final types location. |
| Widgets `index.ts` | `from './StatCard'` etc. | Unchanged. |

### 8.4 In mock/data

| File | Current | New |
|------|---------|-----|
| `dashboard-mock.ts` (was `dashboardData.ts`) | `from '../types/dashboard'` | `from '@/src/types/dashboard'` (or relative path to `src/types/dashboard.ts`). |

### 8.5 Config

| File | Current | New |
|------|---------|-----|
| `dashboard-navigation.ts` | (no internal imports) | None. Keep `HOME_URL = '/'` for the website. |

### 8.6 Page that renders the demo

In `app/projects/dashboard-widgets/page.tsx`:

- Import the dashboard theme (tokens) so they apply: e.g. `import '@/src/components/dashboard-widgets/theme/tokens.css'` or the combined dashboard-base CSS.
- Import and render: `import { DemoDashboard } from '@/src/components/dashboard-widgets/DemoDashboard'`.

---

## 9. Styling / theme issues to resolve

1. **CSS variable scope**
   - The main site uses `app/globals.css` with Tailwind and its own `:root` variables (e.g. `--background`, `--foreground`, `--accent`).
   - The dashboard uses `theme/tokens.css` with different semantics: `:root` (light) and `[data-theme='dark']` with `--background`, `--surface`, `--text`, `--primary`, etc.
   - **Risk:** If dashboard tokens are imported globally, they can override or clash with the site’s `:root`. **Approach:** Import dashboard tokens only in the dashboard route (e.g. in `app/projects/dashboard-widgets/layout.tsx` or `page.tsx`). Ensure the dashboard root (e.g. `.demo-dashboard-shell`) is the only place that uses `data-theme` so tokens apply in a predictable scope. Optionally scope tokens under a class (e.g. `.dashboard-widgets-theme`) and apply that class on the dashboard layout wrapper so they never leak to the rest of the site.

2. **Tailwind vs dashboard CSS**
   - The dashboard components use plain CSS and CSS variables, not Tailwind. The site uses Tailwind v4. Keep dashboard CSS as-is and avoid wrapping dashboard content in Tailwind-heavy containers that could change font or colors; use a minimal wrapper (e.g. one div with the dashboard theme class) so the demo looks correct.

3. **Font**
   - WidgetLib uses `font-family: system-ui, -apple-system, sans-serif` in `index.css`. The site uses Geist via `layout.tsx`. For the dashboard route, either leave the dashboard’s own font so the demo matches the standalone app, or switch the dashboard base CSS to use the site font for consistency. Document the choice in the plan.

4. **“Back to Home”**
   - DemoDashboard uses `window.location.href = HOME_URL`. Set `HOME_URL` to `'/'` (or the full site URL if needed) in the copied config so the button goes to the site home. Alternatively, use Next.js `<Link href="/">` in the layout and remove the in-demo back button in favor of the layout nav (mirroring solarscope).

---

## 10. Likely conflicts

| Issue | Mitigation |
|-------|------------|
| **React 18 vs 19** | Website has React 19; WidgetLib targets 18. No API used here that breaks on 19. If any incompatibility appears, fix in the copied components. |
| **Duplicate `:root` variables** | Import dashboard tokens only on the dashboard route and, if possible, scope them under a class to avoid overriding the main site’s `:root`. |
| **Path alias** | Website uses `@/*` → `./*`. Use `@/src/...` for components, types, config, and mock data so paths stay consistent and short. |
| **No `src/types` or `src/config` today** | Adding `src/types` and `src/config` is safe; no existing files to clash. Naming: `dashboard-navigation.ts` and `dashboard.ts` (or `dashboard-mock.ts`) avoid generic names. |
| **ESLint/TypeScript** | After copy, run `npm run lint` and `npm run build`; fix any missing types (e.g. if `vite-env.d.ts` was dropped) or unused vars. |

---

## 11. Recommended route path

Use the route:

- **`/projects/dashboard-widgets`**

so the demo is available at:

- **`https://<your-domain>/projects/dashboard-widgets`**

This aligns with the project id `dashboard-widgets` in `src/data/projects.ts` and with the existing `/projects/solarscope` pattern. You can set the Dashboard Widget Library project’s `liveDemoUrl` to `'/projects/dashboard-widgets'` (or the full URL) so the portfolio “Live Demo” button points here.

---

## 12. Summary checklist (no code yet)

- [ ] Copy all source files to the destinations in §7.
- [ ] Create `app/projects/dashboard-widgets/page.tsx` (client component rendering `DemoDashboard`) and optionally `layout.tsx` with “Back to Home”.
- [ ] Update all imports in the copied files per §8.
- [ ] Import dashboard theme/tokens only in the dashboard route and scope variables if needed (§9).
- [ ] Set `HOME_URL` to `'/'` in the copied config (or replace in-demo back with layout nav).
- [ ] Run `npm run build` and `npm run lint` and fix any issues.
- [ ] Optionally set `liveDemoUrl` for the Dashboard Widget Library project in `src/data/projects.ts` to `'/projects/dashboard-widgets'`.

No code has been modified in this step; the next step is to apply this plan and then test the new route.

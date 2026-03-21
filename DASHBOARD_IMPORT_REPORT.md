# Dashboard Import Report

This report lists every file copied from the Dashboard Widget Library (WidgetLib at `/Users/aryan/WidgetLib`) into the main website project, its old path, new path, and any modified imports.

---

## Summary

- **Source root:** `WidgetLib` (e.g. `/Users/aryan/WidgetLib`)
- **Destination root:** Website project root (`aryanswebsite`)
- **Structure used:** `src/components/dashboard/`, `src/mock/dashboard/`, `src/types/`, `src/config/`, `src/styles/dashboard/`, and `app/projects/dashboard-widgets/` for the route. The demo page component lives in `src/components/dashboard/` (not `src/pages/dashboard/`) to avoid Next.js conflating `src/pages` with the Pages Router.

---

## 1. Config

| Old path | New path | Modified imports |
|----------|----------|------------------|
| `WidgetLib/src/config/navigation.ts` | `src/config/dashboard.ts` | None (no internal imports). File renamed for clarity. |

---

## 2. Types

| Old path | New path | Modified imports |
|----------|----------|------------------|
| `WidgetLib/src/types/dashboard.ts` | `src/types/dashboard.ts` | None (only `react`). |
| `WidgetLib/src/types/index.ts` | Not copied | N/A. Types are imported directly from `@/src/types/dashboard`; no re-export index needed. |

---

## 3. Mock data

| Old path | New path | Modified imports |
|----------|----------|------------------|
| `WidgetLib/src/mock/dashboardData.ts` | `src/mock/dashboard/data.ts` | `'../types/dashboard'` → `'@/src/types/dashboard'`. |
| `WidgetLib/src/mock/index.ts` | `src/mock/dashboard/index.ts` | `'./dashboardData'` → `'./data'`. |

---

## 4. Styles / theme

| Old path | New path | Modified imports |
|----------|----------|------------------|
| `WidgetLib/src/theme/tokens.css` | `src/styles/dashboard/tokens.css` | None. |
| `WidgetLib/src/index.css` | `src/styles/dashboard/base.css` | `'./theme/tokens.css'` → `'./tokens.css'`. |

---

## 5. Primitives (`src/components/dashboard/primitives`)

| Old path | New path | Modified imports |
|----------|----------|------------------|
| `WidgetLib/src/components/primitives/index.ts` | `src/components/dashboard/primitives/index.ts` | None. |
| `WidgetLib/src/components/primitives/Badge.tsx` | `src/components/dashboard/primitives/Badge.tsx` | None. |
| `WidgetLib/src/components/primitives/Badge.css` | `src/components/dashboard/primitives/Badge.css` | None. |
| `WidgetLib/src/components/primitives/Button.tsx` | `src/components/dashboard/primitives/Button.tsx` | None. |
| `WidgetLib/src/components/primitives/Button.css` | `src/components/dashboard/primitives/Button.css` | None. |
| `WidgetLib/src/components/primitives/Card.tsx` | `src/components/dashboard/primitives/Card.tsx` | None. |
| `WidgetLib/src/components/primitives/Card.css` | `src/components/dashboard/primitives/Card.css` | None. |
| `WidgetLib/src/components/primitives/Input.tsx` | `src/components/dashboard/primitives/Input.tsx` | None. |
| `WidgetLib/src/components/primitives/Input.css` | `src/components/dashboard/primitives/Input.css` | None. |
| `WidgetLib/src/components/primitives/Select.tsx` | `src/components/dashboard/primitives/Select.tsx` | None. |
| `WidgetLib/src/components/primitives/Select.css` | `src/components/dashboard/primitives/Select.css` | None. |

---

## 6. Widgets (`src/components/dashboard/widgets`)

| Old path | New path | Modified imports |
|----------|----------|------------------|
| `WidgetLib/src/components/widgets/index.ts` | `src/components/dashboard/widgets/index.ts` | None. |
| `WidgetLib/src/components/widgets/StatCard.tsx` | `src/components/dashboard/widgets/StatCard.tsx` | None (`../primitives/` still resolves to `src/components/dashboard/primitives/`). |
| `WidgetLib/src/components/widgets/StatCard.css` | `src/components/dashboard/widgets/StatCard.css` | None. |
| `WidgetLib/src/components/widgets/FilterBar.tsx` | `src/components/dashboard/widgets/FilterBar.tsx` | None. |
| `WidgetLib/src/components/widgets/FilterBar.css` | `src/components/dashboard/widgets/FilterBar.css` | None. |
| `WidgetLib/src/components/widgets/DataTable.tsx` | `src/components/dashboard/widgets/DataTable.tsx` | `'../../types/dashboard'` → `'@/src/types/dashboard'`. |
| `WidgetLib/src/components/widgets/DataTable.css` | `src/components/dashboard/widgets/DataTable.css` | None. |
| `WidgetLib/src/components/widgets/LineChart.tsx` | `src/components/dashboard/widgets/LineChart.tsx` | None. |
| `WidgetLib/src/components/widgets/LineChart.css` | `src/components/dashboard/widgets/LineChart.css` | None. |
| `WidgetLib/src/components/widgets/BarChart.tsx` | `src/components/dashboard/widgets/BarChart.tsx` | None. |
| `WidgetLib/src/components/widgets/BarChart.css` | `src/components/dashboard/widgets/BarChart.css` | None. |

---

## 7. Demo page component (`src/components/dashboard`)

| Old path | New path | Modified imports |
|----------|----------|------------------|
| `WidgetLib/src/pages/DemoDashboard.tsx` | `src/components/dashboard/DemoDashboard.tsx` | `'../components/primitives'` → `'@/src/components/dashboard/primitives'`. `'../config/navigation'` → `'@/src/config/dashboard'`. `'../components/widgets'` → `'@/src/components/dashboard/widgets'`. `'../types'` → `'@/src/types/dashboard'`. `'../mock'` → `'@/src/mock/dashboard'`. `'./DemoDashboard.css'` unchanged. |
| `WidgetLib/src/pages/DemoDashboard.css` | `src/components/dashboard/DemoDashboard.css` | None. |

---

## 8. App route (new files, not copied from WidgetLib)

| Destination | Purpose |
|--------------|---------|
| `app/projects/dashboard-widgets/layout.tsx` | New layout: imports `@/src/styles/dashboard/tokens.css`, provides "Back to Home" link, metadata. |
| `app/projects/dashboard-widgets/page.tsx` | New page: client component that renders `DemoDashboard` from `@/src/components/dashboard/DemoDashboard`. |

---

## 9. Files not copied

- `WidgetLib/src/main.tsx`, `App.tsx`, `App.css` – Not needed; Next.js page renders `DemoDashboard` directly.
- `WidgetLib/src/index.html` – Not used in Next.js.
- `WidgetLib/src/vite-env.d.ts` – Vite-specific; omitted.
- `WidgetLib/src/types/index.ts` – Re-export only; consumers import from `@/src/types/dashboard` instead.

---

## 10. Import path reference

All updated imports use the website’s `@/*` alias (mapping to project root):

- `@/src/config/dashboard` – HOME_URL
- `@/src/types/dashboard` – StatItem, TableColumn, UserRow, FilterOption, LineSeriesPoint, BarSeriesDatum
- `@/src/mock/dashboard` – barChartData, lineChartData, statCards, statusFilterOptions, userTableRows
- `@/src/components/dashboard/primitives` – Badge, Button, Card, Input, Select
- `@/src/components/dashboard/widgets` – BarChart, DataTable, FilterBar, LineChart, StatCard
- `@/src/components/dashboard/DemoDashboard` – DemoDashboard component
- `@/src/styles/dashboard/tokens.css` – Dashboard theme variables (imported in dashboard route layout)

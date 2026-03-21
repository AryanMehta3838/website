import type { ReactNode } from 'react'

/**
 * Shared TypeScript types for dashboard widgets (stats, tables, filters, charts).
 */

/** Single stat card: label, value, optional trend. */
export interface StatItem {
  id: string
  label: string
  value: number
  /** Optional percentage change vs previous period; positive = up. */
  change?: number
}

/** Column definition for a data table; T is the row type. */
export interface TableColumn<T> {
  key: keyof T & string
  header: string
  /** Optional width (e.g. "120px" or "20%"). */
  width?: string
  align?: 'left' | 'right' | 'center'
  /** Optional custom cell renderer; receives cell value and full row. */
  render?: (value: T[keyof T], row: T) => ReactNode
}

/** Example row type for a user/activity table. */
export interface UserRow {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastActive: string
}

/** Option for filter dropdowns (status, category, etc.). */
export interface FilterOption {
  value: string
  label: string
  /** Optional count for "show count" filters. */
  count?: number
}

/** Single point in a line chart series. */
export interface LineSeriesPoint {
  x: string
  y: number
}

/** Single datum for a bar chart (one bar: label + value). */
export interface BarSeriesDatum {
  label: string
  value: number
}

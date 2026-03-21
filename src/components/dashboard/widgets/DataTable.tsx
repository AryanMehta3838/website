import type { ReactNode } from 'react'
import type { TableColumn } from '@/src/types/dashboard'
import './DataTable.css'

export interface DataTableProps<T> {
  /** Column definitions (key, header, optional width, align, render). */
  columns: TableColumn<T>[]
  /** Data rows. */
  rows: T[]
  /** Message shown when rows is empty. */
  emptyState?: string
  /** Key or function to uniquely identify a row for React keys. Defaults to "id" if present. */
  getRowKey?: keyof T | ((row: T) => string)
  /** Optional class name for the wrapper. */
  className?: string
}

function getRowKeyDefault<T>(row: T, index: number): string {
  const r = row as Record<string, unknown>
  if (r != null && typeof r.id === 'string') return r.id
  return String(index)
}

export function DataTable<T>({
  columns,
  rows,
  emptyState = 'No data',
  getRowKey,
  className = '',
}: DataTableProps<T>) {
  const resolveKey = (row: T, index: number): string => {
    if (getRowKey == null) return getRowKeyDefault(row, index)
    if (typeof getRowKey === 'function') return getRowKey(row)
    const r = row as Record<string, unknown>
    const v = r[getRowKey as string]
    return v != null ? String(v) : String(index)
  }

  const rootClass = ['data-table-wrap', className].filter(Boolean).join(' ')

  if (rows.length === 0) {
    return (
      <div className={rootClass}>
        <p className="data-table-empty">{emptyState}</p>
      </div>
    )
  }

  return (
    <div className={rootClass}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="data-table__th"
                style={{
                  width: col.width,
                  textAlign: col.align ?? 'left',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={resolveKey(row, index)} className="data-table__tr">
              {columns.map((col) => {
                const value = (row as Record<string, unknown>)[col.key] as T[keyof T]
                const content: ReactNode =
                  col.render != null ? col.render(value, row) : (value != null ? String(value) : '—')
                return (
                  <td
                    key={String(col.key)}
                    className="data-table__td"
                    style={{ textAlign: col.align ?? 'left' }}
                  >
                    {content}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

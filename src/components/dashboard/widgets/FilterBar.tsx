import type { ChangeEvent } from 'react'
import { Button, Input, Select } from '../primitives'
import './FilterBar.css'

export interface FilterBarOption {
  value: string
  label: string
}

export interface FilterBarProps {
  /** Current search input value. */
  searchValue: string
  /** Called when search input changes. */
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  /** Currently selected status value. */
  selectedStatus: string
  /** Called when status select changes. */
  onStatusChange: (e: ChangeEvent<HTMLSelectElement>) => void
  /** Options for the status dropdown. */
  statusOptions: FilterBarOption[]
  /** Optional; when provided, a Reset button is shown. */
  onReset?: () => void
  /** Optional placeholder for search input. */
  searchPlaceholder?: string
  /** Optional label for search input. */
  searchLabel?: string
  /** Optional label for status select. */
  statusLabel?: string
  /** Optional class name for the root element. */
  className?: string
}

export function FilterBar({
  searchValue,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  statusOptions,
  onReset,
  searchPlaceholder = 'Search…',
  searchLabel = 'Search',
  statusLabel = 'Status',
  className = '',
}: FilterBarProps) {
  const rootClass = ['filter-bar', className].filter(Boolean).join(' ')
  const selectOptions = statusOptions.map((o) => ({ value: o.value, label: o.label }))

  return (
    <div className={rootClass}>
      <Input
        label={searchLabel}
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
        className="filter-bar__search"
      />
      <Select
        label={statusLabel}
        options={selectOptions}
        value={selectedStatus}
        onChange={onStatusChange}
        className="filter-bar__status"
      />
      {onReset != null && (
        <div className="filter-bar__reset">
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  )
}

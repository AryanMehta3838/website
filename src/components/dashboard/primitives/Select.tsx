import type { SelectHTMLAttributes } from 'react'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  /** Options for the dropdown. */
  options: SelectOption[]
  /** Accessible label; not rendered if omitted. */
  label?: string
  /** Optional additional class name for the wrapper. */
  className?: string
}

export function Select({
  options,
  label,
  id,
  className = '',
  ...rest
}: SelectProps) {
  const selectId =
    id ?? (label ? `select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)
  const wrapperClass = ['select-wrap', className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClass}>
      {label != null && (
        <label htmlFor={selectId} className="select-wrap__label">
          {label}
        </label>
      )}
      <select id={selectId} className="select-wrap__select" {...rest}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

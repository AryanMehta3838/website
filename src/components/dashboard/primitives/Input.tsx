import type { InputHTMLAttributes } from 'react'
import './Input.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  /** Accessible label; not rendered if omitted. */
  label?: string
  /** Optional additional class name for the wrapper. */
  className?: string
}

export function Input({ label, id, className = '', ...rest }: InputProps) {
  const inputId = id ?? (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)
  const wrapperClass = ['input-wrap', className].filter(Boolean).join(' ')
  return (
    <div className={wrapperClass}>
      {label != null && (
        <label htmlFor={inputId} className="input-wrap__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="input-wrap__input"
        {...rest}
      />
    </div>
  )
}

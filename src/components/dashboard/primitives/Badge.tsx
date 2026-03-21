import type { ReactNode } from 'react'
import './Badge.css'

export type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger'

export interface BadgeProps {
  /** Visual style. */
  variant?: BadgeVariant
  /** Badge content. */
  children: ReactNode
  /** Optional additional class name. */
  className?: string
}

export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  const classes = ['badge', `badge--${variant}`, className].filter(Boolean).join(' ')
  return <span className={classes}>{children}</span>
}

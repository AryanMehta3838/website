import type { ReactNode } from 'react'
import './Card.css'

export interface CardProps {
  /** Optional card title. */
  title?: string
  /** Card content. */
  children: ReactNode
  /** Optional additional class name. */
  className?: string
}

export function Card({ title, children, className = '' }: CardProps) {
  const classes = ['card', className].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      {title != null && <h3 className="card__title">{title}</h3>}
      <div className="card__body">{children}</div>
    </div>
  )
}

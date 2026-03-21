import type { BadgeVariant } from '../primitives/Badge'
import { Badge } from '../primitives/Badge'
import { Card } from '../primitives/Card'
import './StatCard.css'

export interface StatCardProps {
  /** Stat label (e.g. "Total users"). */
  label: string
  /** Stat value. */
  value: number
  /** Optional percentage change vs previous period. */
  change?: number
  /** Optional trend direction; derived from change if omitted. */
  trendDirection?: 'up' | 'down' | 'neutral'
  /** Optional class name for the wrapper. */
  className?: string
}

function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change}%`
}

export function StatCard({
  label,
  value,
  change,
  trendDirection,
  className = '',
}: StatCardProps) {
  const direction =
    trendDirection ??
    (change != null && change !== 0 ? (change > 0 ? 'up' : 'down') : 'neutral')
  const badgeVariant: BadgeVariant =
    direction === 'up' ? 'success' : direction === 'down' ? 'danger' : 'neutral'
  const showChange = change != null

  return (
    <Card className={`stat-card ${className}`.trim()}>
      <div className="stat-card__inner">
        <span className="stat-card__label">{label}</span>
        <div className="stat-card__value-row">
          <span className="stat-card__value">{value.toLocaleString()}</span>
          {showChange && (
            <Badge variant={badgeVariant} className="stat-card__change">
              {formatChange(change)}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}

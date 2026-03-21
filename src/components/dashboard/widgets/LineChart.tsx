import { useMemo } from 'react'
import './LineChart.css'

const VIEW_WIDTH = 400
const VIEW_HEIGHT = 220
const MARGIN = { top: 12, right: 12, bottom: 28, left: 36 }
const PLOT_WIDTH = VIEW_WIDTH - MARGIN.left - MARGIN.right
const PLOT_HEIGHT = VIEW_HEIGHT - MARGIN.top - MARGIN.bottom

export interface LineChartProps<T> {
  /** Data points. */
  data: T[]
  /** Key for x-axis labels (e.g. category or date). */
  xKey: keyof T
  /** Key for y-axis values (numeric). */
  yKey: keyof T
  /** Chart title. */
  title: string
  /** Message when data is empty. */
  emptyState?: string
  /** Optional class name for the root element. */
  className?: string
}

function getYExtent(values: number[]): [number, number] {
  if (values.length === 0) return [0, 100]
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (min === max) return [min - 10, max + 10]
  const pad = (max - min) * 0.05
  return [min - pad, max + pad]
}

/** Format a number for axis labels. */
function formatTick(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return String(Math.round(value))
}

export function LineChart<T extends object>({
  data,
  xKey,
  yKey,
  title,
  emptyState = 'No data to display',
  className = '',
}: LineChartProps<T>) {
  const { pathD, xTicks, yTicks } = useMemo(() => {
    const get = (d: T, k: keyof T) => (d as Record<string, unknown>)[k as string]
    const xs = data.map((d) => String(get(d, xKey)))
    const ys = data.map((d) => Number(get(d, yKey)))
    const [yMin, yMax] = getYExtent(ys)
    const n = data.length
    const xStep = n > 1 ? PLOT_WIDTH / (n - 1) : 0
    const scaleY = (v: number) =>
      MARGIN.top + PLOT_HEIGHT - ((v - yMin) / (yMax - yMin)) * PLOT_HEIGHT
    const scaleX = (i: number) => MARGIN.left + (n > 1 ? i * xStep : PLOT_WIDTH / 2)

    const pathD =
      data.length === 0
        ? ''
        : data
            .map((_, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i)} ${scaleY(ys[i])}`)
            .join(' ')

    const xTicks = xs.map((label, i) => ({ label, x: scaleX(i) }))
    const yTickCount = 5
    const yTicks: { value: number; y: number }[] = []
    for (let i = 0; i <= yTickCount; i++) {
      const value = yMin + (yMax - yMin) * (i / yTickCount)
      yTicks.push({ value, y: scaleY(value) })
    }

    return { pathD, xTicks, yTicks }
  }, [data, xKey, yKey])

  const rootClass = ['line-chart', className].filter(Boolean).join(' ')
  const isEmpty = data.length === 0

  return (
    <div className={rootClass}>
      <h3 className="line-chart__title">{title}</h3>
      {isEmpty ? (
        <p className="line-chart__empty">{emptyState}</p>
      ) : (
      <svg
        className="line-chart__svg"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
          <>
            {/* Y-axis tick lines (optional grid) */}
            {yTicks.map((t, i) => (
              <line
                key={i}
                className="line-chart__grid"
                x1={MARGIN.left}
                y1={t.y}
                x2={VIEW_WIDTH - MARGIN.right}
                y2={t.y}
              />
            ))}
            {/* Y-axis labels */}
            {yTicks.map((t, i) => (
              <text
                key={i}
                className="line-chart__tick"
                x={MARGIN.left - 6}
                y={t.y + 4}
                textAnchor="end"
              >
                {formatTick(t.value)}
              </text>
            ))}
            {/* Line path */}
            <path className="line-chart__line" d={pathD} fill="none" />
            {/* X-axis labels */}
            {xTicks.map((t, i) => (
              <text
                key={i}
                className="line-chart__tick"
                x={t.x}
                y={VIEW_HEIGHT - 8}
                textAnchor="middle"
              >
                {t.label}
              </text>
            ))}
          </>
      </svg>
      )}
    </div>
  )
}

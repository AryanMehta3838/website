import { useMemo } from 'react'
import './BarChart.css'

const VIEW_WIDTH = 400
const VIEW_HEIGHT = 220
const MARGIN = { top: 12, right: 12, bottom: 28, left: 36 }
const PLOT_WIDTH = VIEW_WIDTH - MARGIN.left - MARGIN.right
const PLOT_HEIGHT = VIEW_HEIGHT - MARGIN.top - MARGIN.bottom

export interface BarChartProps<T> {
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

function formatTick(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`
  return String(Math.round(value))
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

export function BarChart<T extends object>({
  data,
  xKey,
  yKey,
  title,
  emptyState = 'No data to display',
  className = '',
}: BarChartProps<T>) {
  const { xTicks, yTicks, bars, baselineY } = useMemo(() => {
    const get = (d: T, k: keyof T) => (d as Record<string, unknown>)[k as string]
    const xs = data.map((d) => String(get(d, xKey)))
    const ys = data.map((d) => Number(get(d, yKey)))

    const [yMin, yMax] = getYExtent(ys)
    const scaleY = (v: number) =>
      MARGIN.top + PLOT_HEIGHT - ((v - yMin) / (yMax - yMin)) * PLOT_HEIGHT

    // Baseline at y=0, clamped into the plot area.
    const rawBaseline = scaleY(0)
    const baselineYClamped = clamp(rawBaseline, MARGIN.top, MARGIN.top + PLOT_HEIGHT)

    const n = Math.max(data.length, 1)
    const xStep = PLOT_WIDTH / n
    const barWidth = xStep * 0.65
    const leftPad = (xStep - barWidth) / 2

    const bars = data.map((d, i) => {
      const v = Number(get(d, yKey))
      const y = scaleY(v)
      const top = Math.min(y, baselineYClamped)
      const height = Math.abs(baselineYClamped - y)
      const x = MARGIN.left + i * xStep + leftPad
      return { x, y: top, width: barWidth, height, label: xs[i] }
    })

    const yTickCount = 5
    const yTicks: { value: number; y: number }[] = []
    for (let i = 0; i <= yTickCount; i++) {
      const value = yMin + (yMax - yMin) * (i / yTickCount)
      yTicks.push({ value, y: scaleY(value) })
    }

    const xTicks = bars.map((b) => ({ label: b.label, x: b.x + b.width / 2 }))

    return { xTicks, yTicks, bars, baselineY: baselineYClamped }
  }, [data, xKey, yKey])

  const rootClass = ['bar-chart', className].filter(Boolean).join(' ')
  const isEmpty = data.length === 0

  return (
    <div className={rootClass}>
      <h3 className="bar-chart__title">{title}</h3>
      {isEmpty ? (
        <p className="bar-chart__empty">{emptyState}</p>
      ) : (
      <svg
        className="bar-chart__svg"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
          <>
            {/* Y-axis labels + grid */}
            {yTicks.map((t, i) => (
              <g key={i}>
                <line
                  className="bar-chart__grid"
                  x1={MARGIN.left}
                  y1={t.y}
                  x2={VIEW_WIDTH - MARGIN.right}
                  y2={t.y}
                />
                <text
                  className="bar-chart__tick"
                  x={MARGIN.left - 6}
                  y={t.y + 4}
                  textAnchor="end"
                >
                  {formatTick(t.value)}
                </text>
              </g>
            ))}

            {/* X-axis baseline */}
            <line
              className="bar-chart__baseline"
              x1={MARGIN.left}
              y1={baselineY}
              x2={VIEW_WIDTH - MARGIN.right}
              y2={baselineY}
            />

            {/* Bars */}
            {bars.map((b, i) => (
              <rect
                key={i}
                className="bar-chart__bar"
                x={b.x}
                y={b.y}
                width={b.width}
                height={b.height}
                rx={3}
              />
            ))}

            {/* X-axis labels */}
            {xTicks.map((t, i) => (
              <text
                key={i}
                className="bar-chart__tick"
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

import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'
import { Badge, Button, Card } from '@/src/components/dashboard/primitives'
import { HOME_URL } from '@/src/config/dashboard'
import { BarChart, DataTable, FilterBar, LineChart, StatCard } from '@/src/components/dashboard/widgets'
import type { TableColumn, UserRow } from '@/src/types/dashboard'
import {
  barChartData,
  lineChartData,
  statCards,
  statusFilterOptions,
  userTableRows,
} from '@/src/mock/dashboard'
import './DemoDashboard.css'

const userColumns: TableColumn<UserRow>[] = [
  { key: 'name', header: 'Name', width: '140px' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', width: '90px' },
  {
    key: 'status',
    header: 'Status',
    width: '100px',
    render: (value) => {
      const v = String(value)
      const variant = v === 'active' ? 'success' : v === 'pending' ? 'warning' : 'neutral'
      return <Badge variant={variant}>{v}</Badge>
    },
  },
  {
    key: 'lastActive',
    header: 'Last active',
    width: '120px',
    render: (value) =>
      value ? new Date(String(value)).toLocaleDateString(undefined, { dateStyle: 'short' }) : '—',
  },
]

export function DemoDashboard() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [filterSearch, setFilterSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const handleFilterReset = () => {
    setFilterSearch('')
    setFilterStatus('all')
  }

  const filteredUsers = useMemo(() => {
    const q = filterSearch.trim().toLowerCase()
    return userTableRows.filter((row) => {
      const matchStatus = filterStatus === 'all' || row.status === filterStatus
      const matchSearch =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q)
      return matchStatus && matchSearch
    })
  }, [filterSearch, filterStatus])

  const goHome = () => {
    window.location.href = HOME_URL
  }

  return (
    <div className="demo-dashboard-shell" data-theme={theme}>
      <main className="demo-dashboard">
        <header className="demo-dashboard__header">
          <div className="demo-dashboard__header-row">
            <h1 className="demo-dashboard__title">Dashboard Widget Library</h1>
            <Button
              variant="ghost"
              className="demo-dashboard__back"
              onClick={goHome}
              aria-label="Back to home"
            >
              <span className="demo-dashboard__back-icon" aria-hidden>←</span>
              Back to Home
            </Button>
          </div>
          <div className="demo-dashboard__header-row">
            <p className="demo-dashboard__subtitle">
              Reusable React components for charts, tables, and filters
            </p>
            <button
              type="button"
              className="demo-dashboard__theme-toggle"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
        </header>

        <section className="demo-dashboard__section">
          <h2 className="demo-dashboard__section-title">Stats</h2>
          <div className="demo-dashboard__stat-grid">
            {statCards.map((stat) => (
              <StatCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                change={stat.change}
              />
            ))}
          </div>
        </section>

        <section className="demo-dashboard__section">
          <h2 className="demo-dashboard__section-title">Table</h2>
          <FilterBar
            searchValue={filterSearch}
            onSearchChange={(e: ChangeEvent<HTMLInputElement>) => setFilterSearch(e.target.value)}
            selectedStatus={filterStatus}
            onStatusChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}
            statusOptions={statusFilterOptions}
            onReset={handleFilterReset}
            searchPlaceholder="Search users…"
            searchLabel="Search"
            statusLabel="Status"
          />
          <Card title="Users" className="demo-dashboard__table-card">
            <DataTable<UserRow>
              columns={userColumns}
              rows={filteredUsers}
              emptyState="No users match the current filters."
            />
          </Card>
        </section>

        <section className="demo-dashboard__section">
          <h2 className="demo-dashboard__section-title">Charts</h2>
          <div className="demo-dashboard__charts-grid">
            <Card title="Sessions (weekly)">
              <LineChart data={lineChartData} xKey="x" yKey="y" title="Sessions by day" />
            </Card>
            <Card title="Revenue (by month)">
              <BarChart data={barChartData} xKey="label" yKey="value" title="Revenue by month" />
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}

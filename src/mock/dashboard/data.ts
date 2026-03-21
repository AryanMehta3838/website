import type {
  BarSeriesDatum,
  FilterOption,
  LineSeriesPoint,
  StatItem,
  UserRow,
} from '@/src/types/dashboard'

/** Mock stat cards for dashboard overview. */
export const statCards: StatItem[] = [
  { id: 'users', label: 'Total users', value: 1247, change: 12.5 },
  { id: 'sessions', label: 'Sessions (30d)', value: 8932, change: -2.1 },
  { id: 'revenue', label: 'Revenue', value: 42850, change: 8.3 },
  { id: 'conversion', label: 'Conversion %', value: 3.2, change: 0.5 },
]

/** Mock user/activity table rows. */
export const userTableRows: UserRow[] = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: '2025-03-18T10:30:00Z',
  },
  {
    id: '2',
    name: 'Sam Rivera',
    email: 'sam.rivera@example.com',
    role: 'Editor',
    status: 'active',
    lastActive: '2025-03-18T09:15:00Z',
  },
  {
    id: '3',
    name: 'Jordan Lee',
    email: 'jordan.lee@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastActive: '2025-03-15T14:00:00Z',
  },
  {
    id: '4',
    name: 'Casey Morgan',
    email: 'casey.morgan@example.com',
    role: 'Editor',
    status: 'pending',
    lastActive: '2025-03-17T11:20:00Z',
  },
  {
    id: '5',
    name: 'Riley Kim',
    email: 'riley.kim@example.com',
    role: 'Viewer',
    status: 'active',
    lastActive: '2025-03-18T08:45:00Z',
  },
  {
    id: '6',
    name: 'Taylor Brooks',
    email: 'taylor.brooks@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: '2025-03-18T07:00:00Z',
  },
  {
    id: '7',
    name: 'Morgan Walsh',
    email: 'morgan.walsh@example.com',
    role: 'Editor',
    status: 'inactive',
    lastActive: '2025-03-14T16:30:00Z',
  },
  {
    id: '8',
    name: 'Quinn Hayes',
    email: 'quinn.hayes@example.com',
    role: 'Viewer',
    status: 'pending',
    lastActive: '2025-03-16T12:00:00Z',
  },
]

/** Status filter options for tables/filters. */
export const statusFilterOptions: FilterOption[] = [
  { value: 'all', label: 'All statuses', count: 8 },
  { value: 'active', label: 'Active', count: 5 },
  { value: 'inactive', label: 'Inactive', count: 2 },
  { value: 'pending', label: 'Pending', count: 1 },
]

/** Mock line chart dataset (e.g. sessions or signups over time). */
export const lineChartData: LineSeriesPoint[] = [
  { x: 'Mon', y: 320 },
  { x: 'Tue', y: 410 },
  { x: 'Wed', y: 380 },
  { x: 'Thu', y: 520 },
  { x: 'Fri', y: 490 },
  { x: 'Sat', y: 310 },
  { x: 'Sun', y: 280 },
]

/** Mock bar chart dataset (e.g. events or revenue by category). */
export const barChartData: BarSeriesDatum[] = [
  { label: 'Jan', value: 420 },
  { label: 'Feb', value: 380 },
  { label: 'Mar', value: 510 },
  { label: 'Apr', value: 440 },
  { label: 'May', value: 590 },
  { label: 'Jun', value: 520 },
]

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts'
import {
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  ArrowUpRight,
  Target
} from 'lucide-react'

interface AnalyticsData {
  topLocations: Array<{ location: string; count: number }>
  totalQuotes: number
  uniqueLocations: number
  period: string
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [period, setPeriod] = useState('30')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics?period=${period}`)
      const data = await response.json()
      setAnalytics(data)
    } catch (err) {
      console.error('[Admin] Error fetching analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ['var(--color-primary)', 'var(--color-secondary)', '#6366f1', '#8b5cf6', '#ec4899']

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground mb-2">التحليلات الشاملة</h1>
          <p className="text-muted-foreground">تتبع أداء المناطق والطلبات عبر الزمن</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-border shadow-sm">
          {[
            { label: 'أسبوع', value: '7' },
            { label: 'شهر', value: '30' },
            { label: '3 أشهر', value: '90' },
            { label: 'سنة', value: '365' }
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setPeriod(item.value)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${period === item.value
                  ? 'bg-primary text-white shadow-lg'
                  : 'text-muted-foreground hover:bg-muted'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-muted-foreground font-bold text-sm">إجمالي الطلبات</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-5xl font-black text-foreground">{analytics?.totalQuotes || 0}</p>
            <div className="flex items-center gap-1 text-green-500 font-bold text-sm bg-green-50 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-4 h-4" />
              <span>12%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <MapPin className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-muted-foreground font-bold text-sm">المناطق النشطة</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-5xl font-black text-foreground">{analytics?.uniqueLocations || 0}</p>
            <span className="text-muted-foreground text-sm font-medium">منطقة فرعية</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-muted-foreground font-bold text-sm">متوسط اليومي</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-5xl font-black text-foreground">
              {analytics ? Math.round((analytics.totalQuotes / parseInt(period)) * 10) / 10 : 0}
            </p>
            <span className="text-muted-foreground text-sm font-medium">طلب/يوم</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Main Bar Chart */}
        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-foreground">أفضل المناطق أداءً</h2>
            <div className="p-2 bg-muted rounded-lg">
              <BarChart3 className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.topLocations || []} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="location"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#fff',
                    padding: '12px'
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                  {(analytics?.topLocations || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart / Distribution */}
        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-foreground">توزيع الطلبات</h2>
            <div className="p-2 bg-muted rounded-lg">
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.topLocations || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="location"
                >
                  {(analytics?.topLocations || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {analytics?.topLocations?.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-xs font-bold text-muted-foreground truncate">{item.location}</span>
                <span className="text-xs font-black text-foreground ml-auto">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { BarChart3 } from 'lucide-react'

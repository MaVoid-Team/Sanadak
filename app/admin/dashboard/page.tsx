'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  MapPin,
  Quote,
  ArrowRight,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface DashboardStats {
  totalQuotes: number
  topLocations: Array<{ location: string; count: number }>
  period: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics?period=30')
      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error('[Admin] Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }

  // Mock data for the trend chart
  const trendData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 1100 },
  ]

  const statCards = [
    {
      title: 'إجمالي الطلبات',
      value: stats?.totalQuotes || 0,
      icon: <Quote className="w-8 h-8" />,
      color: 'bg-primary',
      link: '/admin/quotes',
      trend: '+12.5%'
    },
    {
      title: 'المناطق النشطة',
      value: stats?.topLocations?.length || 0,
      icon: <MapPin className="w-8 h-8" />,
      color: 'bg-secondary',
      link: '/admin/sub-locations',
      trend: '+3 مناطق'
    },
    {
      title: 'متوسط الأداء',
      value: '98%',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-indigo-600',
      link: '/admin/analytics',
      trend: 'ممتاز'
    }
  ]

  return (
    <div className="space-y-10 pb-12">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground mb-2">مرحباً بك في سندك</h1>
          <p className="text-muted-foreground font-medium">إليك نظرة سريعة على أداء عملك اليوم</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 rounded-[2rem] border border-border shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Clock className="w-6 h-6" />
          </div>
          <div className="text-right">
            <p className="font-bold text-foreground">تحديث منذ</p>
            <p className="text-xs text-muted-foreground">5 دقائق مضت</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {statCards.map((card, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-[2.5rem] border border-border shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 w-2 h-full ${card.color}`} />
            <div className="flex items-start justify-between mb-8">
              <div className={`p-4 rounded-2xl ${card.color}/10 ${card.color === 'bg-primary' ? 'text-primary' : card.color === 'bg-secondary' ? 'text-secondary' : 'text-indigo-600'
                }`}>
                {card.icon}
              </div>
              <div className="flex items-center gap-1 text-green-500 font-bold text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>{card.trend}</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground font-bold text-sm mb-1 uppercase tracking-wider">{card.title}</p>
              <p className="text-5xl font-black text-foreground mb-6">{card.value}</p>
              <Link href={card.link} className="inline-flex items-center gap-2 text-primary font-black hover:gap-4 transition-all group/link">
                عرض التفاصيل
                <ArrowRight className="w-5 h-5 -rotate-180" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Insights Chart */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-border shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-black text-foreground mb-1">اتجاهات الطلبات</h2>
              <p className="text-muted-foreground text-sm">مقارنة أداء الطلبات خلال الأشهر السبعة الماضية</p>
            </div>
            <div className="px-6 py-2 bg-muted rounded-xl font-bold text-sm">شهرياً</div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                    backgroundColor: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-primary)"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Locations Summary */}
        <div className="bg-white p-10 rounded-[3rem] border border-border shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-foreground">أعلى المناطق</h2>
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
              <MapPin className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-6 flex-1">
            {stats?.topLocations?.slice(0, 5).map((loc, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-foreground group-hover:text-primary transition-colors">{loc.location}</span>
                  <span className="text-sm font-black text-primary">{loc.count} طلب</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(loc.count / (stats.topLocations[0]?.count || 1)) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="bg-primary h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/admin/analytics"
            className="mt-8 py-5 bg-muted hover:bg-primary hover:text-white text-primary font-black rounded-2xl text-center transition-all duration-300"
          >
            تقرير كامل
          </Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Search,
  Clock,
  MessageCircle,
  ChevronDown,
  Filter,
  ClipboardList
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Quote {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  sub_location: string
  items: string
  notes: string
  status: string
  created_at: string
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/quotes')
      const data = await response.json()
      setQuotes(data.quotes || [])
    } catch (err) {
      console.error('[Admin] Error fetching quotes:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredQuotes = quotes.filter(q =>
    q.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    q.sub_location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8 pb-12 font-body text-right" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground mb-2">طلبات النقل</h1>
          <p className="text-muted-foreground font-bold tracking-tight">إدارة طلبات عرض الأسعار الواردة من العملاء</p>
        </div>

        <div className="relative group w-full md:w-96">
          <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="البحث بالاسم أو المنطقة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-6 pr-14 py-4 bg-white border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 hover:border-primary/30 transition-all font-bold shadow-sm"
          />
        </div>
      </div>

      {/* Quick Actions / Filters */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-xl font-bold text-sm text-foreground hover:bg-muted transition-all">
          <Filter className="w-4 h-4" />
          تصفية حسب الحالة
        </button>
        <div className="flex-1" />
        <p className="text-muted-foreground text-sm font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full" />
          إجمالي الطلبات: {filteredQuotes.length}
        </p>
      </div>

      {/* Quotes List */}
      <div className="space-y-4">
        {loading ? (
          <div className="grid gap-4 opacity-50">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-white rounded-3xl animate-pulse border border-border" />
            ))}
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-border shadow-sm">
            <ClipboardList className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-foreground">لا توجد طلبات</h3>
            <p className="text-muted-foreground font-bold">لم يتم تلقي أي طلبات بهذا البحث حالياً.</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredQuotes.map((quote) => (
              <motion.div
                key={quote.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${expandedId === quote.id ? 'ring-2 ring-primary ring-offset-4' : ''
                  }`}
              >
                {/* Summary Bar */}
                <div
                  onClick={() => setExpandedId(expandedId === quote.id ? null : quote.id)}
                  className="p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl bg-muted/50 text-foreground group-hover:bg-primary/10 transition-colors`}>
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-foreground mb-1">
                        {quote.customer_name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-xs font-bold text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {quote.sub_location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDate(quote.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-black rounded-full uppercase tracking-widest">
                      {quote.status === 'pending' ? 'قيد الانتظار' : quote.status}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedId === quote.id ? 180 : 0 }}
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedId === quote.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-muted/20 border-t border-border"
                    >
                      <div className="p-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-foreground uppercase tracking-widest border-r-4 border-primary pr-3">معلومات التواصل</h4>
                          <div className="space-y-3">
                            <a href={`mailto:${quote.customer_email}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-bold">
                              <Mail className="w-4 h-4" />
                              {quote.customer_email}
                            </a>
                            <a href={`tel:${quote.customer_phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors font-bold">
                              <Phone className="w-4 h-4" />
                              {quote.customer_phone}
                            </a>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-sm font-black text-foreground uppercase tracking-widest border-r-4 border-secondary pr-3">تفاصيل النقل</h4>
                          <div className="p-5 bg-white rounded-2xl border border-border">
                            <p className="text-sm font-bold text-foreground leading-relaxed">
                              {quote.items}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-sm font-black text-foreground uppercase tracking-widest border-r-4 border-blue-500 pr-3">إجراءات</h4>
                          <div className="flex flex-col gap-3">
                            <a
                              href={`https://wa.me/${quote.customer_phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-green-500/20"
                            >
                              <MessageCircle className="w-5 h-5" />
                              تواصل عبر واتساب
                            </a>
                            <button className="px-6 py-4 bg-white border border-border text-foreground hover:bg-muted rounded-2xl font-black text-sm transition-all">
                              تحديث حالة الطلب
                            </button>
                          </div>
                        </div>
                      </div>

                      {quote.notes && (
                        <div className="px-8 pb-8">
                          <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                            <p className="text-xs font-black text-amber-600 uppercase mb-2">ملاحظات العميل</p>
                            <p className="text-amber-900/80 font-bold italic">"{quote.notes}"</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

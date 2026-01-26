'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    fetchQuotes()
  }, [router])

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes')
      const data = await response.json()
      setQuotes(data.quotes || [])
    } catch (err) {
      console.error('[v0] Error fetching quotes:', err)
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="sm" className="p-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                الطلبات
              </h1>
              <p className="text-muted-foreground">
                جميع طلبات الحصول على عرض أسعار
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">جاري تحميل البيانات...</p>
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-border">
            <p className="text-muted-foreground">لا توجد طلبات حتى الآن</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Quote Header */}
                <div
                  onClick={() =>
                    setExpandedId(expandedId === quote.id ? null : quote.id)
                  }
                  className="p-6 cursor-pointer hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {quote.customer_name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {quote.sub_location}
                        </div>
                        <div>
                          {formatDate(quote.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {quote.status === 'pending' ? 'معلق' : quote.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote Details */}
                {expandedId === quote.id && (
                  <div className="border-t border-border p-6 bg-muted/20">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          معلومات الاتصال
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <a
                              href={`mailto:${quote.customer_email}`}
                              className="text-primary hover:underline"
                            >
                              {quote.customer_email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <a
                              href={`tel:${quote.customer_phone}`}
                              className="text-primary hover:underline"
                            >
                              {quote.customer_phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          تفاصيل الطلب
                        </h4>
                        <div className="space-y-3 text-sm text-foreground/80">
                          <p>
                            <span className="font-medium block text-foreground mb-1">
                              العناصر:
                            </span>
                            {quote.items}
                          </p>
                          {quote.notes && (
                            <p>
                              <span className="font-medium block text-foreground mb-1">
                                ملاحظات:
                              </span>
                              {quote.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <a
                        href={`https://wa.me/${quote.customer_phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        تواصل عبر واتساب
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

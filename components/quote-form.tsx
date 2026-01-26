'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Mail, Phone, MapPin, ClipboardList, Send } from 'lucide-react'

interface SubLocation {
  id: string
  name: string
}

export default function QuoteForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState<SubLocation[]>([])
  const [loadingLocations, setLoadingLocations] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sub_location: '',
    items: '',
    notes: '',
  })

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/sub-locations')
      const data = await response.json()
      setLocations(data.locations || [])
    } catch (err) {
      console.error('[Admin] Error fetching locations:', err)
    } finally {
      setLoadingLocations(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/thank-you')
      } else {
        alert('حدث خطأ. حاول مرة أخرى.')
      }
    } catch (error) {
      console.error('[Error] Submitting quote:', error)
      alert('خطأ في الاتصال. تأكد من اتصالك بالإنترنت.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="quote" className="w-full py-32 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* Left Side: Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-right space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-wider">
            <Send className="w-4 h-4" />
            تواصل معنا الآن
          </div>

          <h2 className="text-5xl md:text-7xl font-heading font-black text-foreground leading-tight">
            دعنا نخطط <br /> <span className="text-secondary">انتقالك القادم</span>
          </h2>

          <p className="text-xl text-muted-foreground font-medium max-w-xl mr-0 ml-auto">
            املأ النموذج وسيقوم خبراء النقل لدينا بدراسة طلبك وتقديم أدق عرض سعر في الإسكندرية خلال دقائق.
          </p>

          <div className="space-y-6 pt-8">
            <div className="flex items-center gap-6 justify-end">
              <div>
                <p className="font-black text-foreground text-xl">دقة المواعيد</p>
                <p className="text-muted-foreground font-bold">نصل دائماً في الوقت المحدد</p>
              </div>
              <div className="w-16 h-16 rounded-[2rem] bg-muted flex items-center justify-center text-primary group hover:bg-primary hover:text-white transition-all">
                <ClipboardList className="w-8 h-8" />
              </div>
            </div>
            <div className="flex items-center gap-6 justify-end">
              <div>
                <p className="font-black text-foreground text-xl">تواصل مباشر</p>
                <p className="text-muted-foreground font-bold">دعم فني متاح 24/7</p>
              </div>
              <div className="w-16 h-16 rounded-[2rem] bg-muted flex items-center justify-center text-primary group hover:bg-primary hover:text-white transition-all">
                <Phone className="w-8 h-8" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] border border-border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-right text-sm font-black text-foreground/70 mr-1 uppercase tracking-wider">الاسم بالكامل</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 text-right rounded-2xl border border-border focus:outline-none focus:ring-4 focus:ring-primary/10 bg-muted/30 text-foreground font-bold placeholder:text-muted-foreground transition-all"
                  placeholder="أحمد محمد"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-right text-sm font-black text-foreground/70 mr-1 uppercase tracking-wider">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 text-right rounded-2xl border border-border focus:outline-none focus:ring-4 focus:ring-primary/10 bg-muted/30 text-foreground font-bold placeholder:text-muted-foreground transition-all"
                  placeholder="name@company.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-right text-sm font-black text-foreground/70 mr-1 uppercase tracking-wider">رقم المبايل</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-5 text-right rounded-2xl border border-border focus:outline-none focus:ring-4 focus:ring-primary/10 bg-muted/30 text-foreground font-bold placeholder:text-muted-foreground transition-all"
                  placeholder="0123 456 7890"
                  dir="ltr"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-right text-sm font-black text-foreground/70 mr-1 uppercase tracking-wider">المنطقة</label>
                <div className="relative">
                  <select
                    name="sub_location"
                    value={formData.sub_location}
                    onChange={handleChange}
                    required
                    disabled={loadingLocations}
                    className="w-full px-6 py-5 text-right rounded-2xl border border-border focus:outline-none focus:ring-4 focus:ring-primary/10 bg-muted/30 text-foreground font-bold appearance-none transition-all cursor-pointer"
                  >
                    <option value="">{loadingLocations ? 'جاري التحميل...' : 'اختر المنطقة'}</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-right text-sm font-black text-foreground/70 mr-1">ماذا تريد أن تنقل؟</label>
              <textarea
                name="items"
                value={formData.items}
                onChange={handleChange}
                required
                className="w-full px-6 py-5 text-right rounded-2xl border border-border focus:outline-none focus:ring-4 focus:ring-primary/10 bg-muted/30 text-foreground font-bold placeholder:text-muted-foreground transition-all resize-none"
                rows={3}
                placeholder="صف لنا قطع الأثاث الرئيسية..."
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary hover:text-primary text-white font-black py-6 rounded-2xl transition-all duration-500 shadow-2xl shadow-primary/30 text-xl transform hover:-translate-y-1 active:scale-95"
            >
              {loading ? 'جاري المعالجة...' : 'أرسل طلب الاقتباس'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

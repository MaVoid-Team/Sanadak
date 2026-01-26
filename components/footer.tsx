'use client'

import { Phone, MessageCircle, Clock, MapPin, ShieldCheck, ArrowUpLeft } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white py-24 px-4 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -mr-48 -mb-48" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-20 text-right">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="text-4xl font-heading font-black mb-8 tracking-tighter">سندك</h3>
            <p className="text-white/70 mb-8 leading-relaxed font-bold text-lg max-w-xl">
              ثورتنا في عالم نقل العفش بالإسكندرية تعتمد على الاحترافية المطلقة والعناية الفائقة بأدق التفاصيل. نحن لسنا مجرد شركة نقل، نحن شركاؤك في بدايتك الجديدة.
            </p>
            <div className="flex gap-4 justify-end">
              <div className="p-3 bg-white/10 rounded-xl hover:bg-secondary hover:text-primary transition-all cursor-pointer">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="p-3 bg-white/10 rounded-xl hover:bg-secondary hover:text-primary transition-all cursor-pointer">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Zones Column */}
          <div>
            <h4 className="text-xl font-black mb-8 text-secondary uppercase tracking-widest">مناطق التغطية</h4>
            <nav className="grid grid-cols-2 gap-y-4 gap-x-8 text-white/60 font-bold">
              {[
                'سموحة', 'سيدي جابر', 'محطة الرمل', 'ميامي',
                'المنتزه', 'العجمي', 'جليم', 'لوران',
                'باكوس', 'كرموز'
              ].map((zone) => (
                <Link key={zone} href="#" className="hover:text-white transition-colors flex items-center justify-end gap-2 group">
                  {zone}
                  <div className="w-1 h-1 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-xl font-black mb-8 text-secondary uppercase tracking-widest">تواصل سريع</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-4 justify-end">
                <div className="text-right">
                  <p className="text-white/50 text-xs font-bold uppercase">اتصل بنا</p>
                  <p className="font-black text-lg">+20 1234 567 890</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
                  <Phone className="w-6 h-6" />
                </div>
              </div>
              <div className="flex items-center gap-4 justify-end text-right">
                <div>
                  <p className="text-white/50 text-xs font-bold uppercase">ساعات العمل</p>
                  <p className="font-black text-lg">8 ص - 10 م يومياً</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-secondary">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 text-sm font-bold">
            © 2026 سندك للحلول اللوجستية. جميع الحقوق محفوظة.
          </p>

          <div className="flex gap-8 text-sm font-black text-white/60">
            <Link href="#" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="#" className="hover:text-white transition-colors">الشروط والأحكام</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-secondary hover:text-white transition-colors"
            >
              العودة للأعلى
              <ArrowUpLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

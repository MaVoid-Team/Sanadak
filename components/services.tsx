'use client'

import { motion } from 'framer-motion'
import { Truck, Wrench, Package, Zap, Briefcase, Home, ShieldCheck } from 'lucide-react'

const services = [
  {
    icon: Truck,
    title: 'نقل عفش داخل الإسكندرية',
    description: 'نقل آمن لجميع أنواع الأثاث داخل جميع مناطق الإسكندرية بسيارات مجهزة.',
    delay: 0.1,
  },
  {
    icon: Wrench,
    title: 'فك وتركيب الأثاث',
    description: 'فك احترافي وتركيب مضبوط بواسطة فنيين متخصصين لضمان سلامة الأثاث.',
    delay: 0.2,
  },
  {
    icon: Package,
    title: 'تغليف وحماية كليّة',
    description: 'تغليف متعدد الطبقات باستخدام أفضل الخامات العالمية لحماية كاملة.',
    delay: 0.3,
  },
  {
    icon: Zap,
    title: 'نقل الأجهزة الدقيقة',
    description: 'عناية خاصة بالأجهزة الكهربائية والإلكترونية الحساسة أثناء النقل.',
    delay: 0.4,
  },
  {
    icon: Briefcase,
    title: 'حلول الشركات والمكاتب',
    description: 'خدمات نقل مخصصة للشركات تتسم بالسرعة والنظام لتجنب تعطل العمل.',
    delay: 0.5,
  },
  {
    icon: Home,
    title: 'تجهيز المنازل الجديدة',
    description: 'لا نكتفي بالنقل، بل نساعدك في ترتيب أثاثك الجديد بلمسة جمالية.',
    delay: 0.6,
  },
]

export default function Services() {
  return (
    <section id="services" className="w-full py-32 px-4 bg-white relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
        <div className="absolute top-1/4 -left-1/4 w-[50%] h-[50%] bg-primary rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-secondary rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-black mb-6 uppercase tracking-widest"
          >
            <ShieldCheck className="w-4 h-4" />
            الجودة هي أولويتنا
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-heading font-black text-foreground mb-8 leading-tight transform-gpu"
          >
            خدمات <span className="text-primary">استثنائية</span> <br className="hidden md:block" /> تناسب ذوقك الرفيع
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
          >
            نحن لا ننقل الأثاث فحسب، بل نبني جسوراً من الثقة عبر تقديم حلول لوجستية متكاملة تضمن راحتك وسلامة ممتلكاتك.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: service.delay }}
                whileHover={{ y: -15 }}
                className="group p-10 bg-white border border-border rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/20 cursor-default"
              >
                <div className="mb-10 inline-flex p-6 bg-primary/5 rounded-[2rem] group-hover:bg-primary group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                  <Icon className="w-10 h-10 text-primary group-hover:text-white" />
                </div>

                <h3 className="text-2xl font-heading font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed font-bold tracking-tight">
                  {service.description}
                </p>

                <div className="mt-8 pt-8 border-t border-muted/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-sm font-black text-primary uppercase">اكتشف المزيد</span>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

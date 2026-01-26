'use client'

import { motion } from 'framer-motion'
import { Rocket, CheckCircle2, Truck, ClipboardCheck } from 'lucide-react'

const steps = [
  {
    icon: <ClipboardCheck className="w-10 h-10" />,
    title: 'طلب الخدمة',
    description: 'املأ بياناتك أو تواصل معنا عبر واتساب للمعاينة وتحديد المتطلبات.',
    color: 'bg-blue-500'
  },
  {
    icon: <Rocket className="w-10 h-10" />,
    title: 'التخطيط وتأكيد الحجز',
    description: 'نحدد معك الموعد المناسب ونؤكد السعر النهائي ونجهز طاقم العمل والمعدات.',
    color: 'bg-amber-500'
  },
  {
    icon: <Truck className="w-10 h-10" />,
    title: 'مرحلة النقل والتغليف',
    description: 'فريقنا المحترف يصل في الموعد ليبدأ عمليات الفك والتغليف المتطور والنقل.',
    color: 'bg-emerald-500'
  },
  {
    icon: <CheckCircle2 className="w-10 h-10" />,
    title: 'التسليم والترتيب',
    description: 'تفريغ العفش في منزلك الجديد وإعادة تركيبه وترتيبه بعناية فائقة.',
    color: 'bg-slate-700'
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-32 px-4 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24" dir="rtl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-heading font-black text-foreground mb-8 leading-tight"
          >
            رحلة انتقالك <span className="text-primary italic">بلمسة سندك</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto"
          >
            نتبع منهجية عمل دقيقة تضمن لك راحة البال من اللحظة الأولى وحتى استلامك للعفش في منزلك الجديد.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -15 }}
              className="bg-white p-10 rounded-[3rem] border border-border shadow-sm hover:shadow-2xl transition-all duration-500 relative flex flex-col group overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 p-12 text-8xl font-black text-primary/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors">
                {index + 1}
              </div>

              <div className={`w-20 h-20 rounded-[2rem] ${step.color} text-white flex items-center justify-center mb-8 shadow-xl shadow-${step.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                {step.icon}
              </div>

              <h3 className="text-2xl font-black text-foreground mb-4 relative z-10 group-hover:text-primary transition-colors">
                {step.title}
              </h3>

              <p className="text-muted-foreground text-lg leading-relaxed font-bold relative z-10">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

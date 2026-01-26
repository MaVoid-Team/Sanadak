'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ShieldCheck, Heart } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'أحمد محمود',
    location: 'سموحة، الإسكندرية',
    rating: 5,
    text: 'خدمة استثنائية لم أتوقعها. التزام تام بالمواعيد واحترافية عالية جداً في التغليف. العفش وصل سليم 100%.',
    avatar: 'https://i.pravatar.cc/150?u=ahmed',
    role: 'صاحب فيلا'
  },
  {
    name: 'د. منى زكي',
    location: 'سيدي جابر، الإسكندرية',
    rating: 5,
    text: 'فريق عمل في غاية الاحترام والتعامل الراقي. فكوا وتركبوا غرف النوم والنجف بمهارة فائقة. تجربة مريحة جداً.',
    avatar: 'https://i.pravatar.cc/150?u=mona',
    role: 'طبيبة استشارية'
  },
  {
    name: 'المهندس كريم فوزي',
    location: 'ميامي، الإسكندرية',
    rating: 5,
    text: 'نقلت شقتي بالكامل مع سندك، وكانوا على قدر المسؤولية. الاهتمام بكل قطعة صغيرة كان مبهراً. أنصح بهم بشدة.',
    avatar: 'https://i.pravatar.cc/150?u=karim',
    role: 'مدير تنفيذي'
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-32 px-4 bg-[#F8FAFC] overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-right">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="md:w-2/3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black mb-6 uppercase tracking-wider"
            >
              <Heart className="w-4 h-4 fill-primary" />
              قصص نجاحنا
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-heading font-black text-foreground transform-gpu"
            >
              كلمات تعبر عن <br /> <span className="text-secondary">ثقة عملاءنا</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-3xl border border-border shadow-xl flex items-center gap-6"
          >
            <div className="text-right">
              <p className="text-2xl font-black text-foreground">4.9/5</p>
              <p className="text-sm text-muted-foreground font-bold">متوسط تقييماتنا</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-6 h-6 fill-secondary text-secondary" />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] border border-border shadow-sm hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full group"
            >
              <Quote className="absolute top-10 right-10 w-20 h-20 text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none" />

              <div className="flex gap-1 mb-8">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-foreground text-xl leading-[1.8] font-bold mb-10 relative z-10 italic">
                "{testimonial.text}"
              </p>

              <div className="mt-auto flex items-center gap-4 border-t border-muted pt-8">
                <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden border-2 border-primary/10 group-hover:border-primary/30 transition-all">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-primary font-bold">{testimonial.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

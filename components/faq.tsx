'use client'

import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'هل الخدمة داخل الإسكندرية فقط؟',
    answer: 'أيوه، إحنا متخصصين في نقل العفش داخل الإسكندرية فقط وفي جميع مناطقها، لضمان أعلى جودة وأسرع استجابة لعملائنا في محيطنا.',
  },
  {
    question: 'هل بتوفروا تغليف؟',
    answer: 'بكل تأكيد، بنوفر تغليف كامل ومتعدد الطبقات (بابل راب، كرتون، استرتش) لحماية العفش من أي خدوش أو صدمات أثناء النقل.',
  },
  {
    question: 'هل في فك وتركيب؟',
    answer: 'نعم، فريقنا بيضم فنيين نجارة وتكييف متخصصين لفك وتركيب غرف النوم، المطابخ، والتكييفات باحترافية تامة.',
  },
  {
    question: 'إزاي بيتحدد السعر؟',
    answer: 'السعر بيتحسب بناءً على عدة عوامل: (عدد الغرف، الدور، توفر أسانسير، مسافة النقل، وخدمات التغليف). بنقدم عرض سعر دقيق بعد المعاينة أو معرفة التفاصيل.',
  },
  {
    question: 'هل في معاينة قبل النقل؟',
    answer: 'ممكن، بنقدم خدمة المعاينة المجانية في بعض الحالات للتأكد من حجم المهمة وتوفير المعدات والعمالة المناسبة.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="w-full py-32 px-4 bg-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-20 text-right" dir="rtl">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            مركز المساعدة
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-heading font-black text-foreground mb-6"
          >
            أسئلة <span className="text-secondary italic">متكررة</span>
          </motion.h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl">
            كل ما تود معرفته عن خدمات نقل العفش في مكان واحد.
          </p>
        </div>

        <div className="space-y-6" dir="rtl">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full p-8 rounded-[2.5rem] border transition-all duration-500 text-right flex items-center justify-between gap-6 ${openIndex === index
                    ? 'bg-primary border-primary shadow-2xl shadow-primary/20'
                    : 'bg-muted/30 border-border hover:border-primary/30 hover:bg-white'
                  }`}
              >
                <span className={`text-xl md:text-2xl font-black transition-colors ${openIndex === index ? 'text-white' : 'text-foreground'
                  }`}>
                  {faq.question}
                </span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIndex === index ? 'bg-secondary text-primary rotate-180' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
                  }`}>
                  <ChevronDown className="w-6 h-6" />
                </div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="p-10 text-lg md:text-xl font-bold text-muted-foreground leading-relaxed text-right bg-white rounded-b-[2.5rem] border-x border-b border-border -mt-8 pt-16">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'هل الخدمة داخل الإسكندرية فقط؟',
    answer: 'أيوه، إحنا متخصصين في نقل العفش داخل الإسكندرية فقط وفي جميع مناطقها.',
  },
  {
    question: 'هل بتوفروا تغليف؟',
    answer: 'أيوه، بنوفر تغليف كامل لحماية العفش أثناء النقل باستخدام مواد عالية الجودة وآمنة جدًا.',
  },
  {
    question: 'هل في فك وتركيب؟',
    answer: 'نعم، فك وتركيب جميع أنواع الأثاث بواسطة فريق متخصص ومدرب على أعلى مستويات الاحترافية.',
  },
  {
    question: 'إزاي بيتحدد السعر؟',
    answer: 'حسب المنطقة، كمية العفش، وطبيعة النقل. نقدم عرض سعر مجاني وشامل بعد معرفة كل التفاصيل.',
  },
  {
    question: 'هل في معاينة قبل النقل؟',
    answer: 'ممكن حسب الحالة، أو من خلال التفاصيل اللي بتبعتها عبر الفورم أو الواتساب، وبنقدم تقدير دقيق.',
  },
  {
    question: 'لو حصل تلف؟',
    answer: 'بنحرص على الحماية الكاملة، وأي ملاحظة بتتعالج فورًا مع ضمان رضا العميل 100%.',
  },
  {
    question: 'هل في نقل في نفس اليوم؟',
    answer: 'حسب التوافر والطاقة، تواصل معانا وهنأكد لك الموعد بسرعة حسب الإمكانيات المتاحة.',
  },
  {
    question: 'إيه المطلوب قبل الموعد؟',
    answer: 'بس تكون محدد التفاصيل والموعد المناسب ليك، والباقي احنا نتولاه بكل احترافية.',
  },
]

export default function FAQ() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="faq" className="w-full py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-muted-foreground">
            أجوبة على أكثر الأسئلة التي يسألها عملائنا حول خدماتنا
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="group"
              style={{
                animation: isLoaded ? `fadeInUp 0.6s ease-out ${0.05 * index}s both` : 'none',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-right flex items-center justify-between gap-4"
              >
                <span className="text-lg font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="p-6 bg-muted/30 border border-t-0 border-border rounded-b-2xl -mt-1 animate-slideInDown">
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

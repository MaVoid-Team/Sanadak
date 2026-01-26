'use client'

import { useState, useEffect } from 'react'

const steps = [
  {
    number: '١',
    title: 'تبعت طلبك',
    description: 'املأ بيانات النقل أو ابعتلنا على واتساب.',
  },
  {
    number: '٢',
    title: 'نؤكد السعر والميعاد',
    description: 'بنراجع التفاصيل ونحدد السعر النهائي قبل التنفيذ.',
  },
  {
    number: '٣',
    title: 'تغليف ونقل بأمان',
    description: 'فريقنا بيغلف وينقل العفش باحتراف تام.',
  },
  {
    number: '٤',
    title: 'تسليم وترتيب',
    description: 'نوصل العفش ونركّبه حسب الاتفاق.',
  },
]

export default function HowItWorks() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="how-it-works" className="w-full py-24 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            إزاي بننقل عفشك؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            عملية بسيطة وسهلة من البداية لحد النهاية، مع متابعة شاملة
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                animation: isLoaded ? `fadeInUp 0.6s ease-out ${0.1 * index}s both` : 'none',
              }}
            >
              <div className="p-8 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-500 h-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center text-3xl font-heading font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {step.number}
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-primary/20 text-3xl font-light">
                  ←
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

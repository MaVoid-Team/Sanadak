import { Button } from './ui/button'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-secondary/10 px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <div className="inline-block bg-secondary text-foreground px-4 py-1.5 rounded-full text-sm font-medium">
            خدمات نقل عفش موثوقة في الإسكندرية
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
          نقل عفش داخل الإسكندرية… بأمان ومن غير قلق
        </h1>

        <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
          بننقل ونغلف ونركّب عفشك باحتراف، في معاد مظبوط، وبفريق مدرّب يهمه يوصل كل قطعة سليمة.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-10 text-right">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-sm text-foreground/70">عمالة مدرّبة</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-sm text-foreground/70">تغليف وحماية</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-sm text-foreground/70">التزام بالمواعيد</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-sm text-foreground/70">تسليم آمن</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#quote-form">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              احصل على عرض سعر مجاني
            </Button>
          </a>
          <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 bg-transparent">
              تواصل عبر واتساب
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

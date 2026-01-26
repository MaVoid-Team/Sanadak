import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ThankYou() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          تم استلام طلبك بنجاح ✓
        </h1>

        <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
          شكرًا لتواصلك معانا. فريقنا هيراجع الطلب وهيتواصل معاك قريبًا لتأكيد التفاصيل والسعر.
        </p>

        <div className="bg-secondary/10 rounded-lg p-6 mb-8 text-right">
          <h3 className="font-semibold text-foreground mb-3">الخطوات القادمة:</h3>
          <ul className="text-foreground/80 space-y-2 text-sm">
            <li>✓ سنراجع طلبك في أسرع وقت</li>
            <li>✓ سيتواصل معك فريقنا عبر الهاتف أو واتساب</li>
            <li>✓ سنحدد لك السعر النهائي والموعد المناسب</li>
            <li>✓ تسليم آمن وترتيب احترافي</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a href="https://wa.me/201234567890" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              تواصل فورًا عبر واتساب
            </Button>
          </a>
          <Link href="/">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 bg-transparent">
              العودة للرئيسية
            </Button>
          </Link>
        </div>

        <p className="text-foreground/60 text-sm">
          في حالة وجود أي استفسار، تواصل معنا على: <br />
          <span className="font-semibold text-foreground">+20 1234 567 890</span>
        </p>
      </div>
    </main>
  )
}

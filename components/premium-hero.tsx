'use client'

import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, CheckCircle2, ShieldCheck, Clock, Truck } from 'lucide-react'

export default function PremiumHero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    } as any, // Cast to any to bypass strict type check for transition in variants if needed
  }

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    } as any,
  }

  const trustBadges = [
    { icon: <ShieldCheck className="w-5 h-5" />, text: 'عمالة مدرّبة محترفة' },
    { icon: <Truck className="w-5 h-5" />, text: 'تغليف وحماية كاملة' },
    { icon: <Clock className="w-5 h-5" />, text: 'التزام بالمواعيد' },
    { icon: <CheckCircle2 className="w-5 h-5" />, text: 'الإسكندرية فقط' },
  ]

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-secondary/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-right relative z-10"
            style={{ isolation: 'isolate' }}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              الشركة رقم #1 في الإسكندرية
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-8xl font-heading font-extrabold text-foreground leading-[1.1] transform-gpu"
              >
                سندك <br />
                <span className="text-secondary">فخامة النقل</span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-muted-foreground font-medium max-w-xl mr-0 ml-auto"
              >
                نقل عفش آمن ومحترف… لأننا نعتني بكل تفاصيل منزلك كما لو كانت ملكنا.
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 py-6"
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  variants={badgeVariants}
                  whileHover={{ backgroundColor: 'oklch(var(--primary) / 0.05)' }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border shadow-sm hover:border-primary/30 transition-colors duration-300 group transform-gpu"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {badge.icon}
                  </div>
                  <span className="font-bold text-foreground text-sm md:text-base leading-none subpixel-antialiased">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row-reverse gap-5 pt-4"
            >
              <Link
                href="#quote"
                className="px-10 py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-primary/40 transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
              >
                احصل على عرض سعر مجاني
                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform duration-500" />
              </Link>
              <a
                href="https://wa.me/201234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 border-2 border-primary/20 text-primary rounded-2xl font-bold text-lg hover:bg-primary hover:text-white transition-all duration-500 flex items-center justify-center gap-3 group"
              >
                تواصل عبر واتساب
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.96 1.387c-1.562.92-2.846 2.296-3.612 3.839-1.546 3.196-1.172 6.916.959 9.306 1.284 1.413 3.054 2.29 5.061 2.29h.004c1.959 0 3.706-.869 4.993-2.347 1.309-1.505 2.087-3.506 2.087-5.574 0-1.959-.754-3.804-2.129-5.187-1.383-1.398-3.222-2.166-5.195-2.166zm6.597-3.807c-1.816-.896-3.814-1.376-5.881-1.376-5.516 0-10 4.484-10 10s4.484 10 10 10c2.067 0 4.065-.48 5.881-1.376C22.207 20.498 24 16.75 24 12s-1.793-8.498-4.906-11.388z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl transform -rotate-2" />
            <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] group">
              <Image
                src="/hero-premium.png"
                alt="فريق نقل عفش احترافي في الإسكندرية"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">ضمان سلامة كامل</p>
                    <p className="text-xs text-muted-foreground">تغطية شاملة لكل قطعة</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

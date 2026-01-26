import Navbar from '@/components/navbar'
import PremiumHero from '@/components/premium-hero'
import Services from '@/components/services'
import HowItWorks from '@/components/how-it-works'
import Testimonials from '@/components/testimonials'
import FAQ from '@/components/faq'
import QuoteForm from '@/components/quote-form'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <PremiumHero />
        <Services />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <QuoteForm />
        <Footer />
      </main>
    </>
  )
}

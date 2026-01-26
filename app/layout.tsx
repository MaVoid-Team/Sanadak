import React from "react"
import type { Metadata } from 'next'
import { Almarai, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const almarai = Almarai({ subsets: ["arabic"], variable: '--font-heading', weight: ['400', '700', '800'] })
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-body', weight: ['300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'سندك | نقل عفش في الإسكندرية',
  description: 'خدمات نقل عفش احترافية وآمنة في الإسكندرية مع تغليف كامل وفك وتركيب',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#F5F1EB',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${almarai.variable} ${montserrat.variable} scroll-smooth`}>
      <body className={`font-body antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

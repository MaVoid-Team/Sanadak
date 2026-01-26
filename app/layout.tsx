'use client'

import React from "react"
import type { Metadata } from 'next'
import { Almarai, Montserrat } from 'next/font/google'
import './globals.css'

const almarai = Almarai({ subsets: ["arabic"], variable: '--font-heading', weight: ['400', '700', '800'] })
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-body', weight: ['300', '400', '500', '600', '700', '800', '900'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${almarai.variable} ${montserrat.variable} scroll-smooth`}>
      <body className={`font-body antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  )
}

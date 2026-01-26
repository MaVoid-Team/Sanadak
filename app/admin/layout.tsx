'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    LogOut,
    BarChart3,
    MapPin,
    Quote,
    LayoutDashboard,
    Menu,
    X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('admin_token')
        if (!token && pathname !== '/admin/login') {
            router.push('/admin/login')
        }
    }, [pathname, router])

    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_token')
        router.push('/admin/login')
    }

    const menuItems = [
        { name: 'لوحة التحكم', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'الطلبات', href: '/admin/quotes', icon: <Quote className="w-5 h-5" /> },
        { name: 'التحليلات', href: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
        { name: 'المناطق الفرعية', href: '/admin/sub-locations', icon: <MapPin className="w-5 h-5" /> },
    ]

    return (
        <div className="flex h-screen bg-muted/30 overflow-hidden font-body" dir="rtl">
            {/* Sidebar */}
            <AnimatePresence mode="wait">
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0 }}
                        className="w-72 bg-primary text-white flex flex-col shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="p-8">
                            <Link href="/" className="flex items-center gap-2 mb-10">
                                <span className="text-3xl font-black tracking-tighter">سندك</span>
                                <span className="px-2 py-0.5 bg-secondary text-primary text-[10px] font-bold rounded-full">ADMIN</span>
                            </Link>

                            <nav className="space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${pathname === item.href
                                                ? 'bg-secondary text-primary font-bold'
                                                : 'text-white/70 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <span className={`transition-transform duration-300 group-hover:scale-110 ${pathname === item.href ? 'text-primary' : ''}`}>
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="mt-auto p-8 border-t border-white/10">
                            <Button
                                onClick={handleLogout}
                                variant="ghost"
                                className="w-full flex items-center justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl py-6"
                            >
                                <LogOut className="w-5 h-5" />
                                تسجيل الخروج
                            </Button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-border flex items-center justify-between px-8 z-40">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                    >
                        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="text-left md:text-right hidden sm:block">
                            <p className="font-bold text-foreground">مدير النظام</p>
                            <p className="text-xs text-muted-foreground">مرحباً بك مجدداً</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Scrollable Area */}
                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    )
}

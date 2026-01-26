'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Trash2, Edit2, Check, X, MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface SubLocation {
  id: string
  name: string
}

export default function SubLocationsPage() {
  const [locations, setLocations] = useState<SubLocation[]>([])
  const [newLocation, setNewLocation] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/sub-locations')
      const data = await response.json()
      setLocations(data.locations || [])
    } catch (err) {
      setError('خطأ في تحميل المناطق')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLocation.trim()) return

    try {
      const response = await fetch('/api/sub-locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newLocation }),
      })

      const data = await response.json()
      if (response.ok) {
        setLocations([...locations, data.location])
        setNewLocation('')
      }
    } catch (err) {
      setError('خطأ في إضافة المنطقة')
    }
  }

  const handleEdit = async (id: string) => {
    if (!editingName.trim()) return

    try {
      const response = await fetch('/api/sub-locations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editingName }),
      })

      const data = await response.json()
      if (response.ok) {
        setLocations(
          locations.map((loc) => (loc.id === id ? data.location : loc))
        )
        setEditingId(null)
        setEditingName('')
      }
    } catch (err) {
      setError('خطأ في تحديث المنطقة')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه المنطقة؟')) return

    try {
      const response = await fetch(`/api/sub-locations?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setLocations(locations.filter((loc) => loc.id !== id))
      }
    } catch (err) {
      setError('خطأ في حذف المنطقة')
    }
  }

  const filteredLocations = locations.filter(loc =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground mb-2">إدارة المناطق</h1>
          <p className="text-muted-foreground">إضافة وتعديل وحذف المناطق الفرعية في الإسكندرية</p>
        </div>

        <div className="relative group w-full md:w-96">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="بحث عن منطقة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-12 py-4 bg-white border border-border rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 hover:border-primary/30 transition-all text-sm font-bold shadow-sm"
          />
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-2xl flex items-center gap-3"
        >
          <X className="w-5 h-5" />
          <span className="font-bold">{error}</span>
        </motion.div>
      )}

      {/* Add New Location Card */}
      <div className="bg-primary p-8 rounded-[2rem] shadow-2xl shadow-primary/20 relative overflow-hidden group">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
        <div className="relative">
          <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
            <Plus className="w-8 h-8 p-1 bg-white/20 rounded-lg" />
            إضافة منطقة جديدة
          </h2>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="اكتب اسم المنطقة هنا..."
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-4 focus:ring-white/20 focus:bg-white/20 transition-all text-lg font-bold"
            />
            <Button
              type="submit"
              disabled={!newLocation.trim()}
              className="px-8 py-4 bg-secondary text-primary hover:bg-white hover:text-primary transition-all duration-500 rounded-2xl text-lg font-black shadow-xl shadow-black/20"
            >
              إضافة الآن
            </Button>
          </form>
        </div>
      </div>

      {/* Locations Grid/Table */}
      <div className="bg-white rounded-[2rem] border border-border shadow-sm overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-8 py-6 text-sm font-black text-muted-foreground uppercase tracking-wider">المنطقة</th>
                <th className="px-8 py-6 text-sm font-black text-muted-foreground uppercase tracking-wider">الحالة</th>
                <th className="px-8 py-6 text-sm font-black text-muted-foreground uppercase tracking-wider">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {filteredLocations.map((location) => (
                  <motion.tr
                    key={location.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="hover:bg-muted/20 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      {editingId === location.id ? (
                        <div className="relative">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="w-full px-4 py-3 bg-muted border border-primary/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 font-bold"
                            autoFocus
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <span className="text-lg font-bold text-foreground">{location.name}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-black rounded-full uppercase">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        نشط
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-3">
                        {editingId === location.id ? (
                          <>
                            <button
                              onClick={() => handleEdit(location.id)}
                              className="p-3 bg-primary text-white hover:bg-primary/90 rounded-xl transition-all shadow-lg shadow-primary/20"
                            >
                              <Check className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-3 bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-white rounded-xl transition-all"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditingId(location.id)
                                setEditingName(location.name)
                              }}
                              className="p-3 bg-muted text-primary hover:bg-primary hover:text-white rounded-xl transition-all group-hover:shadow-md"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDelete(location.id)}
                              className="p-3 bg-muted text-destructive hover:bg-destructive hover:text-white rounded-xl transition-all group-hover:shadow-md"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {(filteredLocations.length === 0 && !loading) && (
          <div className="text-center py-20 px-8">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-12 h-12 text-muted-foreground opacity-30" />
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2">لا توجد مناطق</h3>
            <p className="text-muted-foreground">لم يتم العثور على أي مناطق تطابق بحثك أو لم يتم إضافة أي مناطق بعد.</p>
          </div>
        )}
      </div>
    </div>
  )
}

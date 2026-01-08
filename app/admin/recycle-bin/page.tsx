'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'

export default function RecycleBinPage() {
  const router = useRouter()

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    if (mode !== 'admin') router.push('/login')
  }, [router])

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">🗑️ Recycle Bin</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-center py-8">
            Tidak ada data yang dihapus
          </p>
          <p className="text-sm text-gray-400 text-center">
            Data yang dihapus akan muncul di sini dan dapat dipulihkan atau dihapus permanen
          </p>
        </div>
      </main>
    </div>
  )
}

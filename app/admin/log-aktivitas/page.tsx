'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { dummyLogAktivitas } from '@/lib/dummyData'

export default function LogAktivitasPage() {
  const router = useRouter()
  const [data, setData] = useState(dummyLogAktivitas)

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    if (mode !== 'admin') router.push('/login')
  }, [router])

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📋 Log Aktivitas</h1>
          <div className="flex gap-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              📊 Export Excel
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
              📄 Export PDF
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#2c3e50] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm">No</th>
                <th className="px-4 py-3 text-left text-sm">Tipe User</th>
                <th className="px-4 py-3 text-left text-sm">Nama User</th>
                <th className="px-4 py-3 text-left text-sm">Aktivitas</th>
                <th className="px-4 py-3 text-left text-sm">Detail</th>
                <th className="px-4 py-3 text-left text-sm">Waktu</th>
              </tr>
            </thead>
            <tbody>
              {data.map((log, index) => (
                <tr key={log.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      log.user_type === 'admin' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {log.user_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{log.user_name}</td>
                  <td className="px-4 py-3 text-sm">{log.aktivitas}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{log.detail || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(log.created_at!).toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

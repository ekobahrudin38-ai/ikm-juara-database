'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { dummyIKMBinaan, dummyHKIMerek, dummySertifikatHalal, dummyTKDNIK, dummySIINas, dummyUjiNilaiGizi, dummyKurasiProduk, dummyPelatihan, dummyLogAktivitas } from '@/lib/dummyData'

export default function AdminDashboard() {
  const router = useRouter()
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    const name = localStorage.getItem('userName')
    if (mode !== 'admin') {
      router.push('/login')
    } else {
      setUserName(name || 'Admin')
    }
  }, [router])

  const stats = {
    totalIKM: dummyIKMBinaan.filter(d => !d.deleted_at).length,
    totalHKI: dummyHKIMerek.filter(d => !d.deleted_at).length,
    totalHalal: dummySertifikatHalal.filter(d => !d.deleted_at).length,
    totalTKDN: dummyTKDNIK.filter(d => !d.deleted_at).length,
    totalSIINas: dummySIINas.filter(d => !d.deleted_at).length,
    totalGizi: dummyUjiNilaiGizi.filter(d => !d.deleted_at).length,
    totalKurasi: dummyKurasiProduk.filter(d => !d.deleted_at).length,
    totalPelatihan: dummyPelatihan.filter(d => !d.deleted_at).length,
  }

  const recentActivities = dummyLogAktivitas.slice(0, 5)

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Selamat datang, {userName}</span>
          </div>
        </div>

        {/* IKM Binaan */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">📊 Data IKM Binaan</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm mb-1">Total IKM Binaan</h3>
                <p className="text-4xl font-bold text-blue-600">{stats.totalIKM}</p>
              </div>
              <div className="text-5xl">🏢</div>
            </div>
          </div>
        </div>

        {/* Layanan IKM JUARA */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">🎯 Layanan IKM JUARA</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-sm font-medium">HKI Merek</h3>
                <span className="text-2xl">🏆</span>
              </div>
              <p className="text-3xl font-bold text-green-600">{stats.totalHKI}</p>
              <p className="text-xs text-gray-500 mt-1">Pendaftaran HKI Merek</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-sm font-medium">Sertifikat Halal</h3>
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-3xl font-bold text-purple-600">{stats.totalHalal}</p>
              <p className="text-xs text-gray-500 mt-1">Pendaftaran Sertifikat Halal</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-sm font-medium">TKDN IK</h3>
                <span className="text-2xl">📜</span>
              </div>
              <p className="text-3xl font-bold text-indigo-600">{stats.totalTKDN}</p>
              <p className="text-xs text-gray-500 mt-1">Pendaftaran TKDN IK</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-sm font-medium">SIINas</h3>
                <span className="text-2xl">🌐</span>
              </div>
              <p className="text-3xl font-bold text-cyan-600">{stats.totalSIINas}</p>
              <p className="text-xs text-gray-500 mt-1">Pendaftaran & Pendampingan SIINas</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-sm font-medium">Uji Nilai Gizi</h3>
                <span className="text-2xl">🧪</span>
              </div>
              <p className="text-3xl font-bold text-orange-600">{stats.totalGizi}</p>
              <p className="text-xs text-gray-500 mt-1">Pendaftaran Uji Nilai Gizi</p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-sm font-medium">Kurasi Produk</h3>
                <span className="text-2xl">⭐</span>
              </div>
              <p className="text-3xl font-bold text-pink-600">{stats.totalKurasi}</p>
              <p className="text-xs text-gray-500 mt-1">Pendaftaran Kurasi Produk</p>
            </div>
          </div>
        </div>

        {/* Pelatihan Pemberdayaan Industri */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">🎓 Pelatihan Pemberdayaan Industri</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-600 text-sm mb-1">Total Pelatihan</h3>
                <p className="text-4xl font-bold text-teal-600">{stats.totalPelatihan}</p>
              </div>
              <div className="text-5xl">🎓</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Aktivitas Terbaru</h2>
          <div className="space-y-3">
            {recentActivities.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                <span className="text-2xl">
                  {log.user_type === 'admin' ? '👤' : '👥'}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{log.user_name}</p>
                  <p className="text-sm text-gray-600">{log.aktivitas}</p>
                  {log.detail && (
                    <p className="text-xs text-gray-500 mt-1">{log.detail}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(log.created_at!).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

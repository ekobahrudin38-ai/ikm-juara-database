'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'admin' | 'pengguna' | null>(null)
  const [showBukuTamu, setShowBukuTamu] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [bukuTamu, setBukuTamu] = useState({
    nama_lengkap: '',
    alamat: '',
    nomor_hp: ''
  })

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === 'admin123') {
      localStorage.setItem('userMode', 'admin')
      localStorage.setItem('userName', 'Admin IKM')
      router.push('/admin/dashboard')
    } else {
      alert('Password salah!')
    }
  }

  const handlePenggunaClick = () => {
    setMode('pengguna')
    setShowBukuTamu(true)
  }

  const handleBukuTamuSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (bukuTamu.nama_lengkap && bukuTamu.alamat && bukuTamu.nomor_hp) {
      localStorage.setItem('userMode', 'pengguna')
      localStorage.setItem('userName', bukuTamu.nama_lengkap)
      localStorage.setItem('bukuTamu', JSON.stringify(bukuTamu))
      router.push('/pengguna/pencarian')
    } else {
      alert('Mohon lengkapi semua data!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Database IKM JUARA
          </h1>
          <p className="text-gray-600">DisnakerKUKM Kota Madiun</p>
        </div>

        {!mode && (
          <div className="space-y-4">
            <button
              onClick={() => setMode('admin')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Login sebagai Admin
            </button>
            <button
              onClick={handlePenggunaClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Login sebagai Pengguna
            </button>
          </div>
        )}

        {mode === 'admin' && !showBukuTamu && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">
                Password Admin
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Masukkan password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => setMode(null)}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
            >
              Kembali
            </button>
          </form>
        )}

        {showBukuTamu && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Buku Tamu
            </h2>
            <form onSubmit={handleBukuTamuSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={bukuTamu.nama_lengkap}
                  onChange={(e) => setBukuTamu({...bukuTamu, nama_lengkap: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Alamat Lengkap</label>
                <textarea
                  value={bukuTamu.alamat}
                  onChange={(e) => setBukuTamu({...bukuTamu, alamat: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Masukkan alamat lengkap"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nomor HP</label>
                <input
                  type="tel"
                  value={bukuTamu.nomor_hp}
                  onChange={(e) => setBukuTamu({...bukuTamu, nomor_hp: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Masukkan nomor HP"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Simpan & Masuk
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode(null)
                  setShowBukuTamu(false)
                }}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Kembali
              </button>
            </form>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Password Admin Demo: admin123</p>
        </div>
      </div>
    </div>
  )
}

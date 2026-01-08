'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { dummyIKMBinaan, dummyHKIMerek, dummySertifikatHalal, dummyTKDNIK, dummySIINas, dummyUjiNilaiGizi, dummyKurasiProduk } from '@/lib/dummyData'

export default function PenggunaPencarianPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    const name = localStorage.getItem('userName')
    if (mode !== 'pengguna') {
      router.push('/login')
    } else {
      setUserName(name || 'Pengguna')
    }
  }, [router])

  const handleSearch = () => {
    const ikm = dummyIKMBinaan.find(
      d => d.nib === searchKey || d.nik === searchKey || d.nama_lengkap.toLowerCase().includes(searchKey.toLowerCase())
    )
    
    if (ikm) {
      setResult({
        ikm,
        hki: dummyHKIMerek.filter(h => h.ikm_binaan_id === ikm.id && !h.deleted_at),
        halal: dummySertifikatHalal.filter(h => h.ikm_binaan_id === ikm.id && !h.deleted_at),
        tkdn: dummyTKDNIK.filter(t => t.ikm_binaan_id === ikm.id && !t.deleted_at),
        siinas: dummySIINas.filter(s => s.ikm_binaan_id === ikm.id && !s.deleted_at),
        gizi: dummyUjiNilaiGizi.filter(g => g.ikm_binaan_id === ikm.id && !g.deleted_at),
        kurasi: dummyKurasiProduk.filter(k => k.ikm_binaan_id === ikm.id && !k.deleted_at),
      })
    } else {
      alert('Data tidak ditemukan!')
      setResult(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userMode')
    localStorage.removeItem('userName')
    localStorage.removeItem('bukuTamu')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#2c3e50] text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Database IKM JUARA</h1>
            <p className="text-sm text-gray-300">DisnakerKUKM Kota Madiun</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-300">Selamat datang,</p>
              <p className="font-semibold">{userName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🔍 Pencarian Data IKM Binaan
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Masukkan NIB, NIK, atau Nama Lengkap untuk melihat data Anda
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan NIB (13 digit), NIK (16 digit), atau Nama Lengkap"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Cari Data
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">📋 Data IKM Binaan</h2>
              <div className="grid grid-cols-2 gap-4 bg-white bg-opacity-20 rounded p-4">
                <div>
                  <p className="text-sm opacity-90">NIB</p>
                  <p className="font-semibold text-lg">{result.ikm.nib}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">NIK</p>
                  <p className="font-semibold text-lg">{result.ikm.nik}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Nama Lengkap</p>
                  <p className="font-semibold text-lg">{result.ikm.nama_lengkap}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Nama Usaha</p>
                  <p className="font-semibold text-lg">{result.ikm.nama_usaha}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm opacity-90">Alamat Lengkap</p>
                  <p className="font-semibold">{result.ikm.alamat_lengkap}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Nomor HP</p>
                  <p className="font-semibold">{result.ikm.nomor_hp}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-green-600 flex items-center gap-2">
                  🏆 HKI Merek
                </h3>
                {result.hki.length > 0 ? (
                  <div className="space-y-3">
                    {result.hki.map((h: any) => (
                      <div key={h.id} className="p-3 bg-green-50 rounded border border-green-200">
                        <p className="text-sm"><strong>No. Pendaftaran:</strong> {h.nomor_pendaftaran}</p>
                        <p className="text-sm"><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${
                          h.status_sertifikat === 'Telah Didaftar' ? 'bg-green-200 text-green-800' :
                          h.status_sertifikat === 'Proses' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-red-200 text-red-800'
                        }`}>{h.status_sertifikat}</span></p>
                        <p className="text-sm"><strong>Tahun:</strong> {h.tahun_fasilitasi}</p>
                        {h.link_sertifikat && (
                          <a href={h.link_sertifikat} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                            📄 Lihat Sertifikat
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Belum ada data HKI Merek</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-purple-600 flex items-center gap-2">
                  ✅ Sertifikat Halal
                </h3>
                {result.halal.length > 0 ? (
                  <div className="space-y-3">
                    {result.halal.map((h: any) => (
                      <div key={h.id} className="p-3 bg-purple-50 rounded border border-purple-200">
                        <p className="text-sm"><strong>No. Sertifikat:</strong> {h.nomor_sertifikat}</p>
                        <p className="text-sm"><strong>Status:</strong> <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">{h.status_sertifikat}</span></p>
                        <p className="text-sm"><strong>Tahun:</strong> {h.tahun_fasilitasi}</p>
                        {h.link_sertifikat && (
                          <a href={h.link_sertifikat} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                            📄 Lihat Sertifikat
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Belum ada data Sertifikat Halal</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-blue-600">📜 TKDN IK</h3>
                {result.tkdn.length > 0 ? (
                  <div className="space-y-2">
                    {result.tkdn.map((t: any) => (
                      <div key={t.id} className="p-3 bg-blue-50 rounded">
                        <p className="text-sm"><strong>No. Sertifikat:</strong> {t.nomor_sertifikat}</p>
                        <p className="text-sm"><strong>Tahun Terbit:</strong> {t.tahun_terbit}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Belum ada data TKDN IK</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-cyan-600">🌐 SIINas</h3>
                {result.siinas.length > 0 ? (
                  <div className="space-y-2">
                    {result.siinas.map((s: any) => (
                      <div key={s.id} className="p-3 bg-cyan-50 rounded">
                        <p className="text-sm"><strong>No. Bukti:</strong> {s.nomor_bukti}</p>
                        <p className="text-sm"><strong>Tahun:</strong> {s.tahun_bukti}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Belum ada data SIINas</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-orange-600">🧪 Uji Nilai Gizi</h3>
                {result.gizi.length > 0 ? (
                  <div className="space-y-2">
                    {result.gizi.map((g: any) => (
                      <div key={g.id} className="p-3 bg-orange-50 rounded">
                        <p className="text-sm"><strong>No. Laporan:</strong> {g.nomor_laporan}</p>
                        <p className="text-sm"><strong>Tanggal:</strong> {g.tanggal_hasil}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Belum ada data Uji Nilai Gizi</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-pink-600">⭐ Kurasi Produk</h3>
                {result.kurasi.length > 0 ? (
                  <div className="space-y-2">
                    {result.kurasi.map((k: any) => (
                      <div key={k.id} className="p-3 bg-pink-50 rounded">
                        <p className="text-sm"><strong>No. Sertifikat:</strong> {k.nomor_sertifikat}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Belum ada data Kurasi Produk</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

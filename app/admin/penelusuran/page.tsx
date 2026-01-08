'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { dummyIKMBinaan, dummyHKIMerek, dummySertifikatHalal, dummyTKDNIK, dummySIINas, dummyUjiNilaiGizi, dummyKurasiProduk } from '@/lib/dummyData'

export default function PenelusuranPage() {
  const router = useRouter()
  const [searchKey, setSearchKey] = useState('')
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    if (mode !== 'admin') router.push('/login')
  }, [router])

  const handleSearch = () => {
    const ikm = dummyIKMBinaan.find(
      d => d.nib === searchKey || d.nik === searchKey || d.nama_lengkap.toLowerCase().includes(searchKey.toLowerCase())
    )
    
    if (ikm) {
      setResult({
        ikm,
        hki: dummyHKIMerek.filter(h => h.ikm_binaan_id === ikm.id),
        halal: dummySertifikatHalal.filter(h => h.ikm_binaan_id === ikm.id),
        tkdn: dummyTKDNIK.filter(t => t.ikm_binaan_id === ikm.id),
        siinas: dummySIINas.filter(s => s.ikm_binaan_id === ikm.id),
        gizi: dummyUjiNilaiGizi.filter(g => g.ikm_binaan_id === ikm.id),
        kurasi: dummyKurasiProduk.filter(k => k.ikm_binaan_id === ikm.id),
      })
    } else {
      alert('Data tidak ditemukan!')
      setResult(null)
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Penelusuran Data IKM Binaan</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <label className="block text-sm font-semibold mb-2">Cari Data (NIB/NIK/Nama Lengkap)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan NIB, NIK, atau Nama Lengkap"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Cari Data
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-600">📋 Data IKM Binaan</h2>
              <div className="grid grid-cols-2 gap-4">
                <div><strong>NIB:</strong> {result.ikm.nib}</div>
                <div><strong>NIK:</strong> {result.ikm.nik}</div>
                <div><strong>Nama:</strong> {result.ikm.nama_lengkap}</div>
                <div><strong>Usaha:</strong> {result.ikm.nama_usaha}</div>
                <div className="col-span-2"><strong>Alamat:</strong> {result.ikm.alamat_lengkap}</div>
                <div><strong>No HP:</strong> {result.ikm.nomor_hp}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4 text-green-600">🏆 HKI Merek</h2>
              {result.hki.length > 0 ? (
                result.hki.map((h: any) => (
                  <div key={h.id} className="mb-2 p-3 bg-gray-50 rounded">
                    <p><strong>No. Pendaftaran:</strong> {h.nomor_pendaftaran}</p>
                    <p><strong>Status:</strong> {h.status_sertifikat}</p>
                    <p><strong>Tahun:</strong> {h.tahun_fasilitasi}</p>
                  </div>
                ))
              ) : <p className="text-gray-500">Belum ada data</p>}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4 text-purple-600">✅ Sertifikat Halal</h2>
              {result.halal.length > 0 ? (
                result.halal.map((h: any) => (
                  <div key={h.id} className="mb-2 p-3 bg-gray-50 rounded">
                    <p><strong>No. Sertifikat:</strong> {h.nomor_sertifikat}</p>
                    <p><strong>Status:</strong> {h.status_sertifikat}</p>
                    <p><strong>Tahun:</strong> {h.tahun_fasilitasi}</p>
                  </div>
                ))
              ) : <p className="text-gray-500">Belum ada data</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-4">📜 TKDN IK</h2>
                {result.tkdn.length > 0 ? (
                  result.tkdn.map((t: any) => (
                    <div key={t.id} className="text-sm">
                      <p><strong>No:</strong> {t.nomor_sertifikat}</p>
                      <p><strong>Tahun:</strong> {t.tahun_terbit}</p>
                    </div>
                  ))
                ) : <p className="text-gray-500 text-sm">Belum ada data</p>}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-4">🌐 SIINas</h2>
                {result.siinas.length > 0 ? (
                  result.siinas.map((s: any) => (
                    <div key={s.id} className="text-sm">
                      <p><strong>No:</strong> {s.nomor_bukti}</p>
                      <p><strong>Tahun:</strong> {s.tahun_bukti}</p>
                    </div>
                  ))
                ) : <p className="text-gray-500 text-sm">Belum ada data</p>}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-4">🧪 Uji Nilai Gizi</h2>
                {result.gizi.length > 0 ? (
                  result.gizi.map((g: any) => (
                    <div key={g.id} className="text-sm">
                      <p><strong>No:</strong> {g.nomor_laporan}</p>
                      <p><strong>Tanggal:</strong> {g.tanggal_hasil}</p>
                    </div>
                  ))
                ) : <p className="text-gray-500 text-sm">Belum ada data</p>}
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-4">⭐ Kurasi Produk</h2>
                {result.kurasi.length > 0 ? (
                  result.kurasi.map((k: any) => (
                    <div key={k.id} className="text-sm">
                      <p><strong>No:</strong> {k.nomor_sertifikat}</p>
                    </div>
                  ))
                ) : <p className="text-gray-500 text-sm">Belum ada data</p>}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

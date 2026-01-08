'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { dummyIKMBinaan, dummyHKIMerek, dummySertifikatHalal, dummyTKDNIK, dummySIINas, dummyUjiNilaiGizi, dummyKurasiProduk, dummyPelatihan, dummyPesertaPelatihan } from '@/lib/dummyData'

export default function LaporanPage() {
  const router = useRouter()
  const [filter, setFilter] = useState({
    jenis: 'semua',
    tahun: new Date().getFullYear(),
    jenisPelatihan: 'semua',
  })
  const [searchResult, setSearchResult] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const [expandedPelatihan, setExpandedPelatihan] = useState<number | null>(null)

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    if (mode !== 'admin') router.push('/login')
  }, [router])

  const handleSearch = () => {
    let result: any = {}
    
    if (filter.jenis === 'semua' || filter.jenis === 'ikm') {
      result.ikm = dummyIKMBinaan.filter(d => !d.deleted_at)
    }
    if (filter.jenis === 'semua' || filter.jenis === 'hki') {
      result.hki = dummyHKIMerek.filter(d => !d.deleted_at && d.tahun_fasilitasi === filter.tahun)
    }
    if (filter.jenis === 'semua' || filter.jenis === 'halal') {
      result.halal = dummySertifikatHalal.filter(d => !d.deleted_at && d.tahun_fasilitasi === filter.tahun)
    }
    if (filter.jenis === 'semua' || filter.jenis === 'tkdn') {
      result.tkdn = dummyTKDNIK.filter(d => !d.deleted_at && d.tahun_terbit === filter.tahun)
    }
    if (filter.jenis === 'semua' || filter.jenis === 'siinas') {
      result.siinas = dummySIINas.filter(d => !d.deleted_at && d.tahun_bukti === filter.tahun)
    }
    if (filter.jenis === 'semua' || filter.jenis === 'gizi') {
      result.gizi = dummyUjiNilaiGizi.filter(d => !d.deleted_at && d.tahun_fasilitasi === filter.tahun)
    }
    if (filter.jenis === 'semua' || filter.jenis === 'kurasi') {
      result.kurasi = dummyKurasiProduk.filter(d => !d.deleted_at)
    }
    if (filter.jenis === 'semua' || filter.jenis === 'pelatihan') {
      let pelatihanData = dummyPelatihan.filter(d => !d.deleted_at && d.tahun_pelaksanaan === filter.tahun)
      
      // Filter berdasarkan jenis pelatihan jika dipilih
      if (filter.jenisPelatihan !== 'semua') {
        pelatihanData = pelatihanData.filter(p => p.jenis_pelatihan === filter.jenisPelatihan)
      }
      
      result.pelatihan = pelatihanData
    }

    setSearchResult(result)
    setShowResult(true)
    setExpandedPelatihan(null) // Reset expanded state
  }

  const getTotalCount = (): number => {
    if (!searchResult) return 0
    const values = Object.values(searchResult) as Array<any[]>
    return values.reduce((acc: number, arr: any[]) => {
      return acc + (Array.isArray(arr) ? arr.length : 0)
    }, 0)
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">📄 Laporan IKM JUARA</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Filter Laporan</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold mb-2">Jenis Layanan</label>
              <select
                value={filter.jenis}
                onChange={(e) => setFilter({...filter, jenis: e.target.value})}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="semua">Semua Layanan</option>
                <option value="ikm">IKM Binaan</option>
                <option value="hki">HKI Merek</option>
                <option value="halal">Sertifikat Halal</option>
                <option value="tkdn">TKDN IK</option>
                <option value="siinas">SIINas</option>
                <option value="gizi">Uji Nilai Gizi</option>
                <option value="kurasi">Kurasi Produk</option>
                <option value="pelatihan">Pelatihan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tahun</label>
              <select
                value={filter.tahun}
                onChange={(e) => setFilter({...filter, tahun: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
              >
                🔍 Cari Data
              </button>
            </div>
          </div>
          
          {/* Filter Jenis Pelatihan - hanya muncul jika memilih Pelatihan */}
          {filter.jenis === 'pelatihan' && (
            <div className="mt-4 pt-4 border-t">
              <label className="block text-sm font-semibold mb-2">Filter Jenis Pelatihan</label>
              <select
                value={filter.jenisPelatihan}
                onChange={(e) => setFilter({...filter, jenisPelatihan: e.target.value})}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="semua">Semua Jenis Pelatihan</option>
                <option value="Pelatihan Digital Marketing">Pelatihan Digital Marketing</option>
                <option value="Pelatihan Manajemen Keuangan">Pelatihan Manajemen Keuangan</option>
                <option value="Pelatihan Desain Kemasan">Pelatihan Desain Kemasan</option>
              </select>
            </div>
          )}
          
          {showResult && (
            <div className="mt-4 pt-4 border-t flex gap-2">
              <button 
                onClick={() => alert('Export Excel (Demo)')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                📊 Export Excel
              </button>
              <button 
                onClick={() => alert('Export PDF (Demo)')}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                📄 Export PDF
              </button>
            </div>
          )}
        </div>

        {showResult && searchResult && (
          <>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Ringkasan Hasil Pencarian</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded text-center">
                  <p className="text-sm text-gray-600">Total Data</p>
                  <p className="text-3xl font-bold text-blue-600">{getTotalCount()}</p>
                </div>
                {searchResult.ikm && (
                  <div className="p-4 bg-gray-50 rounded text-center">
                    <p className="text-sm text-gray-600">IKM Binaan</p>
                    <p className="text-2xl font-bold text-gray-700">{searchResult.ikm.length}</p>
                  </div>
                )}
                {searchResult.hki && (
                  <div className="p-4 bg-green-50 rounded text-center">
                    <p className="text-sm text-gray-600">HKI Merek</p>
                    <p className="text-2xl font-bold text-green-600">{searchResult.hki.length}</p>
                  </div>
                )}
                {searchResult.halal && (
                  <div className="p-4 bg-purple-50 rounded text-center">
                    <p className="text-sm text-gray-600">Sertifikat Halal</p>
                    <p className="text-2xl font-bold text-purple-600">{searchResult.halal.length}</p>
                  </div>
                )}
                {searchResult.tkdn && (
                  <div className="p-4 bg-indigo-50 rounded text-center">
                    <p className="text-sm text-gray-600">TKDN IK</p>
                    <p className="text-2xl font-bold text-indigo-600">{searchResult.tkdn.length}</p>
                  </div>
                )}
                {searchResult.siinas && (
                  <div className="p-4 bg-cyan-50 rounded text-center">
                    <p className="text-sm text-gray-600">SIINas</p>
                    <p className="text-2xl font-bold text-cyan-600">{searchResult.siinas.length}</p>
                  </div>
                )}
                {searchResult.gizi && (
                  <div className="p-4 bg-orange-50 rounded text-center">
                    <p className="text-sm text-gray-600">Uji Nilai Gizi</p>
                    <p className="text-2xl font-bold text-orange-600">{searchResult.gizi.length}</p>
                  </div>
                )}
                {searchResult.kurasi && (
                  <div className="p-4 bg-pink-50 rounded text-center">
                    <p className="text-sm text-gray-600">Kurasi Produk</p>
                    <p className="text-2xl font-bold text-pink-600">{searchResult.kurasi.length}</p>
                  </div>
                )}
                {searchResult.pelatihan && (
                  <div className="p-4 bg-teal-50 rounded text-center">
                    <p className="text-sm text-gray-600">Pelatihan</p>
                    <p className="text-2xl font-bold text-teal-600">{searchResult.pelatihan.length}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Detail Data</h2>
              
              {/* IKM Binaan */}
              {searchResult.ikm && searchResult.ikm.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>📊 IKM Binaan</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {searchResult.ikm.length} data
                    </span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border text-left text-sm">No</th>
                          <th className="px-4 py-2 border text-left text-sm">NIB</th>
                          <th className="px-4 py-2 border text-left text-sm">NIK</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Lengkap</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Usaha</th>
                          <th className="px-4 py-2 border text-left text-sm">Alamat</th>
                          <th className="px-4 py-2 border text-left text-sm">No HP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult.ikm.map((item: any, index: number) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border text-sm">{index + 1}</td>
                            <td className="px-4 py-2 border text-sm font-mono">{item.nib}</td>
                            <td className="px-4 py-2 border text-sm font-mono">{item.nik}</td>
                            <td className="px-4 py-2 border text-sm">{item.nama_lengkap}</td>
                            <td className="px-4 py-2 border text-sm">{item.nama_usaha}</td>
                            <td className="px-4 py-2 border text-sm">{item.alamat_lengkap}</td>
                            <td className="px-4 py-2 border text-sm">{item.nomor_hp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* HKI Merek */}
              {searchResult.hki && searchResult.hki.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🏆 HKI Merek</span>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {searchResult.hki.length} data
                    </span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border text-left text-sm">No</th>
                          <th className="px-4 py-2 border text-left text-sm">NIB</th>
                          <th className="px-4 py-2 border text-left text-sm">NIK</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Lengkap</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Usaha</th>
                          <th className="px-4 py-2 border text-left text-sm">No HP</th>
                          <th className="px-4 py-2 border text-left text-sm">No. Pendaftaran</th>
                          <th className="px-4 py-2 border text-left text-sm">Tahun</th>
                          <th className="px-4 py-2 border text-left text-sm">Status</th>
                          <th className="px-4 py-2 border text-left text-sm">Link Sertifikat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult.hki.map((item: any, index: number) => {
                          const ikm = dummyIKMBinaan.find(i => i.id === item.ikm_binaan_id)
                          return (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border text-sm">{index + 1}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nib}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nik}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_lengkap}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_usaha}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nomor_hp}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{item.nomor_pendaftaran}</td>
                              <td className="px-4 py-2 border text-sm">{item.tahun_fasilitasi}</td>
                              <td className="px-4 py-2 border text-sm">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  item.status_sertifikat === 'Telah Didaftar' ? 'bg-green-100 text-green-800' :
                                  item.status_sertifikat === 'Proses' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {item.status_sertifikat}
                                </span>
                              </td>
                              <td className="px-4 py-2 border text-sm">
                                {item.link_sertifikat ? (
                                  <a href={item.link_sertifikat} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    Lihat
                                  </a>
                                ) : '-'}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Sertifikat Halal */}
              {searchResult.halal && searchResult.halal.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>✅ Sertifikat Halal</span>
                    <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {searchResult.halal.length} data
                    </span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border text-left text-sm">No</th>
                          <th className="px-4 py-2 border text-left text-sm">NIB</th>
                          <th className="px-4 py-2 border text-left text-sm">NIK</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Lengkap</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Usaha</th>
                          <th className="px-4 py-2 border text-left text-sm">No HP</th>
                          <th className="px-4 py-2 border text-left text-sm">No. Sertifikat</th>
                          <th className="px-4 py-2 border text-left text-sm">Tahun</th>
                          <th className="px-4 py-2 border text-left text-sm">Status</th>
                          <th className="px-4 py-2 border text-left text-sm">Link Sertifikat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult.halal.map((item: any, index: number) => {
                          const ikm = dummyIKMBinaan.find(i => i.id === item.ikm_binaan_id)
                          return (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border text-sm">{index + 1}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nib}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nik}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_lengkap}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_usaha}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nomor_hp}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{item.nomor_sertifikat}</td>
                              <td className="px-4 py-2 border text-sm">{item.tahun_fasilitasi}</td>
                              <td className="px-4 py-2 border text-sm">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  item.status_sertifikat === 'Telah Didaftar' ? 'bg-green-100 text-green-800' :
                                  item.status_sertifikat === 'Proses' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {item.status_sertifikat}
                                </span>
                              </td>
                              <td className="px-4 py-2 border text-sm">
                                <a href={item.link_sertifikat} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  Lihat
                                </a>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TKDN IK */}
              {searchResult.tkdn && searchResult.tkdn.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>📜 TKDN IK</span>
                    <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                      {searchResult.tkdn.length} data
                    </span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border text-left text-sm">No</th>
                          <th className="px-4 py-2 border text-left text-sm">NIB</th>
                          <th className="px-4 py-2 border text-left text-sm">NIK</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Lengkap</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Usaha</th>
                          <th className="px-4 py-2 border text-left text-sm">No HP</th>
                          <th className="px-4 py-2 border text-left text-sm">No. Sertifikat</th>
                          <th className="px-4 py-2 border text-left text-sm">Tahun Terbit</th>
                          <th className="px-4 py-2 border text-left text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult.tkdn.map((item: any, index: number) => {
                          const ikm = dummyIKMBinaan.find(i => i.id === item.ikm_binaan_id)
                          return (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border text-sm">{index + 1}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nib}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nik}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_lengkap}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_usaha}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nomor_hp}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{item.nomor_sertifikat}</td>
                              <td className="px-4 py-2 border text-sm">{item.tahun_terbit}</td>
                              <td className="px-4 py-2 border text-sm">
                                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                                  {item.status_sertifikat}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SIINas */}
              {searchResult.siinas && searchResult.siinas.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🌐 SIINas</span>
                    <span className="text-sm bg-cyan-100 text-cyan-800 px-2 py-1 rounded">
                      {searchResult.siinas.length} data
                    </span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border text-left text-sm">No</th>
                          <th className="px-4 py-2 border text-left text-sm">NIB</th>
                          <th className="px-4 py-2 border text-left text-sm">NIK</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Lengkap</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Usaha</th>
                          <th className="px-4 py-2 border text-left text-sm">No HP</th>
                          <th className="px-4 py-2 border text-left text-sm">No. Bukti</th>
                          <th className="px-4 py-2 border text-left text-sm">Tahun</th>
                          <th className="px-4 py-2 border text-left text-sm">Link Bukti</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult.siinas.map((item: any, index: number) => {
                          const ikm = dummyIKMBinaan.find(i => i.id === item.ikm_binaan_id)
                          return (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border text-sm">{index + 1}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nib}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nik}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_lengkap}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_usaha}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nomor_hp}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{item.nomor_bukti}</td>
                              <td className="px-4 py-2 border text-sm">{item.tahun_bukti}</td>
                              <td className="px-4 py-2 border text-sm">
                                <a href={item.link_bukti} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  Lihat
                                </a>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Uji Nilai Gizi */}
              {searchResult.gizi && searchResult.gizi.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🧪 Uji Nilai Gizi</span>
                    <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      {searchResult.gizi.length} data
                    </span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border text-left text-sm">No</th>
                          <th className="px-4 py-2 border text-left text-sm">NIB</th>
                          <th className="px-4 py-2 border text-left text-sm">NIK</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Lengkap</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Usaha</th>
                          <th className="px-4 py-2 border text-left text-sm">No HP</th>
                          <th className="px-4 py-2 border text-left text-sm">No. Laporan</th>
                          <th className="px-4 py-2 border text-left text-sm">Tanggal Hasil</th>
                          <th className="px-4 py-2 border text-left text-sm">Tahun</th>
                          <th className="px-4 py-2 border text-left text-sm">Link Laporan</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult.gizi.map((item: any, index: number) => {
                          const ikm = dummyIKMBinaan.find(i => i.id === item.ikm_binaan_id)
                          return (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border text-sm">{index + 1}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nib}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nik}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_lengkap}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_usaha}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nomor_hp}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{item.nomor_laporan}</td>
                              <td className="px-4 py-2 border text-sm">{item.tanggal_hasil}</td>
                              <td className="px-4 py-2 border text-sm">{item.tahun_fasilitasi}</td>
                              <td className="px-4 py-2 border text-sm">
                                <a href={item.link_laporan} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  Lihat
                                </a>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Kurasi Produk */}
              {searchResult.kurasi && searchResult.kurasi.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>⭐ Kurasi Produk</span>
                    <span className="text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded">
                      {searchResult.kurasi.length} data
                    </span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border text-left text-sm">No</th>
                          <th className="px-4 py-2 border text-left text-sm">NIB</th>
                          <th className="px-4 py-2 border text-left text-sm">NIK</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Lengkap</th>
                          <th className="px-4 py-2 border text-left text-sm">Nama Usaha</th>
                          <th className="px-4 py-2 border text-left text-sm">No HP</th>
                          <th className="px-4 py-2 border text-left text-sm">No. Sertifikat</th>
                          <th className="px-4 py-2 border text-left text-sm">Link Sertifikat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult.kurasi.map((item: any, index: number) => {
                          const ikm = dummyIKMBinaan.find(i => i.id === item.ikm_binaan_id)
                          return (
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border text-sm">{index + 1}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nib}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{ikm?.nik}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_lengkap}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nama_usaha}</td>
                              <td className="px-4 py-2 border text-sm">{ikm?.nomor_hp}</td>
                              <td className="px-4 py-2 border text-sm font-mono">{item.nomor_sertifikat}</td>
                              <td className="px-4 py-2 border text-sm">
                                <a href={item.link_sertifikat} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  Lihat
                                </a>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Pelatihan */}
              {searchResult.pelatihan && searchResult.pelatihan.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <span>🎓 Pelatihan Pemberdayaan Industri</span>
                    <span className="text-sm bg-teal-100 text-teal-800 px-2 py-1 rounded">
                      {searchResult.pelatihan.length} data
                    </span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border text-left text-sm">No</th>
                          <th className="px-4 py-2 border text-left text-sm">Jenis Pelatihan</th>
                          <th className="px-4 py-2 border text-left text-sm">Sub Kegiatan</th>
                          <th className="px-4 py-2 border text-left text-sm">Tahun</th>
                          <th className="px-4 py-2 border text-left text-sm">Jumlah Peserta</th>
                          <th className="px-4 py-2 border text-left text-sm">Status</th>
                          <th className="px-4 py-2 border text-left text-sm">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResult.pelatihan.map((item: any, index: number) => (
                          <>
                            <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2 border text-sm">{index + 1}</td>
                              <td className="px-4 py-2 border text-sm">{item.jenis_pelatihan}</td>
                              <td className="px-4 py-2 border text-sm">{item.sub_kegiatan}</td>
                              <td className="px-4 py-2 border text-sm">{item.tahun_pelaksanaan}</td>
                              <td className="px-4 py-2 border text-sm">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  {item.jumlah_peserta} orang
                                </span>
                              </td>
                              <td className="px-4 py-2 border text-sm">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-4 py-2 border text-sm">
                                <button
                                  onClick={() => setExpandedPelatihan(expandedPelatihan === item.id ? null : item.id)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                >
                                  {expandedPelatihan === item.id ? '▲ Tutup' : '▼ Lihat Peserta'}
                                </button>
                              </td>
                            </tr>
                            {expandedPelatihan === item.id && (
                              <tr key={`detail-${item.id}`}>
                                <td colSpan={7} className="px-4 py-4 border bg-gray-50">
                                  <div className="mb-2 font-semibold text-sm text-gray-700">
                                    Detail Peserta Pelatihan:
                                  </div>
                                  <table className="w-full border bg-white">
                                    <thead className="bg-blue-50">
                                      <tr>
                                        <th className="px-3 py-2 border text-left text-xs">No</th>
                                        <th className="px-3 py-2 border text-left text-xs">NIB</th>
                                        <th className="px-3 py-2 border text-left text-xs">NIK</th>
                                        <th className="px-3 py-2 border text-left text-xs">Nama Lengkap</th>
                                        <th className="px-3 py-2 border text-left text-xs">Nama Usaha</th>
                                        <th className="px-3 py-2 border text-left text-xs">Alamat</th>
                                        <th className="px-3 py-2 border text-left text-xs">No HP</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {dummyPesertaPelatihan
                                        .filter(p => p.pelatihan_id === item.id)
                                        .map((peserta, idx) => {
                                          const ikm = dummyIKMBinaan.find(i => i.id === peserta.ikm_binaan_id)
                                          return (
                                            <tr key={peserta.id} className="hover:bg-blue-50">
                                              <td className="px-3 py-2 border text-xs">{idx + 1}</td>
                                              <td className="px-3 py-2 border text-xs font-mono">{ikm?.nib}</td>
                                              <td className="px-3 py-2 border text-xs font-mono">{ikm?.nik}</td>
                                              <td className="px-3 py-2 border text-xs">{ikm?.nama_lengkap}</td>
                                              <td className="px-3 py-2 border text-xs">{ikm?.nama_usaha}</td>
                                              <td className="px-3 py-2 border text-xs">{ikm?.alamat_lengkap}</td>
                                              <td className="px-3 py-2 border text-xs">{ikm?.nomor_hp}</td>
                                            </tr>
                                          )
                                        })}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {!showResult && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500">Pilih filter dan klik "Cari Data" untuk menampilkan laporan</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { dummyPelatihan, dummyIKMBinaan } from '@/lib/dummyData'

export default function PelatihanPage() {
  const router = useRouter()
  const [data, setData] = useState(dummyPelatihan.filter(d => !d.deleted_at))
  const [showModal, setShowModal] = useState(false)
  const [showPesertaModal, setShowPesertaModal] = useState(false)
  const [selectedPelatihan, setSelectedPelatihan] = useState<any>(null)

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    if (mode !== 'admin') router.push('/login')
  }, [router])

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pelatihan Pemberdayaan Industri</h1>
          <div className="flex gap-2">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              📊 Export Excel
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
              📄 Export PDF
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              + Tambah Pelatihan
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#2c3e50] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm">No</th>
                <th className="px-4 py-3 text-left text-sm">Jenis Pelatihan</th>
                <th className="px-4 py-3 text-left text-sm">Sub Kegiatan</th>
                <th className="px-4 py-3 text-left text-sm">Tahun</th>
                <th className="px-4 py-3 text-left text-sm">Jumlah Peserta</th>
                <th className="px-4 py-3 text-left text-sm">Status</th>
                <th className="px-4 py-3 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">{item.jenis_pelatihan}</td>
                  <td className="px-4 py-3 text-sm">{item.sub_kegiatan}</td>
                  <td className="px-4 py-3 text-sm">{item.tahun_pelaksanaan}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item.jumlah_peserta} orang
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setSelectedPelatihan(item)
                          setShowPesertaModal(true)
                        }}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Lihat Peserta
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showPesertaModal && selectedPelatihan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                Peserta: {selectedPelatihan.jenis_pelatihan}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Sub Kegiatan: {selectedPelatihan.sub_kegiatan} | Tahun: {selectedPelatihan.tahun_pelaksanaan}
              </p>
              
              <div className="mb-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                  + Tambah Peserta
                </button>
              </div>

              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm">No</th>
                    <th className="px-4 py-2 text-left text-sm">Nama</th>
                    <th className="px-4 py-2 text-left text-sm">Usaha</th>
                    <th className="px-4 py-2 text-left text-sm">No HP</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyIKMBinaan.slice(0, selectedPelatihan.jumlah_peserta).map((ikm, idx) => (
                    <tr key={ikm.id} className="border-b">
                      <td className="px-4 py-2 text-sm">{idx + 1}</td>
                      <td className="px-4 py-2 text-sm">{ikm.nama_lengkap}</td>
                      <td className="px-4 py-2 text-sm">{ikm.nama_usaha}</td>
                      <td className="px-4 py-2 text-sm">{ikm.nomor_hp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={() => setShowPesertaModal(false)}
                className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

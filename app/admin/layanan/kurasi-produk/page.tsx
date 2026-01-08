'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { dummyIKMBinaan, dummyKurasiProduk } from '@/lib/dummyData'

export default function KurasiProdukPage() {
  const router = useRouter()
  const [data, setData] = useState(dummyKurasiProduk.filter(d => !d.deleted_at).map(k => ({
    ...k,
    ikm: dummyIKMBinaan.find(ikm => ikm.id === k.ikm_binaan_id)
  })))
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    if (mode !== 'admin') router.push('/login')
  }, [router])

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      setData(data.filter(d => d.id !== id))
      alert('Data dipindahkan ke Recycle Bin')
    }
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pendaftaran Kurasi Produk</h1>
          <div className="flex gap-2">
            <button onClick={() => alert('Export Excel (Demo)')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              📊 Export Excel
            </button>
            <button onClick={() => alert('Export PDF (Demo)')} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
              📄 Export PDF
            </button>
            <button onClick={() => setShowModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
              + Tambah Kurasi Produk
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#2c3e50] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm">No</th>
                <th className="px-4 py-3 text-left text-sm">Nama Usaha</th>
                <th className="px-4 py-3 text-left text-sm">Pemilik</th>
                <th className="px-4 py-3 text-left text-sm">No. Sertifikat</th>
                <th className="px-4 py-3 text-left text-sm">Sertifikat</th>
                <th className="px-4 py-3 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm">{item.ikm?.nama_usaha}</td>
                  <td className="px-4 py-3 text-sm">{item.ikm?.nama_lengkap}</td>
                  <td className="px-4 py-3 text-sm font-mono">{item.nomor_sertifikat}</td>
                  <td className="px-4 py-3 text-sm">
                    <a href={item.link_sertifikat} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Lihat
                    </a>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button onClick={() => alert('Edit (Demo)')} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <h2 className="text-xl font-bold mb-4">Tambah Data Kurasi Produk</h2>
              <p className="text-gray-600 mb-4">Form tambah data Kurasi Produk (Demo Mode)</p>
              <button onClick={() => setShowModal(false)} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded">
                Tutup
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

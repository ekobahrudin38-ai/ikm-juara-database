'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { dummyIKMBinaan } from '@/lib/dummyData'
import { IKMBinaan } from '@/types/database'

export default function IKMBinaanPage() {
  const router = useRouter()
  const [data, setData] = useState<IKMBinaan[]>([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    nib: '',
    nik: '',
    nama_lengkap: '',
    alamat_lengkap: '',
    nama_usaha: '',
    nomor_hp: ''
  })

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    if (mode !== 'admin') {
      router.push('/login')
    } else {
      setData(dummyIKMBinaan.filter(d => !d.deleted_at))
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Data berhasil disimpan! (Demo Mode)')
    setShowModal(false)
    setFormData({
      nib: '',
      nik: '',
      nama_lengkap: '',
      alamat_lengkap: '',
      nama_usaha: '',
      nomor_hp: ''
    })
  }

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      setData(data.filter(d => d.id !== id))
      alert('Data dipindahkan ke Recycle Bin')
    }
  }

  const exportToExcel = () => {
    alert('Export ke Excel (Demo Mode)')
  }

  const exportToPDF = () => {
    alert('Export ke PDF (Demo Mode)')
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Data IKM Binaan</h1>
          <div className="flex gap-2">
            <button 
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
            >
              📊 Export Excel
            </button>
            <button 
              onClick={exportToPDF}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
            >
              📄 Export PDF
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              + Tambah IKM Binaan
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#2c3e50] text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">No</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">NIB</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">NIK</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Nama Lengkap</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Nama Usaha</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">No HP</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-mono">{item.nib}</td>
                  <td className="px-4 py-3 text-sm font-mono">{item.nik}</td>
                  <td className="px-4 py-3 text-sm">{item.nama_lengkap}</td>
                  <td className="px-4 py-3 text-sm">{item.nama_usaha}</td>
                  <td className="px-4 py-3 text-sm">{item.nomor_hp}</td>
                  <td className="px-4 py-3 text-sm">
                    {item.database_lengkap ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        ✓ Lengkap
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                        Belum Lengkap
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
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
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Tambah Data IKM Binaan</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">No. NIB (13 Digit)</label>
                    <input
                      type="text"
                      maxLength={13}
                      value={formData.nib}
                      onChange={(e) => setFormData({...formData, nib: e.target.value})}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">No. NIK (16 Digit)</label>
                    <input
                      type="text"
                      maxLength={16}
                      value={formData.nik}
                      onChange={(e) => setFormData({...formData, nik: e.target.value})}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    value={formData.nama_lengkap}
                    onChange={(e) => setFormData({...formData, nama_lengkap: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Alamat Lengkap</label>
                  <textarea
                    value={formData.alamat_lengkap}
                    onChange={(e) => setFormData({...formData, alamat_lengkap: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Nama Usaha</label>
                  <input
                    type="text"
                    value={formData.nama_usaha}
                    onChange={(e) => setFormData({...formData, nama_usaha: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Nomor HP</label>
                  <input
                    type="tel"
                    value={formData.nomor_hp}
                    onChange={(e) => setFormData({...formData, nomor_hp: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
                  >
                    Simpan Data
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded font-semibold"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

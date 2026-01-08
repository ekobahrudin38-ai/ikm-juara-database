'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { dummyIKMBinaan, dummySertifikatHalal } from '@/lib/dummyData'
import { SertifikatHalal, IKMBinaan } from '@/types/database'

export default function SertifikatHalalPage() {
  const router = useRouter()
  const [data, setData] = useState<(SertifikatHalal & { ikm?: IKMBinaan })[]>([])
  const [showModal, setShowModal] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [selectedIKM, setSelectedIKM] = useState<IKMBinaan | null>(null)

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    if (mode !== 'admin') {
      router.push('/login')
    } else {
      const enrichedData = dummySertifikatHalal
        .filter(d => !d.deleted_at)
        .map(halal => ({
          ...halal,
          ikm: dummyIKMBinaan.find(ikm => ikm.id === halal.ikm_binaan_id)
        }))
      setData(enrichedData)
    }
  }, [router])

  const [formData, setFormData] = useState({
    nomor_sertifikat: '',
    link_sertifikat: '',
    link_logo: '',
    tahun_fasilitasi: new Date().getFullYear(),
    status_sertifikat: 'Proses' as 'Telah Didaftar' | 'Proses' | 'Ditolak'
  })

  const handleSearch = () => {
    const found = dummyIKMBinaan.find(
      ikm => ikm.nib === searchKey || ikm.nik === searchKey || ikm.nama_lengkap.toLowerCase().includes(searchKey.toLowerCase())
    )
    if (found) {
      setSelectedIKM(found)
    } else {
      alert('Data tidak ditemukan!')
      setSelectedIKM(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedIKM) {
      alert('Pilih data IKM terlebih dahulu!')
      return
    }
    alert('Data Sertifikat Halal berhasil disimpan! (Demo Mode)')
    setShowModal(false)
    setSearchKey('')
    setSelectedIKM(null)
    setFormData({
      nomor_sertifikat: '',
      link_sertifikat: '',
      link_logo: '',
      tahun_fasilitasi: new Date().getFullYear(),
      status_sertifikat: 'Proses'
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
          <h1 className="text-2xl font-bold text-gray-800">Pendaftaran Sertifikat Halal</h1>
          <div className="flex gap-2">
            <button 
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
              📊 Export Excel
            </button>
            <button 
              onClick={exportToPDF}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
              📄 Export PDF
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              + Tambah Sertifikat Halal
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
                <th className="px-4 py-3 text-left text-sm">Tahun</th>
                <th className="px-4 py-3 text-left text-sm">Status</th>
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
                  <td className="px-4 py-3 text-sm">{item.tahun_fasilitasi}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.status_sertifikat === 'Telah Didaftar' ? 'bg-green-100 text-green-800' :
                      item.status_sertifikat === 'Proses' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status_sertifikat}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {item.link_sertifikat ? (
                      <a href={item.link_sertifikat} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Lihat
                      </a>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => alert('Fitur Edit (Demo Mode)')}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
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
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Tambah Sertifikat Halal</h2>
              
              <div className="mb-6 p-4 bg-blue-50 rounded">
                <label className="block text-sm font-semibold mb-2">Cari Data IKM (NIB/NIK/Nama)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan NIB, NIK, atau Nama"
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                  >
                    Gunakan Data
                  </button>
                </div>
              </div>

              {selectedIKM && (
                <div className="mb-4 p-4 bg-green-50 rounded">
                  <p className="text-sm"><strong>Nama:</strong> {selectedIKM.nama_lengkap}</p>
                  <p className="text-sm"><strong>Usaha:</strong> {selectedIKM.nama_usaha}</p>
                  <p className="text-sm"><strong>Alamat:</strong> {selectedIKM.alamat_lengkap}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Nomor Sertifikat Halal</label>
                  <input
                    type="text"
                    value={formData.nomor_sertifikat}
                    onChange={(e) => setFormData({...formData, nomor_sertifikat: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Link Sertifikat Halal</label>
                  <input
                    type="url"
                    value={formData.link_sertifikat}
                    onChange={(e) => setFormData({...formData, link_sertifikat: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://drive.google.com/..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Link Logo Sertifikat</label>
                  <input
                    type="url"
                    value={formData.link_logo}
                    onChange={(e) => setFormData({...formData, link_logo: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://drive.google.com/..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Tahun Fasilitasi</label>
                    <input
                      type="number"
                      value={formData.tahun_fasilitasi}
                      onChange={(e) => setFormData({...formData, tahun_fasilitasi: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Status Sertifikat</label>
                    <select
                      value={formData.status_sertifikat}
                      onChange={(e) => setFormData({...formData, status_sertifikat: e.target.value as any})}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Proses">Proses</option>
                      <option value="Telah Didaftar">Telah Didaftar</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </div>
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
                    onClick={() => {
                      setShowModal(false)
                      setSelectedIKM(null)
                      setSearchKey('')
                    }}
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

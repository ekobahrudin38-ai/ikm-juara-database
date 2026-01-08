'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/AdminSidebar'
import { dummyIKMBinaan, dummyHKIMerek } from '@/lib/dummyData'
import { HKIMerek, IKMBinaan } from '@/types/database'

export default function HKIMerekPage() {
  const router = useRouter()
  const [data, setData] = useState<(HKIMerek & { ikm?: IKMBinaan })[]>([])
  const [showModal, setShowModal] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [selectedIKM, setSelectedIKM] = useState<IKMBinaan | null>(null)
  const [formData, setFormData] = useState({
    nomor_pendaftaran: '',
    link_bukti_daftar: '',
    link_surat_pernyataan: '',
    status_sertifikat: 'Proses' as 'Telah Didaftar' | 'Proses' | 'Ditolak',
    tahun_fasilitasi: new Date().getFullYear(),
    link_sertifikat: ''
  })

  useEffect(() => {
    const mode = localStorage.getItem('userMode')
    if (mode !== 'admin') {
      router.push('/login')
    } else {
      const enrichedData = dummyHKIMerek
        .filter(d => !d.deleted_at)
        .map(hki => ({
          ...hki,
          ikm: dummyIKMBinaan.find(ikm => ikm.id === hki.ikm_binaan_id)
        }))
      setData(enrichedData)
    }
  }, [router])

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
    alert('Data HKI Merek berhasil disimpan! (Demo Mode)')
    setShowModal(false)
    setSearchKey('')
    setSelectedIKM(null)
    setFormData({
      nomor_pendaftaran: '',
      link_bukti_daftar: '',
      link_surat_pernyataan: '',
      status_sertifikat: 'Proses',
      tahun_fasilitasi: new Date().getFullYear(),
      link_sertifikat: ''
    })
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pendaftaran HKI Merek</h1>
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
              + Tambah Data HKI
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
                <th className="px-4 py-3 text-left text-sm">No. Pendaftaran</th>
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
                  <td className="px-4 py-3 text-sm font-mono">{item.nomor_pendaftaran}</td>
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

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Tambah Data HKI Merek</h2>
              
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
                  <p className="text-sm"><strong>NIB:</strong> {selectedIKM.nib}</p>
                  <p className="text-sm"><strong>NIK:</strong> {selectedIKM.nik}</p>
                  <p className="text-sm"><strong>Nama:</strong> {selectedIKM.nama_lengkap}</p>
                  <p className="text-sm"><strong>Usaha:</strong> {selectedIKM.nama_usaha}</p>
                  <p className="text-sm"><strong>Alamat:</strong> {selectedIKM.alamat_lengkap}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Nomor Pendaftaran HKI</label>
                  <input
                    type="text"
                    value={formData.nomor_pendaftaran}
                    onChange={(e) => setFormData({...formData, nomor_pendaftaran: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Link Bukti Daftar HKI</label>
                  <input
                    type="url"
                    value={formData.link_bukti_daftar}
                    onChange={(e) => setFormData({...formData, link_bukti_daftar: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://drive.google.com/..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Link Surat Pernyataan</label>
                  <input
                    type="url"
                    value={formData.link_surat_pernyataan}
                    onChange={(e) => setFormData({...formData, link_surat_pernyataan: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://drive.google.com/..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Link Sertifikat HKI (Opsional)</label>
                  <input
                    type="url"
                    value={formData.link_sertifikat}
                    onChange={(e) => setFormData({...formData, link_sertifikat: e.target.value})}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://drive.google.com/..."
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

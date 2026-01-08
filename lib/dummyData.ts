import type { IKMBinaan, HKIMerek, SertifikatHalal, TKDNIK, SIINas, UjiNilaiGizi, KurasiProduk, Pelatihan, PesertaPelatihan, LogAktivitas } from '../types/database'

export const dummyIKMBinaan: IKMBinaan[] = [
  {
    id: 1,
    nib: '1234567890123',
    nik: '3578012345670001',
    nama_lengkap: 'Budi Santoso',
    alamat_lengkap: 'Jl. Merdeka No. 10, Kota Madiun',
    nama_usaha: 'Batik Madiun Jaya',
    nomor_hp: '081234567890',
    database_lengkap: true,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    nib: '2345678901234',
    nik: '3578012345670002',
    nama_lengkap: 'Siti Aminah',
    alamat_lengkap: 'Jl. Pahlawan No. 25, Kota Madiun',
    nama_usaha: 'Keripik Tempe Sari',
    nomor_hp: '082345678901',
    database_lengkap: true,
    created_at: '2024-02-10T11:30:00Z'
  },
  {
    id: 3,
    nib: '3456789012345',
    nik: '3578012345670003',
    nama_lengkap: 'Ahmad Hidayat',
    alamat_lengkap: 'Jl. Sudirman No. 45, Kota Madiun',
    nama_usaha: 'Furniture Jati Madiun',
    nomor_hp: '083456789012',
    database_lengkap: true,
    created_at: '2024-03-05T09:15:00Z'
  },
  {
    id: 4,
    nib: '4567890123456',
    nik: '3578012345670004',
    nama_lengkap: 'Dewi Lestari',
    alamat_lengkap: 'Jl. Gatot Subroto No. 12, Kota Madiun',
    nama_usaha: 'Kue Kering Dewi',
    nomor_hp: '084567890123',
    database_lengkap: false,
    created_at: '2024-04-20T14:00:00Z'
  },
  {
    id: 5,
    nib: '5678901234567',
    nik: '3578012345670005',
    nama_lengkap: 'Eko Prasetyo',
    alamat_lengkap: 'Jl. Ahmad Yani No. 33, Kota Madiun',
    nama_usaha: 'Konveksi Eko Jaya',
    nomor_hp: '085678901234',
    database_lengkap: true,
    created_at: '2024-05-12T08:45:00Z'
  }
]

export const dummyHKIMerek: HKIMerek[] = [
  {
    id: 1,
    ikm_binaan_id: 1,
    nomor_pendaftaran: 'HKI-2024-001',
    link_bukti_daftar: 'https://drive.google.com/file/d/bukti-hki-001',
    link_surat_pernyataan: 'https://drive.google.com/file/d/surat-hki-001',
    status_sertifikat: 'Telah Didaftar',
    tahun_fasilitasi: 2024,
    link_sertifikat: 'https://drive.google.com/file/d/sertifikat-hki-001',
    created_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 2,
    ikm_binaan_id: 2,
    nomor_pendaftaran: 'HKI-2024-002',
    link_bukti_daftar: 'https://drive.google.com/file/d/bukti-hki-002',
    link_surat_pernyataan: 'https://drive.google.com/file/d/surat-hki-002',
    status_sertifikat: 'Proses',
    tahun_fasilitasi: 2024,
    link_sertifikat: '',
    created_at: '2024-02-15T11:00:00Z'
  },
  {
    id: 3,
    ikm_binaan_id: 5,
    nomor_pendaftaran: 'HKI-2024-003',
    link_bukti_daftar: 'https://drive.google.com/file/d/bukti-hki-003',
    link_surat_pernyataan: 'https://drive.google.com/file/d/surat-hki-003',
    status_sertifikat: 'Telah Didaftar',
    tahun_fasilitasi: 2024,
    link_sertifikat: 'https://drive.google.com/file/d/sertifikat-hki-003',
    created_at: '2024-05-20T09:00:00Z'
  }
]

export const dummySertifikatHalal: SertifikatHalal[] = [
  {
    id: 1,
    ikm_binaan_id: 2,
    nomor_sertifikat: 'HALAL-2024-001',
    link_sertifikat: 'https://drive.google.com/file/d/halal-001',
    link_logo: 'https://drive.google.com/file/d/logo-halal-001',
    tahun_fasilitasi: 2024,
    status_sertifikat: 'Telah Didaftar',
    created_at: '2024-03-10T10:00:00Z'
  },
  {
    id: 2,
    ikm_binaan_id: 4,
    nomor_sertifikat: 'HALAL-2024-002',
    link_sertifikat: 'https://drive.google.com/file/d/halal-002',
    link_logo: 'https://drive.google.com/file/d/logo-halal-002',
    tahun_fasilitasi: 2024,
    status_sertifikat: 'Proses',
    created_at: '2024-04-25T11:00:00Z'
  }
]

export const dummyTKDNIK: TKDNIK[] = [
  {
    id: 1,
    ikm_binaan_id: 3,
    nomor_sertifikat: 'TKDN-2024-001',
    link_sertifikat: 'https://drive.google.com/file/d/tkdn-001',
    tahun_terbit: 2024,
    status_sertifikat: 'Telah Didaftar',
    created_at: '2024-03-15T10:00:00Z'
  }
]

export const dummySIINas: SIINas[] = [
  {
    id: 1,
    ikm_binaan_id: 1,
    nomor_bukti: 'SIINAS-2024-001',
    tahun_bukti: 2024,
    link_bukti: 'https://drive.google.com/file/d/siinas-001',
    created_at: '2024-02-01T10:00:00Z'
  },
  {
    id: 2,
    ikm_binaan_id: 5,
    nomor_bukti: 'SIINAS-2024-002',
    tahun_bukti: 2024,
    link_bukti: 'https://drive.google.com/file/d/siinas-002',
    created_at: '2024-05-15T10:00:00Z'
  }
]

export const dummyUjiNilaiGizi: UjiNilaiGizi[] = [
  {
    id: 1,
    ikm_binaan_id: 2,
    nomor_laporan: 'UNG-2024-001',
    tanggal_hasil: '2024-03-20',
    tahun_fasilitasi: 2024,
    link_laporan: 'https://drive.google.com/file/d/gizi-001',
    created_at: '2024-03-20T10:00:00Z'
  },
  {
    id: 2,
    ikm_binaan_id: 4,
    nomor_laporan: 'UNG-2024-002',
    tanggal_hasil: '2024-05-10',
    tahun_fasilitasi: 2024,
    link_laporan: 'https://drive.google.com/file/d/gizi-002',
    created_at: '2024-05-10T10:00:00Z'
  }
]

export const dummyKurasiProduk: KurasiProduk[] = [
  {
    id: 1,
    ikm_binaan_id: 1,
    nomor_sertifikat: 'KURASI-2024-001',
    link_sertifikat: 'https://drive.google.com/file/d/kurasi-001',
    created_at: '2024-04-01T10:00:00Z'
  },
  {
    id: 2,
    ikm_binaan_id: 3,
    nomor_sertifikat: 'KURASI-2024-002',
    link_sertifikat: 'https://drive.google.com/file/d/kurasi-002',
    created_at: '2024-04-15T10:00:00Z'
  }
]

export const dummyPelatihan: Pelatihan[] = [
  {
    id: 1,
    jenis_pelatihan: 'Pelatihan Digital Marketing',
    sub_kegiatan: 'Social Media Marketing',
    tahun_pelaksanaan: 2024,
    jumlah_peserta: 3,
    status: 'aktif',
    created_at: '2024-01-10T10:00:00Z'
  },
  {
    id: 2,
    jenis_pelatihan: 'Pelatihan Manajemen Keuangan',
    sub_kegiatan: 'Pembukuan Sederhana',
    tahun_pelaksanaan: 2024,
    jumlah_peserta: 2,
    status: 'aktif',
    created_at: '2024-02-05T10:00:00Z'
  },
  {
    id: 3,
    jenis_pelatihan: 'Pelatihan Desain Kemasan',
    sub_kegiatan: 'Desain Grafis Produk',
    tahun_pelaksanaan: 2024,
    jumlah_peserta: 4,
    status: 'aktif',
    created_at: '2024-03-01T10:00:00Z'
  }
]

export const dummyPesertaPelatihan: PesertaPelatihan[] = [
  // Peserta Pelatihan Digital Marketing (id: 1)
  { id: 1, ikm_binaan_id: 1, pelatihan_id: 1, created_at: '2024-01-10T10:00:00Z' },
  { id: 2, ikm_binaan_id: 2, pelatihan_id: 1, created_at: '2024-01-10T10:00:00Z' },
  { id: 3, ikm_binaan_id: 5, pelatihan_id: 1, created_at: '2024-01-10T10:00:00Z' },
  
  // Peserta Pelatihan Manajemen Keuangan (id: 2)
  { id: 4, ikm_binaan_id: 3, pelatihan_id: 2, created_at: '2024-02-05T10:00:00Z' },
  { id: 5, ikm_binaan_id: 4, pelatihan_id: 2, created_at: '2024-02-05T10:00:00Z' },
  
  // Peserta Pelatihan Desain Kemasan (id: 3)
  { id: 6, ikm_binaan_id: 1, pelatihan_id: 3, created_at: '2024-03-01T10:00:00Z' },
  { id: 7, ikm_binaan_id: 2, pelatihan_id: 3, created_at: '2024-03-01T10:00:00Z' },
  { id: 8, ikm_binaan_id: 3, pelatihan_id: 3, created_at: '2024-03-01T10:00:00Z' },
  { id: 9, ikm_binaan_id: 5, pelatihan_id: 3, created_at: '2024-03-01T10:00:00Z' },
]

export const dummyLogAktivitas: LogAktivitas[] = [
  {
    id: 1,
    user_type: 'admin',
    user_name: 'Admin IKM',
    aktivitas: 'Menambah data IKM Binaan',
    detail: 'Menambahkan data Budi Santoso - Batik Madiun Jaya',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    user_type: 'admin',
    user_name: 'Admin IKM',
    aktivitas: 'Menambah data HKI Merek',
    detail: 'Menambahkan HKI untuk Batik Madiun Jaya',
    created_at: '2024-01-20T10:00:00Z'
  },
  {
    id: 3,
    user_type: 'pengguna',
    user_name: 'Siti Aminah',
    aktivitas: 'Mengakses data pribadi',
    detail: 'Melihat data IKM Binaan',
    created_at: '2024-02-15T14:30:00Z'
  },
  {
    id: 4,
    user_type: 'admin',
    user_name: 'Admin IKM',
    aktivitas: 'Menambah data Sertifikat Halal',
    detail: 'Menambahkan Sertifikat Halal untuk Keripik Tempe Sari',
    created_at: '2024-03-10T10:00:00Z'
  },
  {
    id: 5,
    user_type: 'pengguna',
    user_name: 'Ahmad Hidayat',
    aktivitas: 'Mengakses data pribadi',
    detail: 'Melihat data TKDN IK',
    created_at: '2024-03-20T09:15:00Z'
  }
]

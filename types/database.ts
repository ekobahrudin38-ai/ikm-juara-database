export interface IKMBinaan {
  id: number
  nib: string
  nik: string
  nama_lengkap: string
  alamat_lengkap: string
  nama_usaha: string
  nomor_hp: string
  database_lengkap: boolean
  deleted_at?: string
  created_at?: string
  updated_at?: string
}

export interface HKIMerek {
  id: number
  ikm_binaan_id: number
  nomor_pendaftaran: string
  link_bukti_daftar: string
  link_surat_pernyataan: string
  status_sertifikat: 'Telah Didaftar' | 'Proses' | 'Ditolak'
  tahun_fasilitasi: number
  link_sertifikat: string
  deleted_at?: string
  created_at?: string
}

export interface SertifikatHalal {
  id: number
  ikm_binaan_id: number
  nomor_sertifikat: string
  link_sertifikat: string
  link_logo: string
  tahun_fasilitasi: number
  status_sertifikat: 'Telah Didaftar' | 'Proses' | 'Ditolak'
  deleted_at?: string
  created_at?: string
}

export interface TKDNIK {
  id: number
  ikm_binaan_id: number
  nomor_sertifikat: string
  link_sertifikat: string
  tahun_terbit: number
  status_sertifikat: 'Telah Didaftar' | 'Proses' | 'Ditolak'
  deleted_at?: string
  created_at?: string
}

export interface SIINas {
  id: number
  ikm_binaan_id: number
  nomor_bukti: string
  tahun_bukti: number
  link_bukti: string
  deleted_at?: string
  created_at?: string
}

export interface UjiNilaiGizi {
  id: number
  ikm_binaan_id: number
  nomor_laporan: string
  tanggal_hasil: string
  tahun_fasilitasi: number
  link_laporan: string
  deleted_at?: string
  created_at?: string
}

export interface KurasiProduk {
  id: number
  ikm_binaan_id: number
  nomor_sertifikat: string
  link_sertifikat: string
  deleted_at?: string
  created_at?: string
}

export interface Pelatihan {
  id: number
  jenis_pelatihan: string
  sub_kegiatan: string
  tahun_pelaksanaan: number
  jumlah_peserta: number
  status: string
  deleted_at?: string
  created_at?: string
}

export interface PesertaPelatihan {
  id: number
  ikm_binaan_id: number
  pelatihan_id: number
  created_at?: string
}

export interface BukuTamu {
  id: number
  nama_lengkap: string
  alamat: string
  nomor_hp: string
  created_at?: string
}

export interface LogAktivitas {
  id: number
  user_type: 'admin' | 'pengguna'
  user_name: string
  aktivitas: string
  detail?: string
  created_at?: string
}

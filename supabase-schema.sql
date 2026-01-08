-- Database Schema untuk IKM JUARA (DisnakerKUKM Kota Madiun)
-- Jalankan script ini di Supabase SQL Editor

-- Tabel IKM Binaan (Data Utama)
CREATE TABLE ikm_binaan (
  id BIGSERIAL PRIMARY KEY,
  nib VARCHAR(13) UNIQUE NOT NULL,
  nik VARCHAR(16) UNIQUE NOT NULL,
  nama_lengkap TEXT NOT NULL,
  alamat_lengkap TEXT NOT NULL,
  nama_usaha TEXT NOT NULL,
  nomor_hp VARCHAR(20),
  database_lengkap BOOLEAN DEFAULT false,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel HKI Merek
CREATE TABLE hki_merek (
  id BIGSERIAL PRIMARY KEY,
  ikm_binaan_id BIGINT REFERENCES ikm_binaan(id) ON DELETE CASCADE,
  nomor_pendaftaran TEXT,
  link_bukti_daftar TEXT,
  link_surat_pernyataan TEXT,
  status_sertifikat TEXT CHECK (status_sertifikat IN ('Telah Didaftar', 'Proses', 'Ditolak')),
  tahun_fasilitasi INTEGER,
  link_sertifikat TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Sertifikat Halal
CREATE TABLE sertifikat_halal (
  id BIGSERIAL PRIMARY KEY,
  ikm_binaan_id BIGINT REFERENCES ikm_binaan(id) ON DELETE CASCADE,
  nomor_sertifikat TEXT,
  link_sertifikat TEXT,
  link_logo TEXT,
  tahun_fasilitasi INTEGER,
  status_sertifikat TEXT CHECK (status_sertifikat IN ('Telah Didaftar', 'Proses', 'Ditolak')),
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel TKDN IK
CREATE TABLE tkdn_ik (
  id BIGSERIAL PRIMARY KEY,
  ikm_binaan_id BIGINT REFERENCES ikm_binaan(id) ON DELETE CASCADE,
  nomor_sertifikat TEXT,
  link_sertifikat TEXT,
  tahun_terbit INTEGER,
  status_sertifikat TEXT CHECK (status_sertifikat IN ('Telah Didaftar', 'Proses', 'Ditolak')),
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel SIINas
CREATE TABLE siinas (
  id BIGSERIAL PRIMARY KEY,
  ikm_binaan_id BIGINT REFERENCES ikm_binaan(id) ON DELETE CASCADE,
  nomor_bukti TEXT,
  tahun_bukti INTEGER,
  link_bukti TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Uji Nilai Gizi
CREATE TABLE uji_nilai_gizi (
  id BIGSERIAL PRIMARY KEY,
  ikm_binaan_id BIGINT REFERENCES ikm_binaan(id) ON DELETE CASCADE,
  nomor_laporan TEXT,
  tanggal_hasil DATE,
  tahun_fasilitasi INTEGER,
  link_laporan TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Kurasi Produk
CREATE TABLE kurasi_produk (
  id BIGSERIAL PRIMARY KEY,
  ikm_binaan_id BIGINT REFERENCES ikm_binaan(id) ON DELETE CASCADE,
  nomor_sertifikat TEXT,
  link_sertifikat TEXT,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Pelatihan Pemberdayaan Industri
CREATE TABLE pelatihan (
  id BIGSERIAL PRIMARY KEY,
  jenis_pelatihan TEXT NOT NULL,
  sub_kegiatan TEXT,
  tahun_pelaksanaan INTEGER,
  jumlah_peserta INTEGER DEFAULT 0,
  status TEXT DEFAULT 'aktif',
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Peserta Pelatihan (Many-to-Many)
CREATE TABLE peserta_pelatihan (
  id BIGSERIAL PRIMARY KEY,
  ikm_binaan_id BIGINT REFERENCES ikm_binaan(id) ON DELETE CASCADE,
  pelatihan_id BIGINT REFERENCES pelatihan(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Buku Tamu
CREATE TABLE buku_tamu (
  id BIGSERIAL PRIMARY KEY,
  nama_lengkap TEXT NOT NULL,
  alamat TEXT NOT NULL,
  nomor_hp VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel Log Aktivitas
CREATE TABLE log_aktivitas (
  id BIGSERIAL PRIMARY KEY,
  user_type TEXT CHECK (user_type IN ('admin', 'pengguna')),
  user_name TEXT,
  aktivitas TEXT NOT NULL,
  detail TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ikm_binaan ENABLE ROW LEVEL SECURITY;
ALTER TABLE hki_merek ENABLE ROW LEVEL SECURITY;
ALTER TABLE sertifikat_halal ENABLE ROW LEVEL SECURITY;
ALTER TABLE tkdn_ik ENABLE ROW LEVEL SECURITY;
ALTER TABLE siinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE uji_nilai_gizi ENABLE ROW LEVEL SECURITY;
ALTER TABLE kurasi_produk ENABLE ROW LEVEL SECURITY;
ALTER TABLE pelatihan ENABLE ROW LEVEL SECURITY;
ALTER TABLE peserta_pelatihan ENABLE ROW LEVEL SECURITY;
ALTER TABLE buku_tamu ENABLE ROW LEVEL SECURITY;
ALTER TABLE log_aktivitas ENABLE ROW LEVEL SECURITY;

-- Policies untuk public access
CREATE POLICY "Enable all for all users" ON ikm_binaan FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON hki_merek FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON sertifikat_halal FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON tkdn_ik FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON siinas FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON uji_nilai_gizi FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON kurasi_produk FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON pelatihan FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON peserta_pelatihan FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON buku_tamu FOR ALL USING (true);
CREATE POLICY "Enable all for all users" ON log_aktivitas FOR ALL USING (true);

-- Indexes
CREATE INDEX idx_ikm_nib ON ikm_binaan(nib);
CREATE INDEX idx_ikm_nik ON ikm_binaan(nik);
CREATE INDEX idx_ikm_deleted ON ikm_binaan(deleted_at);
CREATE INDEX idx_hki_ikm ON hki_merek(ikm_binaan_id);
CREATE INDEX idx_halal_ikm ON sertifikat_halal(ikm_binaan_id);
CREATE INDEX idx_tkdn_ikm ON tkdn_ik(ikm_binaan_id);
CREATE INDEX idx_siinas_ikm ON siinas(ikm_binaan_id);
CREATE INDEX idx_gizi_ikm ON uji_nilai_gizi(ikm_binaan_id);
CREATE INDEX idx_kurasi_ikm ON kurasi_produk(ikm_binaan_id);
CREATE INDEX idx_peserta_ikm ON peserta_pelatihan(ikm_binaan_id);
CREATE INDEX idx_peserta_pelatihan ON peserta_pelatihan(pelatihan_id);

-- Script untuk Insert Data Dummy ke Supabase
-- Jalankan di Supabase SQL Editor setelah schema dibuat

-- Insert IKM Binaan
INSERT INTO ikm_binaan (nib, nik, nama_lengkap, alamat_lengkap, nama_usaha, nomor_hp, database_lengkap) VALUES
('1234567890123', '3578012345670001', 'Budi Santoso', 'Jl. Merdeka No. 10, Kota Madiun', 'Batik Madiun Jaya', '081234567890', true),
('2345678901234', '3578012345670002', 'Siti Aminah', 'Jl. Pahlawan No. 25, Kota Madiun', 'Keripik Tempe Sari', '082345678901', true),
('3456789012345', '3578012345670003', 'Ahmad Hidayat', 'Jl. Sudirman No. 45, Kota Madiun', 'Furniture Jati Madiun', '083456789012', true),
('4567890123456', '3578012345670004', 'Dewi Lestari', 'Jl. Gatot Subroto No. 12, Kota Madiun', 'Kue Kering Dewi', '084567890123', false),
('5678901234567', '3578012345670005', 'Eko Prasetyo', 'Jl. Ahmad Yani No. 33, Kota Madiun', 'Konveksi Eko Jaya', '085678901234', true);

-- Insert Pelatihan
INSERT INTO pelatihan (jenis_pelatihan, sub_kegiatan, tahun_pelaksanaan, jumlah_peserta, status) VALUES
('Pelatihan Digital Marketing', 'Social Media Marketing', 2024, 3, 'aktif'),
('Pelatihan Manajemen Keuangan', 'Pembukuan Sederhana', 2024, 2, 'aktif'),
('Pelatihan Desain Kemasan', 'Desain Grafis Produk', 2024, 4, 'aktif');

-- Insert Peserta Pelatihan
INSERT INTO peserta_pelatihan (ikm_binaan_id, pelatihan_id) VALUES
(1, 1), (2, 1), (5, 1),  -- Pelatihan Digital Marketing
(3, 2), (4, 2),          -- Pelatihan Manajemen Keuangan
(1, 3), (2, 3), (3, 3), (5, 3);  -- Pelatihan Desain Kemasan

-- Insert HKI Merek
INSERT INTO hki_merek (ikm_binaan_id, nomor_pendaftaran, link_bukti_daftar, link_surat_pernyataan, status_sertifikat, tahun_fasilitasi, link_sertifikat) VALUES
(1, 'HKI-2024-001', 'https://drive.google.com/file/d/bukti-hki-001', 'https://drive.google.com/file/d/surat-hki-001', 'Telah Didaftar', 2024, 'https://drive.google.com/file/d/sertifikat-hki-001'),
(2, 'HKI-2024-002', 'https://drive.google.com/file/d/bukti-hki-002', 'https://drive.google.com/file/d/surat-hki-002', 'Proses', 2024, ''),
(5, 'HKI-2024-003', 'https://drive.google.com/file/d/bukti-hki-003', 'https://drive.google.com/file/d/surat-hki-003', 'Telah Didaftar', 2024, 'https://drive.google.com/file/d/sertifikat-hki-003');

-- Insert Sertifikat Halal
INSERT INTO sertifikat_halal (ikm_binaan_id, nomor_sertifikat, link_sertifikat, link_logo, tahun_fasilitasi, status_sertifikat) VALUES
(2, 'HALAL-2024-001', 'https://drive.google.com/file/d/halal-001', 'https://drive.google.com/file/d/logo-halal-001', 2024, 'Telah Didaftar'),
(4, 'HALAL-2024-002', 'https://drive.google.com/file/d/halal-002', 'https://drive.google.com/file/d/logo-halal-002', 2024, 'Proses');

-- Insert TKDN IK
INSERT INTO tkdn_ik (ikm_binaan_id, nomor_sertifikat, link_sertifikat, tahun_terbit, status_sertifikat) VALUES
(3, 'TKDN-2024-001', 'https://drive.google.com/file/d/tkdn-001', 2024, 'Telah Didaftar');

-- Insert SIINas
INSERT INTO siinas (ikm_binaan_id, nomor_bukti, tahun_bukti, link_bukti) VALUES
(1, 'SIINAS-2024-001', 2024, 'https://drive.google.com/file/d/siinas-001'),
(5, 'SIINAS-2024-002', 2024, 'https://drive.google.com/file/d/siinas-002');

-- Insert Uji Nilai Gizi
INSERT INTO uji_nilai_gizi (ikm_binaan_id, nomor_laporan, tanggal_hasil, tahun_fasilitasi, link_laporan) VALUES
(2, 'UNG-2024-001', '2024-03-20', 2024, 'https://drive.google.com/file/d/gizi-001'),
(4, 'UNG-2024-002', '2024-05-10', 2024, 'https://drive.google.com/file/d/gizi-002');

-- Insert Kurasi Produk
INSERT INTO kurasi_produk (ikm_binaan_id, nomor_sertifikat, link_sertifikat) VALUES
(1, 'KURASI-2024-001', 'https://drive.google.com/file/d/kurasi-001'),
(3, 'KURASI-2024-002', 'https://drive.google.com/file/d/kurasi-002');

-- Insert Log Aktivitas
INSERT INTO log_aktivitas (user_type, user_name, aktivitas, detail) VALUES
('admin', 'Admin IKM', 'Menambah data IKM Binaan', 'Menambahkan data Budi Santoso - Batik Madiun Jaya'),
('admin', 'Admin IKM', 'Menambah data HKI Merek', 'Menambahkan HKI untuk Batik Madiun Jaya'),
('pengguna', 'Siti Aminah', 'Mengakses data pribadi', 'Melihat data IKM Binaan'),
('admin', 'Admin IKM', 'Menambah data Sertifikat Halal', 'Menambahkan Sertifikat Halal untuk Keripik Tempe Sari'),
('pengguna', 'Ahmad Hidayat', 'Mengakses data pribadi', 'Melihat data TKDN IK');

-- Verifikasi data berhasil diinsert
SELECT 'IKM Binaan' as tabel, COUNT(*) as jumlah FROM ikm_binaan
UNION ALL
SELECT 'Pelatihan', COUNT(*) FROM pelatihan
UNION ALL
SELECT 'Peserta Pelatihan', COUNT(*) FROM peserta_pelatihan
UNION ALL
SELECT 'HKI Merek', COUNT(*) FROM hki_merek
UNION ALL
SELECT 'Sertifikat Halal', COUNT(*) FROM sertifikat_halal
UNION ALL
SELECT 'TKDN IK', COUNT(*) FROM tkdn_ik
UNION ALL
SELECT 'SIINas', COUNT(*) FROM siinas
UNION ALL
SELECT 'Uji Nilai Gizi', COUNT(*) FROM uji_nilai_gizi
UNION ALL
SELECT 'Kurasi Produk', COUNT(*) FROM kurasi_produk
UNION ALL
SELECT 'Log Aktivitas', COUNT(*) FROM log_aktivitas;

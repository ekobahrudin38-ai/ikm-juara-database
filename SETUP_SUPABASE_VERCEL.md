# 🚀 Setup Supabase & Deployment ke Vercel

## 📋 Daftar Isi
1. [Setup Supabase Database](#1-setup-supabase-database)
2. [Konfigurasi Environment Variables](#2-konfigurasi-environment-variables)
3. [Insert Data Dummy ke Supabase](#3-insert-data-dummy-ke-supabase)
4. [Deploy ke Vercel](#4-deploy-ke-vercel)
5. [Testing & Verifikasi](#5-testing--verifikasi)

---

## 1. Setup Supabase Database

### A. Buat Project Supabase

1. Buka [https://supabase.com](https://supabase.com)
2. Login atau Sign Up (gratis)
3. Klik **"New Project"**
4. Isi form:
   - **Name**: `ikm-juara-madiun` (atau nama lain)
   - **Database Password**: Buat password yang kuat (SIMPAN INI!)
   - **Region**: Pilih `Southeast Asia (Singapore)` untuk performa terbaik
5. Klik **"Create new project"**
6. Tunggu ~2 menit hingga project selesai dibuat

### B. Jalankan Database Schema

1. Di dashboard Supabase, klik menu **"SQL Editor"** di sidebar kiri
2. Klik **"New query"**
3. Copy seluruh isi file `supabase-schema.sql` dari project ini
4. Paste ke SQL Editor
5. Klik **"Run"** atau tekan `Ctrl+Enter`
6. Pastikan muncul pesan sukses: "Success. No rows returned"

### C. Dapatkan API Keys

1. Klik menu **"Settings"** (icon gear) di sidebar kiri
2. Klik **"API"** di submenu
3. Copy dan simpan:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (key yang panjang)

---

## 2. Konfigurasi Environment Variables

### A. Setup Local (.env.local)

1. Copy file `.env.local.example` menjadi `.env.local`:
   ```bash
   copy .env.local.example .env.local
   ```

2. Edit file `.env.local` dan isi dengan credentials dari Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **PENTING**: File `.env.local` sudah ada di `.gitignore`, jangan commit ke Git!

### B. Verifikasi Koneksi

1. Restart development server:
   ```bash
   npm run dev
   ```

2. Buka browser console (F12) dan cek tidak ada error koneksi

---

## 3. Insert Data Dummy ke Supabase

Setelah schema dibuat, kita perlu insert data dummy untuk testing.

### A. Jalankan Script Insert Data

1. Buka **SQL Editor** di Supabase
2. Buat query baru
3. Copy dan jalankan script berikut:

```sql
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
('pengguna', 'Siti Aminah', 'Mengakses data pribadi', 'Melihat data IKM Binaan');
```

4. Klik **"Run"** untuk execute
5. Verifikasi data masuk dengan query:
   ```sql
   SELECT COUNT(*) FROM ikm_binaan;
   SELECT COUNT(*) FROM pelatihan;
   SELECT COUNT(*) FROM peserta_pelatihan;
   ```

---

## 4. Deploy ke Vercel

### A. Persiapan Repository

1. **Pastikan Git sudah diinit** (jika belum):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - IKM JUARA Database"
   ```

2. **Push ke GitHub** (jika belum):
   - Buat repository baru di GitHub
   - Push code:
     ```bash
     git remote add origin https://github.com/username/ikm-juara.git
     git branch -M main
     git push -u origin main
     ```

### B. Deploy ke Vercel

1. Buka [https://vercel.com](https://vercel.com)
2. Login dengan GitHub account
3. Klik **"Add New..."** → **"Project"**
4. Import repository `ikm-juara` (atau nama repo Anda)
5. Klik **"Import"**

### C. Configure Project

1. **Framework Preset**: Next.js (auto-detected)
2. **Root Directory**: `./` (default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)

### D. Setup Environment Variables

Di halaman deployment Vercel, sebelum klik "Deploy":

1. Expand **"Environment Variables"**
2. Tambahkan 2 variables:
   
   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://xxxxx.supabase.co` (dari Supabase)
   
   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGc...` (anon key dari Supabase)

3. Klik **"Deploy"**

### E. Tunggu Deployment

- Proses build ~2-3 menit
- Vercel akan memberikan URL: `https://ikm-juara-xxx.vercel.app`
- Klik URL untuk membuka aplikasi

---

## 5. Testing & Verifikasi

### A. Test Koneksi Database

1. Buka aplikasi di Vercel URL
2. Login sebagai Admin
3. Buka halaman **IKM Binaan**
4. Pastikan data muncul (5 data IKM)

### B. Test Fitur Laporan Pelatihan

1. Buka menu **Laporan IKM JUARA**
2. Pilih **"Pelatihan"** di dropdown
3. Filter akan muncul
4. Klik **"Cari Data"**
5. Klik **"Lihat Peserta"** pada salah satu pelatihan
6. Pastikan detail peserta muncul

### C. Test CRUD Operations

1. **Create**: Tambah IKM Binaan baru
2. **Read**: Lihat data di tabel
3. **Update**: Edit data yang ada
4. **Delete**: Hapus data (soft delete)
5. **Restore**: Cek Recycle Bin

---

## 🎯 Checklist Deployment

- [ ] Supabase project dibuat
- [ ] Schema SQL dijalankan
- [ ] Data dummy diinsert
- [ ] API keys disimpan
- [ ] .env.local dikonfigurasi
- [ ] Test local berhasil
- [ ] Code di-push ke GitHub
- [ ] Project di-import ke Vercel
- [ ] Environment variables di-set di Vercel
- [ ] Deployment berhasil
- [ ] Test production URL
- [ ] Semua fitur berfungsi

---

## 🔧 Troubleshooting

### Error: "Invalid API key"
- Cek kembali SUPABASE_URL dan ANON_KEY
- Pastikan tidak ada spasi atau karakter tambahan
- Restart dev server setelah update .env.local

### Error: "Failed to fetch"
- Cek koneksi internet
- Verifikasi Supabase project masih aktif
- Cek RLS policies sudah di-enable

### Build Error di Vercel
- Cek logs di Vercel dashboard
- Pastikan semua dependencies ada di package.json
- Verifikasi environment variables sudah di-set

### Data tidak muncul
- Cek SQL insert berhasil di Supabase
- Verifikasi RLS policies: `FOR ALL USING (true)`
- Test query manual di SQL Editor

---

## 📞 Support

Jika ada masalah:
1. Cek Vercel deployment logs
2. Cek Supabase logs di Dashboard → Logs
3. Cek browser console untuk error messages

---

## 🎉 Selesai!

Aplikasi IKM JUARA Database sudah live dan terhubung dengan Supabase!

**Production URL**: `https://ikm-juara-xxx.vercel.app`

Selamat! 🚀

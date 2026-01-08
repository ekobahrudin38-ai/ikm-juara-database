# Database IKM JUARA - DisnakerKUKM Kota Madiun

Website database untuk mengelola data IKM (Industri Kecil Menengah) JUARA di Dinas Tenaga Kerja dan KUKM Kota Madiun.

## 🎯 Fitur Utama

### Mode Admin
- **Dashboard** - Statistik dan aktivitas terbaru
- **IKM Binaan** - Kelola data IKM dengan NIB, NIK, dan informasi lengkap
- **Layanan IKM JUARA**:
  - Pendaftaran HKI Merek
  - Pendaftaran Sertifikat Halal
  - Pendaftaran TKDN IK
  - Pendaftaran dan Pendampingan SIINas
  - Pendaftaran Uji Nilai Gizi
  - Kurasi Produk
- **Pelatihan Pemberdayaan Industri** - Kelola pelatihan dan peserta
- **Penelusuran Data** - Cari data lengkap IKM berdasarkan NIB/NIK/Nama
- **Recycle Bin** - Restore atau hapus permanen data yang dihapus
- **Laporan** - Export data ke Excel dan PDF dengan filter
- **Log Aktivitas** - Tracking aktivitas admin dan pengguna

### Mode Pengguna
- **Buku Tamu** - Registrasi pengunjung
- **Pencarian Data** - Lihat data pribadi IKM berdasarkan NIB/NIK/Nama
- **Tampilan User-Friendly** - Interface khusus untuk pengguna umum

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Language**: TypeScript

## 📦 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Buat project di [Supabase](https://supabase.com)
2. Buka SQL Editor di Supabase Dashboard
3. Copy dan jalankan SQL dari file `supabase-schema.sql`

### 3. Environment Variables

Copy `.env.local.example` ke `.env.local`:

```bash
cp .env.local.example .env.local
```

Isi dengan credentials Supabase Anda:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## 🔐 Login Credentials (Demo)

### Admin
- Password: `admin123`

### Pengguna
- Isi buku tamu dengan data apapun

## 📊 Data Dummy

Aplikasi sudah dilengkapi dengan data dummy untuk testing:
- 5 IKM Binaan
- 3 HKI Merek
- 2 Sertifikat Halal
- 1 TKDN IK
- 2 SIINas
- 2 Uji Nilai Gizi
- 2 Kurasi Produk
- 3 Pelatihan
- 5 Log Aktivitas

## 🌐 Deploy ke Vercel

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Tambahkan environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## 📁 Struktur Database

### Tabel Utama

#### ikm_binaan
- id, nib (13 digit), nik (16 digit)
- nama_lengkap, alamat_lengkap, nama_usaha
- nomor_hp, database_lengkap
- deleted_at (soft delete)

#### hki_merek
- ikm_binaan_id (foreign key)
- nomor_pendaftaran, link_bukti_daftar
- link_surat_pernyataan, status_sertifikat
- tahun_fasilitasi, link_sertifikat

#### sertifikat_halal
- ikm_binaan_id (foreign key)
- nomor_sertifikat, link_sertifikat
- link_logo, tahun_fasilitasi, status_sertifikat

#### tkdn_ik
- ikm_binaan_id (foreign key)
- nomor_sertifikat, link_sertifikat
- tahun_terbit, status_sertifikat

#### siinas
- ikm_binaan_id (foreign key)
- nomor_bukti, tahun_bukti, link_bukti

#### uji_nilai_gizi
- ikm_binaan_id (foreign key)
- nomor_laporan, tanggal_hasil
- tahun_fasilitasi, link_laporan

#### kurasi_produk
- ikm_binaan_id (foreign key)
- nomor_sertifikat, link_sertifikat

#### pelatihan
- jenis_pelatihan, sub_kegiatan
- tahun_pelaksanaan, jumlah_peserta, status

#### peserta_pelatihan
- ikm_binaan_id, pelatihan_id (many-to-many)

#### buku_tamu
- nama_lengkap, alamat, nomor_hp

#### log_aktivitas
- user_type (admin/pengguna)
- user_name, aktivitas, detail

## 🎨 Fitur Khusus

### Auto-fill Data
Saat menambah data layanan (HKI, Halal, dll), admin dapat mencari IKM berdasarkan NIB/NIK/Nama dan data akan otomatis terisi.

### Soft Delete
Data yang dihapus tidak langsung hilang, melainkan masuk ke Recycle Bin dan dapat dipulihkan.

### Export Data
Semua tabel dapat di-export ke Excel dan PDF.

### Log Aktivitas
Semua aktivitas admin dan pengguna tercatat untuk audit trail.

### Responsive Design
Tampilan optimal di desktop, tablet, dan mobile.

## 📝 Catatan

- Aplikasi ini menggunakan data dummy untuk demo
- Untuk production, integrasikan dengan Supabase
- Password admin dapat diubah di halaman login
- Semua link Google Drive adalah contoh

## 🤝 Support

Untuk pertanyaan atau bantuan, hubungi DisnakerKUKM Kota Madiun.

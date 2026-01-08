# 🚀 Quick Start - Database IKM JUARA

## ⚡ Mulai Cepat (5 Menit)

### 1. Buka Aplikasi
Aplikasi sudah berjalan di: **http://localhost:3000**

### 2. Login
**Mode Admin:**
- Klik "Login sebagai Admin"
- Password: `admin123`
- Klik "Masuk"

**Mode Pengguna:**
- Klik "Login sebagai Pengguna"
- Isi Buku Tamu (data bebas)
- Klik "Simpan & Masuk"

### 3. Explore Fitur

#### Sebagai Admin:
1. **Dashboard** - Lihat statistik
2. **IKM Binaan** - Klik "+ Tambah IKM Binaan"
3. **Layanan** - Pilih salah satu layanan (HKI, Halal, dll)
4. **Penelusuran** - Cari data dengan NIB: `1234567890123`
5. **Log Aktivitas** - Lihat semua aktivitas

#### Sebagai Pengguna:
1. Masukkan NIB: `1234567890123`
2. Atau NIK: `3578012345670001`
3. Atau Nama: `Budi Santoso`
4. Klik "Cari Data"
5. Lihat semua data terkait

---

## 📊 Data Dummy yang Tersedia

### IKM Binaan (5 data):
1. **Budi Santoso** - Batik Madiun Jaya
   - NIB: `1234567890123`
   - NIK: `3578012345670001`

2. **Siti Aminah** - Keripik Tempe Sari
   - NIB: `2345678901234`
   - NIK: `3578012345670002`

3. **Ahmad Hidayat** - Furniture Jati Madiun
   - NIB: `3456789012345`
   - NIK: `3578012345670003`

4. **Dewi Lestari** - Kue Kering Dewi
   - NIB: `4567890123456`
   - NIK: `3578012345670004`

5. **Eko Prasetyo** - Konveksi Eko Jaya
   - NIB: `5678901234567`
   - NIK: `3578012345670005`

### Layanan yang Sudah Ada:
- 3 HKI Merek
- 2 Sertifikat Halal
- 1 TKDN IK
- 2 SIINas
- 2 Uji Nilai Gizi
- 2 Kurasi Produk
- 3 Pelatihan

---

## 🎯 Fitur Utama

### 1. Auto-Fill Data
Saat menambah layanan (HKI, Halal, dll):
1. Masukkan NIB/NIK/Nama
2. Klik "Gunakan Data"
3. Data IKM otomatis terisi!

### 2. Penelusuran Lengkap
Cari 1 IKM, lihat semua data terkait:
- Data pribadi
- Semua sertifikat
- Semua pelatihan

### 3. Soft Delete
Data yang dihapus masuk Recycle Bin:
- Bisa di-restore
- Atau hapus permanen

### 4. Log Aktivitas
Semua aktivitas tercatat:
- Admin menambah data
- Pengguna mengakses data
- Timestamp lengkap

---

## 🎨 Navigasi Cepat

### Admin Menu:
```
📊 Dashboard          → Statistik & aktivitas
🏢 IKM Binaan         → CRUD data IKM
🎯 Layanan IKM JUARA  → 6 jenis layanan
🎓 Pelatihan          → Kelola pelatihan
🔍 Penelusuran Data   → Cari data lengkap
🗑️ Recycle Bin        → Restore/hapus data
📄 Laporan            → Filter & export
📋 Log Aktivitas      → Tracking aktivitas
```

---

## 💡 Tips

### Untuk Testing:
1. Gunakan data dummy yang sudah ada
2. Coba fitur auto-fill di layanan
3. Test penelusuran dengan NIB/NIK/Nama
4. Coba hapus dan restore data
5. Lihat log aktivitas

### Untuk Development:
1. Edit file di folder `app/`
2. Hot reload otomatis
3. Cek console untuk error
4. Gunakan React DevTools

### Untuk Production:
1. Setup Supabase (lihat DEPLOYMENT.md)
2. Update .env.local
3. Test dengan real database
4. Deploy ke Vercel

---

## 🔧 Troubleshooting

### Port sudah digunakan?
```bash
# Stop server (Ctrl+C)
# Atau ganti port
npm run dev -- -p 3001
```

### Error saat compile?
```bash
# Clear cache
rm -rf .next
npm run dev
```

### Data tidak muncul?
- Refresh halaman (F5)
- Clear browser cache
- Cek console untuk error

---

## 📱 Akses dari Device Lain

### Di jaringan yang sama:
1. Cek IP komputer: `ipconfig` (Windows) atau `ifconfig` (Mac/Linux)
2. Buka di device lain: `http://[IP]:3000`
3. Contoh: `http://192.168.1.100:3000`

---

## 🎓 Belajar Lebih Lanjut

### Dokumentasi:
- `README.md` - Overview lengkap
- `PANDUAN_PENGGUNAAN.md` - Cara pakai detail
- `DEPLOYMENT.md` - Deploy ke production
- `STRUKTUR_APLIKASI.md` - Struktur kode
- `CHECKLIST.md` - Fitur yang sudah ada

### Tech Stack:
- Next.js 14 - Framework
- TypeScript - Language
- Tailwind CSS - Styling
- Supabase - Database (optional)

---

## ✨ Selamat Mencoba!

Aplikasi Database IKM JUARA siap digunakan!

**Login Admin:** Password `admin123`
**Login Pengguna:** Isi buku tamu

Untuk bantuan lebih lanjut, baca dokumentasi lengkap di file-file MD lainnya.

---

**DisnakerKUKM Kota Madiun** 🏛️

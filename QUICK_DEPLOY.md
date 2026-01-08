# ⚡ Quick Deploy Guide - IKM JUARA

Panduan cepat untuk deploy aplikasi ke production dalam 15 menit.

## 🎯 Prerequisites

- [ ] Akun GitHub
- [ ] Akun Supabase (gratis)
- [ ] Akun Vercel (gratis)

---

## 📝 Step 1: Setup Supabase (5 menit)

### 1.1 Buat Project
```
1. Buka https://supabase.com → Login
2. New Project → Isi nama: "ikm-juara-madiun"
3. Region: Southeast Asia (Singapore)
4. Buat password database (SIMPAN!)
5. Create → Tunggu 2 menit
```

### 1.2 Jalankan Schema
```
1. Klik "SQL Editor" di sidebar
2. New query
3. Copy isi file: supabase-schema.sql
4. Paste → Run
5. Tunggu "Success. No rows returned"
```

### 1.3 Insert Data Dummy
```
1. New query lagi
2. Copy isi file: scripts/insert-dummy-data.sql
3. Paste → Run
4. Cek hasil: harus ada 5 IKM, 3 Pelatihan, dll
```

### 1.4 Copy API Keys
```
1. Settings → API
2. Copy:
   - Project URL: https://xxxxx.supabase.co
   - anon public key: eyJhbGc...
```

---

## 🔧 Step 2: Setup Local (2 menit)

### 2.1 Environment Variables
```bash
# Copy example file
copy .env.local.example .env.local

# Edit .env.local dengan credentials Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 2.2 Test Local
```bash
npm run dev
```
Buka http://localhost:3001 → Login → Test fitur

---

## 🚀 Step 3: Deploy ke Vercel (5 menit)

### 3.1 Push ke GitHub
```bash
# Jika belum init git
git init
git add .
git commit -m "Ready for deployment"

# Buat repo baru di GitHub, lalu:
git remote add origin https://github.com/username/ikm-juara.git
git branch -M main
git push -u origin main
```

### 3.2 Deploy di Vercel
```
1. Buka https://vercel.com → Login dengan GitHub
2. Add New → Project
3. Import repository "ikm-juara"
4. Framework: Next.js (auto-detect)
5. JANGAN klik Deploy dulu!
```

### 3.3 Set Environment Variables
```
Di halaman Vercel, expand "Environment Variables":

Variable 1:
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://xxxxx.supabase.co

Variable 2:
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGc... (paste full key)

Sekarang klik "Deploy"
```

### 3.4 Tunggu Build
```
- Build time: ~2-3 menit
- Vercel akan auto-generate URL
- Klik URL untuk buka aplikasi
```

---

## ✅ Step 4: Verifikasi (3 menit)

### 4.1 Test Production
```
1. Buka URL Vercel: https://ikm-juara-xxx.vercel.app
2. Login sebagai Admin
3. Cek Dashboard → harus ada data
4. Buka IKM Binaan → harus ada 5 data
5. Buka Laporan → Pilih Pelatihan → Cari Data
6. Klik "Lihat Peserta" → harus muncul detail
```

### 4.2 Test CRUD
```
1. Tambah IKM Binaan baru → Save
2. Edit data → Update
3. Hapus data → Cek Recycle Bin
4. Restore data → Kembali ke tabel
```

---

## 🎉 Done!

Aplikasi sudah live di: `https://ikm-juara-xxx.vercel.app`

### Custom Domain (Opsional)
```
1. Di Vercel: Settings → Domains
2. Add domain: ikm-juara.disnakermadiun.go.id
3. Update DNS sesuai instruksi Vercel
4. Tunggu propagasi (~24 jam)
```

---

## 🔥 Pro Tips

1. **Auto Deploy**: Setiap push ke GitHub akan auto-deploy
2. **Preview Deploy**: Setiap PR akan dapat preview URL
3. **Rollback**: Bisa rollback ke deployment sebelumnya
4. **Analytics**: Aktifkan Vercel Analytics untuk monitoring
5. **Logs**: Cek logs di Vercel dashboard jika ada error

---

## 📞 Troubleshooting Cepat

**Error: Invalid API key**
→ Cek .env.local dan Vercel env vars, pastikan sama

**Data tidak muncul**
→ Cek Supabase SQL Editor, run: `SELECT * FROM ikm_binaan;`

**Build failed**
→ Cek Vercel logs, biasanya missing env vars

**500 Error**
→ Cek Supabase RLS policies sudah enable

---

## 📚 Dokumentasi Lengkap

Lihat `SETUP_SUPABASE_VERCEL.md` untuk panduan detail.

---

**Total waktu: ~15 menit** ⏱️

Selamat! Aplikasi IKM JUARA sudah production-ready! 🚀

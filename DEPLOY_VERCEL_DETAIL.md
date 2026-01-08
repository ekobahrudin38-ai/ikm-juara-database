# 🚀 Panduan Detail Deploy ke Vercel - Step by Step

Panduan lengkap dengan penjelasan detail setiap langkah untuk deploy aplikasi IKM JUARA ke Vercel.

---

## 📋 Prerequisites

Sebelum mulai, pastikan:
- ✅ Test local sudah berhasil (aplikasi berjalan di http://localhost:3001)
- ✅ Data dari Supabase muncul dengan benar
- ✅ File `.env.local` sudah dikonfigurasi dengan benar
- ✅ Akun GitHub sudah ada
- ✅ Code sudah di-commit (tidak ada perubahan yang belum di-save)

---

## 🎯 BAGIAN 1: Persiapan GitHub

### Step 1.1: Cek Status Git

Buka terminal/command prompt di folder project, lalu jalankan:

```bash
git status
```

**Apa yang akan muncul:**
- Jika ada file merah (untracked/modified): Lanjut ke Step 1.2
- Jika "nothing to commit, working tree clean": Lanjut ke Step 1.3

---

### Step 1.2: Commit Semua Perubahan

Jika ada file yang belum di-commit:

```bash
# 1. Add semua file
git add .

# 2. Commit dengan message
git commit -m "Ready for Vercel deployment"
```

**Penjelasan:**
- `git add .` = Menambahkan semua file yang berubah ke staging area
- `git commit -m "..."` = Menyimpan perubahan dengan pesan deskriptif

**Catatan Penting:**
- File `.env.local` TIDAK akan di-commit (sudah ada di .gitignore)
- Ini bagus untuk keamanan, credentials tidak akan ke-upload ke GitHub

---

### Step 1.3: Cek Remote Repository

Cek apakah sudah terhubung dengan GitHub:

```bash
git remote -v
```

**Hasil yang mungkin muncul:**

**A. Jika sudah ada remote (muncul URL GitHub):**
```
origin  https://github.com/username/ikm-juara.git (fetch)
origin  https://github.com/username/ikm-juara.git (push)
```
→ **Lanjut ke Step 1.5**

**B. Jika kosong (tidak ada output):**
→ **Lanjut ke Step 1.4**

---

### Step 1.4: Setup GitHub Repository (Jika Belum Ada)

#### A. Buat Repository di GitHub

1. **Buka browser**, pergi ke: https://github.com
2. **Login** dengan akun GitHub Anda
3. **Klik tombol "+" di kanan atas** → Pilih "New repository"
4. **Isi form:**
   - **Repository name**: `ikm-juara-database` (atau nama lain)
   - **Description**: `Sistem Database IKM JUARA - DisnakerKUKM Kota Madiun`
   - **Visibility**: 
     - ✅ **Private** (recommended untuk project internal)
     - ⚪ Public (jika ingin open source)
   - **JANGAN centang** "Initialize this repository with:"
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license
5. **Klik "Create repository"**

#### B. Copy URL Repository

Setelah repository dibuat, akan muncul halaman dengan instruksi.

**Copy URL yang muncul**, contoh:
```
https://github.com/username/ikm-juara-database.git
```

#### C. Connect Local ke GitHub

Di terminal, jalankan:

```bash
# 1. Add remote origin (ganti URL dengan URL Anda)
git remote add origin https://github.com/username/ikm-juara-database.git

# 2. Rename branch ke main (jika masih master)
git branch -M main

# 3. Push ke GitHub
git push -u origin main
```

**Penjelasan:**
- `git remote add origin [URL]` = Menghubungkan local repo dengan GitHub
- `git branch -M main` = Rename branch ke "main" (standar baru GitHub)
- `git push -u origin main` = Upload code ke GitHub

**Tunggu proses upload selesai** (~30 detik - 2 menit tergantung koneksi)

---

### Step 1.5: Push Code ke GitHub (Jika Sudah Ada Remote)

Jika remote sudah ada, cukup push:

```bash
git push origin main
```

**Jika muncul error "rejected":**
```bash
# Pull dulu untuk sync
git pull origin main --rebase

# Lalu push lagi
git push origin main
```

---

### Step 1.6: Verifikasi di GitHub

1. **Buka browser**, pergi ke repository Anda:
   ```
   https://github.com/username/ikm-juara-database
   ```

2. **Pastikan semua file sudah ada:**
   - ✅ Folder `app/`
   - ✅ Folder `components/`
   - ✅ Folder `lib/`
   - ✅ File `package.json`
   - ✅ File `next.config.js`
   - ✅ File `README.md`
   - ✅ File `supabase-schema.sql`
   - ❌ File `.env.local` (TIDAK boleh ada - ini benar!)

3. **Cek commit terakhir** di bagian atas:
   - Harus ada commit "Ready for Vercel deployment" (atau message Anda)

**Jika semua ✅, lanjut ke Bagian 2!**

---

## 🌐 BAGIAN 2: Deploy ke Vercel

### Step 2.1: Buka Vercel

1. **Buka browser**, pergi ke: https://vercel.com
2. **Klik "Sign Up"** (jika belum punya akun) atau **"Log In"** (jika sudah punya)

---

### Step 2.2: Login dengan GitHub

**Pilih "Continue with GitHub"**

**Apa yang terjadi:**
1. Akan redirect ke GitHub
2. GitHub akan minta izin untuk Vercel mengakses repository Anda
3. **Klik "Authorize Vercel"**
4. Mungkin diminta password GitHub → Masukkan password
5. Akan redirect kembali ke Vercel Dashboard

**Sekarang Anda sudah login ke Vercel!**

---

### Step 2.3: Import Project

Di Vercel Dashboard:

1. **Klik tombol "Add New..."** (di kanan atas)
2. **Pilih "Project"** dari dropdown

**Halaman "Import Git Repository" akan muncul**

---

### Step 2.4: Pilih Repository

Di halaman Import:

1. **Cari repository Anda** di list
   - Ketik nama repository di search box: `ikm-juara-database`
   - Atau scroll untuk cari manual

2. **Klik tombol "Import"** di sebelah kanan repository Anda

**Jika repository tidak muncul:**
- Klik "Adjust GitHub App Permissions"
- Pilih "All repositories" atau pilih repository specific
- Save → Kembali ke Vercel → Refresh

---

### Step 2.5: Configure Project

Setelah klik Import, akan muncul halaman "Configure Project".

#### A. Project Settings (Bagian Atas)

**Biarkan default:**
- ✅ **Project Name**: `ikm-juara-database` (atau auto-generated)
- ✅ **Framework Preset**: Next.js (auto-detected)
- ✅ **Root Directory**: `./` (default)

**Jangan ubah apapun di bagian ini!**

#### B. Build and Output Settings (Tengah)

**Biarkan default, jangan expand!**
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

#### C. Environment Variables (Bagian Bawah)

**INI BAGIAN PALING PENTING!**

**Klik "Environment Variables"** untuk expand section ini.

---

### Step 2.6: Set Environment Variables

**SANGAT PENTING:** Aplikasi tidak akan berfungsi tanpa ini!

#### A. Buka File .env.local

Di VS Code atau text editor, buka file `.env.local` di project Anda.

**Anda akan lihat:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Siapkan kedua value ini untuk di-copy!**

#### B. Tambahkan Variable 1: SUPABASE_URL

Di Vercel, di section "Environment Variables":

1. **Field "Key"** (kiri):
   ```
   NEXT_PUBLIC_SUPABASE_URL
   ```
   ⚠️ **HARUS PERSIS SAMA** (case-sensitive, termasuk underscore)

2. **Field "Value"** (kanan):
   - Copy dari `.env.local` Anda
   - Contoh: `https://abcdefghijk.supabase.co`
   - **Paste di field Value**

3. **Environment** (bawah):
   - ✅ Production (checked)
   - ✅ Preview (checked)
   - ✅ Development (checked)
   - **Biarkan semua checked!**

4. **Klik tombol "Add"**

**Variable pertama sudah ditambahkan!** ✅

#### C. Tambahkan Variable 2: SUPABASE_ANON_KEY

Sekarang tambahkan variable kedua:

1. **Field "Key"**:
   ```
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```
   ⚠️ **HARUS PERSIS SAMA**

2. **Field "Value"**:
   - Copy dari `.env.local` Anda
   - Ini adalah key yang PANJANG (mulai dengan `eyJhbGc...`)
   - **Paste SELURUH key** (jangan sampai terpotong!)

3. **Environment**:
   - ✅ Semua checked (Production, Preview, Development)

4. **Klik tombol "Add"**

**Variable kedua sudah ditambahkan!** ✅

#### D. Verifikasi Environment Variables

Sekarang Anda harus lihat **2 variables** di list:

```
✅ NEXT_PUBLIC_SUPABASE_URL
   Value: https://xxxxx.supabase.co (hidden)
   
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGc... (hidden)
```

**Cek lagi:**
- ✅ Nama variable PERSIS sama (tidak ada typo)
- ✅ Tidak ada spasi di awal/akhir
- ✅ Value sudah benar (dari .env.local)

**Jika ada yang salah:**
- Klik icon "..." di sebelah kanan variable
- Pilih "Edit" atau "Remove"
- Perbaiki dan add lagi

---

### Step 2.7: Deploy!

Setelah environment variables di-set:

1. **Scroll ke bawah**
2. **Klik tombol besar "Deploy"** (warna biru)

**Proses deployment dimulai!** 🚀

---

### Step 2.8: Tunggu Build Process

Anda akan dibawa ke halaman "Building".

**Apa yang terjadi:**
1. **Cloning Repository** (~5 detik)
   - Vercel download code dari GitHub
   
2. **Installing Dependencies** (~30-60 detik)
   - Running `npm install`
   - Download semua packages
   
3. **Building** (~60-120 detik)
   - Running `npm run build`
   - Compile Next.js app
   - Generate static pages
   
4. **Deploying** (~10-20 detik)
   - Upload build ke Vercel CDN
   - Setup routing

**Total waktu: 2-4 menit**

**Anda bisa lihat logs real-time** di halaman ini.

---

### Step 2.9: Build Berhasil! 🎉

Jika build berhasil, akan muncul:

1. **Confetti animation** 🎊
2. **"Congratulations!"** message
3. **Screenshot preview** aplikasi Anda
4. **Production URL**: `https://ikm-juara-xxx.vercel.app`

**Tombol yang tersedia:**
- **"Visit"** → Buka aplikasi di browser
- **"Continue to Dashboard"** → Ke Vercel dashboard

---

### Step 2.10: Buka Production URL

**Klik tombol "Visit"** atau copy URL dan buka di browser.

**Anda akan lihat aplikasi IKM JUARA live!** 🎉

---

## ✅ BAGIAN 3: Verifikasi Production

### Step 3.1: Test Login

1. **Di production URL**, klik "Login"
2. **Pilih mode "Admin"**
3. **Klik "Masuk"**

**Jika berhasil:** Masuk ke Dashboard ✅

**Jika error:** Lanjut ke Troubleshooting di bawah

---

### Step 3.2: Test Data dari Supabase

1. **Klik menu "IKM Binaan"** di sidebar
2. **Pastikan muncul 5 data:**
   - Budi Santoso - Batik Madiun Jaya
   - Siti Aminah - Keripik Tempe Sari
   - Ahmad Hidayat - Furniture Jati Madiun
   - Dewi Lestari - Kue Kering Dewi
   - Eko Prasetyo - Konveksi Eko Jaya

**Jika data muncul:** Koneksi Supabase berhasil! ✅

**Jika data tidak muncul:** Lanjut ke Troubleshooting

---

### Step 3.3: Test Fitur Baru - Laporan Pelatihan

1. **Klik menu "Laporan IKM JUARA"**
2. **Pilih "Pelatihan"** di dropdown Jenis Layanan
3. **Filter "Filter Jenis Pelatihan"** akan muncul
4. **Pilih "Pelatihan Digital Marketing"**
5. **Klik "Cari Data"**
6. **Klik tombol "▼ Lihat Peserta"** pada baris pelatihan
7. **Detail peserta harus muncul** (3 peserta)

**Jika semua berfungsi:** Fitur baru berhasil! ✅

---

### Step 3.4: Test CRUD Operations

**Test Create:**
1. Klik "Tambah IKM Binaan"
2. Isi form dengan data test
3. Simpan
4. Data harus muncul di tabel ✅

**Test Update:**
1. Klik icon edit (pensil) pada data
2. Ubah nama atau data lain
3. Update
4. Perubahan harus tersimpan ✅

**Test Delete:**
1. Klik icon hapus (trash)
2. Konfirmasi
3. Data harus hilang dari tabel ✅

**Test Restore:**
1. Buka menu "Recycle Bin"
2. Data yang dihapus harus ada di sini
3. Klik "Restore"
4. Data kembali ke tabel IKM Binaan ✅

---

### Step 3.5: Test Mobile Responsive

1. **Buka Chrome DevTools** (F12)
2. **Klik icon "Toggle device toolbar"** (Ctrl+Shift+M)
3. **Pilih device**: iPhone 12 Pro, iPad, dll
4. **Test navigasi dan fitur**

**Pastikan:**
- ✅ Sidebar berfungsi di mobile
- ✅ Tabel bisa di-scroll horizontal
- ✅ Form bisa diisi dengan baik
- ✅ Tombol tidak terpotong

---

### Step 3.6: Cek Browser Console

1. **Tekan F12** untuk buka DevTools
2. **Tab "Console"**
3. **Pastikan TIDAK ada error merah**

**Yang normal:**
- Info logs (biru) → OK
- Warning (kuning) → Biasanya OK
- Error (merah) → HARUS diperbaiki!

---

## 🎉 SELESAI! Deployment Berhasil!

### 📊 Summary

- ✅ Code di-push ke GitHub
- ✅ Project di-import ke Vercel
- ✅ Environment variables di-set
- ✅ Build berhasil
- ✅ Aplikasi live di production
- ✅ Koneksi Supabase berfungsi
- ✅ Semua fitur berfungsi

### 🌐 Production URL

```
https://ikm-juara-xxx.vercel.app
```

**Simpan URL ini dan share dengan tim!**

---

## 🔧 TROUBLESHOOTING

### ❌ Error: "Failed to fetch" di Production

**Penyebab:** Environment variables tidak di-set dengan benar

**Solusi:**

1. **Buka Vercel Dashboard**
2. **Pilih project** "ikm-juara-database"
3. **Klik tab "Settings"**
4. **Klik "Environment Variables"** di sidebar
5. **Cek kedua variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. **Jika salah atau tidak ada:**
   - Klik "Add New"
   - Masukkan key dan value yang benar
   - Save
7. **Redeploy:**
   - Klik tab "Deployments"
   - Klik "..." di deployment terakhir
   - Pilih "Redeploy"
   - Tunggu build selesai

---

### ❌ Error: Build Failed

**Penyebab:** TypeScript error atau missing dependencies

**Solusi:**

1. **Lihat build logs di Vercel:**
   - Tab "Deployments"
   - Klik deployment yang failed
   - Tab "Building"
   - Scroll untuk lihat error

2. **Test build di local:**
   ```bash
   npm run build
   ```

3. **Jika ada error:**
   - Fix error di code
   - Commit & push:
     ```bash
     git add .
     git commit -m "Fix build error"
     git push origin main
     ```
   - Vercel akan auto-redeploy

---

### ❌ Data Tidak Muncul di Production

**Penyebab:** Data belum diinsert di Supabase atau RLS issue

**Solusi:**

1. **Cek data di Supabase:**
   - Buka Supabase Dashboard
   - SQL Editor
   - Run: `SELECT * FROM ikm_binaan;`
   - Harus ada 5 rows

2. **Jika kosong:**
   - Run script: `scripts/insert-dummy-data.sql`
   - Refresh aplikasi

3. **Jika masih tidak muncul:**
   - Cek RLS policies:
     ```sql
     SELECT * FROM pg_policies WHERE tablename = 'ikm_binaan';
     ```
   - Harus ada policy: "Enable all for all users"

---

### ❌ Environment Variables Tidak Terbaca

**Penyebab:** Typo di nama variable atau tidak di-set untuk Production

**Solusi:**

1. **Cek nama variable PERSIS:**
   - ✅ `NEXT_PUBLIC_SUPABASE_URL` (bukan `SUPABASE_URL`)
   - ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` (bukan `ANON_KEY`)

2. **Cek environment:**
   - Vercel → Settings → Environment Variables
   - Pastikan "Production" checked ✅

3. **Redeploy setelah fix**

---

### ❌ Vercel Dashboard Tidak Muncul Repository

**Penyebab:** Vercel tidak punya akses ke repository

**Solusi:**

1. **Adjust GitHub permissions:**
   - Vercel → Import page
   - Klik "Adjust GitHub App Permissions"
   - Pilih "All repositories" atau select specific
   - Save

2. **Atau install Vercel GitHub App:**
   - GitHub → Settings → Applications
   - Vercel → Configure
   - Repository access → Grant access

---

## 📞 Butuh Bantuan Lebih?

### Dokumentasi
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)

### Support
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support

### Community
- Vercel Discord: https://vercel.com/discord
- Next.js Discord: https://nextjs.org/discord

---

## 🎯 Next Steps

Setelah deployment berhasil:

### 1. Custom Domain (Opsional)

Jika ingin domain sendiri:

1. **Vercel Dashboard** → Project → Settings → Domains
2. **Add Domain**: `ikm-juara.disnakermadiun.go.id`
3. **Update DNS** sesuai instruksi Vercel:
   - Type: A Record
   - Name: @ atau subdomain
   - Value: IP dari Vercel
4. **Tunggu propagasi** (~24 jam)
5. **SSL auto-enabled** oleh Vercel

### 2. Setup Monitoring

**Vercel Analytics:**
1. Project → Analytics tab
2. Enable Analytics
3. Lihat visitor stats, performance, dll

**Supabase Monitoring:**
1. Supabase Dashboard → Database → Logs
2. Monitor queries, errors, performance

### 3. Setup Auto-Deploy

**Sudah aktif by default!**

Setiap kali Anda push ke GitHub:
```bash
git push origin main
```

Vercel akan otomatis:
1. Detect perubahan
2. Build ulang
3. Deploy ke production

**Preview Deployments:**
- Setiap PR (Pull Request) dapat preview URL sendiri
- Test sebelum merge ke main

### 4. Team Collaboration

**Invite team members:**
1. Vercel Dashboard → Settings → Team
2. Invite by email
3. Set role (Admin/Member/Viewer)

---

## ✅ Final Checklist

Pastikan semua ini sudah ✅:

- [ ] Code di-push ke GitHub
- [ ] Repository visible di Vercel
- [ ] Project di-import ke Vercel
- [ ] Environment variables di-set (2 variables)
- [ ] Build berhasil (tidak ada error)
- [ ] Production URL bisa diakses
- [ ] Login berfungsi
- [ ] Data dari Supabase muncul
- [ ] CRUD operations berfungsi
- [ ] Laporan pelatihan berfungsi
- [ ] Detail peserta muncul
- [ ] Mobile responsive
- [ ] Tidak ada error di console
- [ ] Production URL di-save dan di-share

---

## 🎊 Congratulations!

**Aplikasi IKM JUARA Database sudah live di production!**

**Production URL:** `https://ikm-juara-xxx.vercel.app`

Share URL ini dengan:
- ✅ Tim DisnakerKUKM
- ✅ Admin yang akan menggunakan
- ✅ Stakeholders

**Aplikasi siap digunakan!** 🚀

---

**Dibuat dengan ❤️ untuk DisnakerKUKM Kota Madiun**

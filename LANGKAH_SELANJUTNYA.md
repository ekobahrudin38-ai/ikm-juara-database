# 🎯 Langkah Selanjutnya - Setelah Test Local

## ✅ Status Saat Ini

- ✅ Supabase sudah setup
- ✅ Environment variables sudah dikonfigurasi
- ✅ Development server running di **http://localhost:3001**

---

## 🧪 Step 2.2: Test Local (SEKARANG)

### 1. Buka Browser
```
URL: http://localhost:3001
```

### 2. Test Login
```
1. Klik "Login" atau buka http://localhost:3001/login
2. Pilih mode "Admin"
3. Klik "Masuk"
```

### 3. Test Dashboard
```
1. Setelah login, Anda akan masuk ke Dashboard
2. Cek apakah statistik muncul:
   - Total IKM Binaan: 5
   - Total Pelatihan: 3
   - Total HKI Merek: 3
   - dll.
```

### 4. Test Data dari Supabase
```
1. Klik menu "IKM Binaan" di sidebar
2. Pastikan muncul 5 data IKM:
   - Budi Santoso - Batik Madiun Jaya
   - Siti Aminah - Keripik Tempe Sari
   - Ahmad Hidayat - Furniture Jati Madiun
   - Dewi Lestari - Kue Kering Dewi
   - Eko Prasetyo - Konveksi Eko Jaya
```

### 5. Test Fitur Baru - Laporan Pelatihan
```
1. Klik menu "Laporan IKM JUARA"
2. Pilih "Pelatihan" di dropdown Jenis Layanan
3. Filter "Filter Jenis Pelatihan" akan muncul
4. Pilih "Pelatihan Digital Marketing"
5. Klik "Cari Data"
6. Klik tombol "▼ Lihat Peserta" pada baris pelatihan
7. Pastikan detail peserta muncul (3 peserta)
```

### 6. Test CRUD Operations
```
1. Tambah IKM Binaan baru:
   - Klik "Tambah IKM Binaan"
   - Isi form
   - Simpan
   - Cek data muncul di tabel

2. Edit data:
   - Klik icon edit (pensil)
   - Ubah data
   - Update
   - Cek perubahan tersimpan

3. Hapus data:
   - Klik icon hapus (trash)
   - Konfirmasi
   - Cek data masuk Recycle Bin

4. Restore data:
   - Buka menu "Recycle Bin"
   - Klik "Restore"
   - Cek data kembali ke tabel
```

### 7. Cek Browser Console
```
1. Tekan F12 untuk buka Developer Tools
2. Tab "Console"
3. Pastikan TIDAK ada error merah
4. Jika ada error koneksi Supabase, cek .env.local
```

---

## ✅ Checklist Test Local

Pastikan semua ini berfungsi:

- [ ] Server running di http://localhost:3001
- [ ] Login berhasil
- [ ] Dashboard menampilkan statistik
- [ ] Data IKM Binaan muncul (5 data dari Supabase)
- [ ] Data Pelatihan muncul (3 data)
- [ ] Filter jenis pelatihan berfungsi
- [ ] Detail peserta muncul saat diklik
- [ ] CRUD operations berfungsi (Create, Read, Update, Delete)
- [ ] Recycle Bin berfungsi
- [ ] Tidak ada error di console

---

## 🚀 Step 3: Deploy ke Vercel

Jika semua test local berhasil, lanjut ke deployment!

### 3.1 Persiapan Git & GitHub

#### A. Cek Status Git
```bash
git status
```

#### B. Commit Semua Perubahan
```bash
git add .
git commit -m "Ready for production deployment"
```

#### C. Push ke GitHub

**Jika belum ada remote:**
```bash
# 1. Buat repository baru di GitHub
# 2. Copy URL repository (https://github.com/username/ikm-juara.git)

# 3. Add remote
git remote add origin https://github.com/username/ikm-juara.git

# 4. Push
git branch -M main
git push -u origin main
```

**Jika sudah ada remote:**
```bash
git push origin main
```

---

### 3.2 Deploy di Vercel

#### A. Login ke Vercel
```
1. Buka https://vercel.com
2. Login dengan GitHub account
3. Authorize Vercel untuk akses GitHub
```

#### B. Import Project
```
1. Klik "Add New..." → "Project"
2. Pilih repository "ikm-juara" (atau nama repo Anda)
3. Klik "Import"
```

#### C. Configure Project
```
Framework Preset: Next.js (auto-detected) ✅
Root Directory: ./ (default) ✅
Build Command: npm run build (default) ✅
Output Directory: .next (default) ✅
```

#### D. Set Environment Variables

**PENTING! Jangan klik Deploy dulu!**

```
1. Scroll ke bawah, expand "Environment Variables"

2. Tambahkan Variable 1:
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: [Copy dari .env.local Anda]
   
3. Tambahkan Variable 2:
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [Copy dari .env.local Anda]

4. Pastikan tidak ada typo atau spasi
```

#### E. Deploy!
```
1. Klik tombol "Deploy"
2. Tunggu build process (~2-3 menit)
3. Jika berhasil, akan muncul confetti 🎉
4. Klik "Visit" untuk buka production URL
```

---

### 3.3 Verifikasi Production

#### A. Test Production URL
```
1. Buka URL: https://ikm-juara-xxx.vercel.app
2. Login sebagai Admin
3. Test semua fitur seperti di local
```

#### B. Checklist Production
- [ ] Production URL bisa diakses
- [ ] Login berfungsi
- [ ] Dashboard menampilkan data
- [ ] Data dari Supabase muncul
- [ ] CRUD operations berfungsi
- [ ] Laporan pelatihan berfungsi
- [ ] Detail peserta muncul
- [ ] Tidak ada error di console
- [ ] Mobile responsive

---

## 🎉 Selesai!

Jika semua checklist ✅, aplikasi sudah berhasil di-deploy!

### Production URL
```
https://ikm-juara-xxx.vercel.app
```

### Custom Domain (Opsional)

Jika ingin custom domain:
```
1. Di Vercel Dashboard → Settings → Domains
2. Add domain: ikm-juara.disnakermadiun.go.id
3. Update DNS sesuai instruksi Vercel
4. Tunggu propagasi DNS (~24 jam)
```

---

## 🔧 Troubleshooting

### Error: "Failed to fetch" di Production

**Penyebab**: Environment variables tidak di-set dengan benar

**Solusi**:
```
1. Vercel Dashboard → Settings → Environment Variables
2. Cek NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Pastikan valuenya sama dengan .env.local
4. Redeploy: Deployments → ... → Redeploy
```

### Error: Build Failed

**Penyebab**: Missing dependencies atau TypeScript error

**Solusi**:
```
1. Cek Vercel build logs
2. Test build local: npm run build
3. Fix error yang muncul
4. Push fix ke GitHub (auto-redeploy)
```

### Data Tidak Muncul di Production

**Penyebab**: Supabase RLS policies atau data belum diinsert

**Solusi**:
```
1. Buka Supabase Dashboard
2. SQL Editor → Run: SELECT * FROM ikm_binaan;
3. Pastikan ada 5 data
4. Jika kosong, run scripts/insert-dummy-data.sql
```

---

## 📞 Butuh Bantuan?

### Dokumentasi Lengkap
- [SETUP_SUPABASE_VERCEL.md](./SETUP_SUPABASE_VERCEL.md) - Panduan detail
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Checklist lengkap

### Resources
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

---

## 🎯 Next Steps

1. ✅ Test local (Anda di sini)
2. ⏭️ Push ke GitHub
3. ⏭️ Deploy ke Vercel
4. ⏭️ Verifikasi production
5. ⏭️ Share URL dengan tim!

---

**Good luck! 🚀**

Jika ada pertanyaan atau error, screenshot dan tanyakan!

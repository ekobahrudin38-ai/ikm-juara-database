# 📱 Deploy Step-by-Step - Visual Guide

Panduan deployment dengan langkah-langkah visual yang mudah diikuti.

---

## 🎯 Ringkasan Proses

```
┌─────────────────────────────────────────────────────────┐
│  1. Setup Supabase (5 menit)         ✅ SELESAI         │
│  2. Test Local (3 menit)             ✅ SELESAI         │
│  3. Upload ke GitHub (5 menit)       ⏭️ SEKARANG       │
│  4. Deploy ke Vercel (5 menit)       ⏭️ BERIKUTNYA     │
│  5. Verifikasi (2 menit)             ⏭️ TERAKHIR       │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 STEP 3: Upload ke GitHub

### Cara Termudah: GitHub Desktop

#### 1️⃣ Download & Install GitHub Desktop

```
┌──────────────────────────────────────────┐
│  🌐 Buka Browser                         │
│  → https://desktop.github.com            │
│  → Download for Windows                  │
│  → Install (Next, Next, Finish)          │
└──────────────────────────────────────────┘
```

#### 2️⃣ Login ke GitHub

```
┌──────────────────────────────────────────┐
│  📱 Buka GitHub Desktop                  │
│  → File → Options → Accounts             │
│  → Sign in to GitHub.com                 │
│  → Login dengan akun GitHub              │
│                                          │
│  Belum punya akun?                       │
│  → https://github.com/signup             │
└──────────────────────────────────────────┘
```

#### 3️⃣ Add Repository

```
┌──────────────────────────────────────────┐
│  📁 Di GitHub Desktop:                   │
│                                          │
│  File → Add Local Repository             │
│  → Choose: D:\IKMJUARAV1                 │
│  → Add Repository                        │
│                                          │
│  Jika muncul error "not a git repo":    │
│  → Klik "create a repository"            │
│  → Name: ikm-juara-database              │
│  → Create Repository                     │
└──────────────────────────────────────────┘
```

#### 4️⃣ Commit Files

```
┌──────────────────────────────────────────┐
│  💾 Commit Changes:                      │
│                                          │
│  Summary (required):                     │
│  ┌────────────────────────────────────┐ │
│  │ Initial commit - IKM JUARA         │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Description (optional):                 │
│  ┌────────────────────────────────────┐ │
│  │ Ready for production deployment    │ │
│  └────────────────────────────────────┘ │
│                                          │
│  → Commit to main                        │
└──────────────────────────────────────────┘
```

#### 5️⃣ Publish to GitHub

```
┌──────────────────────────────────────────┐
│  🚀 Publish Repository:                  │
│                                          │
│  → Klik "Publish repository" (top bar)   │
│                                          │
│  Name: ikm-juara-database                │
│  Description: Database IKM JUARA         │
│  ☐ Keep this code private (optional)     │
│                                          │
│  → Publish Repository                    │
│  → Tunggu upload selesai (~1-2 menit)    │
└──────────────────────────────────────────┘
```

---

## 🚀 STEP 4: Deploy ke Vercel

#### 1️⃣ Login ke Vercel

```
┌──────────────────────────────────────────┐
│  🌐 Buka Browser                         │
│  → https://vercel.com                    │
│  → Sign Up / Login                       │
│  → Continue with GitHub                  │
│  → Authorize Vercel                      │
└──────────────────────────────────────────┘
```

#### 2️⃣ Import Project

```
┌──────────────────────────────────────────┐
│  📦 Di Vercel Dashboard:                 │
│                                          │
│  → Add New...                            │
│  → Project                               │
│  → Import Git Repository                 │
│  → Cari "ikm-juara-database"             │
│  → Import                                │
└──────────────────────────────────────────┘
```

#### 3️⃣ Configure Project

```
┌──────────────────────────────────────────┐
│  ⚙️ Project Settings:                    │
│                                          │
│  Framework Preset: Next.js ✅            │
│  Root Directory: ./ ✅                   │
│  Build Command: npm run build ✅         │
│  Output Directory: .next ✅              │
│                                          │
│  ✅ Semua auto-detected, tidak perlu     │
│     diubah!                              │
└──────────────────────────────────────────┘
```

#### 4️⃣ Set Environment Variables

```
┌──────────────────────────────────────────┐
│  🔐 Environment Variables:               │
│                                          │
│  ⚠️ PENTING! Jangan klik Deploy dulu!   │
│                                          │
│  → Scroll ke bawah                       │
│  → Expand "Environment Variables"        │
│                                          │
│  Variable 1:                             │
│  ┌────────────────────────────────────┐ │
│  │ Name: NEXT_PUBLIC_SUPABASE_URL     │ │
│  │ Value: https://xxxxx.supabase.co   │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Variable 2:                             │
│  ┌────────────────────────────────────┐ │
│  │ Name: NEXT_PUBLIC_SUPABASE_ANON_KEY│ │
│  │ Value: eyJhbGc...                  │ │
│  └────────────────────────────────────┘ │
│                                          │
│  💡 Copy value dari file .env.local      │
└──────────────────────────────────────────┘
```

#### 5️⃣ Deploy!

```
┌──────────────────────────────────────────┐
│  🚀 Deploy:                              │
│                                          │
│  → Klik tombol "Deploy"                  │
│  → Tunggu build process (~2-3 menit)     │
│                                          │
│  Progress:                               │
│  ⏳ Queued...                            │
│  ⏳ Building...                          │
│  ⏳ Deploying...                         │
│  ✅ Ready!                               │
│                                          │
│  🎉 Confetti animation muncul!           │
│                                          │
│  → Klik "Visit" untuk buka website       │
└──────────────────────────────────────────┘
```

---

## ✅ STEP 5: Verifikasi

#### 1️⃣ Test Production URL

```
┌──────────────────────────────────────────┐
│  🌐 Production URL:                      │
│  https://ikm-juara-xxx.vercel.app        │
│                                          │
│  Test Checklist:                         │
│  ☐ Website bisa dibuka                   │
│  ☐ Login page muncul                     │
│  ☐ Login sebagai Admin berhasil          │
│  ☐ Dashboard menampilkan statistik       │
│  ☐ Data IKM Binaan muncul (5 data)       │
│  ☐ Data Pelatihan muncul (3 data)        │
└──────────────────────────────────────────┘
```

#### 2️⃣ Test Fitur Baru

```
┌──────────────────────────────────────────┐
│  🎓 Test Laporan Pelatihan:              │
│                                          │
│  1. Klik menu "Laporan IKM JUARA"        │
│  2. Pilih "Pelatihan" di dropdown        │
│  3. Filter jenis pelatihan muncul ✅     │
│  4. Pilih "Pelatihan Digital Marketing"  │
│  5. Klik "Cari Data"                     │
│  6. Klik "▼ Lihat Peserta"               │
│  7. Detail peserta muncul (3 orang) ✅   │
└──────────────────────────────────────────┘
```

#### 3️⃣ Test CRUD

```
┌──────────────────────────────────────────┐
│  ✏️ Test CRUD Operations:                │
│                                          │
│  CREATE:                                 │
│  ☐ Tambah IKM Binaan baru → Berhasil     │
│                                          │
│  READ:                                   │
│  ☐ Data muncul di tabel → OK             │
│                                          │
│  UPDATE:                                 │
│  ☐ Edit data → Tersimpan                 │
│                                          │
│  DELETE:                                 │
│  ☐ Hapus data → Masuk Recycle Bin        │
│                                          │
│  RESTORE:                                │
│  ☐ Restore dari Recycle Bin → Kembali    │
└──────────────────────────────────────────┘
```

#### 4️⃣ Test Mobile

```
┌──────────────────────────────────────────┐
│  📱 Test di Mobile:                      │
│                                          │
│  1. Buka URL di HP                       │
│  2. Cek responsive layout                │
│  3. Test login                           │
│  4. Test navigasi                        │
│  5. Test fitur utama                     │
│                                          │
│  ☐ Semua berfungsi dengan baik           │
└──────────────────────────────────────────┘
```

---

## 🎉 SELESAI!

```
╔═══════════════════════════════════════════╗
║                                           ║
║   🎊 DEPLOYMENT BERHASIL! 🎊              ║
║                                           ║
║   Production URL:                         ║
║   https://ikm-juara-xxx.vercel.app        ║
║                                           ║
║   ✅ Aplikasi sudah live                  ║
║   ✅ Database terhubung                   ║
║   ✅ Semua fitur berfungsi                ║
║                                           ║
╚═══════════════════════════════════════════╝
```

---

## 🔄 Update Aplikasi (Future)

Jika ada perubahan code:

```
┌──────────────────────────────────────────┐
│  1. Edit code di local                   │
│  2. Test: npm run dev                    │
│  3. GitHub Desktop:                      │
│     → Commit changes                     │
│     → Push origin                        │
│  4. Vercel auto-deploy! ✅               │
│  5. Cek production URL                   │
└──────────────────────────────────────────┘
```

---

## 🆘 Troubleshooting Quick Fix

### ❌ Error: "Failed to fetch"
```
→ Vercel Dashboard → Settings → Environment Variables
→ Cek SUPABASE_URL dan ANON_KEY
→ Redeploy
```

### ❌ Error: Build Failed
```
→ Vercel Dashboard → Deployments → View Logs
→ Cari error message
→ Fix di local
→ Push ulang
```

### ❌ Data tidak muncul
```
→ Supabase Dashboard → SQL Editor
→ Run: SELECT * FROM ikm_binaan;
→ Jika kosong, run: scripts/insert-dummy-data.sql
```

---

## 📞 Butuh Bantuan?

### Dokumentasi Lengkap
- [DEPLOY_TANPA_GIT_CLI.md](./DEPLOY_TANPA_GIT_CLI.md) - Opsi deployment
- [SETUP_SUPABASE_VERCEL.md](./SETUP_SUPABASE_VERCEL.md) - Panduan detail
- [COMMANDS.md](./COMMANDS.md) - Command reference

### Video Tutorial
- GitHub Desktop: https://www.youtube.com/watch?v=8Dd7KRpKeaE
- Vercel Deploy: https://www.youtube.com/watch?v=2HBIzEx6IZA

---

## 🎯 Next Steps

Setelah deployment berhasil:

1. ✅ Share URL dengan tim
2. ✅ Setup custom domain (opsional)
3. ✅ Enable Vercel Analytics (opsional)
4. ✅ Setup monitoring & alerts
5. ✅ Dokumentasi untuk user

---

**Selamat! Aplikasi IKM JUARA sudah production-ready! 🚀**

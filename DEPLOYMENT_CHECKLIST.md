# ✅ Deployment Checklist - IKM JUARA

Gunakan checklist ini untuk memastikan deployment berjalan lancar.

---

## 📋 Pre-Deployment

### Kode & Dependencies
- [ ] Semua fitur sudah di-test local
- [ ] Build berhasil: `npm run build`
- [ ] Tidak ada error TypeScript
- [ ] Tidak ada console.error di production code
- [ ] Dependencies up-to-date: `npm outdated`
- [ ] .gitignore sudah benar (exclude .env.local, node_modules, .next)

### Environment Variables
- [ ] File .env.local.example sudah ada
- [ ] File .env.local TIDAK di-commit ke Git
- [ ] Semua env vars terdokumentasi

---

## 🗄️ Supabase Setup

### Database
- [ ] Project Supabase sudah dibuat
- [ ] Region: Southeast Asia (Singapore)
- [ ] Database password disimpan aman
- [ ] Schema SQL sudah dijalankan (supabase-schema.sql)
- [ ] Semua tabel berhasil dibuat (11 tabel)
- [ ] Indexes sudah dibuat
- [ ] RLS (Row Level Security) sudah enabled
- [ ] Policies sudah dibuat untuk semua tabel

### Data
- [ ] Data dummy sudah diinsert (scripts/insert-dummy-data.sql)
- [ ] Verifikasi: 5 IKM Binaan
- [ ] Verifikasi: 3 Pelatihan
- [ ] Verifikasi: 9 Peserta Pelatihan
- [ ] Verifikasi: 3 HKI Merek
- [ ] Verifikasi: 2 Sertifikat Halal
- [ ] Verifikasi: 1 TKDN IK
- [ ] Verifikasi: 2 SIINas
- [ ] Verifikasi: 2 Uji Nilai Gizi
- [ ] Verifikasi: 2 Kurasi Produk
- [ ] Verifikasi: 5 Log Aktivitas

### API Keys
- [ ] Project URL dicopy: https://xxxxx.supabase.co
- [ ] Anon public key dicopy: eyJhbGc...
- [ ] Keys disimpan di tempat aman (password manager)

---

## 🔧 Local Testing

### Environment
- [ ] .env.local sudah dibuat
- [ ] NEXT_PUBLIC_SUPABASE_URL sudah diisi
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY sudah diisi
- [ ] Dev server berjalan: `npm run dev`

### Koneksi Database
- [ ] Tidak ada error koneksi di console
- [ ] Data dari Supabase muncul di aplikasi
- [ ] CRUD operations berfungsi (Create, Read, Update, Delete)

### Fitur Testing
- [ ] Login page berfungsi
- [ ] Dashboard menampilkan statistik
- [ ] IKM Binaan: CRUD berfungsi
- [ ] Pelatihan: CRUD berfungsi
- [ ] Laporan: Filter & detail peserta berfungsi
- [ ] Penelusuran: Search berfungsi
- [ ] Recycle Bin: Restore berfungsi
- [ ] Log Aktivitas: Tercatat dengan benar
- [ ] Semua layanan (HKI, Halal, TKDN, dll) berfungsi

---

## 📦 Git & GitHub

### Repository
- [ ] Git initialized: `git init`
- [ ] Repository GitHub sudah dibuat
- [ ] Remote origin sudah di-set
- [ ] .gitignore sudah benar

### Commit & Push
- [ ] Semua perubahan sudah di-commit
- [ ] Commit message jelas dan deskriptif
- [ ] Push ke GitHub berhasil: `git push -u origin main`
- [ ] Repository visible (public/private sesuai kebutuhan)

---

## 🚀 Vercel Deployment

### Project Setup
- [ ] Login ke Vercel dengan GitHub
- [ ] Import repository berhasil
- [ ] Framework: Next.js (auto-detected)
- [ ] Root directory: ./ (default)
- [ ] Build command: npm run build
- [ ] Output directory: .next

### Environment Variables
- [ ] NEXT_PUBLIC_SUPABASE_URL di-set di Vercel
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY di-set di Vercel
- [ ] Tidak ada typo di variable names
- [ ] Tidak ada spasi di awal/akhir values

### Build & Deploy
- [ ] Klik "Deploy"
- [ ] Build berhasil (tidak ada error)
- [ ] Deployment berhasil
- [ ] URL production didapat: https://xxx.vercel.app

---

## ✅ Post-Deployment Testing

### Basic Functionality
- [ ] Production URL bisa diakses
- [ ] Halaman login muncul
- [ ] Login sebagai Admin berhasil
- [ ] Dashboard menampilkan data
- [ ] Tidak ada error di browser console

### Data & Database
- [ ] Data IKM Binaan muncul (5 data)
- [ ] Data Pelatihan muncul (3 data)
- [ ] Koneksi ke Supabase stabil
- [ ] Query database berhasil

### CRUD Operations
- [ ] Create: Tambah IKM Binaan baru → Berhasil
- [ ] Read: Lihat data di tabel → Muncul
- [ ] Update: Edit data existing → Tersimpan
- [ ] Delete: Hapus data → Masuk Recycle Bin
- [ ] Restore: Restore dari Recycle Bin → Kembali

### Fitur Khusus
- [ ] Laporan: Filter jenis pelatihan berfungsi
- [ ] Laporan: Detail peserta muncul saat diklik
- [ ] Penelusuran: Search by NIB/NIK berfungsi
- [ ] Log Aktivitas: Tercatat otomatis
- [ ] Export Excel/PDF (demo mode) berfungsi

### Performance
- [ ] Page load < 3 detik
- [ ] Tidak ada lag saat navigasi
- [ ] Images/assets load dengan baik
- [ ] Mobile responsive

---

## 🔒 Security Check

### Environment Variables
- [ ] .env.local TIDAK di-commit ke Git
- [ ] Supabase keys tidak exposed di client code
- [ ] Vercel env vars di-set dengan benar

### Database Security
- [ ] RLS enabled di semua tabel
- [ ] Policies configured dengan benar
- [ ] Tidak ada SQL injection vulnerability
- [ ] Input validation di form

---

## 📊 Monitoring & Analytics

### Vercel Dashboard
- [ ] Deployment status: Success
- [ ] Build logs tidak ada error
- [ ] Runtime logs tidak ada error
- [ ] Analytics enabled (opsional)

### Supabase Dashboard
- [ ] Database size normal
- [ ] Query performance baik
- [ ] Tidak ada error di logs
- [ ] API usage dalam batas

---

## 📝 Documentation

### README
- [ ] README.md up-to-date
- [ ] Installation steps jelas
- [ ] Environment variables terdokumentasi
- [ ] Deployment guide tersedia

### Guides
- [ ] SETUP_SUPABASE_VERCEL.md tersedia
- [ ] QUICK_DEPLOY.md tersedia
- [ ] DEPLOYMENT_CHECKLIST.md tersedia (ini!)
- [ ] Troubleshooting guide tersedia

---

## 🎯 Optional Enhancements

### Custom Domain
- [ ] Domain dibeli/tersedia
- [ ] Domain di-add di Vercel
- [ ] DNS configured
- [ ] SSL certificate active

### Advanced Features
- [ ] Vercel Analytics enabled
- [ ] Error tracking (Sentry) setup
- [ ] Backup strategy defined
- [ ] Monitoring alerts configured

---

## 🐛 Troubleshooting

Jika ada masalah, cek:

1. **Build Failed**
   - [ ] Cek Vercel build logs
   - [ ] Verifikasi dependencies di package.json
   - [ ] Test build local: `npm run build`

2. **Runtime Error**
   - [ ] Cek Vercel runtime logs
   - [ ] Cek browser console
   - [ ] Verifikasi env vars di Vercel

3. **Database Error**
   - [ ] Cek Supabase logs
   - [ ] Test query di SQL Editor
   - [ ] Verifikasi RLS policies

4. **Connection Error**
   - [ ] Verifikasi Supabase URL benar
   - [ ] Verifikasi Anon Key benar
   - [ ] Cek Supabase project status

---

## ✨ Final Check

- [ ] Aplikasi berjalan di production
- [ ] Semua fitur berfungsi normal
- [ ] Tidak ada error di logs
- [ ] Performance memuaskan
- [ ] Documentation lengkap
- [ ] Team sudah diinformasikan
- [ ] URL production dibagikan

---

## 🎉 Deployment Complete!

**Production URL**: https://ikm-juara-xxx.vercel.app

**Deployed by**: _____________  
**Date**: _____________  
**Version**: 1.0.0

---

## 📞 Support Contacts

- **Vercel Support**: https://vercel.com/support
- **Supabase Support**: https://supabase.com/support
- **GitHub Issues**: https://github.com/username/ikm-juara/issues

---

**Selamat! Aplikasi IKM JUARA sudah production-ready!** 🚀

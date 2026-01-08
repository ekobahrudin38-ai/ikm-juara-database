# 🎮 Command Reference - Quick Commands

Daftar command yang sering digunakan untuk development dan deployment.

---

## 🚀 Development Commands

### Start Development Server
```bash
npm run dev
```
Server akan running di: http://localhost:3000 (atau 3001 jika 3000 sudah dipakai)

### Build for Production
```bash
npm run build
```
Test build sebelum deploy untuk memastikan tidak ada error.

### Start Production Server (Local)
```bash
npm run start
```
Jalankan setelah `npm run build` untuk test production build di local.

### Lint Code
```bash
npm run lint
```
Check code quality dan potential errors.

---

## 📦 Git Commands

### Check Status
```bash
git status
```
Lihat file yang berubah.

### Add All Changes
```bash
git add .
```
Stage semua perubahan untuk commit.

### Commit Changes
```bash
git commit -m "Your commit message"
```
Commit dengan message yang deskriptif.

### Push to GitHub
```bash
git push origin main
```
Upload code ke GitHub (akan trigger auto-deploy di Vercel).

### Create New Branch
```bash
git checkout -b feature/nama-fitur
```
Buat branch baru untuk development.

### Switch Branch
```bash
git checkout main
```
Pindah ke branch main.

---

## 🗄️ Supabase Commands

### Test Connection (via SQL Editor)
```sql
SELECT COUNT(*) FROM ikm_binaan;
```
Cek jumlah data IKM Binaan.

### View All IKM Data
```sql
SELECT * FROM ikm_binaan WHERE deleted_at IS NULL;
```
Lihat semua IKM yang tidak dihapus.

### View All Pelatihan
```sql
SELECT * FROM pelatihan;
```

### View Peserta Pelatihan with Details
```sql
SELECT 
  p.jenis_pelatihan,
  i.nama_lengkap,
  i.nama_usaha
FROM peserta_pelatihan pp
JOIN pelatihan p ON pp.pelatihan_id = p.id
JOIN ikm_binaan i ON pp.ikm_binaan_id = i.id
ORDER BY p.id, i.nama_lengkap;
```

### Check Table Counts
```sql
SELECT 
  'ikm_binaan' as tabel, COUNT(*) as jumlah FROM ikm_binaan
UNION ALL
SELECT 'pelatihan', COUNT(*) FROM pelatihan
UNION ALL
SELECT 'peserta_pelatihan', COUNT(*) FROM peserta_pelatihan
UNION ALL
SELECT 'hki_merek', COUNT(*) FROM hki_merek
UNION ALL
SELECT 'sertifikat_halal', COUNT(*) FROM sertifikat_halal;
```

### Reset Data (HATI-HATI!)
```sql
-- Hapus semua data (untuk reset)
TRUNCATE TABLE peserta_pelatihan CASCADE;
TRUNCATE TABLE pelatihan CASCADE;
TRUNCATE TABLE hki_merek CASCADE;
TRUNCATE TABLE sertifikat_halal CASCADE;
TRUNCATE TABLE tkdn_ik CASCADE;
TRUNCATE TABLE siinas CASCADE;
TRUNCATE TABLE uji_nilai_gizi CASCADE;
TRUNCATE TABLE kurasi_produk CASCADE;
TRUNCATE TABLE log_aktivitas CASCADE;
TRUNCATE TABLE buku_tamu CASCADE;
TRUNCATE TABLE ikm_binaan CASCADE;

-- Lalu jalankan lagi: scripts/insert-dummy-data.sql
```

---

## 🌐 Vercel Commands (via CLI - Optional)

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Deploy to Preview
```bash
vercel
```
Deploy ke preview URL (tidak production).

### Deploy to Production
```bash
vercel --prod
```
Deploy langsung ke production.

### View Logs
```bash
vercel logs
```
Lihat runtime logs.

### List Deployments
```bash
vercel ls
```
Lihat semua deployment.

---

## 🔧 Troubleshooting Commands

### Clear Next.js Cache
```bash
# Windows
rmdir /s /q .next
npm run build

# Linux/Mac
rm -rf .next
npm run build
```

### Clear Node Modules & Reinstall
```bash
# Windows
rmdir /s /q node_modules
del package-lock.json
npm install

# Linux/Mac
rm -rf node_modules package-lock.json
npm install
```

### Check Node & npm Version
```bash
node --version
npm --version
```
Pastikan Node.js 18+ dan npm 9+.

### Check Port Usage
```bash
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

### Kill Process on Port
```bash
# Windows
# Cari PID dari command di atas, lalu:
taskkill /PID <PID> /F

# Linux/Mac
kill -9 $(lsof -t -i:3000)
```

---

## 📊 Testing Commands

### Test Build Locally
```bash
npm run build
npm run start
```
Buka http://localhost:3000 untuk test production build.

### Check TypeScript Errors
```bash
npx tsc --noEmit
```
Check TypeScript errors tanpa compile.

### Format Code (if Prettier installed)
```bash
npx prettier --write .
```

---

## 🔐 Environment Variables Commands

### Copy Example File
```bash
# Windows
copy .env.local.example .env.local

# Linux/Mac
cp .env.local.example .env.local
```

### View Environment Variables (Local)
```bash
# Windows
type .env.local

# Linux/Mac
cat .env.local
```

### Test Environment Variables
```bash
# Di Node.js console atau create test file
node -e "console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)"
```

---

## 📦 Package Management

### Install Dependencies
```bash
npm install
```

### Install Specific Package
```bash
npm install package-name
```

### Install Dev Dependency
```bash
npm install -D package-name
```

### Update Dependencies
```bash
npm update
```

### Check Outdated Packages
```bash
npm outdated
```

### Audit Security
```bash
npm audit
npm audit fix
```

---

## 🎯 Quick Workflows

### Fresh Start (Reset Everything)
```bash
# 1. Clear cache
rmdir /s /q .next
rmdir /s /q node_modules
del package-lock.json

# 2. Reinstall
npm install

# 3. Build & run
npm run build
npm run dev
```

### Deploy Workflow
```bash
# 1. Test local
npm run build
npm run dev

# 2. Commit & push
git add .
git commit -m "Deploy: description"
git push origin main

# 3. Vercel akan auto-deploy
# Check di: https://vercel.com/dashboard
```

### Hotfix Workflow
```bash
# 1. Create hotfix branch
git checkout -b hotfix/fix-description

# 2. Fix & test
npm run dev

# 3. Commit & push
git add .
git commit -m "Hotfix: description"
git push origin hotfix/fix-description

# 4. Merge ke main via GitHub PR
# 5. Auto-deploy ke production
```

---

## 📝 Notes

- Semua command di atas untuk Windows (cmd/PowerShell)
- Untuk Linux/Mac, sesuaikan command (rm, cp, dll)
- Vercel CLI optional, bisa deploy via dashboard
- Selalu test `npm run build` sebelum push ke production

---

## 🆘 Emergency Commands

### Rollback Deployment (Vercel Dashboard)
```
1. Buka Vercel Dashboard
2. Deployments → Pilih deployment sebelumnya
3. ... → Promote to Production
```

### Force Redeploy
```bash
# Trigger redeploy tanpa perubahan code
git commit --allow-empty -m "Force redeploy"
git push origin main
```

### Check Vercel Build Logs
```
1. Vercel Dashboard → Deployments
2. Klik deployment yang failed
3. Tab "Building" → Lihat logs
```

---

**Simpan file ini untuk referensi cepat!** 📌

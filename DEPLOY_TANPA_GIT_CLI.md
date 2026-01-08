# 🚀 Deploy ke Vercel - Tanpa Git CLI

Panduan deployment untuk sistem yang belum install Git CLI.

---

## 📋 Pilihan Deployment

Anda punya 3 pilihan:

### ✅ Opsi 1: GitHub Desktop (RECOMMENDED)
Paling mudah, GUI-based, tidak perlu command line.

### ✅ Opsi 2: Vercel CLI
Deploy langsung tanpa GitHub.

### ✅ Opsi 3: Install Git CLI
Untuk yang ingin menggunakan command line.

---

## 🎯 OPSI 1: Deploy via GitHub Desktop (RECOMMENDED)

### A. Install GitHub Desktop

1. **Download GitHub Desktop**
   - Buka: https://desktop.github.com
   - Download untuk Windows
   - Install (next, next, finish)

2. **Login ke GitHub**
   - Buka GitHub Desktop
   - File → Options → Accounts
   - Sign in dengan GitHub account
   - Jika belum punya, buat di: https://github.com/signup

### B. Create Repository

1. **Di GitHub Desktop**:
   ```
   File → Add Local Repository
   → Browse ke folder: D:\IKMJUARAV1
   → Add Repository
   ```

2. **Jika muncul "not a git repository"**:
   ```
   Klik "create a repository"
   Name: ikm-juara-database
   Description: Database IKM JUARA - DisnakerKUKM Kota Madiun
   ✅ Initialize this repository with a README (uncheck ini)
   Git Ignore: None
   License: None
   → Create Repository
   ```

### C. Commit Changes

1. **Review Changes**:
   ```
   Di GitHub Desktop, Anda akan lihat semua file di tab "Changes"
   ```

2. **Commit**:
   ```
   Summary: Initial commit - IKM JUARA Database
   Description: (optional)
   → Commit to main
   ```

### D. Publish to GitHub

1. **Publish Repository**:
   ```
   Klik "Publish repository" di toolbar atas
   
   Name: ikm-juara-database
   Description: Database IKM JUARA - DisnakerKUKM Kota Madiun
   ☐ Keep this code private (uncheck jika ingin public)
   → Publish Repository
   ```

2. **Tunggu Upload**:
   ```
   Progress bar akan muncul
   Tunggu hingga selesai (~1-2 menit)
   ```

### E. Deploy ke Vercel

1. **Buka Vercel**:
   ```
   https://vercel.com
   → Sign Up / Login dengan GitHub
   ```

2. **Import Project**:
   ```
   Dashboard → Add New... → Project
   → Pilih "ikm-juara-database"
   → Import
   ```

3. **Configure**:
   ```
   Framework Preset: Next.js ✅ (auto-detected)
   Root Directory: ./ ✅
   Build Command: npm run build ✅
   Output Directory: .next ✅
   ```

4. **Environment Variables**:
   ```
   Expand "Environment Variables"
   
   Variable 1:
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: [Paste dari .env.local]
   
   Variable 2:
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: [Paste dari .env.local]
   ```

5. **Deploy**:
   ```
   → Deploy
   Tunggu ~2-3 menit
   🎉 Selesai!
   ```

---

## 🎯 OPSI 2: Deploy via Vercel CLI

### A. Install Vercel CLI

```bash
npm install -g vercel
```

### B. Login

```bash
vercel login
```
Pilih metode login (GitHub/Email)

### C. Deploy

```bash
# Di folder project (D:\IKMJUARAV1)
vercel

# Jawab pertanyaan:
# Set up and deploy? Y
# Which scope? [pilih account Anda]
# Link to existing project? N
# What's your project's name? ikm-juara-database
# In which directory is your code located? ./
# Want to override the settings? N
```

### D. Set Environment Variables

```bash
# Set Supabase URL
vercel env add NEXT_PUBLIC_SUPABASE_URL

# Paste value dari .env.local
# Pilih environment: Production, Preview, Development (pilih semua)

# Set Supabase Anon Key
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Paste value dari .env.local
# Pilih environment: Production, Preview, Development (pilih semua)
```

### E. Deploy to Production

```bash
vercel --prod
```

Tunggu hingga selesai, URL production akan muncul!

---

## 🎯 OPSI 3: Install Git CLI

### A. Download Git

1. **Download**:
   ```
   https://git-scm.com/download/win
   → Download for Windows
   → 64-bit Git for Windows Setup
   ```

2. **Install**:
   ```
   Run installer
   → Next, Next (gunakan default settings)
   → Install
   → Finish
   ```

3. **Restart Terminal**:
   ```
   Close PowerShell/CMD
   Buka lagi
   ```

### B. Configure Git

```bash
git config --global user.name "Nama Anda"
git config --global user.email "email@example.com"
```

### C. Initialize Repository

```bash
# Di folder D:\IKMJUARAV1
git init
git add .
git commit -m "Initial commit - IKM JUARA Database"
```

### D. Push to GitHub

1. **Buat Repository di GitHub**:
   ```
   https://github.com/new
   Repository name: ikm-juara-database
   Description: Database IKM JUARA - DisnakerKUKM Kota Madiun
   Public/Private: [pilih sesuai kebutuhan]
   ☐ Add README (jangan centang)
   → Create repository
   ```

2. **Push Code**:
   ```bash
   git remote add origin https://github.com/username/ikm-juara-database.git
   git branch -M main
   git push -u origin main
   ```

### E. Deploy ke Vercel

Ikuti langkah E di Opsi 1 (Deploy ke Vercel)

---

## ✅ Verifikasi Deployment

Setelah deploy berhasil:

### 1. Cek Production URL
```
https://ikm-juara-xxx.vercel.app
```

### 2. Test Aplikasi
- [ ] Login berhasil
- [ ] Dashboard menampilkan data
- [ ] IKM Binaan: 5 data muncul
- [ ] Pelatihan: 3 data muncul
- [ ] Laporan: Filter & detail peserta berfungsi
- [ ] CRUD operations berfungsi
- [ ] Tidak ada error di console

### 3. Test Mobile
- [ ] Buka di HP
- [ ] Responsive layout
- [ ] Semua fitur berfungsi

---

## 🔧 Troubleshooting

### Error: "Failed to fetch" di Production

**Solusi**:
```
1. Vercel Dashboard → Settings → Environment Variables
2. Cek NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Pastikan tidak ada spasi atau typo
4. Redeploy: Deployments → ... → Redeploy
```

### Error: Build Failed

**Solusi**:
```
1. Cek Vercel build logs
2. Test build local: npm run build
3. Fix error
4. Push/deploy ulang
```

### GitHub Desktop: "Failed to publish"

**Solusi**:
```
1. Cek koneksi internet
2. Logout & login ulang di GitHub Desktop
3. Coba lagi
```

---

## 📞 Butuh Bantuan?

### Video Tutorials
- GitHub Desktop: https://www.youtube.com/watch?v=8Dd7KRpKeaE
- Vercel Deploy: https://www.youtube.com/watch?v=2HBIzEx6IZA

### Documentation
- GitHub Desktop: https://docs.github.com/en/desktop
- Vercel: https://vercel.com/docs

---

## 🎉 Selesai!

Pilih salah satu opsi di atas dan ikuti langkah-langkahnya.

**Rekomendasi**: Gunakan **Opsi 1 (GitHub Desktop)** karena paling mudah dan user-friendly!

---

**Good luck! 🚀**

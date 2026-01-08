# 🚀 Panduan Deployment ke Vercel

## Persiapan

### 1. Setup Supabase
1. Buat akun di [supabase.com](https://supabase.com)
2. Klik **"New Project"**
3. Isi:
   - Project Name: `ikm-juara-madiun`
   - Database Password: (buat password kuat)
   - Region: Southeast Asia (Singapore)
4. Tunggu project selesai dibuat (~2 menit)

### 2. Setup Database
1. Di Supabase Dashboard, buka **SQL Editor**
2. Klik **"New Query"**
3. Copy seluruh isi file `supabase-schema.sql`
4. Paste ke SQL Editor
5. Klik **"Run"** atau tekan `Ctrl+Enter`
6. Pastikan muncul pesan sukses

### 3. Dapatkan API Keys
1. Di Supabase Dashboard, buka **Settings** > **API**
2. Copy:
   - **Project URL** (contoh: https://xxxxx.supabase.co)
   - **anon public** key (key yang panjang)
3. Simpan di notepad untuk langkah selanjutnya

---

## Deployment ke Vercel

### 1. Push ke GitHub
```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua file
git add .

# Commit
git commit -m "Initial commit - Database IKM JUARA"

# Buat repository di GitHub
# Lalu push
git remote add origin https://github.com/username/ikm-juara.git
git branch -M main
git push -u origin main
```

### 2. Deploy di Vercel
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Klik **"Add New"** > **"Project"**
4. Import repository `ikm-juara`
5. Configure Project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Tambahkan Environment Variables
Di Vercel Project Settings > Environment Variables, tambahkan:

**Variable 1:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: (paste Project URL dari Supabase)
- Environment: Production, Preview, Development

**Variable 2:**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: (paste anon public key dari Supabase)
- Environment: Production, Preview, Development

### 4. Deploy
1. Klik **"Deploy"**
2. Tunggu proses build (~2-3 menit)
3. Setelah selesai, klik **"Visit"** untuk melihat website

---

## Custom Domain (Opsional)

### 1. Beli Domain
Beli domain di:
- Niagahoster
- Domainesia
- Namecheap
- GoDaddy

### 2. Setup di Vercel
1. Di Vercel Project, buka **Settings** > **Domains**
2. Klik **"Add"**
3. Masukkan domain Anda (contoh: `ikmjuara-madiun.com`)
4. Vercel akan memberikan DNS records

### 3. Setup DNS
Di provider domain Anda, tambahkan DNS records:

**A Record:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21`

**CNAME Record:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

### 4. Verifikasi
- Tunggu propagasi DNS (5-48 jam)
- Vercel akan otomatis setup SSL certificate
- Website dapat diakses via domain custom

---

## Update Aplikasi

### Cara 1: Via Git
```bash
# Buat perubahan di kode
# Lalu commit dan push
git add .
git commit -m "Update fitur xyz"
git push

# Vercel akan otomatis deploy ulang
```

### Cara 2: Via Vercel Dashboard
1. Buka Vercel Dashboard
2. Pilih project
3. Klik **"Deployments"**
4. Klik **"Redeploy"**

---

## Monitoring

### 1. Analytics
- Buka Vercel Dashboard > **Analytics**
- Lihat:
  - Page views
  - Unique visitors
  - Top pages
  - Performance metrics

### 2. Logs
- Buka Vercel Dashboard > **Logs**
- Monitor:
  - Build logs
  - Function logs
  - Error logs

### 3. Supabase Monitoring
- Buka Supabase Dashboard > **Database**
- Monitor:
  - Database size
  - Active connections
  - Query performance

---

## Backup Data

### Manual Backup
1. Buka Supabase Dashboard
2. Klik **Database** > **Backups**
3. Klik **"Create Backup"**

### Automated Backup
- Supabase Free tier: Daily backup (7 hari)
- Supabase Pro: Point-in-time recovery

### Export Data
```sql
-- Export semua data ke CSV
-- Jalankan di SQL Editor
COPY ikm_binaan TO '/tmp/ikm_binaan.csv' CSV HEADER;
COPY hki_merek TO '/tmp/hki_merek.csv' CSV HEADER;
-- dst untuk tabel lainnya
```

---

## Security Checklist

- ✅ Environment variables tersimpan aman di Vercel
- ✅ Supabase Row Level Security (RLS) enabled
- ✅ HTTPS otomatis via Vercel
- ✅ Password admin di-hash (untuk production)
- ✅ API keys tidak di-commit ke Git
- ✅ CORS configured di Supabase

---

## Troubleshooting Deployment

### Build Failed
```bash
# Cek error di Vercel logs
# Biasanya karena:
# 1. Missing dependencies
npm install

# 2. TypeScript errors
npm run build

# 3. Environment variables belum diset
```

### Database Connection Error
- Pastikan Supabase URL dan Key benar
- Cek Supabase project masih aktif
- Verifikasi RLS policies

### Slow Performance
- Enable Vercel Edge Network
- Optimize images dengan Next.js Image
- Enable caching di Supabase

---

## Biaya

### Vercel
- **Hobby (Free):**
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Cocok untuk development

- **Pro ($20/month):**
  - Unlimited bandwidth
  - Advanced analytics
  - Team collaboration

### Supabase
- **Free:**
  - 500MB database
  - 1GB file storage
  - 50,000 monthly active users
  - Cocok untuk start

- **Pro ($25/month):**
  - 8GB database
  - 100GB file storage
  - 100,000 monthly active users
  - Daily backups

---

## Support

Jika ada masalah deployment:
1. Cek Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Cek Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
3. Hubungi support DisnakerKUKM Kota Madiun

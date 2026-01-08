# 📁 Struktur Aplikasi Database IKM JUARA

## 🗂️ Struktur Folder

```
IKMJUARAV1/
├── app/                          # Next.js App Router
│   ├── admin/                    # Mode Admin
│   │   ├── dashboard/            # Dashboard admin
│   │   ├── ikm-binaan/           # Kelola IKM Binaan
│   │   ├── layanan/              # Layanan IKM JUARA
│   │   │   ├── hki-merek/        # Pendaftaran HKI Merek
│   │   │   ├── sertifikat-halal/ # Pendaftaran Sertifikat Halal
│   │   │   ├── tkdn-ik/          # Pendaftaran TKDN IK
│   │   │   ├── siinas/           # Pendaftaran SIINas
│   │   │   ├── uji-nilai-gizi/   # Pendaftaran Uji Nilai Gizi
│   │   │   ├── kurasi-produk/    # Pendaftaran Kurasi Produk
│   │   │   └── page.tsx          # Redirect ke HKI Merek
│   │   ├── pelatihan/            # Pelatihan Pemberdayaan
│   │   ├── penelusuran/          # Penelusuran Data IKM
│   │   ├── recycle-bin/          # Recycle Bin
│   │   ├── laporan/              # Laporan & Export
│   │   └── log-aktivitas/        # Log Aktivitas
│   ├── pengguna/                 # Mode Pengguna
│   │   └── pencarian/            # Pencarian Data Pribadi
│   ├── login/                    # Halaman Login
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Home (redirect ke login)
│   └── globals.css               # Global Styles
│
├── components/                   # React Components
│   └── AdminSidebar.tsx          # Sidebar untuk Admin
│
├── lib/                          # Libraries & Utilities
│   ├── supabase.ts               # Supabase Client
│   └── dummyData.ts              # Data Dummy untuk Testing
│
├── types/                        # TypeScript Types
│   └── database.ts               # Database Types & Interfaces
│
├── .env.local                    # Environment Variables (local)
├── .env.local.example            # Template Environment Variables
├── .gitignore                    # Git Ignore
├── DEPLOYMENT.md                 # Panduan Deployment
├── next.config.js                # Next.js Configuration
├── package.json                  # Dependencies
├── PANDUAN_PENGGUNAAN.md         # Panduan Penggunaan
├── postcss.config.js             # PostCSS Configuration
├── README.md                     # Dokumentasi Utama
├── supabase-schema.sql           # Database Schema
├── tailwind.config.js            # Tailwind Configuration
├── tsconfig.json                 # TypeScript Configuration
└── vercel.json                   # Vercel Configuration
```

---

## 📄 File Penting

### 1. Configuration Files

#### `package.json`
Dependencies dan scripts untuk menjalankan aplikasi:
- `npm run dev` - Development server
- `npm run build` - Build untuk production
- `npm start` - Start production server

#### `next.config.js`
Konfigurasi Next.js (minimal setup)

#### `tailwind.config.js`
Konfigurasi Tailwind CSS untuk styling

#### `tsconfig.json`
Konfigurasi TypeScript

#### `vercel.json`
Konfigurasi deployment ke Vercel

---

### 2. Environment Files

#### `.env.local`
Environment variables untuk development:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

#### `.env.local.example`
Template untuk environment variables

---

### 3. Database Files

#### `supabase-schema.sql`
SQL schema untuk membuat database di Supabase:
- 11 tabel utama
- Indexes untuk performa
- Row Level Security policies
- Foreign key relationships

#### `types/database.ts`
TypeScript interfaces untuk semua tabel:
- IKMBinaan
- HKIMerek
- SertifikatHalal
- TKDNIK
- SIINas
- UjiNilaiGizi
- KurasiProduk
- Pelatihan
- PesertaPelatihan
- BukuTamu
- LogAktivitas

---

### 4. Data Files

#### `lib/dummyData.ts`
Data dummy untuk testing dan demo:
- 5 IKM Binaan
- 3 HKI Merek
- 2 Sertifikat Halal
- 1 TKDN IK
- 2 SIINas
- 2 Uji Nilai Gizi
- 2 Kurasi Produk
- 3 Pelatihan
- 5 Log Aktivitas

---

### 5. Component Files

#### `components/AdminSidebar.tsx`
Sidebar navigasi untuk mode admin dengan menu:
- Dashboard
- IKM Binaan
- Layanan IKM JUARA (dengan submenu)
- Pelatihan
- Penelusuran Data
- Recycle Bin
- Laporan
- Log Aktivitas
- Logout button

---

### 6. Page Files

#### Mode Admin Pages:
- `app/admin/dashboard/page.tsx` - Dashboard dengan statistik
- `app/admin/ikm-binaan/page.tsx` - CRUD IKM Binaan
- `app/admin/layanan/*/page.tsx` - CRUD untuk setiap layanan
- `app/admin/pelatihan/page.tsx` - CRUD Pelatihan & Peserta
- `app/admin/penelusuran/page.tsx` - Pencarian data lengkap
- `app/admin/recycle-bin/page.tsx` - Restore/Delete permanen
- `app/admin/laporan/page.tsx` - Filter & Export data
- `app/admin/log-aktivitas/page.tsx` - View log aktivitas

#### Mode Pengguna Pages:
- `app/pengguna/pencarian/page.tsx` - Pencarian data pribadi

#### Auth Pages:
- `app/login/page.tsx` - Login admin/pengguna dengan buku tamu

---

## 🔄 Data Flow

### 1. Login Flow
```
User → Login Page → Choose Mode
                    ├─ Admin → Password → Dashboard
                    └─ Pengguna → Buku Tamu → Pencarian
```

### 2. Admin CRUD Flow
```
Admin → Dashboard → Menu → Form Input
                           ├─ Search IKM (auto-fill)
                           ├─ Fill Additional Data
                           └─ Save → Database → Log Activity
```

### 3. Pengguna Search Flow
```
Pengguna → Buku Tamu → Pencarian → Input NIB/NIK/Nama
                                   → Display All Related Data
                                   → Log Activity
```

### 4. Delete Flow
```
Admin → Delete Data → Soft Delete (set deleted_at)
                     → Move to Recycle Bin
                     → Can Restore or Permanent Delete
```

---

## 🎨 Styling

### Tailwind CSS Classes
- **Primary Color**: Blue (#3498db)
- **Sidebar**: Dark (#2c3e50)
- **Success**: Green (#27ae60)
- **Danger**: Red (#e74c3c)
- **Warning**: Yellow/Orange

### Responsive Design
- Mobile: Single column layout
- Tablet: 2 column grid
- Desktop: Full layout dengan sidebar

---

## 🔐 Security Features

### 1. Authentication
- Admin: Password-based (dapat diubah)
- Pengguna: Buku tamu (tracking)

### 2. Authorization
- Admin: Full CRUD access
- Pengguna: Read-only access

### 3. Data Protection
- Soft delete (data tidak langsung hilang)
- Log aktivitas (audit trail)
- Environment variables (API keys aman)

### 4. Supabase Security
- Row Level Security (RLS)
- API Key protection
- HTTPS encryption

---

## 📊 Database Schema

### Relasi Tabel:
```
ikm_binaan (1) ─── (N) hki_merek
           (1) ─── (N) sertifikat_halal
           (1) ─── (N) tkdn_ik
           (1) ─── (N) siinas
           (1) ─── (N) uji_nilai_gizi
           (1) ─── (N) kurasi_produk
           (1) ─── (N) peserta_pelatihan ─── (N) pelatihan
```

### Soft Delete:
Semua tabel utama memiliki field `deleted_at`:
- `NULL` = Data aktif
- `TIMESTAMP` = Data dihapus (di Recycle Bin)

---

## 🚀 Performance

### Optimizations:
1. **Database Indexes** pada field yang sering dicari:
   - NIB, NIK (ikm_binaan)
   - ikm_binaan_id (semua tabel relasi)
   - deleted_at (untuk filter)

2. **Next.js Features**:
   - Server Components (default)
   - Client Components (untuk interaktivity)
   - Automatic code splitting

3. **Caching**:
   - Static pages di-cache
   - API responses di-cache

---

## 📱 Features Summary

### ✅ Implemented:
- [x] Login system (Admin & Pengguna)
- [x] Buku tamu untuk pengguna
- [x] CRUD IKM Binaan
- [x] CRUD 6 Layanan IKM JUARA
- [x] CRUD Pelatihan & Peserta
- [x] Auto-fill data dari IKM Binaan
- [x] Penelusuran data lengkap
- [x] Soft delete & Recycle Bin
- [x] Log aktivitas
- [x] Export Excel & PDF (UI ready)
- [x] Responsive design
- [x] Data dummy untuk testing

### 🔄 To Be Integrated:
- [ ] Supabase connection (ganti dummy data)
- [ ] Actual export functionality
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Bulk operations
- [ ] User management

---

## 🛠️ Development

### Local Development:
```bash
npm run dev
```
Buka: http://localhost:3000

### Build:
```bash
npm run build
npm start
```

### Deploy:
```bash
git push
# Vercel auto-deploy
```

---

## 📞 Support

Untuk pertanyaan teknis:
- Baca `README.md` untuk overview
- Baca `PANDUAN_PENGGUNAAN.md` untuk cara pakai
- Baca `DEPLOYMENT.md` untuk deployment
- Hubungi DisnakerKUKM Kota Madiun

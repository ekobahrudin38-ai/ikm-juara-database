'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const menuItems = [
    { icon: '📊', label: 'Dashboard', href: '/admin/dashboard' },
    { icon: '🏢', label: 'IKM Binaan', href: '/admin/ikm-binaan' },
    { 
      icon: '🎯', 
      label: 'Layanan IKM JUARA', 
      href: '/admin/layanan',
      submenu: [
        { label: 'HKI Merek', href: '/admin/layanan/hki-merek' },
        { label: 'Sertifikat Halal', href: '/admin/layanan/sertifikat-halal' },
        { label: 'TKDN IK', href: '/admin/layanan/tkdn-ik' },
        { label: 'SIINas', href: '/admin/layanan/siinas' },
        { label: 'Uji Nilai Gizi', href: '/admin/layanan/uji-nilai-gizi' },
        { label: 'Kurasi Produk', href: '/admin/layanan/kurasi-produk' },
      ]
    },
    { icon: '🎓', label: 'Pelatihan', href: '/admin/pelatihan' },
    { icon: '🔍', label: 'Penelusuran Data', href: '/admin/penelusuran' },
    { icon: '🗑️', label: 'Recycle Bin', href: '/admin/recycle-bin' },
    { icon: '📄', label: 'Laporan', href: '/admin/laporan' },
    { icon: '📋', label: 'Log Aktivitas', href: '/admin/log-aktivitas' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('userMode')
    localStorage.removeItem('userName')
    router.push('/login')
  }

  return (
    <aside className="w-64 bg-[#2c3e50] text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-sm font-semibold">Database IKM JUARA</h1>
        <p className="text-xs text-gray-400">DisnakerKUKM Kota Madiun</p>
      </div>
      <nav className="p-4 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded mb-2 transition-colors ${
                pathname === item.href || pathname?.startsWith(item.href + '/')
                  ? 'bg-[#34495e] text-white'
                  : 'hover:bg-[#34495e]'
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
            {item.submenu && pathname?.startsWith(item.href) && (
              <div className="ml-8 space-y-1">
                {item.submenu.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={`block px-4 py-2 rounded text-xs transition-colors ${
                      pathname === sub.href
                        ? 'bg-[#34495e] text-white'
                        : 'hover:bg-[#34495e] text-gray-300'
                    }`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="mb-3 text-sm">
          <p className="text-gray-400 text-xs">Login sebagai:</p>
          <p className="font-semibold">Admin IKM</p>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

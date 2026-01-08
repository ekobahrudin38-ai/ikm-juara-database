import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Database IKM JUARA - DisnakerKUKM Kota Madiun',
  description: 'Sistem Database IKM JUARA DisnakerKUKM Kota Madiun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}

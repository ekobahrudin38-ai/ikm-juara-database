'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LayananPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/admin/layanan/hki-merek')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  )
}

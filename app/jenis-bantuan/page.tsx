'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function JenisBantuanPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect ke halaman admin atau home
    router.push('/')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  )
}

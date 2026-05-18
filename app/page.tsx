'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createConversation } from '@/lib/storage'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const conv = createConversation()
    router.replace(`/chat/${conv.id}`)
  }, [])

  return (
    <div style={{
      display: 'flex', height: '100vh', alignItems: 'center',
      justifyContent: 'center', backgroundColor: '#0a0a0a',
      flexDirection: 'column', gap: '12px'
    }}>
      <div style={{ fontSize: '40px' }}>⚡</div>
      <p style={{ color: '#888', fontSize: '14px' }}>Starting Ziki AI...</p>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getConversations, createConversation } from '@/lib/storage'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with ChatInterface
const ChatInterface = dynamic(() => import('@/components/chat/ChatInterface').then(mod => ({ default: mod.ChatInterface })), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex', height: '100vh', alignItems: 'center',
      justifyContent: 'center', backgroundColor: '#0a0a0a'
    }}>
      <p style={{ color: '#888', fontSize: '14px' }}>Loading...</p>
    </div>
  )
})

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [ready, setReady] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) {
      router.replace('/')
      return
    }
    // Check if conversation exists in memory
    const existing = getConversations().find(c => c.id === id)
    if (existing) {
      setReady(true)
    } else {
      // Create it on the fly - user might have refreshed
      const conv = createConversation()
      // Redirect to our new conversation
      router.replace(`/chat/${conv.id}`)
    }
  }, [id])

  function handleStartNewChat() {
    const conv = createConversation()
    router.push(`/chat/${conv.id}`)
  }

  if (notFound) {
    return (
      <div style={{
        display: 'flex', height: '100vh', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#0a0a0a',
        flexDirection: 'column', gap: '16px'
      }}>
        <div style={{ fontSize: '48px' }}>⚡</div>
        <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, margin: 0 }}>
          Page Not Found
        </h1>
        <p style={{ color: '#888', margin: 0 }}>This conversation doesn't exist</p>
        <button
          onClick={handleStartNewChat}
          style={{
            marginTop: '8px', padding: '12px 28px',
            backgroundColor: '#6366f1', color: '#fff',
            border: 'none', borderRadius: '8px',
            fontSize: '15px', fontWeight: 600, cursor: 'pointer'
          }}
        >
          Start a new chat
        </button>
      </div>
    )
  }

  if (!ready) {
    return (
      <div style={{
        display: 'flex', height: '100vh', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#0a0a0a'
      }}>
        <p style={{ color: '#888', fontSize: '14px' }}>Loading...</p>
      </div>
    )
  }

  return <ChatInterface conversationId={id} />
}
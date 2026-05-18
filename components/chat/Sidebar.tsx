'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Plus, Trash2, Zap } from 'lucide-react'
import { Conversation } from '@/types/chat'
import { getConversations, createConversation, saveConversation, deleteConversation } from '@/lib/storage'
import { Button } from '@/components/ui/button'

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    setConversations(getConversations())
  }, [])

  // Refresh conversation list
  const refreshConversations = () => {
    setConversations(getConversations())
  }

  const handleNewChat = () => {
    const newConv = createConversation()
    router.push(`/chat/${newConv.id}`)
    onClose?.()
  }

  const handleDelete = (id: string) => {
    deleteConversation(id)
    refreshConversations()
  }

  const handleConversationClick = (id: string) => {
    router.push(`/chat/${id}`)
    onClose?.()
  }

  return (
    <div className="w-64 h-screen bg-gray-900 p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">Ziki AI</span>
      </div>
      <Button onClick={handleNewChat} className="mb-4">
        <Plus className="h-4 w-4 mr-2" /> New Chat
      </Button>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div 
            key={conv.id} 
            className="flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer"
            onClick={() => handleConversationClick(conv.id)}
          >
            <span className="truncate text-sm">{conv.title}</span>
            <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDelete(conv.id); }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
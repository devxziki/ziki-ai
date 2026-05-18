'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Zap } from 'lucide-react';
import { Conversation } from '@/types/chat';
import { getConversations, deleteConversation } from '@/lib/storage';
import { Button } from '@/components/ui/button';

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    setConversations(getConversations());
  }, []);

  const handleNewChat = () => {
    router.push('/');
    onClose?.();
  };

  const handleDelete = (id: string) => {
    deleteConversation(id);
    setConversations(getConversations());
  };

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
          <div key={conv.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-800 cursor-pointer">
            <span className="truncate text-sm">{conv.title}</span>
            <Button size="sm" variant="ghost" onClick={() => handleDelete(conv.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
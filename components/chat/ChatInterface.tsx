'use client';
import { useState } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Sidebar } from './Sidebar';
import { useChat } from 'ai/react';
import { Menu, Zap } from 'lucide-react';

interface ChatInterfaceProps {
  conversationId: string;
}

export function ChatInterface({ conversationId }: ChatInterfaceProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const handleSend = async (content: string) => {
    handleInputChange({ target: { value: content } } as any);
    await handleSubmit({ preventDefault: () => {} } as any);
  };

  return (
    <div className="flex h-screen">
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="absolute left-0 top-0 h-full" onClick={(e) => e.stopPropagation()}>
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="md:hidden p-2 border-b">
          <Menu className="h-6 w-6 cursor-pointer" onClick={() => setSidebarOpen(true)} />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Welcome to Ziki AI</h2>
                <p className="text-gray-400">Your AI. Your Rules.</p>
              </div>
            </div>
          ) : (
            messages.map((m) => (
              <MessageBubble key={m.id} message={{ id: m.id, role: m.role as 'user' | 'assistant', content: m.content, timestamp: Date.now() }} />
            ))
          )}
        </div>
        <ChatInput onSend={handleSend} disabled={isLoading} />
        <p style={{ color: '#555', fontSize: '12px', textAlign: 'center', marginTop: '6px', marginBottom: '8px' }}>
          Chats are temporary and will clear on refresh
        </p>
      </div>
    </div>
  );
}
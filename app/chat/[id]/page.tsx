import { notFound } from 'next/navigation';
import { getConversation } from '@/lib/storage';
import { ChatInterface } from '@/components/chat/ChatInterface';

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  return <ChatInterfaceWrapper params={params} />;
}

async function ChatInterfaceWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const conversation = getConversation(id);
  if (!conversation) {
    notFound();
  }
  return <ChatInterface conversationId={id} />;
}
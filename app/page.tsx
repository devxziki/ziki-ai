import { redirect } from 'next/navigation';
import { createConversation } from '@/lib/storage';

export default function HomePage() {
  const conversation = createConversation();
  redirect(`/chat/${conversation.id}`);
}
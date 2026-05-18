'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getConversations, createConversation } from '@/lib/storage';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const conversations = getConversations();
    if (conversations.length > 0) {
      router.replace(`/chat/${conversations[0].id}`);
    } else {
      const newConv = createConversation();
      router.replace(`/chat/${newConv.id}`);
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-pulse text-4xl">⚡</div>
        <p className="text-muted-foreground text-sm">Loading Ziki AI...</p>
      </div>
    </div>
  );
}
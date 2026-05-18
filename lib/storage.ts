import { Conversation, Message } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'ziki-conversations';

export function getConversations(): Conversation[] {
  try {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.sort((a: Conversation, b: Conversation) => b.updatedAt - a.updatedAt);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function getConversation(id: string): Conversation | null {
  return getConversations().find((c) => c.id === id) || null;
}

export function saveConversation(conversation: Conversation): void {
  const conversations = getConversations();
  const existing = conversations.findIndex((c) => c.id === conversation.id);
  if (existing >= 0) conversations[existing] = conversation;
  else conversations.push(conversation);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

export function createConversation(): Conversation {
  const now = Date.now();
  return { id: uuidv4(), title: 'New Chat', messages: [], createdAt: now, updatedAt: now };
}

export function deleteConversation(id: string): void {
  const conversations = getConversations().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

export function addMessage(conversationId: string, message: Message): void {
  const conv = getConversation(conversationId);
  if (conv) {
    conv.messages.push(message);
    conv.updatedAt = Date.now();
    saveConversation(conv);
  }
}
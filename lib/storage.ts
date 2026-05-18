import { Conversation, Message } from '@/types/chat'

// In-memory store — resets on every page refresh
let conversations: Conversation[] = []

export function getConversations(): Conversation[] {
  return [...conversations].sort((a, b) => b.updatedAt - a.updatedAt)
}

export function getConversation(id: string): Conversation | null {
  return conversations.find(c => c.id === id) || null
}

export function createConversation(): Conversation {
  const now = Date.now()
  const conv: Conversation = {
    id: crypto.randomUUID(),
    title: 'New Chat',
    messages: [],
    createdAt: now,
    updatedAt: now,
  }
  conversations.unshift(conv)
  return conv
}

export function saveConversation(conv: Conversation): void {
  const index = conversations.findIndex(c => c.id === conv.id)
  if (index >= 0) {
    conversations[index] = conv
  } else {
    conversations.unshift(conv)
  }
}

export function deleteConversation(id: string): void {
  conversations = conversations.filter(c => c.id !== id)
}

export function addMessage(conversationId: string, message: Message): void {
  const conv = conversations.find(c => c.id === conversationId)
  if (!conv) return
  conv.messages.push(message)
  conv.updatedAt = Date.now()
  if (conv.messages.length === 1 && message.role === 'user') {
    conv.title = message.content.slice(0, 40) || 'New Chat'
  }
}

export function updateConversationTitle(id: string, firstMessage: string): void {
  const conv = conversations.find(c => c.id === id)
  if (conv) {
    conv.title = firstMessage.slice(0, 40)
  }
}
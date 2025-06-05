import type { NextRequest } from "next/server"
import { chatStore } from "@/lib/chat-store"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const conversationId = searchParams.get("conversationId")
  const userId = searchParams.get("userId") || "1"

  if (!conversationId) {
    return Response.json({ error: "Conversation ID required" }, { status: 400 })
  }

  const messages = chatStore.getMessages(conversationId, userId)

  // Mark messages as read when fetched
  chatStore.markMessagesAsRead(conversationId, userId)

  return Response.json({ messages })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { sender_id, receiver_id, message } = body

  if (!message || !sender_id || !receiver_id) {
    return Response.json({ error: "Missing required fields" }, { status: 400 })
  }

  const newMessage = chatStore.addMessage({
    sender_id,
    receiver_id,
    message,
  })

  return Response.json({ message: newMessage })
}

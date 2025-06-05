import type { NextRequest } from "next/server"
import { chatStore } from "@/lib/chat-store"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get("userId") || "1" // Default to user 1

  const conversations = chatStore.getConversations(userId)

  // Get detailed information for each conversation
  const detailedConversations = conversations.map((conv) => chatStore.getConversationDetails(conv.id, userId))

  return Response.json({ conversations: detailedConversations })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, participants } = body

  const groupId = chatStore.createGroup(name, participants)

  return Response.json({ groupId })
}

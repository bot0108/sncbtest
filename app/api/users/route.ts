import { chatStore } from "@/lib/chat-store"

export async function GET() {
  const users = chatStore.getUsers()
  return Response.json({ users })
}

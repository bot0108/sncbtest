"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Message, User } from "@/lib/chat-store"

interface ConversationDetails {
  id: string
  type: "direct" | "group"
  participants: string[]
  lastMessage: Message | null
  unreadCount: number
}

interface ConversationListProps {
  currentUserId: string
  selectedConversationId?: string
  onConversationSelect: (conversationId: string) => void
}

export function ConversationList({
  currentUserId,
  selectedConversationId,
  onConversationSelect,
}: ConversationListProps) {
  const [conversations, setConversations] = useState<ConversationDetails[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchConversations()
    fetchUsers()

    // Poll for new conversations/messages every 3 seconds
    const interval = setInterval(fetchConversations, 3000)
    return () => clearInterval(interval)
  }, [currentUserId])

  const fetchConversations = async () => {
    const response = await fetch(`/api/conversations?userId=${currentUserId}`)
    const data = await response.json()
    setConversations(data.conversations)
  }

  const fetchUsers = async () => {
    const response = await fetch("/api/users")
    const data = await response.json()
    setUsers(data.users)
  }

  const getConversationName = (conversation: ConversationDetails) => {
    if (conversation.type === "group") {
      return `Group ${conversation.id.replace("group-", "")}`
    }

    const otherUserId = conversation.participants.find((id) => id !== currentUserId)
    const otherUser = users.find((user) => user.id === otherUserId)
    return otherUser?.name || "Unknown User"
  }

  const getConversationAvatar = (conversation: ConversationDetails) => {
    if (conversation.type === "group") {
      return "/placeholder.svg?height=40&width=40"
    }

    const otherUserId = conversation.participants.find((id) => id !== currentUserId)
    const otherUser = users.find((user) => user.id === otherUserId)
    return otherUser?.avatar || "/placeholder.svg?height=40&width=40"
  }

  const isUserOnline = (conversation: ConversationDetails) => {
    if (conversation.type === "group") return false

    const otherUserId = conversation.participants.find((id) => id !== currentUserId)
    const otherUser = users.find((user) => user.id === otherUserId)
    return otherUser?.online || false
  }

  function formatTime(timestamp: string | number | Date): string {
    let date: Date

    if (timestamp instanceof Date) {
      date = timestamp
    } else if (typeof timestamp === "string") {
      date = new Date(timestamp)
    } else if (typeof timestamp === "number") {
      date = new Date(timestamp)
    } else {
      return "Invalid date"
    }

    if (isNaN(date.getTime())) {
      return "Invalid date"
    }

    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60)
      return diffInMinutes <= 1 ? "Just now" : `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`
    }
  }

  return (
    <div className="w-80 border-r bg-muted/10">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Messages</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                selectedConversationId === conversation.id ? "bg-muted" : ""
              }`}
              onClick={() => onConversationSelect(conversation.id)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={getConversationAvatar(conversation) || "/placeholder.svg"} />
                  <AvatarFallback>{getConversationName(conversation).charAt(0)}</AvatarFallback>
                </Avatar>
                {isUserOnline(conversation) && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{getConversationName(conversation)}</h3>
                  {conversation.lastMessage && (
                    <span className="text-xs text-muted-foreground">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage?.message || "No messages yet"}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

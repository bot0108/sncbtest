"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Video, MoreVertical, Users } from "lucide-react"
import type { User } from "@/lib/chat-store"

interface ChatHeaderProps {
  conversationId: string
  currentUserId: string
}

export function ChatHeader({ conversationId, currentUserId }: ChatHeaderProps) {
  const [users, setUsers] = useState<User[]>([])
  const [isGroup, setIsGroup] = useState(false)
  const [participants, setParticipants] = useState<string[]>([])

  useEffect(() => {
    if (conversationId) {
      fetchUsers()

      // Determine if this is a group chat
      setIsGroup(conversationId.startsWith("group-"))

      // Get participants from conversation ID for direct messages
      if (!conversationId.startsWith("group-")) {
        setParticipants(conversationId.split("-"))
      } else {
        // For groups, we'd need to fetch participants from the API
        // For now, we'll just use the current user
        setParticipants([currentUserId])
      }
    }
  }, [conversationId])

  const fetchUsers = async () => {
    const response = await fetch("/api/users")
    const data = await response.json()
    setUsers(data.users)
  }

  if (!conversationId) {
    return null
  }

  const getConversationName = () => {
    if (isGroup) {
      return `Group ${conversationId.replace("group-", "")}`
    }

    const otherUserId = participants.find((id) => id !== currentUserId)
    const otherUser = users.find((user) => user.id === otherUserId)
    return otherUser?.name || "Unknown User"
  }

  const getConversationAvatar = () => {
    if (isGroup) {
      return "/placeholder.svg?height=40&width=40"
    }

    const otherUserId = participants.find((id) => id !== currentUserId)
    const otherUser = users.find((user) => user.id === otherUserId)
    return otherUser?.avatar || "/placeholder.svg?height=40&width=40"
  }

  const getOnlineStatus = () => {
    if (isGroup) {
      return `${participants.length} participants`
    }

    const otherUserId = participants.find((id) => id !== currentUserId)
    const otherUser = users.find((user) => user.id === otherUserId)
    return otherUser?.online ? "Online" : "Offline"
  }

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={getConversationAvatar() || "/placeholder.svg"} />
          <AvatarFallback>{getConversationName().charAt(0)}</AvatarFallback>
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{getConversationName()}</h3>
            {isGroup && (
              <Badge variant="secondary" className="text-xs">
                <Users className="w-3 h-3 mr-1" />
                {participants.length}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{getOnlineStatus()}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

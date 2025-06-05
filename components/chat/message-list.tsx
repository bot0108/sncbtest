"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Message, User } from "@/lib/chat-store"

interface MessageListProps {
  conversationId: string
  currentUserId: string
}

export function MessageList({ conversationId, currentUserId }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (conversationId) {
      fetchMessages()
      fetchUsers()

      // Poll for new messages every 2 seconds
      const interval = setInterval(fetchMessages, 2000)
      return () => clearInterval(interval)
    }
  }, [conversationId])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const fetchMessages = async () => {
    const response = await fetch(`/api/messages?conversationId=${conversationId}&userId=${currentUserId}`)
    const data = await response.json()
    setMessages(data.messages)
  }

  const fetchUsers = async () => {
    const response = await fetch("/api/users")
    const data = await response.json()
    setUsers(data.users)
  }

  const getUser = (userId: string) => {
    return users.find((user) => user.id === userId)
  }

  const formatTime = (date: Date | string) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Select a conversation to start chatting</p>
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
      <div className="space-y-4">
        {messages.map((message) => {
          const sender = getUser(message.sender_id)
          const isCurrentUser = message.sender_id === currentUserId

          return (
            <div key={message.id} className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}>
              {!isCurrentUser && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src={sender?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{sender?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              )}

              <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                {!isCurrentUser && <span className="text-xs text-muted-foreground mb-1">{sender?.name}</span>}

                <div
                  className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                    isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>

                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                  {isCurrentUser && (
                    <span className="text-xs text-muted-foreground">{message.is_read ? "• Read" : ""}</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

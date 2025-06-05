"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Smile } from "lucide-react"

interface MessageInputProps {
  conversationId: string
  currentUserId: string
  onMessageSent?: () => void
}

export function MessageInput({ conversationId, currentUserId, onMessageSent }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() || !conversationId || isLoading) return

    setIsLoading(true)

    try {
      // Determine if this is a group chat
      const isGroup = conversationId.startsWith("group-")
      let receiver_id: string

      if (isGroup) {
        receiver_id = conversationId
      } else {
        // For direct messages, get the other user's ID
        receiver_id = conversationId.split("-").find((id) => id !== currentUserId) || ""
      }

      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_id: currentUserId,
          receiver_id,
          message: message.trim(),
        }),
      })

      if (response.ok) {
        setMessage("")
        onMessageSent?.()
      }
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Button type="button" variant="ghost" size="icon" className="shrink-0">
          <Paperclip className="h-4 w-4" />
        </Button>

        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isLoading}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <Button type="submit" size="icon" disabled={!message.trim() || isLoading} className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

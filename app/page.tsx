"use client"

import { useState } from "react"
import { ConversationList } from "@/components/chat/conversation-list"
import { MessageList } from "@/components/chat/message-list"
import { MessageInput } from "@/components/chat/message-input"
import { ChatHeader } from "@/components/chat/chat-header"

export default function ChatPage() {
  const [selectedConversationId, setSelectedConversationId] = useState<string>("")
  const currentUserId = "1" // In a real app, this would come from authentication

  const handleMessageSent = () => {
    // This could trigger a refresh of the conversation list
    // to update the last message preview
  }

  return (
    <div className="h-screen flex bg-background">
      <ConversationList
        currentUserId={currentUserId}
        selectedConversationId={selectedConversationId}
        onConversationSelect={setSelectedConversationId}
      />

      <div className="flex-1 flex flex-col">
        {selectedConversationId ? (
          <>
            <ChatHeader conversationId={selectedConversationId} currentUserId={currentUserId} />
            <MessageList conversationId={selectedConversationId} currentUserId={currentUserId} />
            <MessageInput
              conversationId={selectedConversationId}
              currentUserId={currentUserId}
              onMessageSent={handleMessageSent}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Welcome to Chat</h2>
              <p className="text-muted-foreground">Select a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

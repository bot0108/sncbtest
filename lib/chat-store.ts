export interface User {
  id: string
  name: string
  avatar: string
  online: boolean
}

export interface Message {
  id: string
  sender_id: string
  receiver_id: string
  message: string
  timestamp: Date | string
  is_read: boolean
}

// In-memory store (in production, use a real database)
class ChatStore {
  private users: Map<string, User> = new Map()
  private messages: Message[] = []

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    // Sample users
    const sampleUsers: User[] = [
      { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", online: true },
      { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", online: false },
      { id: "3", name: "Carol Davis", avatar: "/placeholder.svg?height=40&width=40", online: true },
      { id: "4", name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40", online: true },
      { id: "5", name: "Eva Brown", avatar: "/placeholder.svg?height=40&width=40", online: false },
    ]

    sampleUsers.forEach((user) => this.users.set(user.id, user))

    // Sample messages
    this.messages = [
      {
        id: "msg-1",
        sender_id: "1",
        receiver_id: "2",
        message: "Hey Bob! How are you doing?",
        timestamp: new Date("2024-01-01T10:00:00"),
        is_read: true,
      },
      {
        id: "msg-2",
        sender_id: "2",
        receiver_id: "1",
        message: "Hi Alice! I'm doing great, thanks for asking!",
        timestamp: new Date("2024-01-01T10:05:00"),
        is_read: true,
      },
      {
        id: "msg-3",
        sender_id: "1",
        receiver_id: "group-1",
        message: "Welcome to the team project chat!",
        timestamp: new Date("2024-01-02T09:00:00"),
        is_read: true,
      },
      {
        id: "msg-4",
        sender_id: "3",
        receiver_id: "group-1",
        message: "Thanks! Excited to work with you all.",
        timestamp: new Date("2024-01-02T09:15:00"),
        is_read: true,
      },
      {
        id: "msg-5",
        sender_id: "1",
        receiver_id: "5",
        message: "Hi Eva, do you have time to meet today?",
        timestamp: new Date("2024-01-03T14:00:00"),
        is_read: false,
      },
    ]
  }

  getUsers(): User[] {
    return Array.from(this.users.values())
  }

  getUser(id: string): User | undefined {
    return this.users.get(id)
  }

  // Get all unique conversations for a user
  getConversations(userId: string): { id: string; type: "direct" | "group"; participants: string[] }[] {
    const conversations = new Map<string, { id: string; type: "direct" | "group"; participants: string[] }>()

    // Find all direct messages
    this.messages.forEach((message) => {
      if (message.sender_id === userId || message.receiver_id === userId) {
        if (message.receiver_id.startsWith("group-")) {
          // Group conversation
          const groupId = message.receiver_id
          if (!conversations.has(groupId)) {
            // In a real app, you'd fetch group participants from a groups table
            // For now, we'll just add the sender and current user
            conversations.set(groupId, {
              id: groupId,
              type: "group",
              participants: [message.sender_id, userId],
            })
          }
        } else {
          // Direct conversation
          const otherUserId = message.sender_id === userId ? message.receiver_id : message.sender_id
          const conversationId = [userId, otherUserId].sort().join("-")

          if (!conversations.has(conversationId)) {
            conversations.set(conversationId, {
              id: conversationId,
              type: "direct",
              participants: [userId, otherUserId],
            })
          }
        }
      }
    })

    return Array.from(conversations.values())
  }

  // Get conversation details including last message
  getConversationDetails(conversationId: string, currentUserId: string) {
    const parts = conversationId.split("-")
    const isGroup = conversationId.startsWith("group-")

    let participants: string[] = []
    let type: "direct" | "group" = "direct"

    if (isGroup) {
      // In a real app, you'd fetch group details from a groups table
      type = "group"
      // For demo, we'll get all users who have sent messages to this group
      const senders = new Set<string>()
      this.messages.forEach((msg) => {
        if (msg.receiver_id === conversationId) {
          senders.add(msg.sender_id)
        }
      })
      participants = Array.from(senders)
      if (!participants.includes(currentUserId)) {
        participants.push(currentUserId)
      }
    } else {
      // Direct message - participants are the two user IDs
      participants = parts
      type = "direct"
    }

    // Get the last message
    const messages = this.getMessages(conversationId, currentUserId)
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null

    // Count unread messages
    const unreadCount = messages.filter((msg) => !msg.is_read && msg.sender_id !== currentUserId).length

    return {
      id: conversationId,
      type,
      participants,
      lastMessage,
      unreadCount,
    }
  }

  // Get messages for a conversation
  getMessages(conversationId: string, currentUserId: string): Message[] {
    if (conversationId.startsWith("group-")) {
      // Group messages
      return this.messages
        .filter((msg) => msg.receiver_id === conversationId)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    } else {
      // Direct messages between two users
      const [user1, user2] = conversationId.split("-").sort()

      return this.messages
        .filter((msg) => {
          const participants = [msg.sender_id, msg.receiver_id].sort()
          return participants[0] === user1 && participants[1] === user2
        })
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    }
  }

  // Add a new message
  addMessage(messageData: Omit<Message, "id" | "timestamp" | "is_read">): Message {
    const newMessage: Message = {
      ...messageData,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      is_read: false,
    }

    this.messages.push(newMessage)
    return newMessage
  }

  // Mark messages as read
  markMessagesAsRead(conversationId: string, userId: string): void {
    if (conversationId.startsWith("group-")) {
      // Mark group messages as read
      this.messages.forEach((msg) => {
        if (msg.receiver_id === conversationId && msg.sender_id !== userId && !msg.is_read) {
          msg.is_read = true
        }
      })
    } else {
      // Mark direct messages as read
      const [user1, user2] = conversationId.split("-").sort()

      this.messages.forEach((msg) => {
        if (msg.sender_id !== userId && msg.receiver_id === userId && !msg.is_read) {
          const participants = [msg.sender_id, msg.receiver_id].sort()
          if (participants[0] === user1 && participants[1] === user2) {
            msg.is_read = true
          }
        }
      })
    }
  }

  // Create a new group
  createGroup(name: string, participants: string[]): string {
    const groupId = `group-${Date.now()}`
    // In a real app, you'd save this to a groups table
    return groupId
  }
}

export const chatStore = new ChatStore()

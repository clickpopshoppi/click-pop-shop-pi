"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ChatbotContextType {
  isOpen: boolean
  openChatbot: () => void
  closeChatbot: () => void
  toggleChatbot: () => void
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined)

export function ChatbotSimpleProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        openChatbot: () => setIsOpen(true),
        closeChatbot: () => setIsOpen(false),
        toggleChatbot: () => setIsOpen(!isOpen),
      }}
    >
      {children}
    </ChatbotContext.Provider>
  )
}

export function useChatbotSimple() {
  const context = useContext(ChatbotContext)
  if (!context) {
    return {
      isOpen: false,
      openChatbot: () => {},
      closeChatbot: () => {},
      toggleChatbot: () => {},
    }
  }
  return context
}

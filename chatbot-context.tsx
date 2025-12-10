"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ChatbotContextType {
  isOpen: boolean
  openChatbot: () => void
  closeChatbot: () => void
  toggleChatbot: () => void
}

const ChatbotContext = createContext<ChatbotContextType>({
  isOpen: false,
  openChatbot: () => {},
  closeChatbot: () => {},
  toggleChatbot: () => {},
})

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openChatbot = () => setIsOpen(true)
  const closeChatbot = () => setIsOpen(false)
  const toggleChatbot = () => setIsOpen((prev) => !prev)

  return (
    <ChatbotContext.Provider value={{ isOpen, openChatbot, closeChatbot, toggleChatbot }}>
      {children}
    </ChatbotContext.Provider>
  )
}

export function useChatbotWidget() {
  const context = useContext(ChatbotContext)
  return context
}

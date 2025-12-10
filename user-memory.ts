import { type UserData, USER_DATA_KEY } from "./chatbot-enhanced-config"

export class UserMemoryManager {
  static getUserData(uid: string): UserData | null {
    if (typeof window === "undefined") return null

    try {
      const stored = localStorage.getItem(`${USER_DATA_KEY}_${uid}`)
      if (stored) {
        const data = JSON.parse(stored)
        data.lastVisit = new Date(data.lastVisit)
        return data
      }
    } catch (error) {
      console.error("[v0] Error reading user data:", error)
    }
    return null
  }

  static saveUserData(data: UserData): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(`${USER_DATA_KEY}_${data.uid}`, JSON.stringify(data))
    } catch (error) {
      console.error("[v0] Error saving user data:", error)
    }
  }

  static updatePreferences(uid: string, newPreference: string): void {
    let userData = this.getUserData(uid)

    if (!userData) {
      userData = {
        uid,
        lastVisit: new Date(),
        preferences: [newPreference],
        conversationHistory: {
          topics: [],
          sentiment: "neutral",
        },
        helpfulRatings: 0,
      }
    } else {
      if (!userData.preferences.includes(newPreference)) {
        userData.preferences.push(newPreference)
      }
      userData.lastVisit = new Date()
    }

    this.saveUserData(userData)
  }

  static addConversationTopic(uid: string, topic: string): void {
    const userData = this.getUserData(uid)
    if (userData) {
      if (!userData.conversationHistory.topics.includes(topic)) {
        userData.conversationHistory.topics.push(topic)
      }
      this.saveUserData(userData)
    }
  }

  static rateHelpful(uid: string, isHelpful: boolean): void {
    const userData = this.getUserData(uid)
    if (userData) {
      userData.helpfulRatings += isHelpful ? 1 : -1
      this.saveUserData(userData)
    }
  }
}

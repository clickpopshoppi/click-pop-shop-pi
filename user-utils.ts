export interface UserData {
  uid: string
  username?: string
  kycStatus?: string
}

export function getUsernameDisplay(userData?: UserData | null, fallback = "Pioneer"): string {
  if (!userData) return fallback

  // Priority: username > uid > fallback
  return userData.username || userData.uid || fallback
}

export function loadUserDataFromSession(): UserData | null {
  if (typeof window === "undefined") return null

  try {
    const stored = sessionStorage.getItem("pi_user_data")
    if (stored) {
      const parsed = JSON.parse(stored)
      console.log("[v0] Loaded user data:", parsed)
      return {
        uid: parsed.uid,
        username: parsed.username,
        kycStatus: parsed.kycStatus || parsed.kyc_status,
      }
    }
  } catch (error) {
    console.error("[v0] Failed to load user data:", error)
  }

  return null
}

export function saveUserDataToSession(userData: UserData): void {
  if (typeof window === "undefined") return

  try {
    sessionStorage.setItem("pi_user_data", JSON.stringify(userData))
    console.log("[v0] Saved user data:", userData.username || userData.uid)

    // Dispatch event for other components to react
    window.dispatchEvent(new CustomEvent("pi_user_logged_in", { detail: userData }))
  } catch (error) {
    console.error("[v0] Failed to save user data:", error)
  }
}

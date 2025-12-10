export interface PiPaymentData {
  amount: number
  memo: string
  metadata: Record<string, any>
}

export interface PiPaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void
  onReadyForServerCompletion: (paymentId: string, txid: string) => void
  onCancel: (paymentId: string) => void
  onError: (error: Error, payment?: any) => void
  onIncompletePaymentFound?: (payment: any) => void // Added for Test Token transactions
}

declare global {
  interface Window {
    Pi: {
      createPayment: (paymentData: PiPaymentData, callbacks: PiPaymentCallbacks) => void
      init: (config: { version: string; sandbox?: boolean }) => Promise<void>
    }
  }
}

export async function initiatePiPayment(
  amount: number,
  memo: string,
  metadata: Record<string, any> = {},
): Promise<string> {
  console.log("[v0] 🚀 Starting Pi Payment Flow:", { amount, memo, metadata })

  return new Promise((resolve, reject) => {
    if (!window.Pi) {
      const error = new Error("Pi SDK not loaded. Please ensure Pi Browser is being used.")
      console.error("[v0] ❌ Pi SDK Error:", error)
      reject(error)
      return
    }

    const paymentData: PiPaymentData = {
      amount,
      memo,
      metadata: {
        ...metadata,
        app: "Click Pop Shop Pi",
        timestamp: new Date().toISOString(),
        version: "2.0",
      },
    }

    const callbacks: PiPaymentCallbacks = {
      onReadyForServerApproval: (paymentId) => {
        console.log("[v0] ✅ Payment ready for server approval:", paymentId)
        console.log("[v0] 🎯 Wallet UI should now show Confirm button")
        resolve(paymentId)

        // Send to backend for approval
        fetch("/api/pi-payment/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId }),
        }).catch((err) => console.error("[v0] Backend approval error:", err))
      },

      onReadyForServerCompletion: (paymentId, txid) => {
        console.log("[v0] ✅ Payment ready for completion:", { paymentId, txid })
        console.log("[v0] 💰 Transaction ID:", txid)

        // Complete transaction on backend
        fetch("/api/pi-payment/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId, txid }),
        }).catch((err) => console.error("[v0] Backend completion error:", err))
      },

      onCancel: (paymentId) => {
        console.log("[v0] ⚠️ Payment cancelled by user:", paymentId)
        reject(new Error("Payment cancelled by user"))
      },

      onError: (error, payment) => {
        console.error("[v0] ❌ Payment error:", error, payment)
        reject(error)
      },

      onIncompletePaymentFound: (payment) => {
        console.log("[v0] 🔄 Incomplete payment found (Test Token):", payment)
        console.log("[v0] 📌 Resuming transaction for paymentId:", payment.identifier)

        // Resume incomplete payment
        if (payment.identifier) {
          resolve(payment.identifier)
        }
      },
    }

    try {
      console.log("[v0] 📤 Calling Pi.createPayment...")
      window.Pi.createPayment(paymentData, callbacks)
      console.log("[v0] ✅ Pi.createPayment called successfully - wallet should render")
    } catch (error) {
      console.error("[v0] ❌ Failed to create payment:", error)
      reject(error)
    }
  })
}

export function isPiSDKAvailable(): boolean {
  const available = typeof window !== "undefined" && !!window.Pi
  console.log("[v0] Pi SDK availability:", available)
  return available
}

export async function ensurePiSDKLoaded(): Promise<void> {
  if (isPiSDKAvailable()) {
    console.log("[v0] ✅ Pi SDK already loaded")
    return
  }

  console.log("[v0] 📥 Loading Pi SDK...")

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://sdk.minepi.com/pi-sdk.js"
    script.async = true

    script.onload = async () => {
      console.log("[v0] ✅ Pi SDK script loaded")

      try {
        if (window.Pi) {
          await window.Pi.init({ version: "2.0", sandbox: false })
          console.log("[v0] ✅ Pi SDK initialized")
          resolve()
        } else {
          reject(new Error("Pi SDK loaded but window.Pi is undefined"))
        }
      } catch (error) {
        console.error("[v0] ❌ Pi SDK initialization error:", error)
        reject(error)
      }
    }

    script.onerror = () => {
      console.error("[v0] ❌ Failed to load Pi SDK script")
      reject(new Error("Failed to load Pi SDK script"))
    }

    document.head.appendChild(script)
  })
}

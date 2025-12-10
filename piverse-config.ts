export const PIVERSE_CONFIG = {
  APP_NAME: "Click Pop Shop Pi",
  APP_TAGLINE: "แอปเดียวที่โลกต้องใช้",
  
  ZONES: [
    {
      id: "gateway",
      name: "Pi Gateway",
      nameEn: "Pi Gateway",
      nameTh: "ประตูพาย",
      description: "จุดเริ่มต้นสู่โลกเสมือน Pi",
      icon: "Compass",
      color: "#FFD700",
      route: "/zones/gateway"
    },
    {
      id: "shopping",
      name: "Shopping Arcade",
      nameEn: "Shopping Arcade",
      nameTh: "ห้างสรรพสินค้า",
      description: "ร้านค้าเสมือน 3D",
      icon: "ShoppingBag",
      color: "#E5007A",
      route: "/shop"
    },
    {
      id: "live",
      name: "Live Event Arena",
      nameEn: "Live Event Arena",
      nameTh: "เวทีไลฟ์สด",
      description: "ไลฟ์ขายสินค้าและอีเวนต์",
      icon: "Tv",
      color: "#8b5cf6",
      route: "/video"
    },
    {
      id: "services",
      name: "Artisan's Alley",
      nameEn: "Artisan's Alley",
      nameTh: "ตรอกช่างฝีมือ",
      description: "บริการโดย Pi Pioneer",
      icon: "Wrench",
      color: "#f59e0b",
      route: "/services"
    },
    {
      id: "food",
      name: "Food Court",
      nameEn: "Food Court",
      nameTh: "ศูนย์อาหาร",
      description: "สั่งอาหารและติดตามการจัดส่ง",
      icon: "UtensilsCrossed",
      color: "#10b981",
      route: "/delivery"
    },
    {
      id: "support",
      name: "Pi Services Center",
      nameEn: "Pi Services Center",
      nameTh: "ศูนย์บริการ Pi",
      description: "KYC, Wallet, ช่วยเหลือ",
      icon: "HeadphonesIcon",
      color: "#06b6d4",
      route: "/support"
    }
  ],
  
  NAVIGATION_TIPS: {
    tap: "แตะเพื่อเดิน",
    swipe: "ปัดเพื่อมองรอบ",
    zoom: "ซูมเพื่อเข้าใกล้"
  }
} as const

export type Zone = typeof PIVERSE_CONFIG.ZONES[number]

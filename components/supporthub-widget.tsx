'use client'

import { useEffect } from 'react'

const SUPPORT_HUB_SRC = "https://www.linksdesk.net/supporthub-widget.js"
const SUPPORT_HUB_CONFIG = {
  widgetId: "website-main",
  position: "bottom-right",
  primaryColor: "#e11d48",
  theme: "light",
  appearance: {
    template: "coral",
    headerColor: "#be123c",
    headerTextColor: "#ffffff",
    panelColor: "#ffffff",
    surfaceColor: "#fff1f2",
    cardColor: "#ffffff",
    textColor: "#1f2937",
    mutedTextColor: "#6b7280",
    borderColor: "#fecdd3",
    userMessageColor: "#e11d48",
    buttonTextColor: "#ffffff",
    radius: "rounded"
  },
  widgetName: "Links Concierge",
  greeting: "Share what you need and we will route it to the right teammate with the full conversation intact.",
  isEnabled: true,
  enabled: true
}

export function useSupportHub() {
  useEffect(() => {
    (window as any).SupportHubConfig = SUPPORT_HUB_CONFIG

    const existing = document.querySelector('script[data-supporthub="true"]')
    if (existing) return

    const script = document.createElement('script')
    script.src = SUPPORT_HUB_SRC
    script.async = true
    script.dataset.supporthub = 'true'
    script.dataset.widgetId = SUPPORT_HUB_CONFIG.widgetId
    document.body.appendChild(script)
  }, [])
}

export function SupportHubWidget() {
  useSupportHub()
  return null
}

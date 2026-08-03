import Script from 'next/script'

export function SupportHubWidget() {
  return (
    <>
      <Script id="supporthub-config" strategy="afterInteractive">
        {`window.SupportHubConfig = {
  "widgetId": "website-main",
  "position": "bottom-right",
  "primaryColor": "#e11d48",
  "theme": "light",
  "appearance": {
    "template": "coral",
    "headerColor": "#5c4249",
    "headerTextColor": "#ffffff",
    "panelColor": "#ffffff",
    "surfaceColor": "#fff1f2",
    "cardColor": "#ffffff",
    "textColor": "#1f2937",
    "mutedTextColor": "#6b7280",
    "borderColor": "#fecdd3",
    "userMessageColor": "#e11d48",
    "buttonTextColor": "#ffffff",
    "radius": "compact"
  },
  "widgetName": "Cerullo Car Rental",
  "greeting": "Welcome to Our showroom may we assist",
  "isEnabled": true,
  "enabled": true
};`}
      </Script>
      <Script
        src="https://www.linksdesk.net/supporthub-widget.js"
        data-widget-id="website-main"
        strategy="afterInteractive"
      />
    </>
  )
}

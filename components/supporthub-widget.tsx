import Script from 'next/script'

export function SupportHubWidget() {
  return (
    <>
      <Script id="supporthub-config" strategy="afterInteractive">
        {`window.SupportHubConfig = {
  "widgetId": "website-main",
  "position": "bottom-right",
  "primaryColor": "#0ea5e9",
  "theme": "dark",
  "appearance": {
    "template": "default",
    "headerColor": "#0d0d14",
    "headerTextColor": "#ffffff",
    "panelColor": "#0a0a0f",
    "surfaceColor": "#0d0d14",
    "cardColor": "#13131f",
    "textColor": "#f1f5f9",
    "mutedTextColor": "#94a3b8",
    "borderColor": "#1e293b",
    "userMessageColor": "#0ea5e9",
    "buttonTextColor": "#ffffff",
    "radius": "compact"
  },
  "widgetName": "Caycee Developers",
  "greeting": "Hi there! How can we help you today? Share what you need and we'll get back to you.",
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

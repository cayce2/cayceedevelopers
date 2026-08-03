import Script from "next/script"

export function SupportHubWidget() {
  return (
    <>
      <Script id="supporthub-config" strategy="afterInteractive">
        {`window.SupportHubConfig = {
  "widgetId": "website-main",
  "position": "bottom-left",
  "primaryColor": "#00998c",
  "theme": "dark",
  "widgetName": "Links Concierge",
  "greeting": "Share what you need and we will route it to the right teammate with the full conversation intact.",
  "enabled": true
};`}
      </Script>
      <Script
        src="https:/linksdesk.net/supporthub-widget.js"
        data-widget-id="website-main"
        strategy="afterInteractive"
      />
    </>
  )
}

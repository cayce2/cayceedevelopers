import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { LanguageProvider } from "../lib/language-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Caycee Developers - Where Design Meets Creativity",
  description: "We create innovative digital solutions that help businesses thrive in the modern world.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supportHubConfig = `
    window.SupportHubConfig = {
      apiUrl: 'https://linkssupport.vercel.app',
      widgetId: 'website-main',
      position: 'bottom-right',
      primaryColor: '#0f766e',
      theme: 'light',
      widgetName: 'Links Concierge',
      greeting: 'Share what you need and we will route it to the right teammate with the full conversation intact.'
    };
  `

  const supportHubStatusScript = `
    window.__SUPPORTHUB_STATUS__ = window.__SUPPORTHUB_STATUS__ || {
      ready: false,
      sessionSynced: false,
      messageSent: false,
      errors: [],
    };

    window.addEventListener('supporthub:ready', (event) => {
      window.__SUPPORTHUB_STATUS__.ready = true;
      window.__SUPPORTHUB_STATUS__.readyAt = new Date().toISOString();
      window.__SUPPORTHUB_STATUS__.widgetId = event.detail.widgetId;
      document.documentElement.dataset.supporthubWidget = 'ready';
      console.info('[SupportHub] ready', event.detail);
    });

    window.addEventListener('supporthub:session:sync', (event) => {
      window.__SUPPORTHUB_STATUS__.sessionSynced = true;
      window.__SUPPORTHUB_STATUS__.sessionSyncedAt = new Date().toISOString();
      window.__SUPPORTHUB_STATUS__.lastSession = event.detail;
      document.documentElement.dataset.supporthubSession = 'synced';
      console.info('[SupportHub] session sync', event.detail);
    });

    window.addEventListener('supporthub:message:sent', (event) => {
      window.__SUPPORTHUB_STATUS__.messageSent = true;
      window.__SUPPORTHUB_STATUS__.lastMessageAt = new Date().toISOString();
      window.__SUPPORTHUB_STATUS__.lastMessage = event.detail;
      document.documentElement.dataset.supporthubMessage = 'sent';
      console.info('[SupportHub] message sent', event.detail);
    });

    window.addEventListener('supporthub:error', (event) => {
      window.__SUPPORTHUB_STATUS__.errors.push(event.detail);
      console.error('[SupportHub] widget error', event.detail);
    });
  `

  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Script
          id="supporthub-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: supportHubConfig }}
        />
        <Script
          id="supporthub-widget"
          src="https://linkssupport.vercel.app/supporthub-widget.js"
          strategy="afterInteractive"
        />
        <Script
          id="supporthub-status"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: supportHubStatusScript }}
        />
      </body>
    </html>
  )
}


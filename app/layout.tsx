import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
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
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <!-- SupportHub Chat Widget -->
<script>
  window.SupportHubConfig = {
    apiUrl: 'https://vm-8g8rjch3uaiuvdg0ew5gkhx0.vusercontent.net',
    widgetId: 'default',
    position: 'bottom-right',
    primaryColor: '#3b82f6',
    theme: 'dark'
  };
</script>
<script src="https://vm-8g8rjch3uaiuvdg0ew5gkhx0.vusercontent.net/supporthub-widget.js"></script>
      </body>
    </html>
  )
}


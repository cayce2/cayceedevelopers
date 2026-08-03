import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter } from "next/font/google"
import { LanguageProvider } from "../lib/language-context"
import "./globals.css"
import { SupportHubWidget } from "@/components/supporthub-widget"

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
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>

        <SupportHubWidget />

        <Script
          src="https://vm-localization-widget-5.vusercontent.net/api/widget/script"
          strategy="afterInteractive"
          data-api-key="key_d7af14393b33dfde7526fe23e64dad10cc00354010d570f5b26a20051c8a4e4d"
          data-api-url="https://vm-localization-widget-5.vusercontent.net"
        />
      </body>
    </html>
  )
}

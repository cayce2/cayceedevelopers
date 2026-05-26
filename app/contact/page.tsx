import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { SupportHubWidget } from "@/components/supporthub-widget"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact Us - Caycee Developers",
  description: "Connect with Caycee Developers for web development, mobile apps, UI/UX design, and digital consulting.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050a14] text-white">
      <Navbar />
      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 tech-grid" />
        <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl" />

        <section className="container relative mx-auto px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sky-400 transition-colors hover:text-sky-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>

              <div className="inline-flex items-center gap-2 border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-xs font-medium text-sky-300">
                <MessageSquare className="h-3.5 w-3.5" />
                Contact Us
              </div>

              <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Tell us what you need. We will route it to the right teammate.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
                Share your project goals, support request, or collaboration idea and the Links Concierge will keep the full conversation together.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-sky-500 px-8 py-6 font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600">
                  <a href="mailto:cayceedevelopers@gmail.com">
                    <Mail className="mr-2 h-5 w-5" />
                    Email CayceeTech
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-sky-500/30 px-8 py-6 text-sky-400 hover:border-sky-400 hover:bg-sky-500/10">
                  <a href="mailto:cayceedevelopers@gmail.com?subject=Project%20Inquiry">
                    <Send className="mr-2 h-5 w-5" />
                    Start a Project
                  </a>
                </Button>
              </div>
            </div>

            <aside className="border border-sky-500/20 bg-[#0a0f1e]/80 p-6 shadow-xl shadow-sky-500/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-b border-sky-500/20 pb-5">
                <div className="flex h-11 w-11 items-center justify-center bg-sky-500/10 text-sky-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Links Concierge</h2>
                  <p className="text-sm text-gray-400">CayceeTech support hub</p>
                </div>
              </div>

              <div className="space-y-5 py-6">
                <div>
                  <p className="text-sm font-medium text-gray-300">Best for</p>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    New builds, design work, technical support, project updates, and partnership requests.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Direct email</p>
                  <a className="mt-1 block text-sm text-sky-400 hover:text-sky-300" href="mailto:cayceedevelopers@gmail.com">
                    cayceedevelopers@gmail.com
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
      <SupportHubWidget />
    </div>
  )
}

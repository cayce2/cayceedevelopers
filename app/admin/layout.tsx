"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LogOut, Users, FolderKanban, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/admin/login" && !localStorage.getItem("adminAuth")) {
      router.push("/admin/login")
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background tech-grid">
      <nav className="bg-card/80 backdrop-blur-xl shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-1">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-3 animate-glow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <Link href="/admin/dashboard" className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors text-foreground">
                Dashboard
              </Link>
              <Link href="/admin/clients" className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors text-foreground">
                <Users className="w-4 h-4 mr-2" />
                Clients
              </Link>
              <Link href="/admin/projects" className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors text-foreground">
                <FolderKanban className="w-4 h-4 mr-2" />
                Projects
              </Link>
              <Link href="/admin/invoices" className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary/10 transition-colors text-foreground">
                <FileText className="w-4 h-4 mr-2" />
                Invoices
              </Link>
            </div>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

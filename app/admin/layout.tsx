"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LogOut, Users, FolderKanban, FileText, Activity, Shield, BarChart3, Monitor, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/invoices", label: "Invoices", icon: FileText },
    { href: "/admin/activity-logs", label: "Activity", icon: Activity },
    { href: "/admin/audit-logs", label: "Audit", icon: Shield },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/system-monitor", label: "Monitor", icon: Monitor }
  ]

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
            <div className="flex items-center min-w-0">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-3 animate-glow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="hidden lg:flex items-center space-x-1">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center px-3 lg:px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname === href ? "bg-primary/15 text-primary" : "text-foreground hover:bg-primary/10"
                    }`}
                  >
                    {Icon ? <Icon className="w-4 h-4 mr-2" /> : null}
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="hidden lg:inline-flex hover:bg-destructive/10 hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
            <div className="lg:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="rounded-xl">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] max-w-xs p-0">
                  <SheetHeader className="px-4 py-4 border-b border-border">
                    <SheetTitle>Admin Menu</SheetTitle>
                  </SheetHeader>
                  <div className="px-3 py-4 space-y-2">
                    {navItems.map(({ href, label, icon: Icon }) => (
                      <SheetClose asChild key={href}>
                        <Link
                          href={href}
                          className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                            pathname === href ? "bg-primary/15 text-primary" : "text-foreground hover:bg-primary/10"
                          }`}
                        >
                          {Icon ? <Icon className="w-4 h-4 mr-2" /> : null}
                          {label}
                        </Link>
                      </SheetClose>
                    ))}
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

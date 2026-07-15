"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard, Users, FolderKanban, FileText,
  Activity, Shield, BarChart3, Monitor, LogOut,
  ChevronLeft, ChevronRight, Menu, FileSignature
} from "lucide-react"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clients", label: "Clients", icon: Users },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/invoices", label: "Invoices", icon: FileText },
  { href: "/admin/contracts", label: "Contracts", icon: FileSignature },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/activity-logs", label: "Activity", icon: Activity },
  { href: "/admin/audit-logs", label: "Audit", icon: Shield },
  { href: "/admin/system-monitor", label: "Monitor", icon: Monitor },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (pathname !== "/admin/login" && !localStorage.getItem("adminAuth")) {
      router.push("/admin/login")
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  if (pathname === "/admin/login") return <>{children}</>

  const currentPage = navItems.find(n => n.href === pathname)?.label || "Admin"

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 flex flex-col h-full bg-[#0d0d14] border-r border-white/[0.06]
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-[68px]" : "w-[220px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center h-14 px-4 border-b border-white/[0.06] shrink-0 ${collapsed ? "justify-center" : "gap-3"}`}>
          <div className="w-7 h-7 bg-sky-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-xs font-black text-white">CD</span>
          </div>
          {!collapsed && <span className="font-bold text-sm tracking-tight text-white">Caycee Dev</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? label : undefined}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${active
                    ? "bg-sky-500/15 text-sky-400 border border-sky-500/20"
                    : "text-white/50 hover:text-white hover:bg-white/[0.05] border border-transparent"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/[0.06] space-y-0.5">
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent ${collapsed ? "justify-center" : ""}`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all ${collapsed ? "justify-center" : ""}`}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4" /><span>Collapse</span></>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 flex items-center justify-between px-4 lg:px-6 border-b border-white/[0.06] bg-[#0a0a0f] shrink-0">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06]"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold text-white/80">{currentPage}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/40 hidden sm:block">System Online</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

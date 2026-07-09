/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Users, FolderKanban, FileText, DollarSign, ArrowUpRight, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ clients: 0, projects: 0, invoices: 0, revenue: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/activity-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'view', page: 'dashboard', userEmail: 'admin', status: 'success', timestamp: new Date() })
    }).catch(() => {})

    Promise.all([
      fetch('/api/clients').then(r => r.json()),
      fetch('/api/projects').then(r => r.json()),
      fetch('/api/invoices').then(r => r.json()),
    ]).then(([clients, projects, invoices]) => {
      const revenue = invoices
        .filter((i: any) => i.type === "invoice")
        .reduce((sum: number, i: any) => {
          const project = projects.find((p: any) => p._id === i.projectId)
          const client = clients.find((c: any) => c._id === project?.clientId)
          return sum + (client?.currency === "KES" ? i.total / 130 : i.total)
        }, 0)
      setStats({ clients: clients.length, projects: projects.length, invoices: invoices.length, revenue })
      setLoading(false)
    })
  }, [])

  const cards = [
    { label: "Total Clients", value: stats.clients, icon: Users, href: "/admin/clients", color: "sky" },
    { label: "Total Projects", value: stats.projects, icon: FolderKanban, href: "/admin/projects", color: "violet" },
    { label: "Total Invoices", value: stats.invoices, icon: FileText, href: "/admin/invoices", color: "amber" },
    { label: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, href: "/admin/invoices", color: "emerald" },
  ]

  const colorMap: Record<string, string> = {
    sky: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  }

  const quickLinks = [
    { label: "Add Client", href: "/admin/clients", desc: "Register a new client" },
    { label: "New Project", href: "/admin/projects", desc: "Start a new project" },
    { label: "Create Invoice", href: "/admin/invoices", desc: "Generate invoice or quote" },
    { label: "View Analytics", href: "/admin/analytics", desc: "Traffic & usage insights" },
  ]

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Overview</h2>
        <p className="text-sm text-white/40 mt-0.5">Your business at a glance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="group bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${colorMap[color]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
            </div>
            <div>
              {loading ? (
                <div className="h-7 w-16 bg-white/[0.06] rounded animate-pulse mb-1" />
              ) : (
                <p className="text-2xl font-bold text-white">{value}</p>
              )}
              <p className="text-xs text-white/40 mt-0.5">{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-white/30" />
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickLinks.map(({ label, href, desc }) => (
            <Link
              key={label}
              href={href}
              className="bg-[#0d0d14] border border-white/[0.06] rounded-xl p-4 hover:border-sky-500/30 hover:bg-sky-500/[0.04] transition-all group"
            >
              <p className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">{label}</p>
              <p className="text-xs text-white/30 mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

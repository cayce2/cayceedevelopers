/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Users, FolderKanban, FileText, DollarSign,
  ArrowUpRight, TrendingUp, Clock, CheckCircle2,
  AlertCircle, Circle
} from "lucide-react"

const statusColor: Record<string, string> = {
  completed: "text-emerald-400",
  paid: "text-emerald-400",
  "in-progress": "text-sky-400",
  sent: "text-sky-400",
  partial: "text-amber-400",
  "on-hold": "text-amber-400",
  overdue: "text-red-400",
  draft: "text-white/30",
  pending: "text-white/30",
}

const StatusDot = ({ status }: { status: string }) => {
  const Icon =
    status === "completed" || status === "paid" ? CheckCircle2
    : status === "overdue" ? AlertCircle
    : Circle
  return <Icon className={`w-3.5 h-3.5 shrink-0 ${statusColor[status] ?? "text-white/30"}`} />
}

export default function AdminDashboard() {
  const [data, setData] = useState<any>({ clients: [], projects: [], invoices: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/clients').then(r => r.json()),
      fetch('/api/projects').then(r => r.json()),
      fetch('/api/invoices').then(r => r.json()),
    ]).then(([clients, projects, invoices]) => {
      setData({ clients, projects, invoices })
      setLoading(false)
    })
  }, [])

  const { clients, projects, invoices } = data

  const revenue = invoices
    .filter((i: any) => i.type === "invoice" && i.status === "paid")
    .reduce((sum: number, i: any) => {
      const project = projects.find((p: any) => p._id === i.projectId)
      const client = clients.find((c: any) => c._id === project?.clientId)
      return sum + (client?.currency === "KES" ? (i.total ?? 0) / 130 : (i.total ?? 0))
    }, 0)

  const outstanding = invoices
    .filter((i: any) => i.type === "invoice" && i.status !== "paid")
    .reduce((sum: number, i: any) => {
      const project = projects.find((p: any) => p._id === i.projectId)
      const client = clients.find((c: any) => c._id === project?.clientId)
      const total = i.total ?? 0
      const paid = i.amountPaid ?? 0
      const balance = Math.max(total - paid, 0)
      return sum + (client?.currency === "KES" ? balance / 130 : balance)
    }, 0)

  const cards = [
    { label: "Total Clients", value: clients.length, icon: Users, href: "/admin/clients", color: "sky" },
    { label: "Active Projects", value: projects.filter((p: any) => p.status === "in-progress").length, icon: FolderKanban, href: "/admin/projects", color: "violet" },
    { label: "Total Invoices", value: invoices.length, icon: FileText, href: "/admin/invoices", color: "amber" },
    { label: "Revenue (USD)", value: `$${revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: DollarSign, href: "/admin/invoices", color: "emerald" },
  ]

  const colorMap: Record<string, string> = {
    sky: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  }

  const recentProjects = [...projects]
    .sort((a: any, b: any) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    .slice(0, 5)

  const recentInvoices = [...invoices]
    .sort((a: any, b: any) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    .slice(0, 5)

  const projectsByStatus = ["pending", "in-progress", "completed", "on-hold"].map(s => ({
    status: s,
    count: projects.filter((p: any) => p.status === s).length,
  }))

  const Skeleton = () => <div className="h-7 w-16 bg-white/[0.06] rounded animate-pulse" />

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-xl font-bold text-white">Overview</h2>
        <p className="text-sm text-white/40 mt-0.5">Your business at a glance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="group bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${colorMap[color]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
            </div>
            {loading ? <Skeleton /> : <p className="text-2xl font-bold text-white">{value}</p>}
            <p className="text-xs text-white/40 mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-white/30" />
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Recent Projects</h3>
            </div>
            <Link href="/admin/projects" className="text-xs text-sky-400 hover:text-sky-300 transition-colors">View all</Link>
          </div>
          <div className="space-y-1">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-white/[0.03] rounded-lg animate-pulse" />
              ))
            ) : recentProjects.length === 0 ? (
              <p className="text-sm text-white/30 py-4 text-center">No projects yet</p>
            ) : recentProjects.map((p: any) => {
              const client = clients.find((c: any) => c._id === p.clientId)
              return (
                <div key={p._id} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors group">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <StatusDot status={p.status} />
                    <span className="text-sm text-white/80 truncate font-medium">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-xs text-white/30 hidden sm:block">{client?.name || "—"}</span>
                    <span className="text-xs font-semibold text-white/50">{client?.currency || "USD"} {(p.budget ?? 0).toLocaleString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Project Status Breakdown */}
        <div className="bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-white/30" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Project Status</h3>
          </div>
          <div className="space-y-3">
            {projectsByStatus.map(({ status, count }) => {
              const total = projects.length || 1
              const pct = Math.round((count / total) * 100)
              const barColor =
                status === "completed" ? "bg-emerald-500"
                : status === "in-progress" ? "bg-sky-500"
                : status === "on-hold" ? "bg-amber-500"
                : "bg-white/20"
              return (
                <div key={status}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/50 capitalize">{status.replace("-", " ")}</span>
                    <span className="text-white/40">{count} · {pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-white/30" />
              <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Outstanding</h3>
            </div>
            {loading ? <Skeleton /> : (
              <p className="text-xl font-bold text-amber-400">
                ${outstanding.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            )}
            <p className="text-xs text-white/30 mt-0.5">Unpaid invoice balance</p>
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-[#0d0d14] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-white/30" />
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Recent Invoices</h3>
          </div>
          <Link href="/admin/invoices" className="text-xs text-sky-400 hover:text-sky-300 transition-colors">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr>
                {["Number", "Project", "Total", "Status", "Due"].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}><td colSpan={5} className="px-3 py-3"><div className="h-5 bg-white/[0.04] rounded animate-pulse" /></td></tr>
                ))
              ) : recentInvoices.length === 0 ? (
                <tr><td colSpan={5} className="px-3 py-8 text-center text-sm text-white/30">No invoices yet</td></tr>
              ) : recentInvoices.map((inv: any) => {
                const project = projects.find((p: any) => p._id === inv.projectId)
                const client = clients.find((c: any) => c._id === project?.clientId)
                const curr = client?.currency || "USD"
                return (
                  <tr key={inv._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-3 py-3 text-sm font-mono text-white/70">{inv.number}</td>
                    <td className="px-3 py-3 text-sm text-white/60">{project?.name || "—"}</td>
                    <td className="px-3 py-3 text-sm font-semibold text-white">{curr} {(inv.total ?? 0).toLocaleString()}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <StatusDot status={inv.status} />
                        <span className="text-xs text-white/50 capitalize">{inv.status}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-white/40">{inv.dueDate || "—"}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-white/30" />
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Add Client", href: "/admin/clients", desc: "Register a new client" },
            { label: "New Project", href: "/admin/projects", desc: "Start a new project" },
            { label: "Create Invoice", href: "/admin/invoices", desc: "Generate invoice or quote" },
            { label: "View Analytics", href: "/admin/analytics", desc: "Traffic & usage insights" },
          ].map(({ label, href, desc }) => (
            <Link key={label} href={href} className="bg-[#0d0d14] border border-white/[0.06] rounded-xl p-4 hover:border-sky-500/30 hover:bg-sky-500/[0.04] transition-all group">
              <p className="text-sm font-semibold text-white group-hover:text-sky-400 transition-colors">{label}</p>
              <p className="text-xs text-white/30 mt-1">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

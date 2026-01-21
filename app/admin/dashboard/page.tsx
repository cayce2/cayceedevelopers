/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Users, FolderKanban, FileText, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({ clients: 0, projects: 0, invoices: 0, revenue: 0 })

  useEffect(() => {
    fetch('/api/admin/activity-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'view', page: 'dashboard', userEmail: 'admin', status: 'success', timestamp: new Date() })
    }).catch(() => {})
    
    fetch('/api/clients').then(res => res.json()).then(clients => {
      fetch('/api/projects').then(res => res.json()).then(projects => {
        fetch('/api/invoices').then(res => res.json()).then(invoices => {
          const revenue = invoices.filter((i: any) => i.type === "invoice").reduce((sum: number, i: any) => {
            const project = projects.find((p: any) => p._id === i.projectId)
            const client = clients.find((c: any) => c._id === project?.clientId)
            return sum + (client?.currency === "KES" ? i.total / 130 : i.total)
          }, 0)
          setStats({ clients: clients.length, projects: projects.length, invoices: invoices.length, revenue })
        })
      })
    })
  }, [])

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your business overview</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/clients" className="group bg-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm font-medium">Total Clients</p>
              <p className="text-3xl font-bold text-foreground">{stats.clients}</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-primary font-medium">
            View all clients
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
        <Link href="/admin/projects" className="group bg-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FolderKanban className="w-6 h-6 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-foreground">{stats.projects}</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-primary font-medium">
            View all projects
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
        <Link href="/admin/invoices" className="group bg-card p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm font-medium">Total Invoices</p>
              <p className="text-3xl font-bold text-foreground">{stats.invoices}</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-primary font-medium">
            View all invoices
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>
        <div className="bg-primary p-6 rounded-2xl shadow-lg text-primary-foreground animate-glow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-right">
              <p className="text-primary-foreground/80 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold">${stats.revenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center text-sm font-medium">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            From invoices
          </div>
        </div>
      </div>
    </div>
  )
}

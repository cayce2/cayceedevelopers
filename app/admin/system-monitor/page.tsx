/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Activity, Database, Users, TrendingUp } from "lucide-react"

export default function SystemMonitorPage() {
  const [metrics, setMetrics] = useState<any>({
    totalLogs: 0,
    logs24h: 0,
    logs7d: 0,
    uniqueIPs: 0,
    topActions: []
  })

  useEffect(() => {
    fetch('/api/admin/metrics?type=summary')
      .then(r => r.json())
      .then(setMetrics)
  }, [])

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-primary mb-2">System Monitor</h1>
        <p className="text-muted-foreground">Real-time system health and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm text-muted-foreground">Total Logs</p>
          </div>
          <p className="text-3xl font-bold">{metrics.totalLogs.toLocaleString()}</p>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">Last 24 Hours</p>
          </div>
          <p className="text-3xl font-bold">{metrics.logs24h.toLocaleString()}</p>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-sm text-muted-foreground">Last 7 Days</p>
          </div>
          <p className="text-3xl font-bold">{metrics.logs7d.toLocaleString()}</p>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-sm text-muted-foreground">Unique IPs</p>
          </div>
          <p className="text-3xl font-bold">{metrics.uniqueIPs.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
        <h2 className="text-xl font-semibold mb-4">Top Actions</h2>
        <div className="space-y-3">
          {metrics.topActions.map((action: any, i: number) => {
            const total = metrics.topActions.reduce((sum: number, a: any) => sum + a.count, 0)
            const percent = ((action.count / total) * 100).toFixed(1)
            return (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{action._id}</span>
                  <span className="text-muted-foreground">{action.count} ({percent}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${percent}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

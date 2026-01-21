/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Activity, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    fetch(`/api/admin/activity-logs?page=${page}&limit=50${filter ? `&action=${filter}` : ''}`)
      .then(res => res.json())
      .then(data => {
        setLogs(data.logs)
        setTotal(data.total)
      })
  }, [page, filter])

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'Action', 'User', 'IP', 'Device', 'Browser', 'OS', 'Location', 'Status'],
      ...logs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.action,
        log.userEmail || 'Anonymous',
        log.ip,
        log.device,
        log.browser,
        log.os,
        `${log.location?.city}, ${log.location?.country}`,
        log.status
      ])
    ].map(row => row.join(',')).join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `activity-logs-${Date.now()}.csv`
    a.click()
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Activity Logs</h1>
          <p className="text-muted-foreground">Track all system activities and user actions</p>
        </div>
        <Button onClick={exportLogs} className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-6 mb-6">
        <div className="flex gap-4 items-center">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background"
          >
            <option value="">All Actions</option>
            <option value="login">Login</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="view">View</option>
          </select>
          <span className="text-sm text-muted-foreground">Total: {total} logs</span>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Timestamp</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Action</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">IP Address</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Device</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Location</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="font-medium">{log.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{log.userEmail || 'Anonymous'}</td>
                  <td className="px-6 py-4 text-sm font-mono">{log.ip}</td>
                  <td className="px-6 py-4 text-sm">{log.device} • {log.browser}</td>
                  <td className="px-6 py-4 text-sm">{log.location?.city}, {log.location?.country}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      log.status === 'success' ? 'bg-green-100 text-green-800' :
                      log.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center px-6 py-4 border-t border-border">
          <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} variant="outline">
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">Page {page}</span>
          <Button onClick={() => setPage(p => p + 1)} disabled={logs.length < 50} variant="outline">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

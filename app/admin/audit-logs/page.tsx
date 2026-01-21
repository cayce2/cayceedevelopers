/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Shield, Search } from "lucide-react"

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [entity, setEntity] = useState("")

  useEffect(() => {
    fetch(`/api/admin/audit-logs?page=${page}&limit=50${entity ? `&entity=${entity}` : ''}`)
      .then(res => res.json())
      .then(data => {
        setLogs(data.logs)
        setTotal(data.total)
      })
  }, [page, entity])

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-primary mb-2">Audit Logs</h1>
        <p className="text-muted-foreground">Compliance and data change tracking</p>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-6 mb-6">
        <div className="flex gap-4 items-center">
          <Search className="w-5 h-5 text-muted-foreground" />
          <select 
            value={entity} 
            onChange={(e) => setEntity(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background"
          >
            <option value="">All Entities</option>
            <option value="Client">Clients</option>
            <option value="Project">Projects</option>
            <option value="Invoice">Invoices</option>
            <option value="User">Users</option>
          </select>
          <span className="text-sm text-muted-foreground">Total: {total} audit entries</span>
        </div>
      </div>

      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log._id} className="bg-card rounded-2xl shadow-sm border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{log.action}</h3>
                  <p className="text-sm text-muted-foreground">{log.entity} • {log.entityId}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{log.userEmail}</p>
                <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground font-mono">{log.ip}</p>
              </div>
            </div>
            
            {log.changes && (
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">BEFORE</p>
                  <pre className="text-xs bg-muted/50 p-3 rounded-lg overflow-auto max-h-40">
                    {JSON.stringify(log.changes.before, null, 2)}
                  </pre>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">AFTER</p>
                  <pre className="text-xs bg-muted/50 p-3 rounded-lg overflow-auto max-h-40">
                    {JSON.stringify(log.changes.after, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
          className="px-4 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={logs.length < 50}
          className="px-4 py-2 rounded-lg border border-border hover:bg-muted disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

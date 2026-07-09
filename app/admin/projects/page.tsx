/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Plus, Edit, Trash2, FileText } from "lucide-react"
import { Drawer, Field, AdminInput, AdminSelect, AdminTextarea, Btn, Badge, PageHeader, Table, Th, Td } from "../components"

type Project = {
  id: string; clientId: string; name: string; description: string
  status: string; budget: number; startDate: string; endDate: string
}

const empty = { clientId: "", name: "", description: "", status: "pending", budget: 0, startDate: "", endDate: "" }

function ProjectsContent() {
  const searchParams = useSearchParams()
  const clientFilter = searchParams.get("client")

  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...empty, clientId: clientFilter || "" })

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(d => setProjects(d.map((p: any) => ({ ...p, id: p._id }))))
    fetch('/api/clients').then(r => r.json()).then(d => setClients(d.map((c: any) => ({ ...c, id: c._id }))))
  }, [])

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch('/api/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...form }) })
      setProjects(projects.map(p => p.id === editingId ? { ...p, ...form } : p))
    } else {
      const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const n = await res.json()
      setProjects([...projects, { ...n, id: n._id }])
    }
    setOpen(false); setEditingId(null); setForm({ ...empty, clientId: clientFilter || "" })
  }

  const handleEdit = (p: Project) => {
    setForm({ clientId: p.clientId, name: p.name, description: p.description, status: p.status, budget: p.budget, startDate: p.startDate, endDate: p.endDate })
    setEditingId(p.id); setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return
    await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
    setProjects(projects.filter(p => p.id !== id))
  }

  const filtered = clientFilter ? projects.filter(p => p.clientId === clientFilter) : projects
  const selectedClient = clients.find(c => c.id === form.clientId)

  return (
    <div className="max-w-6xl space-y-6">
      <PageHeader
        title="Projects"
        subtitle={`${filtered.length} project${filtered.length !== 1 ? "s" : ""}${clientFilter ? " for this client" : ""}`}
        action={
          <Btn onClick={() => { setForm({ ...empty, clientId: clientFilter || "" }); setEditingId(null); setOpen(true) }}>
            <Plus className="w-4 h-4" /> Add Project
          </Btn>
        }
      />

      <Table>
        <thead>
          <tr><Th>Project</Th><Th>Client</Th><Th>Budget</Th><Th>Status</Th><Th>Dates</Th><Th>Actions</Th></tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {filtered.map(p => {
            const client = clients.find(c => c.id === p.clientId)
            return (
              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                <Td>
                  <div className="font-medium text-white">{p.name}</div>
                  <div className="text-xs text-white/30 mt-0.5 max-w-xs truncate">{p.description}</div>
                </Td>
                <Td>{client?.name || "—"}</Td>
                <Td><span className="font-semibold text-white">{client?.currency || "USD"} {p.budget.toLocaleString()}</span></Td>
                <Td><Badge status={p.status} /></Td>
                <Td>
                  <div className="text-xs space-y-0.5">
                    <div className="text-white/50">{p.startDate || "—"}</div>
                    <div className="text-white/30">{p.endDate || "—"}</div>
                  </div>
                </Td>
                <Td>
                  <div className="flex gap-1">
                    <Btn size="sm" variant="ghost" onClick={() => window.location.href = `/admin/invoices?project=${p.id}`}><FileText className="w-3.5 h-3.5" /></Btn>
                    <Btn size="sm" variant="ghost" onClick={() => handleEdit(p)}><Edit className="w-3.5 h-3.5" /></Btn>
                    <Btn size="sm" variant="danger" onClick={() => handleDelete(p.id)}><Trash2 className="w-3.5 h-3.5" /></Btn>
                  </div>
                </Td>
              </tr>
            )
          })}
          {filtered.length === 0 && (
            <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-white/30">No projects yet.</td></tr>
          )}
        </tbody>
      </Table>

      <Drawer open={open} onClose={() => { setOpen(false); setEditingId(null) }} title={editingId ? "Edit Project" : "New Project"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Client">
            <AdminSelect value={form.clientId} onChange={e => set("clientId", e.target.value)} required>
              <option value="">Select client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name} — {c.company}</option>)}
            </AdminSelect>
          </Field>
          <Field label="Project Name"><AdminInput placeholder="Website Redesign" value={form.name} onChange={e => set("name", e.target.value)} required /></Field>
          <Field label="Budget">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/30 font-semibold">{selectedClient?.currency || "USD"}</span>
              <AdminInput type="number" placeholder="0" value={form.budget} onChange={e => set("budget", Number(e.target.value))} className="pl-12" required />
            </div>
          </Field>
          <Field label="Description"><AdminTextarea rows={3} placeholder="Project description..." value={form.description} onChange={e => set("description", e.target.value)} required /></Field>
          <Field label="Status">
            <AdminSelect value={form.status} onChange={e => set("status", e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </AdminSelect>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start Date"><AdminInput type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} required /></Field>
            <Field label="End Date"><AdminInput type="date" value={form.endDate} onChange={e => set("endDate", e.target.value)} /></Field>
          </div>
          <div className="flex gap-3 pt-2">
            <Btn type="submit">Save Project</Btn>
            <Btn type="button" variant="outline" onClick={() => { setOpen(false); setEditingId(null) }}>Cancel</Btn>
          </div>
        </form>
      </Drawer>
    </div>
  )
}

export default function ProjectsPage() {
  return <Suspense fallback={<div className="text-white/40 text-sm p-6">Loading...</div>}><ProjectsContent /></Suspense>
}

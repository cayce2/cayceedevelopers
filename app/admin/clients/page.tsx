/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { Drawer, Field, AdminInput, AdminSelect, Btn, Badge, PageHeader, Table, Th, Td } from "../components"

type Client = {
  id: string; name: string; email: string; phone: string
  company: string; country: string; currency: string; createdAt: string
}

const empty = { name: "", email: "", phone: "", company: "", country: "", currency: "USD" }

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(empty)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/clients').then(r => r.json()).then(d => setClients(d.map((c: any) => ({ ...c, id: c._id }))))
  }, [])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch('/api/clients', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...form }) })
      setClients(clients.map(c => c.id === editingId ? { ...c, ...form } : c))
    } else {
      const res = await fetch('/api/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const n = await res.json()
      setClients([...clients, { ...n, id: n._id }])
    }
    setOpen(false); setEditingId(null); setForm(empty)
  }

  const handleEdit = (c: Client) => {
    setForm({ name: c.name, email: c.email, phone: c.phone, company: c.company, country: c.country, currency: c.currency })
    setEditingId(c.id); setOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this client?")) return
    await fetch(`/api/clients?id=${id}`, { method: 'DELETE' })
    setClients(clients.filter(c => c.id !== id))
  }

  return (
    <div className="max-w-6xl space-y-6">
      <PageHeader
        title="Clients"
        subtitle={`${clients.length} total clients`}
        action={
          <Btn onClick={() => { setForm(empty); setEditingId(null); setOpen(true) }}>
            <Plus className="w-4 h-4" /> Add Client
          </Btn>
        }
      />

      <Table>
        <thead>
          <tr>
            <Th>Name</Th><Th>Email</Th><Th>Phone</Th><Th>Company</Th><Th>Country</Th><Th>Currency</Th><Th>Actions</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {clients.map(c => (
            <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
              <Td><span className="font-medium text-white">{c.name}</span></Td>
              <Td>{c.email}</Td>
              <Td>{c.phone}</Td>
              <Td>{c.company}</Td>
              <Td>{c.country}</Td>
              <Td><Badge status={c.currency} /></Td>
              <Td>
                <div className="flex gap-1">
                  <Btn size="sm" variant="ghost" onClick={() => router.push(`/admin/projects?client=${c.id}`)}><Eye className="w-3.5 h-3.5" /></Btn>
                  <Btn size="sm" variant="ghost" onClick={() => handleEdit(c)}><Edit className="w-3.5 h-3.5" /></Btn>
                  <Btn size="sm" variant="danger" onClick={() => handleDelete(c.id)}><Trash2 className="w-3.5 h-3.5" /></Btn>
                </div>
              </Td>
            </tr>
          ))}
          {clients.length === 0 && (
            <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-white/30">No clients yet. Add your first client.</td></tr>
          )}
        </tbody>
      </Table>

      <Drawer open={open} onClose={() => { setOpen(false); setEditingId(null) }} title={editingId ? "Edit Client" : "New Client"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full Name"><AdminInput placeholder="John Doe" value={form.name} onChange={e => set("name", e.target.value)} required /></Field>
          <Field label="Email"><AdminInput type="email" placeholder="john@example.com" value={form.email} onChange={e => set("email", e.target.value)} required /></Field>
          <Field label="Phone"><AdminInput placeholder="+1 234 567 8900" value={form.phone} onChange={e => set("phone", e.target.value)} required /></Field>
          <Field label="Company"><AdminInput placeholder="Acme Corp" value={form.company} onChange={e => set("company", e.target.value)} required /></Field>
          <Field label="Country">
            <AdminSelect value={form.country} onChange={e => {
              const country = e.target.value
              const currency = country === "Kenya" ? "KES" : country === "USA" ? "USD" : country === "UK" ? "GBP" : country === "EU" ? "EUR" : "USD"
              setForm(f => ({ ...f, country, currency }))
            }} required>
              <option value="">Select country</option>
              <option>Kenya</option><option>USA</option><option>UK</option><option>EU</option><option>Other</option>
            </AdminSelect>
          </Field>
          <Field label="Currency"><AdminInput placeholder="USD" value={form.currency} onChange={e => set("currency", e.target.value)} required /></Field>
          <div className="flex gap-3 pt-2">
            <Btn type="submit">Save Client</Btn>
            <Btn type="button" variant="outline" onClick={() => { setOpen(false); setEditingId(null) }}>Cancel</Btn>
          </div>
        </form>
      </Drawer>
    </div>
  )
}

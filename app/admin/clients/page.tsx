/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Client = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  country: string
  currency: string
  createdAt: string
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", country: "", currency: "USD" })
  const router = useRouter()

  useEffect(() => {
    fetch('/api/clients')
      .then(res => res.json())
      .then(data => setClients(data.map((c: any) => ({ ...c, id: c._id }))))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch('/api/clients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...formData })
      })
      const updated = clients.map(c => c.id === editingId ? { ...c, ...formData } : c)
      setClients(updated)
      setEditingId(null)
    } else {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const newClient = await res.json()
      setClients([...clients, { ...newClient, id: newClient._id }])
    }
    setFormData({ name: "", email: "", phone: "", company: "", country: "", currency: "USD" })
    setShowForm(false)
  }

  const handleEdit = (client: Client) => {
    setFormData({ name: client.name, email: client.email, phone: client.phone, company: client.company, country: client.country, currency: client.currency })
    setEditingId(client.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this client?")) {
      await fetch(`/api/clients?id=${id}`, { method: 'DELETE' })
      setClients(clients.filter(c => c.id !== id))
    }
  }

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Clients</h1>
          <p className="text-muted-foreground">Manage your client relationships</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: "", email: "", phone: "", company: "", country: "", currency: "USD" }) }} className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {showForm && (
        <div className="bg-card/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl mb-6 border border-border">
          <h2 className="text-2xl font-bold mb-6 text-foreground">{editingId ? "Edit Client" : "New Client"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <Input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
            <Input placeholder="Email" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
            <Input placeholder="Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
            <Input placeholder="Company" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
            <select className="h-12 border border-border rounded-xl px-4 bg-background text-foreground" value={formData.country} onChange={e => {
              const country = e.target.value
              const currency = country === "Kenya" ? "KES" : country === "USA" ? "USD" : country === "UK" ? "GBP" : country === "EU" ? "EUR" : "USD"
              setFormData({ ...formData, country, currency })
            }} required>
              <option value="">Select Country</option>
              <option value="Kenya">Kenya</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="EU">EU</option>
              <option value="Other">Other</option>
            </select>
            <Input placeholder="Currency" value={formData.currency} onChange={e => setFormData({ ...formData, currency: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
            <div className="col-span-2 flex gap-3 mt-2">
              <Button type="submit" className="bg-primary hover:bg-primary/90">Save Client</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null) }} className="rounded-xl">Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Country</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Currency</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card/50 divide-y divide-border">
            {clients.map(client => (
              <tr key={client.id} className="hover:bg-primary/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{client.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{client.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{client.country}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">{client.currency}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => router.push(`/admin/projects?client=${client.id}`)} className="hover:bg-primary/10 hover:text-primary rounded-lg">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(client)} className="hover:bg-primary/10 hover:text-primary rounded-lg">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(client.id)} className="hover:bg-destructive/10 hover:text-destructive rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

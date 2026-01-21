/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Plus, Edit, Trash2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Project = {
  id: string
  clientId: string
  name: string
  description: string
  status: string
  budget: number
  startDate: string
  endDate: string
  createdAt: string
}

function ProjectsContent() {
  const searchParams = useSearchParams()
  const clientFilter = searchParams.get("client")
  
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    clientId: clientFilter || "",
    name: "",
    description: "",
    status: "pending",
    budget: 0,
    startDate: "",
    endDate: ""
  })

  useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(data => setProjects(data.map((p: any) => ({ ...p, id: p._id }))))
    fetch('/api/clients').then(res => res.json()).then(data => setClients(data.map((c: any) => ({ ...c, id: c._id }))))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...formData })
      })
      const updated = projects.map(p => p.id === editingId ? { ...p, ...formData } : p)
      setProjects(updated)
      setEditingId(null)
    } else {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const newProject = await res.json()
      setProjects([...projects, { ...newProject, id: newProject._id }])
    }
    setFormData({ clientId: clientFilter || "", name: "", description: "", status: "pending", budget: 0, startDate: "", endDate: "" })
    setShowForm(false)
  }

  const handleEdit = (project: Project) => {
    setFormData(project)
    setEditingId(project.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this project?")) {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const filteredProjects = clientFilter ? projects.filter(p => p.clientId === clientFilter) : projects

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Projects</h1>
          <p className="text-muted-foreground">Track and manage all your projects</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ clientId: clientFilter || "", name: "", description: "", status: "pending", budget: 0, startDate: "", endDate: "" }) }} className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {showForm && (
        <div className="bg-card/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl mb-6 border border-border">
          <h2 className="text-2xl font-bold mb-6 text-foreground">{editingId ? "Edit Project" : "New Project"}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <select className="col-span-2 border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground" value={formData.clientId} onChange={e => {
              setFormData({ ...formData, clientId: e.target.value })
              setSelectedClient(clients.find(c => c.id === e.target.value))
            }} required>
              <option value="">Select Client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name} - {c.company}</option>)}
            </select>
            <Input placeholder="Project Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
            <div className="relative">
              <Input type="number" placeholder="Budget" value={formData.budget} onChange={e => setFormData({ ...formData, budget: Number(e.target.value) })} required className="h-12 rounded-xl bg-background border-border pl-12" />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">{selectedClient?.currency || "USD"}</span>
            </div>
            <Textarea className="col-span-2 rounded-xl bg-background border-border" placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
            <select className="border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
            <div></div>
            <Input type="date" placeholder="Start Date" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
            <Input type="date" placeholder="End Date" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} className="h-12 rounded-xl bg-background border-border" />
            <div className="col-span-2 flex gap-3 mt-2">
              <Button type="submit" className="bg-primary hover:bg-primary/90">Save Project</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingId(null) }} className="rounded-xl">Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Budget</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card/50 divide-y divide-border">
            {filteredProjects.map(project => {
              const client = clients.find(c => c.id === project.clientId)
              return (
                <tr key={project.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-foreground">{project.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{project.description.substring(0, 50)}...</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{client?.name || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-foreground">{client?.currency || "USD"} {project.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                      project.status === "completed" ? "bg-green-500/20 text-green-400" :
                      project.status === "in-progress" ? "bg-primary/20 text-primary" :
                      project.status === "on-hold" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => window.location.href = `/admin/invoices?project=${project.id}`} className="hover:bg-primary/10 hover:text-primary rounded-lg">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(project)} className="hover:bg-primary/10 hover:text-primary rounded-lg">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(project.id)} className="hover:bg-destructive/10 hover:text-destructive rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="px-4 py-6">Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  )
}

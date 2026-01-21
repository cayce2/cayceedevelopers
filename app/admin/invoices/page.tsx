/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Plus, Edit, Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type InvoiceItem = {
  description: string
  quantity: number
  rate: number
}

type Invoice = {
  id: string
  projectId: string
  type: "invoice" | "quotation"
  number: string
  date: string
  dueDate: string
  items: InvoiceItem[]
  tax: number
  discount: number
  total: number
  notes: string
  status: string
  currency: string
  createdAt: string
}

export default function InvoicesPage() {
  const searchParams = useSearchParams()
  const projectFilter = searchParams.get("project")
  
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [currency, setCurrency] = useState("USD")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    projectId: projectFilter || "",
    type: "invoice" as "invoice" | "quotation",
    number: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [{ description: "", quantity: 1, rate: 0 }],
    tax: 0,
    discount: 0,
    notes: "",
    status: "draft",
    currency: "USD"
  })

  useEffect(() => {
    const loadData = async () => {
      const [invoicesData, projectsData, clientsData] = await Promise.all([
        fetch('/api/invoices').then(res => res.json()),
        fetch('/api/projects').then(res => res.json()),
        fetch('/api/clients').then(res => res.json())
      ])
      
      setInvoices(invoicesData.map((i: any) => ({ ...i, id: i._id })))
      const projects = projectsData.map((p: any) => ({ ...p, id: p._id }))
      const clients = clientsData.map((c: any) => ({ ...c, id: c._id }))
      setProjects(projects)
      setClients(clients)
      
      if (projectFilter) {
        const project = projects.find((p: any) => p.id === projectFilter)
        if (project) {
          const client = clients.find((c: any) => c.id === project.clientId)
          const clientCurrency = client?.currency || "USD"
          setFormData(prev => ({ ...prev, currency: clientCurrency }))
          setCurrency(clientCurrency)
        }
      }
    }
    loadData()
  }, [projectFilter])

  const calculateTotal = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0)
    const taxAmount = (subtotal * formData.tax) / 100
    const discountAmount = (subtotal * formData.discount) / 100
    return subtotal + taxAmount - discountAmount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.number) {
      alert('Please select a project to generate invoice number')
      return
    }
    const total = calculateTotal()
    if (editingId) {
      await fetch('/api/invoices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...formData, total })
      })
      const updated = invoices.map(inv => inv.id === editingId ? { ...inv, ...formData, total } : inv)
      setInvoices(updated)
      setEditingId(null)
    } else {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, total })
      })
      const newInvoice = await res.json()
      setInvoices([...invoices, { ...newInvoice, id: newInvoice._id }])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      projectId: projectFilter || "",
      type: "invoice",
      number: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      items: [{ description: "", quantity: 1, rate: 0 }],
      tax: 0,
      discount: 0,
      notes: "",
      status: "draft",
      currency: "USD"
    })
    setCurrency("USD")
    setShowForm(false)
    setEditingId(null)
  }

  const handleEdit = (invoice: Invoice) => {
    const project = projects.find(p => p.id === invoice.projectId)
    const client = clients.find(c => c.id === project?.clientId)
    const invoiceCurrency = invoice.currency || client?.currency || "USD"
    setFormData(invoice)
    setCurrency(invoiceCurrency)
    setEditingId(invoice.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this invoice?")) {
      await fetch(`/api/invoices?id=${id}`, { method: 'DELETE' })
      setInvoices(invoices.filter(inv => inv.id !== id))
    }
  }

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { description: "", quantity: 1, rate: 0 }] })
  }

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const items = [...formData.items]
    items[index] = { ...items[index], [field]: value }
    setFormData({ ...formData, items })
  }

  const removeItem = (index: number) => {
    setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) })
  }

  const generatePDF = (invoice: Invoice) => {
    const project = projects.find(p => p.id === invoice.projectId)
    const client = clients.find(c => c.id === project?.clientId)
    const curr = invoice.currency || client?.currency || "USD"
    
    const content = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company { margin-bottom: 30px; }
            .info { display: flex; justify-content: space-between; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f4f4f4; }
            .totals { text-align: right; }
          </style>
        </head>
        <body>
          <div class="company">
            <h2>Caycee Developers</h2>
            <p>Email: cayceedevelopers@gmail.com<br>Phone: +254 (741) 481-008<br>Website: www.cayceedevelopers.com</p>
          </div>
          <div class="header">
            <h1>${invoice.type === "invoice" ? "INVOICE" : "QUOTATION"}</h1>
            <p>${invoice.number}</p>
          </div>
          <div class="info">
            <div>
              <h3>Bill To:</h3>
              <p>${client?.name || "N/A"}<br>${client?.company || ""}<br>${client?.email || ""}</p>
            </div>
            <div>
              <p><strong>Date:</strong> ${invoice.date}</p>
              <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
              <p><strong>Project:</strong> ${project?.name || "N/A"}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>${curr} ${item.rate}</td>
                  <td>${curr} ${(item.quantity * item.rate).toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div class="totals">
            <p>Subtotal: ${curr} ${invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0).toFixed(2)}</p>
            <p>Tax (${invoice.tax}%): ${curr} ${((invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0) * invoice.tax) / 100).toFixed(2)}</p>
            <p>Discount (${invoice.discount}%): -${curr} ${((invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0) * invoice.discount) / 100).toFixed(2)}</p>
            <h3>Total: ${curr} ${invoice.total.toFixed(2)}</h3>
          </div>
          <p><strong>Notes:</strong> ${invoice.notes}</p>
        </body>
      </html>
    `
    
    const blob = new Blob([content], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${invoice.type}-${invoice.number}.html`
    a.click()
  }

  const filteredInvoices = projectFilter ? invoices.filter(inv => inv.projectId === projectFilter) : invoices

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Invoices & Quotations</h1>
          <p className="text-muted-foreground">Generate and manage financial documents</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditingId(null); setCurrency("USD"); setFormData({ projectId: projectFilter || "", type: "invoice", number: "", date: new Date().toISOString().split("T")[0], dueDate: "", items: [{ description: "", quantity: 1, rate: 0 }], tax: 0, discount: 0, notes: "", status: "draft", currency: "USD" }) }} className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>

      {showForm && (
        <div className="bg-card/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl mb-6 border border-border">
          <h2 className="text-2xl font-bold mb-6 text-foreground">{editingId ? "Edit" : "Create"} {formData.type === "invoice" ? "Invoice" : "Quotation"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <select className="border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground" value={formData.type} onChange={e => {
                const newType = e.target.value as "invoice" | "quotation"
                if (formData.projectId) {
                  const project = projects.find(p => p.id === formData.projectId)
                  const client = clients.find(c => c.id === project?.clientId)
                  const date = new Date()
                  const clientInitials = client?.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 3) || 'CLI'
                  const projectInitials = project?.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 3) || 'PRJ'
                  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
                  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
                  const autoNumber = `${newType === 'invoice' ? 'INV' : 'QUO'}-${clientInitials}-${projectInitials}-${dateStr}-${randomSuffix}`
                  setFormData({ ...formData, type: newType, number: autoNumber })
                } else {
                  setFormData({ ...formData, type: newType })
                }
              }}>
                <option value="invoice">Invoice</option>
                <option value="quotation">Quotation</option>
              </select>
              <select className="border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground" value={formData.projectId} onChange={e => {
                const project = projects.find(p => p.id === e.target.value)
                const client = clients.find(c => c.id === project?.clientId)
                const clientCurrency = client?.currency || "USD"
                const date = new Date()
                const clientInitials = client?.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 3) || 'CLI'
                const projectInitials = project?.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 3) || 'PRJ'
                const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
                const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
                const autoNumber = `${formData.type === 'invoice' ? 'INV' : 'QUO'}-${clientInitials}-${projectInitials}-${dateStr}-${randomSuffix}`
                setFormData({ ...formData, projectId: e.target.value, number: autoNumber, currency: clientCurrency })
                setCurrency(clientCurrency)
              }} required>
                <option value="">Select Project</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <Input placeholder="Invoice Number (auto-generated)" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} required className="h-12 rounded-xl bg-background border-border" readOnly />
              <select className="border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
              <Input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
              <Input type="date" placeholder="Due Date" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
            </div>

            <div className="border border-border rounded-2xl p-6 bg-muted/30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-foreground">Line Items</h3>
                <Button type="button" size="sm" onClick={addItem} className="bg-primary hover:bg-primary/90">Add Item</Button>
              </div>
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 mb-3 items-center">
                  <Input className="col-span-5 rounded-xl bg-background border-border" placeholder="Description" value={item.description} onChange={e => updateItem(index, "description", e.target.value)} required />
                  <Input className="col-span-2 rounded-xl bg-background border-border" type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(index, "quantity", Number(e.target.value))} required />
                  <div className="col-span-2 relative">
                    <Input className="rounded-xl bg-background border-border pl-12" type="number" placeholder="Rate" value={item.rate} onChange={e => updateItem(index, "rate", Number(e.target.value))} required />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-semibold">{currency}</span>
                  </div>
                  <div className="col-span-2 font-semibold text-foreground">{currency} {(item.quantity * item.rate).toFixed(2)}</div>
                  <Button type="button" size="sm" variant="ghost" className="col-span-1 hover:bg-destructive/10 hover:text-destructive rounded-lg" onClick={() => removeItem(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input type="number" placeholder="Tax %" value={formData.tax} onChange={e => setFormData({ ...formData, tax: Number(e.target.value) })} className="h-12 rounded-xl bg-background border-border" />
              <Input type="number" placeholder="Discount %" value={formData.discount} onChange={e => setFormData({ ...formData, discount: Number(e.target.value) })} className="h-12 rounded-xl bg-background border-border" />
              <div className="flex items-center justify-center font-bold text-xl bg-primary text-primary-foreground rounded-xl px-4">Total: {currency} {calculateTotal().toFixed(2)}</div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Notes & Terms</label>
              <textarea 
                placeholder="Add payment terms, delivery notes, or special instructions..." 
                value={formData.notes} 
                onChange={e => setFormData({ ...formData, notes: e.target.value })} 
                className="w-full min-h-[120px] border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground resize-y"
              />
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Tip: Include payment terms, bank details, or special conditions</span>
                <span>{formData.notes.length} characters</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-primary hover:bg-primary/90">Save</Button>
              <Button type="button" variant="outline" onClick={resetForm} className="rounded-xl">Cancel</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-border">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Number</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card/50 divide-y divide-border">
            {filteredInvoices.map(invoice => {
              const project = projects.find(p => p.id === invoice.projectId)
              return (
                <tr key={invoice.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-foreground">{invoice.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      invoice.type === "invoice" ? "bg-primary/20 text-primary" : "bg-purple-500/20 text-purple-400"
                    }`}>
                      {invoice.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{project?.name || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{invoice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-foreground">{invoice.currency || clients.find(c => c.id === project?.clientId)?.currency || "USD"} {invoice.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                      invoice.status === "paid" ? "bg-green-500/20 text-green-400" :
                      invoice.status === "sent" ? "bg-primary/20 text-primary" :
                      invoice.status === "overdue" ? "bg-destructive/20 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => generatePDF(invoice)} className="hover:bg-green-500/10 hover:text-green-400 rounded-lg">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(invoice)} className="hover:bg-primary/10 hover:text-primary rounded-lg">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(invoice.id)} className="hover:bg-destructive/10 hover:text-destructive rounded-lg">
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

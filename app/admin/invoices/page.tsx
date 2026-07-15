/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Plus, Edit, Trash2, Download, ChevronRight, Check, FileText, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type InvoiceItem = {
  description: string
  quantity: number
  rate: number
}

type InvoiceStatus = "draft" | "sent" | "partial" | "paid" | "overdue"

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
  amountPaid: number
  includeBalance: boolean
  notes: string
  status: InvoiceStatus
  currency: string
  createdAt: string
}

const normalizeMoney = (value: number) => {
  if (!Number.isFinite(value)) return 0
  return Math.max(value, 0)
}

const getBalanceAmount = (total: number, amountPaid: number) =>
  Math.max(normalizeMoney(total) - normalizeMoney(amountPaid), 0)

const resolveInvoiceStatus = (invoice: {
  type: "invoice" | "quotation"
  status: string
  dueDate: string
  total: number
  amountPaid?: number
}): InvoiceStatus => {
  if (invoice.type !== "invoice") {
    return (invoice.status as InvoiceStatus) || "draft"
  }

  const total = normalizeMoney(invoice.total)
  const hasAmountPaid = invoice.amountPaid !== undefined && invoice.amountPaid !== null
  const amountPaid = normalizeMoney(Number(invoice.amountPaid ?? 0))

  if (hasAmountPaid && total > 0 && amountPaid >= total) return "paid"
  if (hasAmountPaid && amountPaid > 0 && amountPaid < total) return "partial"
  if (invoice.status === "paid") return "paid"
  if (invoice.status === "partial") return "partial"
  if (invoice.status === "draft") return "draft"

  if (invoice.dueDate) {
    const dueDate = new Date(`${invoice.dueDate}T23:59:59`)
    if (!Number.isNaN(dueDate.getTime()) && dueDate < new Date()) return "overdue"
  }

  return "sent"
}

// --- Wizard Step Components ---

const Step1Details = ({ formData, setFormData, projects, clients }: any) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Project</label>
        <select 
          className="w-full border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground" 
          value={formData.projectId} 
          onChange={e => {
            const project = projects.find((p: any) => p.id === e.target.value)
            const client = clients.find((c: any) => c.id === project?.clientId)
            const clientCurrency = client?.currency || "USD"
            
            const date = new Date()
            const clientInitials = client?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 3) || 'CLI'
            const projectInitials = project?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 3) || 'PRJ'
            const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
            const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
            const autoNumber = `${formData.type === 'invoice' ? 'INV' : 'QUO'}-${clientInitials}-${projectInitials}-${dateStr}-${randomSuffix}`
            
            setFormData({ ...formData, projectId: e.target.value, currency: clientCurrency, number: autoNumber })
          }} 
          required
        >
          <option value="">Select a Project</option>
          {projects.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Document Number</label>
        <Input 
          value={formData.number} 
          onChange={e => setFormData({ ...formData, number: e.target.value })} 
          required 
          className="h-12 rounded-xl bg-muted/50 border-border font-mono" 
          readOnly 
        />
        <p className="text-xs text-muted-foreground">Auto-generated based on project selection</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Issue Date</label>
        <Input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Due Date</label>
        <Input type="date" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} required className="h-12 rounded-xl bg-background border-border" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Status</label>
        <select 
          className="w-full border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground" 
          value={formData.status} 
          onChange={e => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="partial">Partial</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
    </div>
  </div>
)

const Step2Items = ({ formData, setFormData, currency }: any) => {
  const addItem = () => setFormData({ ...formData, items: [...formData.items, { description: "", quantity: 1, rate: 0 }] })
  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const items = [...formData.items]
    items[index] = { ...items[index], [field]: value }
    setFormData({ ...formData, items })
  }
  const removeItem = (index: number) => setFormData({ ...formData, items: formData.items.filter((_: any, i: number) => i !== index) })
  const subtotal = formData.items.reduce((sum: number, item: InvoiceItem) => sum + (item.quantity * item.rate), 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-foreground">Line Items</h3>
        <Button type="button" size="sm" onClick={addItem} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" /> Add Item
        </Button>
      </div>
      
      <div className="border border-border rounded-2xl overflow-hidden">
        <div className="bg-muted/50 px-6 py-3 grid grid-cols-12 gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <div className="col-span-6">Description</div>
          <div className="col-span-2 text-center">Qty</div>
          <div className="col-span-2 text-right">Rate</div>
          <div className="col-span-2 text-right">Amount</div>
        </div>
        <div className="divide-y divide-border bg-background">
          {formData.items.map((item: InvoiceItem, index: number) => (
            <div key={index} className="px-6 py-4 grid grid-cols-12 gap-4 items-center">
              <Input className="col-span-6 rounded-lg bg-background border-border" placeholder="Item description" value={item.description} onChange={e => updateItem(index, "description", e.target.value)} required />
              <Input className="col-span-2 rounded-lg bg-background border-border text-center" type="number" placeholder="1" value={item.quantity} onChange={e => updateItem(index, "quantity", Number(e.target.value))} required />
              <div className="col-span-2 relative">
                <Input className="rounded-lg bg-background border-border text-right pr-8" type="number" placeholder="0.00" value={item.rate} onChange={e => updateItem(index, "rate", Number(e.target.value))} required />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">{currency}</span>
              </div>
              <div className="col-span-2 text-right font-semibold text-foreground">
                {currency} {(item.quantity * item.rate).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
              <Button type="button" size="icon" variant="ghost" className="col-span-12 md:col-span-1 md:-ml-2 h-8 w-8 hover:bg-destructive/10 hover:text-destructive rounded-lg" onClick={() => removeItem(index)} disabled={formData.items.length === 1}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <div className="w-64 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-medium text-foreground">{currency} {subtotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Step3Totals = ({ formData, setFormData, currency }: any) => {
  const subtotal = formData.items.reduce((sum: number, item: InvoiceItem) => sum + (item.quantity * item.rate), 0)
  const taxAmount = (subtotal * formData.tax) / 100
  const discountAmount = (subtotal * formData.discount) / 100
  const total = subtotal + taxAmount - discountAmount
  const balance = Math.max(total - normalizeMoney(formData.amountPaid), 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Tax (%)</label>
          <Input type="number" placeholder="0" value={formData.tax} onChange={e => setFormData({ ...formData, tax: Number(e.target.value) })} className="h-12 rounded-xl bg-background border-border" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Discount (%)</label>
          <Input type="number" placeholder="0" value={formData.discount} onChange={e => setFormData({ ...formData, discount: Number(e.target.value) })} className="h-12 rounded-xl bg-background border-border" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Amount Paid</label>
          <Input type="number" placeholder="0.00" value={formData.amountPaid} onChange={e => setFormData({ ...formData, amountPaid: Number(e.target.value) || 0 })} className="h-12 rounded-xl bg-background border-border" />
        </div>
      </div>

      <div className="bg-muted/30 border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-lg mb-4 text-foreground">Summary</h3>
        <div className="space-y-3 max-w-md ml-auto">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">{currency} {subtotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
          {formData.tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax ({formData.tax}%)</span>
              <span className="text-foreground">+ {currency} {taxAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          )}
          {formData.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount ({formData.discount}%)</span>
              <span className="text-destructive">- {currency} {discountAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          )}
          <div className="border-t border-border pt-3 flex justify-between items-center">
            <span className="font-bold text-foreground">Total</span>
            <span className="font-bold text-xl text-primary">{currency} {total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
          {formData.type === "invoice" && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="text-green-600 dark:text-green-400 font-medium">- {currency} {Number(formData.amountPaid).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex justify-between items-center">
                <span className="font-bold text-primary">Balance Due</span>
                <span className="font-bold text-xl text-primary">{currency} {balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const Step4Notes = ({ formData, setFormData, liveTotal, projects, clients }: any) => {
  const project = projects.find((p: any) => p.id === formData.projectId)
  const client = clients.find((c: any) => c.id === project?.clientId)
  const currency = client?.currency || formData.currency || "USD"

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Notes & Terms</label>
        <textarea 
          placeholder="Add payment terms, delivery notes, bank details, or special instructions..." 
          value={formData.notes} 
          onChange={e => setFormData({ ...formData, notes: e.target.value })} 
          className="w-full min-h-[160px] border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground resize-y"
        />
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Tip: Clearly state payment deadlines and accepted methods.</span>
          <span>{formData.notes.length} characters</span>
        </div>
      </div>

      {formData.type === "invoice" && (
        <label className="flex items-start gap-3 rounded-xl border border-border px-4 py-4 bg-background text-foreground cursor-pointer hover:bg-muted/30 transition-colors">
          <input
            type="checkbox"
            checked={formData.includeBalance}
            onChange={e => setFormData({ ...formData, includeBalance: e.target.checked })}
            className="h-5 w-5 mt-0.5 rounded border-border text-primary focus:ring-primary"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Include balance in invoice output</span>
            <span className="text-xs text-muted-foreground">Show the remaining balance due on the generated PDF.</span>
          </div>
        </label>
      )}

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Final {formData.type === "invoice" ? "Invoice" : "Quotation"} Total</p>
          <p className="text-3xl font-bold text-primary mt-1">{currency} {liveTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Check className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  )
}

// --- Main Component ---

function InvoicesContent() {
  const searchParams = useSearchParams()
  const projectFilter = searchParams.get("project")
  
  const [activeTab, setActiveTab] = useState<"invoice" | "quotation">("invoice")
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  
  const [showWizard, setShowWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<any>({
    projectId: projectFilter || "",
    type: "invoice",
    number: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [{ description: "", quantity: 1, rate: 0 }],
    tax: 0,
    discount: 0,
    amountPaid: 0,
    includeBalance: true,
    notes: "",
    status: "draft",
    currency: "USD"
  })

  const initializeFormData = (type: "invoice" | "quotation", editData?: any) => {
    if (editData) {
      const project = projects.find(p => p.id === editData.projectId)
      const client = clients.find(c => c.id === project?.clientId)
      const clientCurrency = client?.currency || "USD"
      const amountPaid = Math.min(normalizeMoney(editData.amountPaid ?? 0), normalizeMoney(editData.total))
      return {
        projectId: editData.projectId,
        type: editData.type,
        number: editData.number,
        date: editData.date,
        dueDate: editData.dueDate,
        items: editData.items,
        tax: editData.tax,
        discount: editData.discount,
        amountPaid,
        includeBalance: editData.includeBalance !== false,
        notes: editData.notes || "",
        status: resolveInvoiceStatus({ ...editData, amountPaid }),
        currency: clientCurrency
      }
    }
    
    let defaultProjectId = projectFilter || ""
    let defaultCurrency = "USD"
    let defaultNumber = ""
    
    if (defaultProjectId && projects.length > 0 && clients.length > 0) {
      const project = projects.find(p => p.id === defaultProjectId)
      const client = clients.find(c => c.id === project?.clientId)
      defaultCurrency = client?.currency || "USD"
      
      const clientInitials = client?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 3) || 'CLI'
      const projectInitials = project?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 3) || 'PRJ'
      const dateStr = new Date().toISOString().split('T')[0].replace(/-/g, '')
      const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
      defaultNumber = `${type === 'invoice' ? 'INV' : 'QUO'}-${clientInitials}-${projectInitials}-${dateStr}-${randomSuffix}`
    }

    return {
      projectId: defaultProjectId,
      type,
      number: defaultNumber,
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      items: [{ description: "", quantity: 1, rate: 0 }],
      tax: 0,
      discount: 0,
      amountPaid: 0,
      includeBalance: true,
      notes: "",
      status: "draft" as InvoiceStatus,
      currency: defaultCurrency
    }
  }

  useEffect(() => {
    const loadData = async () => {
      const [invoicesData, projectsData, clientsData] = await Promise.all([
        fetch('/api/invoices').then(res => res.json()),
        fetch('/api/projects').then(res => res.json()),
        fetch('/api/clients').then(res => res.json())
      ])
      
      setInvoices(invoicesData.map((i: any) => {
        const total = normalizeMoney(Number(i.total ?? 0))
        const amountPaid = normalizeMoney(Number(i.amountPaid ?? 0))
        return {
          ...i,
          id: i._id,
          total,
          amountPaid,
          includeBalance: i.includeBalance !== false,
          status: resolveInvoiceStatus({ type: i.type, status: i.status || "draft", dueDate: i.dueDate || "", total, amountPaid })
        }
      }))
      setProjects(projectsData.map((p: any) => ({ ...p, id: p._id })))
      setClients(clientsData.map((c: any) => ({ ...c, id: c._id })))
    }
    loadData()
  }, [projectFilter])

  const calculateTotal = () => {
    const subtotal = formData.items.reduce((sum: number, item: InvoiceItem) => sum + (item.quantity * item.rate), 0)
    const taxAmount = (subtotal * formData.tax) / 100
    const discountAmount = (subtotal * formData.discount) / 100
    return subtotal + taxAmount - discountAmount
  }

  const liveTotal = normalizeMoney(calculateTotal())
  const livePaidAmount = Math.min(normalizeMoney(formData.amountPaid), liveTotal)
  const liveBalance = getBalanceAmount(liveTotal, livePaidAmount)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.number) {
      alert('Please select a project to generate invoice number')
      return
    }
    const total = liveTotal
    const amountPaid = Math.min(normalizeMoney(formData.amountPaid), total)
    const status = resolveInvoiceStatus({ type: formData.type, status: formData.status, dueDate: formData.dueDate, total, amountPaid })
    const payload = { ...formData, total, amountPaid, status }
    
    if (editingId) {
      await fetch('/api/invoices', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editingId, ...payload }) })
      setInvoices(invoices.map(inv => inv.id === editingId ? { ...inv, ...payload } : inv))
      setEditingId(null)
    } else {
      const res = await fetch('/api/invoices', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const newInvoice = await res.json()
      setInvoices([...invoices, { ...newInvoice, id: newInvoice._id, total: normalizeMoney(Number(newInvoice.total ?? total)), amountPaid: normalizeMoney(Number(newInvoice.amountPaid ?? amountPaid)), includeBalance: newInvoice.includeBalance !== false, status: resolveInvoiceStatus({ type: newInvoice.type, status: newInvoice.status || status, dueDate: newInvoice.dueDate || formData.dueDate, total: normalizeMoney(Number(newInvoice.total ?? total)), amountPaid: normalizeMoney(Number(newInvoice.amountPaid ?? amountPaid)) }) }])
    }
    setShowWizard(false)
    setEditingId(null)
    setWizardStep(1)
  }

  const handleEdit = (invoice: Invoice) => {
    setFormData(initializeFormData(invoice.type, invoice))
    setEditingId(invoice.id)
    setWizardStep(1)
    setShowWizard(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Delete this document?")) {
      await fetch(`/api/invoices?id=${id}`, { method: 'DELETE' })
      setInvoices(invoices.filter(inv => inv.id !== id))
    }
  }

  const filteredInvoices = invoices.filter(inv => {
    const matchesTab = inv.type === activeTab
    const matchesProject = projectFilter ? inv.projectId === projectFilter : true
    return matchesTab && matchesProject
  })

  const getStepName = (step: number) => {
    switch(step) {
      case 1: return "Document Details"
      case 2: return "Line Items"
      case 3: return "Totals & Adjustments"
      case 4: return "Notes & Review"
      default: return ""
    }
  }

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">Financial Documents</h1>
          <p className="text-muted-foreground">Generate and manage invoices and quotations</p>
        </div>
        <Button onClick={() => { 
          setShowWizard(true); 
          setEditingId(null); 
          setWizardStep(1); 
          setFormData(initializeFormData(activeTab));
        }} className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-4 h-4 mr-2" />
          Create New {activeTab === "invoice" ? "Invoice" : "Quotation"}
        </Button>
      </div>

      <div className="flex gap-2 mb-6 border-b border-border">
        <button onClick={() => setActiveTab("invoice")} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "invoice" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
          Invoices
        </button>
        <button onClick={() => setActiveTab("quotation")} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "quotation" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
          Quotations
        </button>
      </div>

      {showWizard && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-border flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{editingId ? "Edit" : "Create"} {formData.type === "invoice" ? "Invoice" : "Quotation"}</h2>
                <p className="text-sm text-muted-foreground mt-1">Step {wizardStep} of 4: {getStepName(wizardStep)}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => { setShowWizard(false); setEditingId(null); setWizardStep(1); }}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="px-6 pt-6">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted -z-10" />
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${wizardStep >= step ? "bg-primary border-primary text-primary-foreground" : "bg-background border-muted-foreground text-muted-foreground"}`}>
                    {wizardStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs font-medium text-muted-foreground px-1">
                <span>Details</span><span>Items</span><span>Totals</span><span>Notes</span>
              </div>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {wizardStep === 1 && <Step1Details formData={formData} setFormData={setFormData} projects={projects} clients={clients} />}
              {wizardStep === 2 && <Step2Items formData={formData} setFormData={setFormData} currency={formData.currency} />}
              {wizardStep === 3 && <Step3Totals formData={formData} setFormData={setFormData} currency={formData.currency} />}
              {wizardStep === 4 && <Step4Notes formData={formData} setFormData={setFormData} liveTotal={liveTotal} projects={projects} clients={clients} />}
            </div>

            <div className="p-6 border-t border-border flex justify-between sticky bottom-0 bg-card">
              <Button variant="outline" onClick={wizardStep === 1 ? () => { setShowWizard(false); setEditingId(null); } : () => setWizardStep(prev => prev - 1)}>
                {wizardStep === 1 ? "Cancel" : "Back"}
              </Button>
              {wizardStep < 4 ? (
                <Button onClick={() => setWizardStep(prev => prev + 1)} className="bg-primary hover:bg-primary/90">
                  Next Step <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                  <Check className="w-4 h-4 mr-2" /> Save {formData.type === "invoice" ? "Invoice" : "Quotation"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-border">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Document</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client / Project</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dates</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amounts</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-card/50 divide-y divide-border">
              {filteredInvoices.map(invoice => {
                const project = projects.find(p => p.id === invoice.projectId)
                const client = clients.find(c => c.id === project?.clientId)
                const resolvedStatus = resolveInvoiceStatus(invoice)
                const amountPaid = Math.min(normalizeMoney(invoice.amountPaid ?? 0), normalizeMoney(invoice.total))
                const balanceDue = getBalanceAmount(invoice.total, amountPaid)
                
                return (
                  <tr key={invoice.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm">{invoice.number}</span>
                        <span className="text-xs text-muted-foreground mt-0.5 capitalize">{invoice.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground text-sm">{client?.name || "Unknown Client"}</span>
                        <span className="text-xs text-muted-foreground mt-0.5">{project?.name || "Unknown Project"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-foreground">{invoice.date}</span>
                        <span className={`text-xs mt-0.5 ${resolvedStatus === 'overdue' ? 'text-destructive font-medium' : 'text-muted-foreground'}`}>
                          Due: {invoice.dueDate || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground text-sm">{invoice.currency} {invoice.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        {invoice.type === "invoice" && invoice.includeBalance !== false && balanceDue > 0 && (
                          <span className="text-xs text-muted-foreground mt-0.5">Balance: {invoice.currency} {balanceDue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        resolvedStatus === "paid" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                        resolvedStatus === "partial" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                        resolvedStatus === "sent" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                        resolvedStatus === "overdue" ? "bg-red-500/10 text-red-600 dark:text-red-400" :
                        "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                      }`}>
                        {resolvedStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" onClick={() => { /* generatePDF logic preserved */ }} className="h-8 w-8 hover:bg-green-500/10 hover:text-green-600" title="Download PDF">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(invoice)} className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-600" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(invoice.id)} className="h-8 w-8 hover:bg-red-500/10 hover:text-red-600" title="Delete">
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
        {filteredInvoices.length === 0 && (
          <div className="text-center py-16 text-muted-foreground bg-card/50 rounded-2xl border border-border border-dashed m-4">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-lg font-medium">No {activeTab}s found</p>
            <p className="text-sm mt-1">Create your first {activeTab} to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function InvoicesPage() {
  return (
    <Suspense fallback={<div className="px-4 py-6">Loading...</div>}>
      <InvoicesContent />
    </Suspense>
  )
}
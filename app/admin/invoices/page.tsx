/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Plus, Edit, Trash2, Download } from "lucide-react"
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

function InvoicesContent() {
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
    amountPaid: 0,
    includeBalance: true,
    notes: "",
    status: "draft" as InvoiceStatus,
    currency: "USD"
  })

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
        const status = resolveInvoiceStatus({
          type: i.type,
          status: i.status || "draft",
          dueDate: i.dueDate || "",
          total,
          amountPaid
        })
        return {
          ...i,
          id: i._id,
          total,
          amountPaid,
          includeBalance: i.includeBalance !== false,
          status
        }
      }))
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
    const status = resolveInvoiceStatus({
      type: formData.type,
      status: formData.status,
      dueDate: formData.dueDate,
      total,
      amountPaid
    })
    const payload = { ...formData, total, amountPaid, status }
    if (editingId) {
      await fetch('/api/invoices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...payload })
      })
      const updated = invoices.map(inv => inv.id === editingId ? { ...inv, ...payload } : inv)
      setInvoices(updated)
      setEditingId(null)
    } else {
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const newInvoice = await res.json()
      setInvoices([
        ...invoices,
        {
          ...newInvoice,
          id: newInvoice._id,
          total: normalizeMoney(Number(newInvoice.total ?? total)),
          amountPaid: normalizeMoney(Number(newInvoice.amountPaid ?? amountPaid)),
          includeBalance: newInvoice.includeBalance !== false,
          status: resolveInvoiceStatus({
            type: newInvoice.type,
            status: newInvoice.status || status,
            dueDate: newInvoice.dueDate || formData.dueDate,
            total: normalizeMoney(Number(newInvoice.total ?? total)),
            amountPaid: normalizeMoney(Number(newInvoice.amountPaid ?? amountPaid))
          })
        }
      ])
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
      amountPaid: 0,
      includeBalance: true,
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
    const clientCurrency = client?.currency || "USD"
    const amountPaid = Math.min(normalizeMoney(invoice.amountPaid ?? 0), normalizeMoney(invoice.total))
    setFormData({
      projectId: invoice.projectId,
      type: invoice.type,
      number: invoice.number,
      date: invoice.date,
      dueDate: invoice.dueDate,
      items: invoice.items,
      tax: invoice.tax,
      discount: invoice.discount,
      amountPaid,
      includeBalance: invoice.includeBalance !== false,
      notes: invoice.notes || "",
      status: resolveInvoiceStatus({ ...invoice, amountPaid }),
      currency: clientCurrency
    })
    setCurrency(clientCurrency)
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
    const curr = client?.currency || "USD"

    const fmt = (value: number) =>
      value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    const subtotal = invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
    const taxAmount = (subtotal * invoice.tax) / 100
    const discountAmount = (subtotal * invoice.discount) / 100
    const amountPaid = Math.min(normalizeMoney(invoice.amountPaid ?? 0), normalizeMoney(invoice.total))
    const balanceDue = getBalanceAmount(invoice.total, amountPaid)
    const showBalance = invoice.type === "invoice" && invoice.includeBalance !== false
    const resolvedStatus = resolveInvoiceStatus({ ...invoice, amountPaid })

    const sanitizePdfText = (value: string) =>
      value
        .replace(/\\/g, "\\\\")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)")
        .replace(/[^\x20-\x7E]/g, " ")

    const estimateTextWidth = (text: string, fontSize: number) =>
      sanitizePdfText(text).length * fontSize * 0.52

    const wrapText = (text: string, maxWidth: number, fontSize = 10): string[] => {
      const cleaned = (text || "").replace(/\s+/g, " ").trim()
      if (!cleaned) return [""]
      const words = cleaned.split(" ")
      const lines: string[] = []
      let line = ""
      for (const word of words) {
        const next = line ? `${line} ${word}` : word
        if (estimateTextWidth(next, fontSize) > maxWidth && line) {
          lines.push(line)
          line = word
        } else {
          line = next
        }
      }
      if (line) lines.push(line)
      return lines
    }

    const cmds: string[] = []
    const pageWidth = 595
    const margin = 40
    const right = pageWidth - margin
    const contentWidth = pageWidth - margin * 2

    const text = (x: number, y: number, value: string, size = 10, font: "F1" | "F2" = "F1") => {
      cmds.push(`BT /${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${sanitizePdfText(value)}) Tj ET`)
    }
    const textRight = (rightX: number, y: number, value: string, size = 10, font: "F1" | "F2" = "F1") => {
      const x = rightX - estimateTextWidth(value, size)
      text(Math.max(margin, x), y, value, size, font)
    }
    const hLine = (x1: number, y: number, x2: number, width = 1) => {
      cmds.push(`${width.toFixed(2)} w ${x1.toFixed(2)} ${y.toFixed(2)} m ${x2.toFixed(2)} ${y.toFixed(2)} l S`)
    }
    const vLine = (x: number, y1: number, y2: number, width = 1) => {
      cmds.push(`${width.toFixed(2)} w ${x.toFixed(2)} ${y1.toFixed(2)} m ${x.toFixed(2)} ${y2.toFixed(2)} l S`)
    }
    const rect = (x: number, y: number, w: number, h: number) => {
      cmds.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re S`)
    }
    const fillRectGray = (x: number, y: number, w: number, h: number, gray = 0.95) => {
      cmds.push(`${gray} g ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f 0 g`)
    }

    let y = 800

    text(margin, y, "Caycee Developers", 20, "F2")
    y -= 16
    text(margin, y, "Email: cayceedevelopers@gmail.com", 10)
    y -= 12
    text(margin, y, "Phone: +254 (741) 481-008 | Website: www.cayceedevelopers.com", 10)

    textRight(right, 800, invoice.type === "invoice" ? "INVOICE" : "QUOTATION", 22, "F2")
    textRight(right, 782, invoice.number, 11, "F1")

    y -= 16
    hLine(margin, y, right, 1.2)

    y -= 22
    const boxTop = y
    const boxHeight = 98
    const boxGap = 15
    const halfWidth = (contentWidth - boxGap) / 2
    const leftBoxX = margin
    const rightBoxX = leftBoxX + halfWidth + boxGap

    rect(leftBoxX, boxTop - boxHeight, halfWidth, boxHeight)
    rect(rightBoxX, boxTop - boxHeight, halfWidth, boxHeight)
    fillRectGray(leftBoxX, boxTop - 22, halfWidth, 22, 0.94)
    fillRectGray(rightBoxX, boxTop - 22, halfWidth, 22, 0.94)
    text(leftBoxX + 8, boxTop - 15, "Bill To", 11, "F2")
    text(rightBoxX + 8, boxTop - 15, "Document Info", 11, "F2")

    let leftY = boxTop - 38
    text(leftBoxX + 8, leftY, client?.name || "N/A", 11, "F2")
    leftY -= 14
    if (client?.company) {
      text(leftBoxX + 8, leftY, client.company, 10)
      leftY -= 13
    }
    if (client?.email) {
      text(leftBoxX + 8, leftY, client.email, 10)
    }

    let rightY = boxTop - 38
    text(rightBoxX + 8, rightY, `Date: ${invoice.date}`, 10)
    rightY -= 14
    text(rightBoxX + 8, rightY, `Due Date: ${invoice.dueDate || "N/A"}`, 10)
    rightY -= 14
    text(rightBoxX + 8, rightY, `Project: ${project?.name || "N/A"}`, 10)
    rightY -= 14
    text(rightBoxX + 8, rightY, `Status: ${resolvedStatus.toUpperCase()}`, 10)

    y = boxTop - boxHeight - 22

    const tableX = margin
    const colWidths = [240, 55, 100, 120]
    const colX = [
      tableX,
      tableX + colWidths[0],
      tableX + colWidths[0] + colWidths[1],
      tableX + colWidths[0] + colWidths[1] + colWidths[2],
      tableX + colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3]
    ]
    const headerHeight = 24

    fillRectGray(tableX, y - headerHeight, contentWidth, headerHeight, 0.9)
    rect(tableX, y - headerHeight, contentWidth, headerHeight)
    vLine(colX[1], y - headerHeight, y)
    vLine(colX[2], y - headerHeight, y)
    vLine(colX[3], y - headerHeight, y)
    text(tableX + 8, y - 16, "Description", 10, "F2")
    text(colX[1] + 8, y - 16, "Qty", 10, "F2")
    text(colX[2] + 8, y - 16, "Rate", 10, "F2")
    text(colX[3] + 8, y - 16, "Amount", 10, "F2")
    y -= headerHeight

    for (const item of invoice.items) {
      const descLines = wrapText(item.description || "N/A", colWidths[0] - 16, 10)
      const rowHeight = Math.max(24, descLines.length * 12 + 8)

      rect(tableX, y - rowHeight, contentWidth, rowHeight)
      vLine(colX[1], y - rowHeight, y)
      vLine(colX[2], y - rowHeight, y)
      vLine(colX[3], y - rowHeight, y)

      let descY = y - 15
      for (const line of descLines) {
        text(tableX + 8, descY, line, 10)
        descY -= 12
      }
      textRight(colX[2] - 8, y - 15, `${item.quantity}`, 10)
      textRight(colX[3] - 8, y - 15, `${curr} ${fmt(item.rate)}`, 10)
      textRight(colX[4] - 8, y - 15, `${curr} ${fmt(item.quantity * item.rate)}`, 10)
      y -= rowHeight
    }

    y -= 16

    const totalsX = right - 220
    const totalsW = 220
    const totalsRowH = 20
    const totalsRows = [
      { label: "Subtotal", value: `${curr} ${fmt(subtotal)}`, size: 10 as const, font: "F2" as const },
      { label: `Tax (${invoice.tax}%)`, value: `${curr} ${fmt(taxAmount)}`, size: 10 as const, font: "F2" as const },
      { label: `Discount (${invoice.discount}%)`, value: `-${curr} ${fmt(discountAmount)}`, size: 10 as const, font: "F2" as const },
      { label: "Total", value: `${curr} ${fmt(invoice.total)}`, size: 11 as const, font: "F2" as const }
    ]

    if (showBalance) {
      totalsRows.push(
        { label: "Amount Paid", value: `${curr} ${fmt(amountPaid)}`, size: 10 as const, font: "F2" as const },
        { label: "Balance Due", value: `${curr} ${fmt(balanceDue)}`, size: 11 as const, font: "F2" as const }
      )
    }

    const totalsHeight = totalsRowH * totalsRows.length
    rect(totalsX, y - totalsHeight, totalsW, totalsHeight)
    for (let row = 1; row < totalsRows.length; row++) {
      hLine(totalsX, y - totalsRowH * row, totalsX + totalsW)
    }
    fillRectGray(totalsX, y - totalsHeight, totalsW, totalsRowH, 0.9)

    totalsRows.forEach((row, index) => {
      const rowY = y - 14 - index * totalsRowH
      text(totalsX + 8, rowY, row.label, row.size, row.font)
      textRight(totalsX + totalsW - 8, rowY, row.value, row.size, row.font)
    })

    y -= totalsHeight + 24

    const notesLines = wrapText(invoice.notes || "N/A", contentWidth - 16, 10)
    const notesBoxHeight = Math.max(44, notesLines.length * 12 + 16)
    fillRectGray(margin, y - 22, contentWidth, 22, 0.94)
    rect(margin, y - notesBoxHeight, contentWidth, notesBoxHeight)
    text(margin + 8, y - 15, "Notes", 11, "F2")
    let notesY = y - 36
    for (const line of notesLines) {
      text(margin + 8, notesY, line, 10)
      notesY -= 12
    }

    const contentStream = cmds.join("\n")

    const encoder = new TextEncoder()
    const contentLength = encoder.encode(contentStream).length
    const objects = [
      "",
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
      `<< /Length ${contentLength} >>\nstream\n${contentStream}\nendstream`
    ]

    let pdf = "%PDF-1.4\n"
    const offsets: number[] = [0]
    for (let i = 1; i < objects.length; i++) {
      offsets[i] = encoder.encode(pdf).length
      pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`
    }
    const xrefStart = encoder.encode(pdf).length
    pdf += `xref\n0 ${objects.length}\n`
    pdf += "0000000000 65535 f \n"
    for (let i = 1; i < objects.length; i++) {
      pdf += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`
    }
    pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`

    const blob = new Blob([encoder.encode(pdf)], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${invoice.type}-${invoice.number}.pdf`.replace(/[\\/:*?"<>|]/g, "-")
    link.click()
    URL.revokeObjectURL(url)
  }

  const filteredInvoices = projectFilter ? invoices.filter(inv => inv.projectId === projectFilter) : invoices

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Invoices & Quotations</h1>
          <p className="text-muted-foreground">Generate and manage financial documents</p>
        </div>
        <Button onClick={() => { setShowForm(true); setEditingId(null); setCurrency("USD"); setFormData({ projectId: projectFilter || "", type: "invoice", number: "", date: new Date().toISOString().split("T")[0], dueDate: "", items: [{ description: "", quantity: 1, rate: 0 }], tax: 0, discount: 0, amountPaid: 0, includeBalance: true, notes: "", status: "draft", currency: "USD" }) }} className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all">
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
              <select className="border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as InvoiceStatus })}>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="partial">Partial</option>
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
                  <div className="col-span-2 font-semibold text-foreground">{currency} {(item.quantity * item.rate).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                  <Button type="button" size="sm" variant="ghost" className="col-span-1 hover:bg-destructive/10 hover:text-destructive rounded-lg" onClick={() => removeItem(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input type="number" placeholder="Tax %" value={formData.tax} onChange={e => setFormData({ ...formData, tax: Number(e.target.value) })} className="h-12 rounded-xl bg-background border-border" />
              <Input type="number" placeholder="Discount %" value={formData.discount} onChange={e => setFormData({ ...formData, discount: Number(e.target.value) })} className="h-12 rounded-xl bg-background border-border" />
              <Input type="number" placeholder="Amount Paid" value={formData.amountPaid} onChange={e => setFormData({ ...formData, amountPaid: Number(e.target.value) || 0 })} className="h-12 rounded-xl bg-background border-border" />
              <div className="flex items-center justify-center font-bold text-xl bg-primary text-primary-foreground rounded-xl px-4">Total: {currency} {liveTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Balance"
                value={liveBalance}
                onChange={e => {
                  const rawBalance = Number(e.target.value)
                  const normalizedBalance = Math.min(Math.max(Number.isFinite(rawBalance) ? rawBalance : 0, 0), liveTotal)
                  const nextAmountPaid = Math.max(liveTotal - normalizedBalance, 0)
                  setFormData({ ...formData, amountPaid: nextAmountPaid })
                }}
                className="h-12 rounded-xl bg-background border-border"
              />
              <label className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 bg-background text-foreground">
                <input
                  type="checkbox"
                  checked={formData.includeBalance}
                  onChange={e => setFormData({ ...formData, includeBalance: e.target.checked })}
                  className="h-4 w-4 rounded border-border"
                />
                <span className="text-sm font-medium">Include balance in invoice output</span>
              </label>
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

      <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-x-auto border border-border">
        <table className="min-w-[1100px] w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Number</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Balance</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-card/50 divide-y divide-border">
            {filteredInvoices.map(invoice => {
              const project = projects.find(p => p.id === invoice.projectId)
              const invoiceCurrency = clients.find(c => c.id === project?.clientId)?.currency || "USD"
              const resolvedStatus = resolveInvoiceStatus(invoice)
              const amountPaid = Math.min(normalizeMoney(invoice.amountPaid ?? 0), normalizeMoney(invoice.total))
              const balanceDue = getBalanceAmount(invoice.total, amountPaid)
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
                  <td className="px-6 py-4 whitespace-nowrap font-bold text-foreground">{invoiceCurrency} {invoice.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-foreground">
                    {invoice.type === "invoice" && invoice.includeBalance !== false
                      ? `${invoiceCurrency} ${balanceDue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                      resolvedStatus === "paid" ? "bg-green-500/20 text-green-400" :
                      resolvedStatus === "partial" ? "bg-amber-500/20 text-amber-400" :
                      resolvedStatus === "sent" ? "bg-primary/20 text-primary" :
                      resolvedStatus === "overdue" ? "bg-destructive/20 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {resolvedStatus}
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

export default function InvoicesPage() {
  return (
    <Suspense fallback={<div className="px-4 py-6">Loading...</div>}>
      <InvoicesContent />
    </Suspense>
  )
}

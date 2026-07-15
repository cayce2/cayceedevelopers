"use client"

import { useEffect, useState, useCallback } from "react"
import {
  Plus, FileSignature, Link2, Eye, Pencil, Trash2,
  Copy, Check, Send, RefreshCw, Sparkles, Scale,
  Wand2, MessageSquarePlus, ChevronDown, ChevronUp, X
} from "lucide-react"
import {
  Drawer, Field, AdminInput, AdminSelect, AdminTextarea,
  Btn, Badge, PageHeader, Table, Th, Td
} from "../components"

type Contract = {
  _id: string
  reference: string
  title: string
  clientId: string
  clientName: string
  clientRepName: string
  clientEmail: string
  effectiveDate: string
  termYears: number
  currency: string
  contractValue: number
  depositPercent: number
  scopeOfServices: string
  paymentTermsNotes: string
  additionalClauses: string
  body: string
  status: string
  signedAt?: string
  signedByName?: string
  signedByTitle?: string
  signatureData?: string
  clientIp?: string
  projectId?: string
}

type Client = { _id: string; name: string; email: string; company: string }
type Project = { _id: string; name: string; clientId: string }
type AiMode = 'draft' | 'review' | 'improve' | 'clause'

const EMPTY: Omit<Contract, '_id'> = {
  reference: '', title: 'Web Development & Hosting Services Agreement',
  clientId: '', clientName: '', clientRepName: '', clientEmail: '',
  effectiveDate: new Date().toISOString().split('T')[0],
  termYears: 3, currency: 'KES', contractValue: 0, depositPercent: 25,
  scopeOfServices: '', paymentTermsNotes: '', additionalClauses: '',
  body: '', status: 'draft', projectId: '',
}

function genRef() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const rand = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  const d = new Date()
  return `CON-${rand(2)}-${rand(2)}-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${rand(4)}`
}

// ── AI Panel ────────────────────────────────────────────────────────────────
function AiPanel({
  form,
  onApply,
}: {
  form: Omit<Contract, '_id'>
  onApply: (html: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<AiMode>('draft')
  const [instructions, setInstructions] = useState('')
  const [clauseRequest, setClauseRequest] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const modeConfig: Record<AiMode, { label: string; icon: React.ReactNode; desc: string; color: string }> = {
    draft: {
      label: 'AI Draft',
      icon: <Wand2 className="w-3.5 h-3.5" />,
      desc: 'Generate a complete, legally sound contract from your form details',
      color: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
    },
    review: {
      label: 'Legal Review',
      icon: <Scale className="w-3.5 h-3.5" />,
      desc: 'Analyse the current contract for risks, gaps, and legal strength',
      color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    },
    improve: {
      label: 'Improve',
      icon: <Sparkles className="w-3.5 h-3.5" />,
      desc: 'Strengthen and rewrite the contract with better legal language',
      color: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    },
    clause: {
      label: 'Add Clause',
      icon: <MessageSquarePlus className="w-3.5 h-3.5" />,
      desc: 'Draft a specific clause to add to the contract',
      color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    },
  }

  const run = async () => {
    setLoading(true)
    setError('')
    setResult('')
    try {
      const res = await fetch('/api/contracts-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          existingBody: form.body,
          context: {
            ...form,
            instructions,
            request: clauseRequest,
          },
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setResult(data.html)
    } catch {
      setError('Request failed. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const apply = () => {
    if (!result) return
    onApply(result)
    setResult('')
  }

  return (
    <div className="border border-violet-500/20 rounded-xl overflow-hidden">
      {/* Header toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-violet-500/10 hover:bg-violet-500/15 transition-all"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-semibold text-violet-300">AI Legal Assistant</span>
          <span className="text-xs text-violet-400/60 hidden sm:block">· Powered by Gemini</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-violet-400" /> : <ChevronDown className="w-4 h-4 text-violet-400" />}
      </button>

      {open && (
        <div className="p-4 space-y-4 bg-white/[0.02]">
          {/* Mode selector */}
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(modeConfig) as AiMode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                  mode === m ? modeConfig[m].color : 'border-white/[0.08] text-white/40 hover:text-white/60 hover:bg-white/[0.04]'
                }`}
              >
                {modeConfig[m].icon}
                {modeConfig[m].label}
              </button>
            ))}
          </div>

          <p className="text-xs text-white/40">{modeConfig[mode].desc}</p>

          {/* Mode-specific inputs */}
          {mode === 'improve' && (
            <AdminTextarea
              rows={2}
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              placeholder="Optional: specific instructions for improvement…"
            />
          )}
          {mode === 'clause' && (
            <AdminInput
              value={clauseRequest}
              onChange={e => setClauseRequest(e.target.value)}
              placeholder="e.g. Add a data protection clause under GDPR and Kenya Data Protection Act"
            />
          )}

          {(mode === 'review' || mode === 'improve') && !form.body && (
            <p className="text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
              ⚠ No contract body yet. Generate or save a body first, then use Review or Improve.
            </p>
          )}

          <Btn
            onClick={run}
            disabled={loading || ((mode === 'review' || mode === 'improve') && !form.body) || (mode === 'clause' && !clauseRequest.trim())}
            className="w-full bg-violet-600 hover:bg-violet-500 text-white"
          >
            {loading
              ? <><div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Generating…</>
              : <><Sparkles className="w-3.5 h-3.5" /> Run {modeConfig[mode].label}</>
            }
          </Btn>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <X className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          {result && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/50 font-medium">AI Output Preview</p>
                <div className="flex gap-2">
                  <Btn size="sm" variant="outline" onClick={() => setResult('')}>
                    <X className="w-3 h-3" /> Discard
                  </Btn>
                  <Btn size="sm" onClick={apply} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    <Check className="w-3 h-3" />
                    {mode === 'review' ? 'View Review' : 'Apply to Contract'}
                  </Btn>
                </div>
              </div>
              <div
                className="bg-white rounded-lg p-3 max-h-64 overflow-y-auto text-gray-900 text-xs"
                dangerouslySetInnerHTML={{ __html: result }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editing, setEditing] = useState<Contract | null>(null)
  const [form, setForm] = useState<Omit<Contract, '_id'>>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [previewContract, setPreviewContract] = useState<Contract | null>(null)

  const load = useCallback(async () => {
    const [c, cl, pr] = await Promise.all([
      fetch('/api/contracts').then(r => r.json()),
      fetch('/api/clients').then(r => r.json()),
      fetch('/api/projects').then(r => r.json()),
    ])
    setContracts(Array.isArray(c) ? c : [])
    setClients(Array.isArray(cl) ? cl : [])
    setProjects(Array.isArray(pr) ? pr : [])
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const set = (k: keyof typeof form, v: unknown) => setForm(p => ({ ...p, [k]: v }))

  const openNew = () => {
    setEditing(null)
    setForm({ ...EMPTY, reference: genRef() })
    setDrawerOpen(true)
  }

  const openEdit = (c: Contract) => {
    setEditing(c)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = c
    setForm(rest)
    setDrawerOpen(true)
  }

  const onClientChange = (clientId: string) => {
    const cl = clients.find(c => c._id === clientId)
    if (cl) {
      setForm(p => ({ ...p, clientId: cl._id, clientName: cl.company || cl.name, clientEmail: cl.email }))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = editing ? { id: editing._id, ...form } : form
    await fetch('/api/contracts', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    await load()
    setDrawerOpen(false)
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this contract?')) return
    await fetch(`/api/contracts?id=${id}`, { method: 'DELETE' })
    setContracts(p => p.filter(c => c._id !== id))
  }

  const markSent = async (c: Contract) => {
    await fetch('/api/contracts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: c._id, status: 'sent' }),
    })
    await load()
  }

  const copyLink = (id: string) => {
    const url = `${window.location.origin}/sign/${id}`
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const clientProjects = projects.filter(p => p.clientId === form.clientId)

  return (
    <div>
      <PageHeader
        title="Contracts"
        subtitle="Create, generate, and manage client agreements"
        action={
          <Btn onClick={openNew}>
            <Plus className="w-4 h-4" /> New Contract
          </Btn>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : contracts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-40 text-white/30 gap-2">
          <FileSignature className="w-8 h-8" />
          <p className="text-sm">No contracts yet</p>
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Reference</Th>
              <Th>Title</Th>
              <Th>Client</Th>
              <Th>Value</Th>
              <Th>Status</Th>
              <Th>Signed By</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(c => (
              <tr key={c._id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <Td><span className="font-mono text-xs text-white/50">{c.reference}</span></Td>
                <Td><span className="text-white/80 font-medium">{c.title}</span></Td>
                <Td>{c.clientName}</Td>
                <Td>{c.currency} {c.contractValue?.toLocaleString()}</Td>
                <Td><Badge status={c.status} /></Td>
                <Td>
                  {c.signedByName
                    ? <span className="text-emerald-400 text-xs">{c.signedByName}{c.signedAt ? ` · ${new Date(c.signedAt).toLocaleDateString()}` : ''}</span>
                    : <span className="text-white/20 text-xs">—</span>}
                </Td>
                <Td>
                  <div className="flex items-center gap-1">
                    <Btn size="sm" variant="ghost" onClick={() => { setPreviewContract(c); setPreviewOpen(true) }} title="Preview">
                      <Eye className="w-3.5 h-3.5" />
                    </Btn>
                    <Btn size="sm" variant="ghost" onClick={() => openEdit(c)} title="Edit">
                      <Pencil className="w-3.5 h-3.5" />
                    </Btn>
                    <Btn size="sm" variant="ghost" onClick={() => copyLink(c._id)} title="Copy share link">
                      {copied === c._id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Link2 className="w-3.5 h-3.5" />}
                    </Btn>
                    {c.status === 'draft' && (
                      <Btn size="sm" variant="ghost" onClick={() => markSent(c)} title="Mark as Sent">
                        <Send className="w-3.5 h-3.5" />
                      </Btn>
                    )}
                    <Btn size="sm" variant="danger" onClick={() => handleDelete(c._id)} title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Btn>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Create / Edit Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editing ? 'Edit Contract' : 'New Contract'}>
        <div className="space-y-4">

          {/* ── AI Panel ── */}
          <AiPanel
            form={form}
            onApply={html => setForm(p => ({ ...p, body: html }))}
          />

          <div className="border-t border-white/[0.06] pt-4 space-y-4">
            <p className="text-xs text-white/30 uppercase tracking-wider font-semibold">Contract Details</p>

            <Field label="Reference">
              <div className="flex gap-2">
                <AdminInput value={form.reference} onChange={e => set('reference', e.target.value)} placeholder="CON-XX-XX-..." />
                <Btn variant="outline" size="sm" onClick={() => set('reference', genRef())} title="Regenerate">
                  <RefreshCw className="w-3.5 h-3.5" />
                </Btn>
              </div>
            </Field>

            <Field label="Title">
              <AdminInput value={form.title} onChange={e => set('title', e.target.value)} />
            </Field>

            <Field label="Client">
              <AdminSelect value={form.clientId || ''} onChange={e => onClientChange(e.target.value)}>
                <option value="">Select client…</option>
                {clients.map(c => <option key={c._id} value={c._id}>{c.company || c.name}</option>)}
              </AdminSelect>
            </Field>

            <Field label="Client Company Name">
              <AdminInput value={form.clientName} onChange={e => set('clientName', e.target.value)} placeholder="AB-Site Technologies Limited" />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Client Rep Name">
                <AdminInput value={form.clientRepName} onChange={e => set('clientRepName', e.target.value)} placeholder="Brian Abuoga" />
              </Field>
              <Field label="Client Email">
                <AdminInput value={form.clientEmail} onChange={e => set('clientEmail', e.target.value)} type="email" />
              </Field>
            </div>

            <Field label="Linked Project (optional)">
              <AdminSelect value={form.projectId || ''} onChange={e => set('projectId', e.target.value)}>
                <option value="">None</option>
                {clientProjects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
              </AdminSelect>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Effective Date">
                <AdminInput type="date" value={form.effectiveDate} onChange={e => set('effectiveDate', e.target.value)} />
              </Field>
              <Field label="Term (years)">
                <AdminInput type="number" value={form.termYears} onChange={e => set('termYears', Number(e.target.value))} min={1} />
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Currency">
                <AdminSelect value={form.currency} onChange={e => set('currency', e.target.value)}>
                  <option>KES</option><option>USD</option><option>EUR</option><option>GBP</option>
                </AdminSelect>
              </Field>
              <Field label="Contract Value">
                <AdminInput type="number" value={form.contractValue} onChange={e => set('contractValue', Number(e.target.value))} min={0} />
              </Field>
              <Field label="Deposit %">
                <AdminInput type="number" value={form.depositPercent} onChange={e => set('depositPercent', Number(e.target.value))} min={0} max={100} />
              </Field>
            </div>

            <Field label="Scope of Services">
              <AdminTextarea
                rows={5}
                value={form.scopeOfServices}
                onChange={e => set('scopeOfServices', e.target.value)}
                placeholder="Describe the services to be provided…"
              />
            </Field>

            <Field label="Payment Terms Notes (optional)">
              <AdminTextarea
                rows={3}
                value={form.paymentTermsNotes}
                onChange={e => set('paymentTermsNotes', e.target.value)}
                placeholder="Additional payment notes…"
              />
            </Field>

            <Field label="Additional Clauses (optional)">
              <AdminTextarea
                rows={3}
                value={form.additionalClauses}
                onChange={e => set('additionalClauses', e.target.value)}
                placeholder="Any extra clauses…"
              />
            </Field>

            <Field label="Status">
              <AdminSelect value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="signed">Signed</option>
                <option value="declined">Declined</option>
              </AdminSelect>
            </Field>

            {form.body && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-400">
                ✓ Contract body ready. Save to publish the signing link.
              </div>
            )}

            <Btn className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Contract'}
            </Btn>
          </div>
        </div>
      </Drawer>

      {/* Preview Drawer */}
      <Drawer open={previewOpen} onClose={() => setPreviewOpen(false)} title="Contract Preview">
        {previewContract && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge status={previewContract.status} />
              <span className="text-xs text-white/40 font-mono">{previewContract.reference}</span>
              {previewContract.status !== 'signed' && previewContract.status !== 'declined' && (
                <Btn size="sm" variant="outline" onClick={() => copyLink(previewContract._id)}>
                  {copied === previewContract._id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === previewContract._id ? 'Copied!' : 'Copy Link'}
                </Btn>
              )}
            </div>

            {previewContract.status === 'signed' && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1.5">
                <p className="text-xs font-semibold text-emerald-400">✓ Signed</p>
                <p className="text-xs text-white/60">By: {previewContract.signedByName}{previewContract.signedByTitle ? ` · ${previewContract.signedByTitle}` : ''}</p>
                {previewContract.signedAt && <p className="text-xs text-white/40">Date: {new Date(previewContract.signedAt).toLocaleString()}</p>}
                {previewContract.clientIp && <p className="text-xs text-white/30">IP: {previewContract.clientIp}</p>}
                {previewContract.signatureData && (
                  <div className="mt-2">
                    <p className="text-xs text-white/40 mb-1">Signature:</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={previewContract.signatureData} alt="Client signature" className="bg-white rounded p-1 max-h-20" />
                  </div>
                )}
              </div>
            )}

            {previewContract.status === 'declined' && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-xs font-semibold text-red-400">✗ Declined</p>
                {previewContract.signedAt && <p className="text-xs text-white/40 mt-1">{new Date(previewContract.signedAt).toLocaleString()}</p>}
              </div>
            )}

            <div className="bg-white rounded-xl p-4 overflow-auto max-h-[60vh]">
              <div
                className="text-gray-900 text-xs"
                dangerouslySetInnerHTML={{ __html: previewContract.body || '<p style="color:#999">No body generated yet.</p>' }}
              />
            </div>

            <div className="text-xs text-white/30 text-center">
              Share link: <span className="text-sky-400 break-all">{typeof window !== 'undefined' ? `${window.location.origin}/sign/${previewContract._id}` : ''}</span>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { CheckCircle, XCircle, PenLine, RotateCcw } from "lucide-react"

type Contract = {
  _id: string
  title: string
  reference: string
  body: string
  status: string
  clientName: string
  clientRepName: string
  effectiveDate: string
  signedAt?: string
  signedByName?: string
}

export default function SignPage() {
  const { id } = useParams<{ id: string }>()
  const [contract, setContract] = useState<Contract | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<"signed" | "declined" | null>(null)

  // Canvas signature
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [hasSig, setHasSig] = useState(false)

  useEffect(() => {
    fetch(`/api/contracts/${id}/sign`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else {
          setContract(d)
          if (d.status === 'signed' || d.status === 'declined') setDone(d.status)
        }
      })
      .catch(() => setError("Failed to load contract"))
      .finally(() => setLoading(false))
  }, [id])

  // Canvas drawing
  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    drawing.current = true
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return
    e.preventDefault()
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.strokeStyle = '#38bdf8'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    const pos = getPos(e, canvas)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    setHasSig(true)
  }

  const stopDraw = () => { drawing.current = false }

  const clearSig = () => {
    const canvas = canvasRef.current!
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
    setHasSig(false)
  }

  const submit = async (action: 'signed' | 'declined') => {
    if (action === 'signed' && (!name.trim() || !hasSig)) return
    setSubmitting(true)
    const signatureData = action === 'signed' ? canvasRef.current!.toDataURL() : undefined
    const res = await fetch(`/api/contracts/${id}/sign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, signedByName: name, signedByTitle: title, signatureData }),
    })
    const data = await res.json()
    if (data.error) { alert(data.error); setSubmitting(false); return }
    setDone(action)
    setSubmitting(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-red-400 text-sm">{error}</div>
  )

  if (done) return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-sm">
        {done === 'signed'
          ? <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
          : <XCircle className="w-16 h-16 text-red-400 mx-auto" />}
        <h2 className="text-xl font-bold text-white">
          {done === 'signed' ? 'Agreement Signed' : 'Agreement Declined'}
        </h2>
        <p className="text-sm text-white/50">
          {done === 'signed'
            ? 'Thank you. Your signature has been recorded and the agreement is now in effect.'
            : 'You have declined this agreement. Please contact us if you have any questions.'}
        </p>
        <p className="text-xs text-white/30">cayceedevelopers@gmail.com · +254 741 481 008</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0d0d14] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <span className="text-xs font-black">CD</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Caycee Developers</p>
            <p className="text-xs text-white/40">Contract for Signature</p>
          </div>
        </div>
        <span className="text-xs text-white/30 hidden sm:block">{contract?.reference}</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Contract body */}
        <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-xl">
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: contract?.body || '' }}
          />
        </div>

        {/* Signature section */}
        <div className="bg-[#0d0d14] border border-white/[0.08] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 text-white font-semibold">
            <PenLine className="w-4 h-4 text-sky-400" />
            Sign this Agreement
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 uppercase tracking-wider">Full Name *</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={contract?.clientRepName || "Your full name"}
                className="w-full h-10 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-white/50 uppercase tracking-wider">Title / Position</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. CEO, Director"
                className="w-full h-10 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-white/50 uppercase tracking-wider">Draw Signature *</label>
              <button onClick={clearSig} className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-all">
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            </div>
            <canvas
              ref={canvasRef}
              width={600}
              height={140}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
              className="w-full h-36 bg-white/[0.03] border border-white/[0.08] rounded-xl cursor-crosshair touch-none"
            />
            {!hasSig && <p className="text-xs text-white/30">Draw your signature above</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => submit('signed')}
              disabled={submitting || !name.trim() || !hasSig}
              className="flex-1 h-11 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {submitting ? 'Submitting…' : 'Sign & Accept Agreement'}
            </button>
            <button
              onClick={() => submit('declined')}
              disabled={submitting}
              className="sm:w-40 h-11 border border-red-500/30 text-red-400 hover:bg-red-500/10 disabled:opacity-40 font-medium rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Decline
            </button>
          </div>
          <p className="text-xs text-white/25 text-center">
            By signing, you agree to be legally bound by the terms of this agreement. Your IP address and timestamp will be recorded.
          </p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

type DrawerProps = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        ref={ref}
        className={`fixed right-0 top-0 h-full w-full max-w-lg bg-[#0d0d14] border-l border-white/[0.08] z-50 flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0">
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  )
}

type FieldProps = {
  label: string
  children: React.ReactNode
}

export function Field({ label, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-white/50 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "w-full h-10 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
const selectCls = `${inputCls} cursor-pointer`

export function AdminInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />
}

export function AdminSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`${selectCls} ${props.className ?? ""}`}>
      {props.children}
    </select>
  )
}

export function AdminTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all resize-none ${props.className ?? ""}`}
    />
  )
}

export function Btn({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "outline"
  size?: "sm" | "md"
}) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
  const sizes = { sm: "h-8 px-3 text-xs gap-1.5", md: "h-10 px-4 text-sm gap-2" }
  const variants = {
    primary: "bg-sky-500 hover:bg-sky-400 text-white",
    ghost: "text-white/50 hover:text-white hover:bg-white/[0.06] border border-transparent",
    danger: "text-white/50 hover:text-red-400 hover:bg-red-500/10 border border-transparent",
    outline: "border border-white/[0.08] text-white/60 hover:text-white hover:border-white/20 bg-transparent",
  }
  return <button {...props} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} />
}

export function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    "in-progress": "bg-sky-500/15 text-sky-400 border-sky-500/20",
    sent: "bg-sky-500/15 text-sky-400 border-sky-500/20",
    partial: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    "on-hold": "bg-amber-500/15 text-amber-400 border-amber-500/20",
    overdue: "bg-red-500/15 text-red-400 border-red-500/20",
    draft: "bg-white/[0.06] text-white/40 border-white/[0.08]",
    pending: "bg-white/[0.06] text-white/40 border-white/[0.08]",
    invoice: "bg-sky-500/15 text-sky-400 border-sky-500/20",
    quotation: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    signed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    declined: "bg-red-500/15 text-red-400 border-red-500/20",
    failed: "bg-red-500/15 text-red-400 border-red-500/20",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  }
  const cls = map[status?.toLowerCase()] ?? "bg-white/[0.06] text-white/40 border-white/[0.08]"
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${cls}`}>
      {status}
    </span>
  )
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-white/40 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0d0d14] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">{children}</table>
      </div>
    </div>
  )
}

export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-[11px] font-semibold text-white/30 uppercase tracking-wider border-b border-white/[0.06]">
      {children}
    </th>
  )
}

export function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3.5 text-sm text-white/70 ${className}`}>{children}</td>
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react"

export default function AdminLogin() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    await new Promise(r => setTimeout(r, 400))
    if (code === "33868960") {
      localStorage.setItem("adminAuth", "true")
      await fetch('/api/admin/activity-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', userEmail: 'admin', status: 'success', timestamp: new Date() })
      }).catch(() => {})
      router.push("/admin/dashboard")
    } else {
      setError("Invalid access code")
      setLoading(false)
      await fetch('/api/admin/activity-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', userEmail: 'admin', status: 'failed', timestamp: new Date() })
      }).catch(() => {})
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-sky-500 rounded-xl mx-auto flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Portal</h1>
          <p className="text-sm text-white/40 mt-1">Caycee Developers</p>
        </div>

        {/* Card */}
        <div className="bg-[#0d0d14] border border-white/[0.08] rounded-2xl p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Access Code</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  placeholder="Enter your access code"
                  className="w-full h-11 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 pr-11 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-colors"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          Caycee Developers © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}

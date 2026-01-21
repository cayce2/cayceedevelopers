"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLogin() {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code === "33868960") {
      localStorage.setItem("adminAuth", "true")
      await fetch('/api/admin/activity-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', userEmail: 'admin', status: 'success', timestamp: new Date() })
      })
      router.push("/admin/dashboard")
    } else {
      setError("Invalid access code")
      await fetch('/api/admin/activity-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', userEmail: 'admin', status: 'failed', timestamp: new Date() })
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background tech-grid relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10"></div>
      <div className="relative max-w-md w-full mx-4">
        <div className="bg-card/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-8 border border-border">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center mb-4 animate-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary">Admin Portal</h2>
            <p className="text-muted-foreground text-sm">Enter your access code to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Access Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
              />
              {error && <p className="text-destructive text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>}
            </div>
            <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200">Access Dashboard</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

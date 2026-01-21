/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Monitor, Globe, Smartphone, TrendingUp, MapPin, Clock } from "lucide-react"

export default function AnalyticsPage() {
  const [devices, setDevices] = useState<any[]>([])
  const [browsers, setBrowsers] = useState<any[]>([])
  const [locations, setLocations] = useState<any[]>([])
  const [os, setOs] = useState<any[]>([])

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/admin/analytics?type=devices').then(r => r.json()).then(setDevices)
      fetch('/api/admin/analytics?type=browsers').then(r => r.json()).then(setBrowsers)
      fetch('/api/admin/analytics?type=locations').then(r => r.json()).then(setLocations)
      fetch('/api/admin/analytics?type=os').then(r => r.json()).then(setOs)
    }
    
    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const StatCard = ({ title, data, icon: Icon }: any) => (
    <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="space-y-3">
        {data.map((item: any, i: number) => {
          const total = data.reduce((sum: number, d: any) => sum + d.count, 0)
          const percent = ((item.count / total) * 100).toFixed(1)
          return (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item._id || 'Unknown'}</span>
                <span className="text-muted-foreground">{item.count} ({percent}%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${percent}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-primary mb-2">Analytics</h1>
        <p className="text-muted-foreground">Real-time user behavior and system usage insights (Last 30 days)</p>
      </div>

      <div className="mb-6">
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Active Devices</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium">Device</th>
                  <th className="text-left py-3 px-2 text-sm font-medium">IP Address</th>
                  <th className="text-left py-3 px-2 text-sm font-medium">Browser</th>
                  <th className="text-left py-3 px-2 text-sm font-medium">OS</th>
                  <th className="text-left py-3 px-2 text-sm font-medium">Location</th>
                  <th className="text-left py-3 px-2 text-sm font-medium">Visits</th>
                  <th className="text-left py-3 px-2 text-sm font-medium">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device: any, i: number) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-2 text-sm">{device._id?.device || 'Unknown'}</td>
                    <td className="py-3 px-2 text-sm font-mono text-xs">{device._id?.ip || 'N/A'}</td>
                    <td className="py-3 px-2 text-sm">{device._id?.browser || 'Unknown'}</td>
                    <td className="py-3 px-2 text-sm">{device._id?.os || 'Unknown'}</td>
                    <td className="py-3 px-2 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {device.location?.city && device.location?.country 
                          ? `${device.location.city}, ${device.location.country}`
                          : device.location?.country || 'Unknown'}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm font-semibold">{device.count}</td>
                    <td className="py-3 px-2 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(device.lastSeen).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard title="Browsers" data={browsers} icon={Monitor} />
        <StatCard title="Operating Systems" data={os} icon={TrendingUp} />
        <StatCard title="Top Locations" data={locations} icon={Globe} />
      </div>
    </div>
  )
}

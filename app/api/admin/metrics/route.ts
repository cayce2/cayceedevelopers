import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import SystemMetric from '@/models/SystemMetric'
import ActivityLog from '@/models/ActivityLog'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  
  if (type === 'summary') {
    const now = new Date()
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const [totalLogs, logs24h, logs7d, uniqueIPs, topActions] = await Promise.all([
      ActivityLog.countDocuments(),
      ActivityLog.countDocuments({ timestamp: { $gte: last24h } }),
      ActivityLog.countDocuments({ timestamp: { $gte: last7d } }),
      ActivityLog.distinct('ip'),
      ActivityLog.aggregate([
        { $group: { _id: '$action', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ])
    ])
    
    return NextResponse.json({
      totalLogs,
      logs24h,
      logs7d,
      uniqueIPs: uniqueIPs.length,
      topActions
    })
  }
  
  const metrics = await SystemMetric.find({ type }).sort({ timestamp: -1 }).limit(100)
  return NextResponse.json(metrics)
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const metric = await SystemMetric.create(body)
  return NextResponse.json(metric)
}

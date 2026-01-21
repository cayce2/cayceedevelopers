import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ActivityLog from '@/models/ActivityLog'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  
  const now = new Date()
  const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  if (type === 'devices') {
    const devices = await ActivityLog.aggregate([
      { $match: { timestamp: { $gte: last30d } } },
      { $sort: { timestamp: -1 } },
      { $group: { 
        _id: { device: '$device', ip: '$ip', browser: '$browser', os: '$os' },
        count: { $sum: 1 },
        lastSeen: { $first: '$timestamp' },
        userAgent: { $first: '$userAgent' },
        location: { $first: '$location' }
      }},
      { $sort: { count: -1 } },
      { $limit: 50 }
    ])
    return NextResponse.json(devices)
  }
  
  if (type === 'browsers') {
    const browsers = await ActivityLog.aggregate([
      { $match: { timestamp: { $gte: last30d } } },
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    return NextResponse.json(browsers)
  }
  
  if (type === 'locations') {
    const locations = await ActivityLog.aggregate([
      { $match: { timestamp: { $gte: last30d } } },
      { $group: { _id: '$location.country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ])
    return NextResponse.json(locations)
  }
  
  if (type === 'os') {
    const os = await ActivityLog.aggregate([
      { $match: { timestamp: { $gte: last30d } } },
      { $group: { _id: '$os', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    return NextResponse.json(os)
  }
  
  return NextResponse.json([])
}

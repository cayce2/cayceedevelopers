import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ActivityLog from '@/models/ActivityLog'
import { parseUserAgent, getLocationFromIP } from '@/lib/tracking'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '50')
  const action = searchParams.get('action')
  const userId = searchParams.get('userId')
  
  const filter: any = {}
  if (action) filter.action = action
  if (userId) filter.userId = userId
  
  const logs = await ActivityLog.find(filter)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
  
  const total = await ActivityLog.countDocuments(filter)
  
  return NextResponse.json({ logs, total, page, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  const userAgent = req.headers.get('user-agent') || ''
  
  const { browser, os, device } = parseUserAgent(userAgent)
  const location = await getLocationFromIP(ip)
  
  const log = await ActivityLog.create({
    ...body,
    ip,
    userAgent,
    browser,
    os,
    device,
    location
  })
  
  return NextResponse.json(log)
}

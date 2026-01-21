import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import AuditLog from '@/models/AuditLog'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '50')
  const entity = searchParams.get('entity')
  
  const filter: Record<string, string> = {}
  if (entity) filter.entity = entity
  
  const logs = await AuditLog.find(filter)
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
  
  const total = await AuditLog.countDocuments(filter)
  
  return NextResponse.json({ logs, total, page, pages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  await connectDB()
  const body = await req.json()
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  
  const log = await AuditLog.create({ ...body, ip })
  
  return NextResponse.json(log)
}

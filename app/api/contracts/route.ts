import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Contract from '@/models/Contract'
import { logActivity, logAudit } from '@/lib/logger'

export async function GET() {
  await dbConnect()
  const contracts = await Contract.find({}).sort({ createdAt: -1 })
  return NextResponse.json(contracts)
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  data.updatedAt = new Date()
  const contract = await Contract.create(data)
  await logActivity('create', { entity: 'Contract', entityId: contract._id, title: data.title }, request)
  await logAudit('Contract', contract._id.toString(), 'CREATE', { before: null, after: contract }, 'admin', request)
  return NextResponse.json(contract)
}

export async function PUT(request: Request) {
  await dbConnect()
  const { id, ...data } = await request.json()
  data.updatedAt = new Date()
  const before = await Contract.findById(id)
  const contract = await Contract.findByIdAndUpdate(id, data, { new: true })
  await logActivity('update', { entity: 'Contract', entityId: id, title: data.title }, request)
  await logAudit('Contract', id, 'UPDATE', { before, after: contract }, 'admin', request)
  return NextResponse.json(contract)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const before = await Contract.findById(id)
  await Contract.findByIdAndDelete(id)
  await logActivity('delete', { entity: 'Contract', entityId: id }, request)
  await logAudit('Contract', id!, 'DELETE', { before, after: null }, 'admin', request)
  return NextResponse.json({ success: true })
}

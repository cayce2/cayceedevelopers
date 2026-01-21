import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Client from '@/models/Client'
import { logActivity, logAudit } from '@/lib/logger'

export async function GET() {
  await dbConnect()
  const clients = await Client.find({})
  return NextResponse.json(clients)
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  const client = await Client.create(data)
  await logActivity('create', { entity: 'Client', entityId: client._id, userEmail: data.email }, request)
  await logAudit('Client', client._id.toString(), 'CREATE', { before: null, after: client }, data.email || 'admin', request)
  return NextResponse.json(client)
}

export async function PUT(request: Request) {
  await dbConnect()
  const { id, ...data } = await request.json()
  const before = await Client.findById(id)
  const client = await Client.findByIdAndUpdate(id, data, { new: true })
  await logActivity('update', { entity: 'Client', entityId: id, userEmail: data.email }, request)
  await logAudit('Client', id, 'UPDATE', { before, after: client }, data.email || 'admin', request)
  return NextResponse.json(client)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const before = await Client.findById(id)
  await Client.findByIdAndDelete(id)
  await logActivity('delete', { entity: 'Client', entityId: id }, request)
  await logAudit('Client', id!, 'DELETE', { before, after: null }, 'admin', request)
  return NextResponse.json({ success: true })
}

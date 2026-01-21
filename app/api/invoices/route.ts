import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Invoice from '@/models/Invoice'
import { logActivity, logAudit } from '@/lib/logger'

export async function GET() {
  await dbConnect()
  const invoices = await Invoice.find({})
  return NextResponse.json(invoices)
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  const invoice = await Invoice.create(data)
  await logActivity('create', { entity: 'Invoice', entityId: invoice._id, amount: data.amount }, request)
  await logAudit('Invoice', invoice._id.toString(), 'CREATE', { before: null, after: invoice }, 'admin', request)
  return NextResponse.json(invoice)
}

export async function PUT(request: Request) {
  await dbConnect()
  const { id, ...data } = await request.json()
  const before = await Invoice.findById(id)
  const invoice = await Invoice.findByIdAndUpdate(id, data, { new: true })
  await logActivity('update', { entity: 'Invoice', entityId: id, amount: data.amount }, request)
  await logAudit('Invoice', id, 'UPDATE', { before, after: invoice }, 'admin', request)
  return NextResponse.json(invoice)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const before = await Invoice.findById(id)
  await Invoice.findByIdAndDelete(id)
  await logActivity('delete', { entity: 'Invoice', entityId: id }, request)
  await logAudit('Invoice', id!, 'DELETE', { before, after: null }, 'admin', request)
  return NextResponse.json({ success: true })
}

import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Invoice from '@/models/Invoice'

export async function GET() {
  await dbConnect()
  const invoices = await Invoice.find({})
  return NextResponse.json(invoices)
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  const invoice = await Invoice.create(data)
  return NextResponse.json(invoice)
}

export async function PUT(request: Request) {
  await dbConnect()
  const { id, ...data } = await request.json()
  const invoice = await Invoice.findByIdAndUpdate(id, data, { new: true })
  return NextResponse.json(invoice)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  await Invoice.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}

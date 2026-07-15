import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Contract from '@/models/Contract'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params
  const contract = await Contract.findById(id)
  if (!contract) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(contract)
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const { id } = await params
  const { action, signedByName, signedByTitle, signatureData } = await request.json()
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  if (!['signed', 'declined'].includes(action)) {
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  }

  const contract = await Contract.findById(id)
  if (!contract) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (contract.status === 'signed' || contract.status === 'declined') {
    return NextResponse.json({ error: 'Already actioned' }, { status: 409 })
  }

  const update: Record<string, unknown> = {
    status: action,
    signedAt: new Date(),
    clientIp: ip,
  }
  if (action === 'signed') {
    update.signedByName = signedByName
    update.signedByTitle = signedByTitle
    update.signatureData = signatureData
  }

  const updated = await Contract.findByIdAndUpdate(id, update, { new: true })
  return NextResponse.json(updated)
}

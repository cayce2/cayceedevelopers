import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Client from '@/models/Client'

export async function GET() {
  await dbConnect()
  const clients = await Client.find({})
  return NextResponse.json(clients)
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  const client = await Client.create(data)
  return NextResponse.json(client)
}

export async function PUT(request: Request) {
  await dbConnect()
  const { id, ...data } = await request.json()
  const client = await Client.findByIdAndUpdate(id, data, { new: true })
  return NextResponse.json(client)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  await Client.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}

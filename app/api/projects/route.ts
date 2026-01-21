import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

export async function GET() {
  await dbConnect()
  const projects = await Project.find({})
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  const project = await Project.create(data)
  return NextResponse.json(project)
}

export async function PUT(request: Request) {
  await dbConnect()
  const { id, ...data } = await request.json()
  const project = await Project.findByIdAndUpdate(id, data, { new: true })
  return NextResponse.json(project)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  await Project.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}

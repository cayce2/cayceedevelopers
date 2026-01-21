import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'
import { logActivity, logAudit } from '@/lib/logger'

export async function GET() {
  await dbConnect()
  const projects = await Project.find({})
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  const project = await Project.create(data)
  await logActivity('create', { entity: 'Project', entityId: project._id, projectName: data.name }, request)
  await logAudit('Project', project._id.toString(), 'CREATE', { before: null, after: project }, 'admin', request)
  return NextResponse.json(project)
}

export async function PUT(request: Request) {
  await dbConnect()
  const { id, ...data } = await request.json()
  const before = await Project.findById(id)
  const project = await Project.findByIdAndUpdate(id, data, { new: true })
  await logActivity('update', { entity: 'Project', entityId: id, projectName: data.name }, request)
  await logAudit('Project', id, 'UPDATE', { before, after: project }, 'admin', request)
  return NextResponse.json(project)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const before = await Project.findById(id)
  await Project.findByIdAndDelete(id)
  await logActivity('delete', { entity: 'Project', entityId: id }, request)
  await logAudit('Project', id!, 'DELETE', { before, after: null }, 'admin', request)
  return NextResponse.json({ success: true })
}

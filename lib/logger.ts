import dbConnect from '@/lib/mongodb'
import ActivityLog from '@/models/ActivityLog'
import AuditLog from '@/models/AuditLog'
import { parseUserAgent, getLocationFromIP } from '@/lib/tracking'

export async function logActivity(action: string, details: Record<string, unknown>, req: Request) {
  try {
    await dbConnect()
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''
    const { browser, os, device } = parseUserAgent(userAgent)
    const location = await getLocationFromIP(ip)
    await ActivityLog.create({ action, ...details, ip, userAgent, browser, os, device, location, timestamp: new Date(), status: 'success' })
  } catch (e) { console.error('Log failed:', e) }
}

export async function logAudit(entity: string, entityId: string, action: string, changes: Record<string, unknown>, userEmail: string, req: Request) {
  try {
    await dbConnect()
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    await AuditLog.create({ entity, entityId, action, changes, userEmail, ip, timestamp: new Date() })
  } catch (e) { console.error('Audit failed:', e) }
}

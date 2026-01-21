export async function logActivity(action: string, details: Record<string, unknown>, req: Request) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/activity-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'user-agent': req.headers.get('user-agent') || '', 'x-forwarded-for': req.headers.get('x-forwarded-for') || '' },
      body: JSON.stringify({ action, ...details, timestamp: new Date(), status: 'success' })
    })
  } catch (e) { console.error('Log failed:', e) }
}

export async function logAudit(entity: string, entityId: string, action: string, changes: Record<string, unknown>, userEmail: string, req: Request) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/audit-logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': req.headers.get('x-forwarded-for') || '' },
      body: JSON.stringify({ entity, entityId, action, changes, userEmail, timestamp: new Date() })
    })
  } catch (e) { console.error('Audit failed:', e) }
}

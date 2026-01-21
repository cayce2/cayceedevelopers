import mongoose from 'mongoose'

const AuditLogSchema = new mongoose.Schema({
  userId: String,
  userEmail: String,
  action: { type: String, required: true },
  entity: { type: String, required: true },
  entityId: String,
  changes: {
    before: mongoose.Schema.Types.Mixed,
    after: mongoose.Schema.Types.Mixed
  },
  metadata: mongoose.Schema.Types.Mixed,
  ip: String,
  timestamp: { type: Date, default: Date.now }
})

AuditLogSchema.index({ timestamp: -1 })
AuditLogSchema.index({ entity: 1 })

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema)

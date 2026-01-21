import mongoose from 'mongoose'

const ActivityLogSchema = new mongoose.Schema({
  userId: String,
  userEmail: String,
  action: { type: String, required: true },
  resource: String,
  resourceId: String,
  details: mongoose.Schema.Types.Mixed,
  ip: String,
  userAgent: String,
  device: String,
  browser: String,
  os: String,
  location: {
    country: String,
    city: String,
    region: String,
    timezone: String
  },
  status: { type: String, enum: ['success', 'failed', 'warning'], default: 'success' },
  timestamp: { type: Date, default: Date.now }
})

ActivityLogSchema.index({ timestamp: -1 })
ActivityLogSchema.index({ userId: 1 })
ActivityLogSchema.index({ action: 1 })

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema)

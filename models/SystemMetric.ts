import mongoose from 'mongoose'

const SystemMetricSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: mongoose.Schema.Types.Mixed,
  metadata: mongoose.Schema.Types.Mixed,
  timestamp: { type: Date, default: Date.now }
})

SystemMetricSchema.index({ timestamp: -1 })
SystemMetricSchema.index({ type: 1 })

export default mongoose.models.SystemMetric || mongoose.model('SystemMetric', SystemMetricSchema)

import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  budget: { type: Number, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)

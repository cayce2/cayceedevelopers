import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  country: { type: String, required: true },
  currency: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Client || mongoose.model('Client', ClientSchema)

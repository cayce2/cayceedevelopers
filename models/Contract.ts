import mongoose from 'mongoose'

const ContractSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  clientId: { type: String, required: true },
  projectId: { type: String },
  effectiveDate: { type: String, required: true },
  termYears: { type: Number, default: 3 },
  // Parties
  clientName: { type: String, required: true },
  clientRepName: { type: String },
  clientRepTitle: { type: String },
  clientEmail: { type: String },
  // Financials
  currency: { type: String, default: 'KES' },
  contractValue: { type: Number, default: 0 },
  depositPercent: { type: Number, default: 25 },
  // Content sections (editable rich text)
  scopeOfServices: { type: String },
  paymentTermsNotes: { type: String },
  additionalClauses: { type: String },
  // Full generated body (HTML/text)
  body: { type: String },
  status: { type: String, default: 'draft' }, // draft | sent | signed | declined
  // Signing
  signedAt: { type: Date },
  signedByName: { type: String },
  signedByTitle: { type: String },
  signatureData: { type: String }, // base64 drawn signature
  clientIp: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.Contract || mongoose.model('Contract', ContractSchema)

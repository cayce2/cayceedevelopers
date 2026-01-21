import mongoose from 'mongoose'

const InvoiceSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  type: { type: String, required: true },
  number: { type: String, required: true },
  date: { type: String, required: true },
  dueDate: { type: String, required: true },
  items: [{ 
    description: String, 
    quantity: Number, 
    rate: Number 
  }],
  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  notes: { type: String },
  status: { type: String, required: true },
  currency: { type: String, default: 'USD' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema)

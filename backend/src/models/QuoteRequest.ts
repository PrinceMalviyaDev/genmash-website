import mongoose, { Schema, Document } from 'mongoose';

export interface IQuoteRequest extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  projectSubtype: string;
  budgetRange: string;
  timeline: string;
  description: string;
  referenceLinks: string;
  attachment: string;
  ndaRequired: boolean;
  source: string;
  status: 'new' | 'in_review' | 'quoted' | 'won' | 'lost';
  notes: string;
}

const quoteRequestSchema = new Schema<IQuoteRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, default: '' },
    projectType: { type: String, required: true },
    projectSubtype: { type: String, default: '' },
    budgetRange: { type: String, required: true },
    timeline: { type: String, required: true },
    description: { type: String, required: true },
    referenceLinks: { type: String, default: '' },
    attachment: { type: String, default: '' },
    ndaRequired: { type: Boolean, default: false },
    source: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'in_review', 'quoted', 'won', 'lost'],
      default: 'new',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

quoteRequestSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model<IQuoteRequest>('QuoteRequest', quoteRequestSchema);

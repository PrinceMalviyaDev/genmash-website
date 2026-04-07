import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  jobPosting: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  portfolioUrl: string;
  resume: string;
  coverLetter: string;
  status: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  notes: string;
}

const applicationSchema = new Schema<IApplication>(
  {
    jobPosting: { type: Schema.Types.ObjectId, ref: 'JobPosting', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    role: { type: String, required: true },
    experience: { type: String, default: '' },
    portfolioUrl: { type: String, default: '' },
    resume: { type: String, default: '' },
    coverLetter: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'],
      default: 'new',
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

applicationSchema.index({ jobPosting: 1 });
applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });

export default mongoose.model<IApplication>('Application', applicationSchema);

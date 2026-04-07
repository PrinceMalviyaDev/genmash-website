import mongoose, { Schema, Document } from 'mongoose';
import slugifyLib from 'slugify';

export interface IJobPosting extends Document {
  title: string;
  slug: string;
  department: string;
  location: 'remote' | 'indore' | 'hybrid';
  experienceLevel: string;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  perks: string[];
  isActive: boolean;
  postedAt: Date;
}

const jobPostingSchema = new Schema<IJobPosting>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    department: { type: String, required: true },
    location: { type: String, enum: ['remote', 'indore', 'hybrid'], required: true },
    experienceLevel: { type: String, required: true },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      required: true,
    },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    responsibilities: [{ type: String }],
    perks: [{ type: String }],
    isActive: { type: Boolean, default: true },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

jobPostingSchema.index({ isActive: 1 });

jobPostingSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugifyLib(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model<IJobPosting>('JobPosting', jobPostingSchema);

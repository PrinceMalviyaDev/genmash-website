import mongoose, { Schema, Document } from 'mongoose';
import slugifyLib from 'slugify';

export interface IService extends Document {
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  process: { step: number; title: string; description: string }[];
  timeline: string;
  startingPrice: string;
  faqs: { question: string; answer: string }[];
  isActive: boolean;
  order: number;
}

const serviceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    icon: { type: String, default: '' },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    technologies: [{ type: String }],
    process: [{ step: Number, title: String, description: String }],
    timeline: { type: String, default: '' },
    startingPrice: { type: String, default: '' },
    faqs: [{ question: String, answer: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

serviceSchema.index({ isActive: 1, order: 1 });

serviceSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugifyLib(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model<IService>('Service', serviceSchema);

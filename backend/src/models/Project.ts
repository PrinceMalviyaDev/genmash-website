import mongoose, { Schema, Document } from 'mongoose';
import slugifyLib from 'slugify';

export interface IProject extends Document {
  title: string;
  slug: string;
  clientName: string;
  projectType: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  isVisible: boolean;
  isFeatured: boolean;
  order: number;
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    features: string[];
    architecture: string;
    screenshots: string[];
    results: string;
    metrics: { label: string; value: string }[];
    liveUrl: string;
    clientTestimonial: string;
  };
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    clientName: { type: String, required: true },
    projectType: {
      type: String,
      enum: ['web', 'mobile', 'ai', 'automation', 'game', 'desktop'],
      required: true,
    },
    description: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    technologies: [{ type: String }],
    isVisible: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    caseStudy: {
      overview: String,
      problem: String,
      solution: String,
      features: [String],
      architecture: String,
      screenshots: [String],
      results: String,
      metrics: [{ label: String, value: String }],
      liveUrl: String,
      clientTestimonial: String,
    },
  },
  { timestamps: true }
);

projectSchema.index({ projectType: 1 });
projectSchema.index({ isFeatured: 1, order: 1 });

projectSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugifyLib(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model<IProject>('Project', projectSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  company: string;
  companyLogo: string;
  designation: string;
  photo: string;
  review: string;
  rating: number;
  projectType: string;
  videoUrl: string;
  isFeatured: boolean;
  isVisible: boolean;
  date: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    company: { type: String, required: true },
    companyLogo: { type: String, default: '' },
    designation: { type: String, default: '' },
    photo: { type: String, default: '' },
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    projectType: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

testimonialSchema.index({ isFeatured: 1 });
testimonialSchema.index({ isVisible: 1 });

export default mongoose.model<ITestimonial>('Testimonial', testimonialSchema);

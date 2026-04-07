import mongoose, { Schema, Document } from 'mongoose';

export interface IPricingPlan extends Document {
  name: string;
  icon: string;
  targetAudience: string;
  startingPrice: string;
  features: { text: string; included: boolean }[];
  timeline: string;
  isPopular: boolean;
  isActive: boolean;
  order: number;
}

const pricingPlanSchema = new Schema<IPricingPlan>(
  {
    name: { type: String, required: true },
    icon: { type: String, default: '' },
    targetAudience: { type: String, required: true },
    startingPrice: { type: String, required: true },
    features: [{ text: { type: String }, included: { type: Boolean, default: true } }],
    timeline: { type: String, default: '' },
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

pricingPlanSchema.index({ isActive: 1, order: 1 });

export default mongoose.model<IPricingPlan>('PricingPlan', pricingPlanSchema);

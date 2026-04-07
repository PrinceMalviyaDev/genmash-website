import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt: Date;
}

const subscriberSchema = new Schema<ISubscriber>({
  email: { type: String, required: true, unique: true, lowercase: true },
  isActive: { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now },
  unsubscribedAt: { type: Date },
});

subscriberSchema.index({ email: 1 });
subscriberSchema.index({ isActive: 1 });

export default mongoose.model<ISubscriber>('Subscriber', subscriberSchema);

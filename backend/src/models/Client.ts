import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  logo: string;
  industry: string;
  projectType: string;
  linkedProject: mongoose.Types.ObjectId;
  isVisible: boolean;
  order: number;
}

const clientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    logo: { type: String, default: '' },
    industry: { type: String, default: '' },
    projectType: { type: String, default: '' },
    linkedProject: { type: Schema.Types.ObjectId, ref: 'Project' },
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

clientSchema.index({ isVisible: 1, order: 1 });

export default mongoose.model<IClient>('Client', clientSchema);

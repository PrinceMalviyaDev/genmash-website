import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  filename: string;
  url: string;
  publicId: string;
  type: 'image' | 'document' | 'video';
  size: number;
  uploadedBy: mongoose.Types.ObjectId;
}

const mediaSchema = new Schema<IMedia>(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    type: { type: String, enum: ['image', 'document', 'video'], required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

mediaSchema.index({ type: 1, createdAt: -1 });

export default mongoose.model<IMedia>('Media', mediaSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  photo: string;
  bio: string;
  linkedin: string;
  github: string;
  order: number;
  isVisible: boolean;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    photo: { type: String, default: '' },
    bio: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

teamMemberSchema.index({ isVisible: 1, order: 1 });

export default mongoose.model<ITeamMember>('TeamMember', teamMemberSchema);

import mongoose, { Schema, Document } from 'mongoose';
import slugifyLib from 'slugify';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: { name: string; avatar: string; bio: string };
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  publishedAt: Date;
  scheduledAt: Date;
  readTime: number;
  views: number;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, default: '' },
    author: {
      name: { type: String, required: true },
      avatar: { type: String, default: '' },
      bio: { type: String, default: '' },
    },
    category: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
    publishedAt: { type: Date },
    scheduledAt: { type: Date },
    readTime: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ tags: 1 });

blogPostSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugifyLib(this.title, { lower: true, strict: true });
  }
  if (this.isModified('content')) {
    const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export default mongoose.model<IBlogPost>('BlogPost', blogPostSchema);

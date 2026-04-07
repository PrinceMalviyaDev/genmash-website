import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  googleMapsEmbed: string;
  socialLinks: { linkedin: string; github: string; twitter: string; instagram: string };
  seo: { defaultTitle: string; defaultDescription: string; ogImage: string };
  officeHours: string;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: { type: String, default: 'GenMash Software Solutions' },
    tagline: { type: String, default: 'Transforming Ideas into Digital Reality' },
    email: { type: String, default: 'contact@genmash.com' },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    address: { type: String, default: 'Indore, Madhya Pradesh, India' },
    googleMapsEmbed: { type: String, default: '' },
    socialLinks: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    seo: {
      defaultTitle: { type: String, default: 'GenMash Software Solutions' },
      defaultDescription: { type: String, default: '' },
      ogImage: { type: String, default: '' },
    },
    officeHours: { type: String, default: 'Mon-Fri, 10:00 AM - 7:00 PM IST' },
  },
  { timestamps: true }
);

export default mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);

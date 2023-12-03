import mongoose, { Schema } from 'mongoose';

const crawledPageSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  header_one: { type: [String] },
  header_two: { type: [String] },
  links: { type: [String] },
  createdAt: { type: Date, default: Date.now },
}, { collection: 'Page' });

export default mongoose.model('Page', crawledPageSchema);

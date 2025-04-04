import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  keyword: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true }
});

export const Article = mongoose.model('Article', articleSchema);

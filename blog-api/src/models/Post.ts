import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    keyword: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true }  // Trường để lưu đường dẫn hình ảnh                        // tác giả
})

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

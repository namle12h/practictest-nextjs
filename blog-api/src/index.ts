import express from 'express';
import mongoose from 'mongoose';
import articleRoutes from './routes/articles';

const app = express();
app.use(express.json());

// Thêm route cho đường dẫn gốc "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API!');
});

// Sử dụng routes cho các API bài viết
app.use(articleRoutes);

// Kết nối MongoDB và khởi động server
mongoose.connect('mongodb://localhost:27017/blog')
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(8080, () => {
      console.log("Server is running at http://localhost:8080");
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });

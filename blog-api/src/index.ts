

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import articleRoutes from './routes/articles';
import postRoutes from './routes/posticles';
import path from 'path';



const app = express();
const PORT = 8080;


app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  credentials: true  
}));



app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Thêm route cho đường dẫn gốc "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Blog API!');
});

// Đăng ký các route cho bài viết
app.use('/api/v1/articles', articleRoutes); // Đảm bảo đăng ký đúng
app.use('/api/v1/posts', postRoutes);

// Kết nối MongoDB và khởi động server
mongoose.connect('mongodb://localhost:27017/blog')
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err);
  });



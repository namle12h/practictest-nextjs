

import { Router } from 'express';
import { Article } from '../models/Article';

const router = Router();

// Lấy tất cả bài viết
router.get('/', async (req, res) => {  
  const articles = await Article.find();
  res.json({ message: 'Success', data: articles });
});

// Lấy chi tiết bài viết
router.get('/:id', async (req, res) => {  
  const article = await Article.findById(req.params.id);
  res.json({ message: 'Success', data: article });
});

// Thêm bài viết mới
router.post('/', async (req, res) => {  
  const newArticle = new Article(req.body);
  await newArticle.save();
  res.json({ message: 'Success', data: newArticle });
});

export default router;

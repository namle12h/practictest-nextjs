import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { Post } from '../models/Post';

// Cấu hình multer để lưu trữ file
const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, 'src/uploads/');  // Thư mục lưu trữ ảnh
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Tên file duy nhất
    }
});

// Bộ lọc file cho ảnh (jpeg, jpg, png)
const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Cấu hình multer cho việc upload file
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }  // Giới hạn dung lượng file tối đa là 10MB
});

const router = Router();

router.post('/', upload.single('image'), async (req: Request, res: Response) => {
    try {
      const { title, keyword, description, content, date } = req.body;
      const image = req.file ? `http://localhost:8080/uploads/${req.file.filename}` : '';  // Thêm URL đầy đủ
  
      const newPost = new Post({
        title,
        keyword,
        description,
        content,
        date: new Date(date),
        image
      });
  
      await newPost.save();
  
      res.json({ message: 'Success', data: newPost });
    } catch (error: any) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Error creating post', error: error.message });
    }
  });
  

// GET để lấy tất cả bài đăng
router.get('/', async (req: Request, res: Response) => {
    try {
      const posts = await Post.find();  // Truy vấn tất cả bài đăng từ cơ sở dữ liệu
      res.json({ message: 'Success', data: posts });
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
  });

export default router;

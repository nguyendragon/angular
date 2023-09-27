import { Router } from 'express';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + file.originalname;
        cb(null, filename);
    },
    limits: {
        fileSize: 1 * 1024 * 1024,
    },
});

// Middleware để xử lý upload file
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), function (req, res) {
    // Thành công: trả về thông tin về file đã upload
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

export default router;

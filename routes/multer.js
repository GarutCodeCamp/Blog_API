const multer = require('multer');
const router = require('express').Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Image');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const upload = multer({ storage });

router.post('/image', upload.single('profile'), async (req, res) => {
    try {
        res.status(201).json(req.file);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;

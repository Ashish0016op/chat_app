const express=require('express');
const router=express.Router();
const chatControllers=require('../controllers/chat');
const AuthenticteMiddleware=require('../middleware/auth')
const multer = require('multer');
const path=require('path')
router.get('/userChat',AuthenticteMiddleware.Authentication,chatControllers.getChat);
router.post('/chatDetails',AuthenticteMiddleware.Authentication,chatControllers.postChat);
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
router.post('/upload', upload.single('profile'), AuthenticteMiddleware.Authentication, chatControllers.uploadData);
module.exports=router;
const express=require('express');
const router=express.Router();
const chatControllers=require('../controllers/chat');
const AuthenticteMiddleware=require('../middleware/auth')
router.get('/userChat',chatControllers.getChat);
router.post('/chatDetails',chatControllers.postChat);


module.exports=router;
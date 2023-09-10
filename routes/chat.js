const express=require('express');
const router=express.Router();
const chatControllers=require('../controllers/chat');
const AuthenticteMiddleware=require('../middleware/auth')
router.get('/userChat',AuthenticteMiddleware.Authentication,chatControllers.getChat);
router.post('/chatDetails',AuthenticteMiddleware.Authentication,chatControllers.postChat);


module.exports=router;
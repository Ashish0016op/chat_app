const express=require('express');
const router=express.Router();
const loginControllers=require('../controllers/login');
router.post('/loginData',loginControllers.LoginData);


module.exports=router;
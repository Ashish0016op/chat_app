const express=require('express');
const router=express.Router();
const signUpControllers=require('../controllers/signUp');
router.post('/signUp',signUpControllers.postSignUpDetails);
router.get('/getSignUpDetails',signUpControllers.getSignUpDetails);
module.exports=router;
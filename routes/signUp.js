const express=require('express');
const router=express.Router();
const signUpControllers=require('../controllers/signUp');
router.post('/signUp',signUpControllers.postSignUpDetails);
router.get('/getSignUpDetails',signUpControllers.getSignUpDetails);
router.get('/getUsersDetails',signUpControllers.getUsersName);
module.exports=router;
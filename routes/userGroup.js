const express=require('express');
const router=express.Router();
const loginControllers=require('../controllers/userGroup');
const middlewareAuthenticate=require('../middleware/auth');
router.delete('/deleteUser',middlewareAuthenticate.Authentication,loginControllers.getUserGroupDetails);


module.exports=router;
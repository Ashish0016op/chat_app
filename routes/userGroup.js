const express=require('express');
const router=express.Router();
const loginControllers=require('../controllers/userGroup');
router.get('/userGroupDetails',loginControllers.getUserGroupDetails);


module.exports=router;
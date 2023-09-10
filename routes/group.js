const express=require('express');
const router=express.Router();
const groupcontrollers=require('../controllers/group');
const AuthenticateMiddleware=require('../middleware/auth');
router.post('/group',AuthenticateMiddleware.Authentication, groupcontrollers.addGroup);
router.get('/get_group',AuthenticateMiddleware.Authentication,groupcontrollers.getGroup);
router.get('/get_groupName',AuthenticateMiddleware.Authentication,groupcontrollers.getGroupName);
router.post('/inviteUser',AuthenticateMiddleware.Authentication,groupcontrollers.joinUser);
module.exports=router;
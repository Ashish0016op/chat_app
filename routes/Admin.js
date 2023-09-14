const express=require('express');
const router=express.Router();
const AdminControllers=require('../controllers/Admin');
const middlewareAuth=require('../middleware/auth');
router.post('/AdminData',middlewareAuth.Authentication,AdminControllers.postAdminData);
router.get('/GetAdminData', middlewareAuth.Authentication, AdminControllers.getAdmin);

module.exports=router;
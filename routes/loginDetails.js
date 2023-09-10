const express=require('express');
const router=express.Router();
const loginDetails=require('../model/signUp');

router.get('/signUp',async(req,res,next)=>{
    try{
        const response= await loginDetails.findAll();
        res.status(200).json({signUpDetails:response});
    }catch(err){
        console.log(err);
    }
})
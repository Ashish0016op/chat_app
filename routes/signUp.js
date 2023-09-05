const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const signUpTable=require('../model/signUp');

router.post('/signUp',async (req,res,next)=>{
    try{
        const name=req.body.username;
        const email=req.body.email;
        const PhoneNumber=req.body.PhoneNumber;
        const Password=req.body.password;
        const saltRound=10;
        bcrypt.hash(Password,saltRound,async(err,hash)=>{
            if(err){
                console.log(err);
            }
            const response=await signUpTable.create({
                Username:name,
                Email:email,
                PhoneNumber:PhoneNumber,
                password:hash
            })
            res.status(200).json({signUpData:response});
        })
        
    }catch(error){
        console.log(error);
    }
})

module.exports=router;
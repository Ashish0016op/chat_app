const bcrypt=require('bcrypt');
const signUpTable=require('../model/signUp');
exports.postSignUpDetails=async(req,res,next)=>{
    try{
        const name=req.body.Username;
        const email=req.body.Email;
        const PhoneNumber=req.body.PhoneNumber;
        const Password=req.body.password;
        console.log(name,email,PhoneNumber,Password)
        const saltRound=10;
        bcrypt.hash(Password,saltRound,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                const response=await signUpTable.create({
                    Username:name,
                    Email:email,
                    PhoneNumber:PhoneNumber,
                    password:hash
                })
                res.status(200).json({signUpData:response});
            }
        })
        
    }catch(error){
        console.log(error);
    }
}
exports.getSignUpDetails=async(req,res,next)=>{
    try{
        const response=await signUpTable.findAll();
        res.status(200).json({signUpDetails:response});
    }catch(err){
        console.log(err);
    }
}
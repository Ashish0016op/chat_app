const loginDetails=require('../model/signUp');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
function generateAccessToken(id){
    return jwt.sign(id,process.env.TOKEN_SECRET);
}
exports.LoginData=async(req,res,next)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;
        const response=await loginDetails.findOne({where:{email}});
        if(!response){
            return res.status(401).json({error:'invalid credentials'})
        }
        const isPasswordValid=await bcrypt.compare(password,response.password);
        if(!isPasswordValid){
            return res.status(401).json({error:'invalid credentials'});
        }
        const token=generateAccessToken(response.id);
        const userId=response.id;
        const Username=response.Username;
        res.status(200).json({message:'login successful',token,userId,Username});

    }catch(err){
        console.log(err);
    }
}
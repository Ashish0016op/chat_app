const jwt=require('jsonwebtoken');

exports.Authentication=async(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        if(!token){
            return res.status(401).json({error:'unauthorized'});
        }
        const user=jwt.verify(token,process.env.TOKEN_SECRET);

        req.user=user;
    }catch(err){
        console.log(err);
    }
    next();
}
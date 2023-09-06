const chatTable=require('../model/chat');
const signUpDetails=require('../model/signUp');
exports.postChat=async(req,res,next)=>{
    try{
        const chat=req.body.Chat;
        const username=req.body.Username;
        const response=await chatTable.create({
            Chat:chat,
            Username:username
        })
        res.status(200).json({chatDetails:response});
    }catch(err){
        console.log(err);
    }
}
exports.getChat=async(req,res,next)=>{
    try{
        const userId=req.user;
        const response=await chatTable.findAll()
        res.status(200).json({chatDetails:response});
    }catch(err){
        console.log(err);
    }
}
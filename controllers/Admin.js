const AdminTable=require('../model/Admin');

exports.postAdminData=async(req,res,next)=>{
    try{
        const groupId=req.body.groupId;
        const userId=req.body.userId;
        const response=await AdminTable.create({
            userId:userId,
            groupId:groupId
        })
        res.status(200).json({AdminDetails:response});
    }catch(e){
        console.log(e);
    }
}
exports.getAdmin=async(req,res,next)=>{
    try{
        const gId=req.query.groupId;
        const uId=req.query.userId;
        const response = await AdminTable.findOne({
            where: {
              userId: uId,
              groupId: gId
            }
          });
        res.status(200).json({AdminId:response});
    }catch(e){
        console.log(e);
    }
}
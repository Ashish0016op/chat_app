const userGroupTable=require('../model/userGroup');
exports.getUserGroupDetails=async(req,res,next)=>{
    try{
        const userId=req.query.userId;
        const groupId=req.query.groupId;
        console.log(userId,groupId);
        const response=userGroupTable.destroy({
            where: {
                userId: userId,
                groupId: groupId
              }
        });
        res.status(200).json({userGroupDetails:response});
    }catch(e){
        console.log(e);
    }
}

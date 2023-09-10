const userGroupTable=require('../model/userGroup');
exports.getUserGroupDetails=async(req,res,next)=>{
    try{
        const response=userGroupTable.findAll();
        console.log(response);
        res.status(200).json({userGroupDetails:response});
    }catch(e){
        console.log(e);
    }
}
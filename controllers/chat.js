const chatTable=require('../model/chat');
const signUpDetails=require('../model/signUp');

const s3 = require('../s3'); // Import the configured S3 instance

exports.uploadData = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Handle the uploaded file, if needed

    res.status(200).json({ message: 'File uploaded successfully' });
};
exports.postChat=async(req,res,next)=>{
    try{
        const chat=req.body.Chat;
        const username=req.body.Username;
        const groupId=req.body.groupId;
        const userId=req.body.userId;
        const response=await chatTable.create({
            Chat:chat,
            Username:username,
            groupId:groupId,
            userId:userId
        })
        res.status(200).json({chatDetails:response});
    }catch(err){
        console.log(err);
    }
}
exports.getChat = async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const groupId = req.query.groupId;
        const response = await chatTable.findAll({
            where: {
                groupId: groupId
            }
        });
        res.status(200).json({ chatDetails: response });
    } catch (err) {
        console.log(err);
    }
}
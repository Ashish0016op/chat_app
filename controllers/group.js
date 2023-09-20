const { sequelize } = require('sequelize'); // Import your Sequelize instance
const User = require('../model/signUp');
const Group = require('../model/group');
const UserGroup = require('../model/userGroup');
const userGroup = require('../model/userGroup');

exports.addGroup = async (req, res, next) => {
  try {
    const groupName = req.body.GroupName;
    const userId = req.body.userId;

    // Find the user and group by their IDs
    const user = await User.findByPk(userId);
    const group=await Group.create({
        GroupName:groupName
    })
    if (!user) {
      return res.status(404).json({message: 'User not found', success: false });
    }

    await UserGroup.create({
      userId: user.id,
      groupId: group.id,
    });

    res.status(200).json({group, Message: 'Group created successfully', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: 'Internal server error', success: false });
  }
};
exports.getGroupName=async(req,res,next)=>{
    try{
        //const userId=req.query.userId;
        const groupId=req.query.groupId;
        const group=await Group.findByPk(groupId)
        
        res.status(200).json({group:group});
    }catch(e){
        console.log(e);
    }
}
exports.getGroup = async (req, res, next) => {
    try {
      const userId = req.query.userId;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Group,
            through: UserGroup
          },
        ],
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found', success: false });
      }
  
      const userAssociatedGroups = user.groups;
      res.status(200).json({group: userAssociatedGroups, success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error', success: false });
    }
  };
  exports.joinUser=async(req,res,next)=>{
    try{
        const email=req.body.Email;
        const groupName=req.body.groupName;
        const userEmail=await User.findAll({where:{Email:email}});
        if(userEmail){
            const GroupNames=await Group.findOne({where:{GroupName:groupName}})
            if(GroupNames){
                const user = await User.findOne({ where: { Email: email } });
                const group = await Group.findOne({ where: { GroupName: groupName } });
                const response=await UserGroup.create({
                    userId:user.id,
                    groupId:group.id,
                })
                return res.status(200).json({ message: "new user added to the group", success: true });
            }
        }
    }catch(e){
        console.log(e);
    }
  }
  
  exports.getUserDetails=async(req,res,next)=>{
    try{
        const groupId=req.query.groupId;
        console.log(groupId);
        const userDetails=await userGroup.findAll({where:{groupId}});
        res.status(200).json({usersId:userDetails});
    }catch(e){
        console.log(e);
    }
}
exports.deleteGroupName=async(req,res,next)=>{
  try{
    const groupId=req.query.groupId;
    const deleteResponse=await Group.findByPk(groupId);
    await deleteResponse.destroy();
    res.status(200).json({deletedGroup:deleteResponse});
  }catch(e){
    console.log(e);
  }
}
  
  
  
  
  
  
const express=require('express');
const sequelize=require('./util/database');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const signUpRoutes=require('./routes/signUp');
const loginRoutes=require('./routes/login');
const chatRoutes=require('./routes/chat');
const groupRoutes=require('./routes/group');
const AdminRoutes=require('./routes/Admin');
const userGroupRoutes=require('./routes/userGroup');
const { serialize } = require('v8');
const { Sequelize } = require('sequelize');
const UserModel=require('./model/signUp');
const ChatModel=require('./model/chat');
const groupModel=require('./model/group');
const userGroupModel=require('./model/userGroup');
const AdminModel=require('./model/Admin');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(signUpRoutes);
app.use(loginRoutes);
app.use(chatRoutes);
app.use(groupRoutes);
app.use(AdminRoutes);
app.use(userGroupRoutes);

app.use('/signUp',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','SignUp.html'));
})
app.use('/login',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','login.html'))
})
app.use('/chat',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','chat.html'));
})
app.use('/group',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','group.html'))
})
app.use('/invite',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','invite.html'));
})
app.use('/AllGroupsUsers',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','AllGroupsUsers.html'));
})

ChatModel.belongsTo(UserModel,{foreignKey:'userId'});
UserModel.hasMany(ChatModel,{foreignKey:'userId'});

ChatModel.belongsTo(groupModel,{foreignKey:'groupId'});
groupModel.hasMany(ChatModel,{foreignKey:'groupId'});

groupModel.belongsToMany(UserModel, {
    through: userGroupModel,
    foreignKey: 'groupId',
  });
  UserModel.belongsToMany(groupModel, {
    through: userGroupModel,
    foreignKey: 'userId',
  });

sequelize.sync({force:false})
.then(()=>{
      console.log('data sync successfully');
      app.listen(5500);
})
.catch(err=>{
    console.log(err);
})
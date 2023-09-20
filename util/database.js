const Sequelize=require('sequelize');
const chatDatabse=new Sequelize('chat_app_db',"root",'Ashish8298',{
    dialect:'mysql',
    host:'localhost'
})


module.exports=chatDatabse;
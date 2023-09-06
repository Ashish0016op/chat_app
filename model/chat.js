const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const ChatDetails=sequelize.define('chatData',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    Chat:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    Username:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})

module.exports=ChatDetails;
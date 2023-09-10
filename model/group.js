const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const groupName=sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    GroupName:{
        type:Sequelize.STRING,
        allowNull:false
    },
})
module.exports=groupName;
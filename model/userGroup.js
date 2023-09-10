const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const userGroup=sequelize.define('usergroup',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    groupId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
})
module.exports=userGroup;
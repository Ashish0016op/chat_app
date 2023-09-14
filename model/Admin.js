const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const AdminDetails=sequelize.define('Admins',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    groupId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
})
module.exports=AdminDetails;
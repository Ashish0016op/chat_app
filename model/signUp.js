const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const signUpTable=sequelize.define('signUpData',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    Username:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    Email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    PhoneNumber:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})
module.exports=signUpTable;
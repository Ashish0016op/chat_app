const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const loginDetails=sequelize.define({
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
})
module.exports=loginDetails;
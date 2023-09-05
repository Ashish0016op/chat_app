const express=require('express');
const sequelize=require('./util/database');
const path=require('path');
const bodyParser=require('body-parser');
const app=express();
const signUpRoutes=require('./routes/signUp');
const { serialize } = require('v8');
const { Sequelize } = require('sequelize');
app.use(bodyParser.urlencoded({extended:false}));
app.use(signUpRoutes);

app.use('/signUp',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','SignUp.html'));
})





sequelize.sync({force:false})
.then(()=>{
      console.log('data sync successfully');
      app.listen(5500);
})
.catch(err=>{
    console.log(err);
})
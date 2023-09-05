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
const { serialize } = require('v8');
const { Sequelize } = require('sequelize');
const signUpModel=require('./model/signUp');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(signUpRoutes);
app.use(loginRoutes);

app.use('/signUp',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','SignUp.html'));
})
app.use('/login',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','login.html'))
})


sequelize.sync({force:false})
.then(()=>{
      console.log('data sync successfully');
      app.listen(5500);
})
.catch(err=>{
    console.log(err);
})
const express = require('express');
const path = require('path')
const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config({
    path:'./password.env'
});

const app = express();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST ,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

const public = path.join(__dirname,'./public')
app.use(express.static("public"));

//getting data from html register form
app.use(express.urlencoded({extended:false}));
//diplaying on terminal the entered data
app.use(express.json());


app.set('view engine','hbs');


db.connect(function (error) {
    if (error) {
        console.log("Error in Connecting Database");
        throw error;
    }
    else {
        console.log("Connected to Database");
    }
  });
   

//Define routes
app.use('/',require('./routs/pages'));
app.use('/auth',require('./routs/auth'));

app.listen(5000,()=>{
    console.log('sever started at port 5000');
});

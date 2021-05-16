
const express = require('express');

const router = express.Router();
//for routing front page and register page
router.get("/",(req,res) => {
    res.render("index");

});
router.get("/register",(req,res) => {
    res.render("register");

});
router.get("/login",(req,res)=>{
    res.render("login")
});

router.get("/register1",(req,res) => {
    res.render("register1");

});
router.get("/login1",(req,res)=>{
    res.render("login1")
});
router.get("/facultylogin",(req,res) => {
    res.render("facultylogin");
});

module.exports= router;
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  }); 


//FOR STUDENT
//Login Form
exports.login = async(req,res) =>{
try{
    const {enrid,password} =req.body;
    console.log(enrid);


    if (!enrid || !password) {
        return res.status(400).render('login',{
            message: 'Please Insert valid EnrollmentID and Password'  
        })
    }

    db.query('SELECT * FROM stored_db WHERE Enrollment=?',[enrid],async(error,results)=>
    {
        console.log(results);
        if(!results || !(await bcrypt.compare( password, results[0].password))){
           res.status(401).render('login',{
               message: 'EnrollmentID or Password is incorrect'
           })
        }else{
            res.status(200).redirect('/');
        }
    })

}catch(error){
   console.log(error);
}
}


// register form

exports.register = (req,res) => {
    console.log(req.body); 

    const {enrid, name, email, role, branch, password, cpassword} = req.body;

    db.query('SELECT Enrollment FROM stored_db WHERE Enrollment=?', [enrid], async (error,results) =>
    {
       if (error){
           console.log(error);
       }
       if (results.length > 0){
           return res.render('register',{
            message: 'The EnrollementID alredy exist'   
           })
       }else if(password !== cpassword){
        return res.render('register',{
            message: 'password do not match'   
           }); 
       }
       

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO stored_db SET ?',{Enrollment:enrid, name:name, Email_id:email, branch:branch, role:role, password:hashedPassword}),(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                return res.render('register',{
                   message: 'Registered successfully ',
                   }); 
            }
        }

    });

}

//FOR FACULTY
//Login for faculty

exports.login1 = async(req,res) =>{
    try{
        const {facultyid,password} =req.body;
        console.log(facultyid);
    
    
        if (!facultyid || !password) {
            return res.status(400).render('login1',{
                message: 'Please Insert valid ID and Password'  
            })
        }
    
        db.query('SELECT * FROM faculty_db WHERE facultyID=?',[facultyid],async(error,results)=>
        {
            console.log(results);
            if(!results || !(await bcrypt.compare( password, results[0].password))){
               res.status(401).render('login1',{
                   message: 'EnrollmentID or Password is incorrect'
               }) 
            }
            
            else{
                res.status(200).redirect('/facultylogin');
            }
        })
    
    }catch(error){
       console.log(error);
    }
    }
    
    //Register For faculty

    exports.register1 = (req,res) => {
        console.log(req.body); 
    
        const {facultyid, name, email, branch, password, cpassword} = req.body;
    
        db.query('SELECT facultyID FROM faculty_db WHERE facultyID=?', [facultyid], async (error,results) =>
        {
           if (error){
               console.log(error);
           }
           if (results.length > 0){
               return res.render('register1',{
                message: 'The EnrollementID alredy exist'   
               })
           }else if(password !== cpassword){
            return res.render('register1',{
                message: 'password do not match'   
               }); 
           }
    
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword);
    
            db.query('INSERT INTO faculty_db SET ?',{facultyID:facultyid, name:name, Email_id:email, branch:branch,password:hashedPassword}),(error,results)=>{
                if(error){
                    console.log(error);
                }
                else{
                    return res.render('register1',{
                       message: 'Registered successfully '
                       }); 
                }
            }
    
        });
    
    }
    


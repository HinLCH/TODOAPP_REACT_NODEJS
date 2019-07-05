
const express = require('express');
//const fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser')
//since user need to login to use the app
//express-sesion was chosen to be the middleware
//if user have not login, he/she cannot access to todoapp
//update:since it is no a SPA, session cannot be used
//var session = require('express-session');

var app = express() ;
//connect MYSQL 
var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'nodejs_todolist'
});

app.use(session({
    secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const port = 5000 ;

con.connect(function(err) {
	if (err) throw err
});


app.post('/login',function (req,res){
    let loginData = {
        username : req.body.userName ,
        password : req.body.password
    }
    console.log("login data : ", loginData)
    let userName = loginData.username;
    let password = loginData.password;
    async function getUser(){
        console.log("debug")
        await con.query("SELECT * FROM users WHERE username='"+userName+"' ",async function(err,result) {
            if(err) {
            console.log(err); 
            res.json({"error":true});    
            }
            else{
                if(result[0] != null){
                console.log("result",result);
                await con.query("SELECT '"+userName+ "' FROM users WHERE password='"+password+"'",function(err,result){
                    if(err) {
                        console.log(err); 
                        res.json({"error":true}); 
                    }
                    else{
                        if(result[0]!=null){
                        // password and username correct
                        console.log("success");
                        req.session.login = true;
                        req.session.loggedin = true;
                        response = JSON.stringify({"redirect":"/todoapp"});
                        res.json(response)
                        //res.redirect('/checksession');
                        res.end();
                       
                        // console.log("req.session.loggedin :",req.session.loggedin)
                        }else{
                        console.log("password incorrect")
                        res.json("Password incorrect");  
                         
                        }
                    }   
                })   
                }
                else{
                console.log("user not found")
                }
            }
        })
    }
    getUser()
})

/*app.get('/checksession',function (req,res){
    if (req.session.loggedin) {
            console.log("req.session.loggedin ture",req.session.loggedin)
		} else {
            console.log("req.session.loggedin false",req.session.loggedin)
	}
})*/

app.get('/getJson',function (req,res) {
    async function getData(){
    await    res.setHeader('Content-Type', 'application/json');
    await    con.query("SELECT * FROM todoitem",function(err, result) {
            if(err) {
            console.log(err);  
            res.json({"error":true});
            }
            else { 
              res.json(result);                     
            }
        });       
    }
    getData()
})
  

//new:connect to MYSQL and insert new data
//old:get the body from handleSubmit creat input and push input into data.json
app.post('/post',function (req,res) {
    console.log("req.body",req.body)
    var inputData = req.body.input
    async function insertData(){
        //will have async issue'Cannot set headers after they are sent to the client' if not using await.
    await   res.setHeader('Content-Type', 'application/json')
    await   con.query('INSERT INTO todoitem (text, completed) VALUES ("'+inputData+'", 0)' ,function (err, result) {
            if(err) {
                console.log(err); 
                res.json({error:true});
                }
            else { 
                console.log("inserted"); 
                res.json({error:false});
                //console.log(res.json(result).body);                      
            }
          });  
    }
    insertData()
   
})
app.post('/restart',function(req,res){
    async function restartDb(){
    await res.setHeader('Content-Type', 'application/json')
    await con.query("DELETE FROM todoitem",function(err, result)  {
         if(err) {
            console.log(err); 
            res.json({"error":true});           
            }
        else { 
            res.json({"error":false});                  
        }
    });    
    }
    restartDb()
})
 

//handle delete
app.post('/delete',function(req,res){    
    var rowsID = req.body.rowsID
    console.log("rowsID",rowsID)
    async function deleteRow(){
     await res.setHeader('Content-Type', 'application/json')
     await con.query('DELETE FROM todoitem WHERE todoitem.id ="'+rowsID+'"',function(err, result)  {
         //DELETE FROM `todoitem` WHERE `todoitem`.`id` = 94
          if(err) {
             console.log(err); 
             res.json({"error":true});           
             }
         else { 
             res.json({"error":false}); 
             console.log('ID = ',rowsID,'was deleted')                 
         }
     });    
     }
    deleteRow()
})
app.listen(port)
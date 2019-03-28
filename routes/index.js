var express = require('express');
var router = express.Router();
var connection = require('../mysql/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    let {username,password} = req.body;
    // const sqlStr = `select * from user_table where username=${username} and password = ${password}`;
    const sqlStr = `select * from user_table where username = '${username}' and password='${password}'`;
    connection.query(sqlStr,(err,data) => {
       if(err){
           throw err;
       } else{
           res.send(data);
       }
    });
    //res.send('111');
});

router.post('/getUserList',(req,res) => {
   const sqlStr = 'select * from user_table order by id desc';
   connection.query(sqlStr,(err,data) =>{
       if(err){
           throw err;
       }else{
           res.send(data);
       }
   })
});

router.post('/addUserInfo',(req,res) =>{
    let {username,password,age} = req.body.data;
    const sqlStr = `insert into user_table (username,password,age) values ('${username}','${password}','${age}')`;
    connection.query(sqlStr,(err,data) => {
        if(err){
            throw err;
        }else{
            res.send(data);
        }
    })
});

router.post('/delUserInfo',(req,res) =>{
    // console.log(1)
   let id = req.body.id;
   const sqlStr = `delete from user_table where id=${id}`;
   // console.log(sqlStr);
   connection.query(sqlStr,(err,data) =>{
       if(err){
           throw err;
       }else{
           res.send(data);
       }
   })
});

router.post('/editUserInfo',(req,res) =>{
   let {id,username,password,age} = req.body.data;
   const sqlStr = `update user_table set username = '${username}',password = '${password}', age = '${age}' where id = ${id}`;
   connection.query(sqlStr,(err,data) => {
       if (err){
           console.log(err);
       } else{
           res.send(data);
       }
   })
});

module.exports = router;

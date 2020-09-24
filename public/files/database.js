var mysql      = require('mysql');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'luffy04',
    password : 'Luffy04@',
    database : 'last'
});
function connectDB(){
    connection.connect();
}
function signUp(username,email,hash,cb) {
    connection.query(`Insert into login (username,email,password) values ('${username}','${email}','${hash}')`,function(err,results) {
        connection.query(`insert into profile(username,pic) values('${username}','nf/user3.jpeg')`,function(err,results){
            cb(err,results)
        })
    })
}

function getUser(username, cb) {
    connection.query(`Select * from login where username='${username}'`, function(error,results) {
        cb(results);
    })
}  

function add(username,status,request1,request2,request3,tag,file1,file2,file3,file4,file5,description,price,date,month,cb){
    if(price==""){
        price="FREE";
        console.log("price"+price);
    }
    connection.query(`insert into query (username,status,tag,file1,file2,file3,file4,file5,description,price,date,month,request1,request2,request3) 
    values('${username}','${status}','${tag}','${file1}','${file2}','${file3}','${file4}','${file5}','${description}','${price}','${date}','${month}','${request1}','${request2}','${request3}')`,function(error,results){
        cb(results);
    })
}

function get(cb){
    connection.query('select * from query',function(err,results){
        cb(results);
    })
}

function profile(entry,name,cb){
    connection.query(`update profile set pic='files/${entry}' where username='${name}'`,function(err,results){
        cb(results);
    })
}

function load(name,cb){
    connection.query(`select * from profile where username='${name}'`,function(err,results){
        cb(results);
    })
}

module.exports = {
    signUp,
    getUser,
    add,
    get,
    profile,
    load
};

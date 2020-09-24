var mysql      = require('mysql');
const saltRounds = 10;
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'luffy04',
    password : 'Luffy04@',
    database : 'last'
});

function connectDB(){
    connection.connect();
}

function signUp(username,email,password,cb){
    connection.query(`Insert into login(useranme,email,password) values('${username}','${email}','${password}')`,function(results,fields,error){
        connection.query(`Insert into profile(username,pic) values('${email}','nf/user3.jpeg')`,function(error,results,fields){
            cb(error,results);
        })   
    })
}

function signUpGoogle(email,cb){
    connection.query(`Select * from login where email='${email}'`,function(error,results,fields){
        cb(results);
    })
}

function signUpGoogleNew(username,email,password,pic,cb){
    connection.query(`Insert into login(useranme,email,password) values('${username}','${email}','${password}')`,function(results,fields,error){
        connection.query(`Insert into profile(username,pic) values('${email}','${pic}')`,function(error,results,fields){
            cb(results);
        })   
    })
}

function get(cb){
    connection.query(`select * from queries`,function(error,results,fields){
        cb(results);
    })
}

function getUser(username,cb){
    connection.query(`select * from login where username='${username}'`,function(error,results,fields){
        cb(results);
    })
}

function profile(pic,username,cb){
    connection.query(`update profile set pic='${pic}' where username='${username}'`,function(error,results,fields){
        cb(results)
    })
}

function add(user,email,status,request1,request2,request3,tag,file1,file2,file3,file4,file5,description,price,date,month,cb){
    connection.query(`insert into queries(username,email,status,tag,file1,file2,file3,file4,file5,Description,price,date,month,request1,request1pic,request1msg,request2,request2pic,request2msg,request3,request3pic,request3msg) values('${user}','${email}','${status}','${tag}','${file1}','${file2}','${file3}','${file4}','${file5}','${description}','${price}','${date}','${month}','${request1}','','','${request2}','','','${request3}','','')`,function(error,results,fields){
        cb(results);
        // if(error) console.log(error);
        // else  console.log(results)
    })
}

function load(username,cb){
    connection.query(`select * from profile where username='${username}'`,function(error,results,fields){
        cb(results);
    })
}

function confirm(username,key,cb){
    connection.query(`update queries set status='yes' where key='${key}'`,function(error,results,fields){
    })
}

function push(into,pic,name,msg,incre,cb){
    connection.query(`update queries set request${incre}='${name}' , request${incre}pic='${pic}' , request${incre}msg='${msg}' where id=${into}`,function (error,results,fields) {
        if(error) console.log(error);
        else console.log(results)
    })
}

module.exports = {
    connectDB,
    signUp,
    signUpGoogle,
    signUpGoogleNew,
    get,
    getUser,
    profile,
    add,
    load,
    confirm,
    push
};

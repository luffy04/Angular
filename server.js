const express=require('express');
const app=express();
const fs=require('fs');
const http=require('http');
const multer = require('multer');
const ejs=require('ejs');
const server=http.Server(app);
const bodyParser = require('body-parser');
// const socket=require('socket.io');
const passport = require('passport');
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passportLocal = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const database=require('./database.js')
const operations=require('./operation.js');
const xoauth2=require('xoauth2');
// const io=socket(server);
var nodemailer = require('nodemailer');
const Nexmo = require('nexmo');
const socket=require('socket.io');
const io=socket(server);
var v;
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser());    
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(session({secret: 'I have a dog',resave:true,saveUninitialized:true}));

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine','ejs');
var google_id="176824521063-af4a383r7o6n7b5ki62cbtvlo56hr29o.apps.googleusercontent.com";
var google_secret="XOOylDNzU_jQkR0LKe-Zi8cr";
passport.use('google',new GoogleStrategy({
    clientID: google_id,
    clientSecret: google_secret,
    callbackURL: "http://localhost:8000/auth/google/callback"
    }, function(accessToken, refreshToken, profile, cb) {
        v=profile.displayName;
        database.signUpGoogle(profile.displayName, profile.emails[0].value,profile.id, function(err,data) {
            if(data!=""){
                io.on('connection',function(sk){
                    sk.emit('putvalue',profile.displayName,profile.emails[0].value);
                })
                // socket.emit('putvalue',profile.displayName,profile.emails[0].value);
                cb(err,data);
            }else{
                database.signUp(profile.displayName,profile.emails[0].value,profile.id, function (err,data) {
                    // socket.emit('putvalue',profile.displayName,profile.emails[0].value);
                    io.on('connection',function(sk){
                        sk.emit('putvalue',profile.displayName,profile.emails[0].value);
                    })
                    cb(err,data);
                })
            }
        })
    }
));

app.get('/auth/google', passport.authenticate('google', {scope:['profile','email']}));
// app.get('/auth/google/callback',
//   passport.authenticate('google'),
//   (err, req, res, next) => {
//
//     res.render('index.ejs',{
//         name:v
//     })
// },
//   (req, res) => {
//       console.log('second');
//     res.redirect('/');
//   }
// );
app.get('/auth/google/callback', passport.authenticate('google',
    {successRedirect:'/sui',
        failureRedirect:'/failure' }
))
app.get('/sui',function(req,res){
    console.log("rendered");
    res.render('index.ejs',{
        name:v
    })
})
app.use('/',express.static('public'));


var x=1;

app.get('/through',function(req,res){
    database.get('vet',function(data){
        console.log(data);
        res.send(data);
    })
})
app.get('/redirect',function(req,res){
    res.redirect('index.ejs')
})
app.get('/mail',function(req,res){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
          res.send(error);
        } else {
          res.send(info);
        }
      });
})
app.post('/recovery',function(req,res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
              user:'aryanjha82.aj55@gmail.com',
              pass:'ronoroazoro1'
        }
    });
      
var mailOptions = {
    from: '"Error" <aryanjha82.aj55@gmail.com>',
    to: req.body.Email,
    subject: 'Password Recovery',
    text:`${req.body.pass}`
    };
transporter.sendMail(mailOptions,function(error, info){
    if (error) {
        res.send(error);
    } else {
        res.send(info);
    }
  });
})
// app.get('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

app.get('/angular',function(req,res){
  res.redirect('/sui')
})
app.post('/login', passport.authenticate('local',{
  successRedirect:'/success',
  failureRedirect:'/failure'
}));

passport.use(new passportLocal(
    function(username, password, done) {
        database.getUser(username, function(data) {
              if(data==""){ 
                return done(null,false,{message:"username is incorrect"});
              }
              else{
                operations.compare(password, data[0].password, function(show){
                    if(!show) {
                        return done(null, false, {message: 'password is incorrect'});
                    }
                        return done(null, data[0]);
                  });
             }
        })
    })
);

passport.serializeUser(function(id, done) {
    return done(null, id);
});

passport.deserializeUser(function(id, done) {
    return done(null, id)
});

app.get('/success', function(req,res) {
    v=req.user;
    console.log(req.user);
    res.send(req.user);
});

app.get('/failure', function(req,res) {
    req.logout();
    res.send('failure')
});

app.get('/project',function(req,res){
    res.render('project.ejs',{
        name:v
    })
})

app.get('/data', function(req, res) {
    if(req.user) {
        res.send("Validated");
    }
    else {
        res.redirect('/');
    }
});

app.post('/register',function(req,res){
    operations.encrypt(req.body.user,req.body.mail,req.body.pass,function (data) {
        res.send(data);
    })
})

app.post('/registergoogle',function(req,res){
    database.signUpGoogleNew(req.body.username,req.body.mail,req.body.id,req.body.pic,function(data){
        res.send(data);
    })
})

app.post('/getGoogle',function(req,res){
    database.signUpGoogle(req.body.email,function(data){
        res.send(data);
    })
})

app.get('/failure',function(req,res){
    req.logout();
    res.redirect('/');
})

app.post('/upload',(req, res, next) => {
    var data = req.body.data.replace(/^data:text\/\w+;base64,/, "");
    var buf = new Buffer(data, 'base64');
    fs.writeFile(`public/files/${req.body.name}`, buf);
    res.send(req.body.name);
    x++;
})

app.post('/profile',(req,res,next)=>{
    var data = req.body.pic.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(data,'base64');
    fs.writeFile(`public/files/${req.body.picname}`,buf);
    database.profile(req.body.picname,req.body.name,function(data){
        res.send(data);
    })
})

app.post('/send',function(req,res){
    if(req.body.price == " "){
        console.log('price');
        req.body.price="FREE";
    }
    database.add(req.body.user,req.body.email,req.body.status,req.body.request1,req.body.request2,req.body.request3,req.body.tag,req.body.file1,req.body.file2,req.body.file3,req.body.file4,req.body.file5,req.body.description,
        req.body.price,req.body.date,req.body.month,function(data){
        res.send(data);
    })
})

app.get('/get1',function(req,res){
    database.get(function(data){
        res.send(data);
    })
})

app.post('/load',function(req,res){
    database.load(req.body.name,function(data){
        res.send(data)
    })
})

app.post('/push',function(req,res){
    database.push(req.body.key,req.body.pic,req.body.name,req.body.message,req.body.incre,function(data){
       res.send(data);
    })
    // res.send('success');
})

app.get('*',function(req,res){
    res.sendfile('./public/index.html')
})

app.post('/accept',function(req,res){
    
    
})

app.post('/confirm',function(req,res){
    database.confirm(req.body.username,req.body.key,function(data){
        res.send(data);
    })
})

io.on('connection',function(sk){
    sk.on('user image',function(data,name){
        sk.emit('output',data,name);
    })
})

server.listen(8000,function () {
    console.log("Working");
});
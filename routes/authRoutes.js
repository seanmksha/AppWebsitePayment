const passport = require('passport');
var express = require('express');
var User = require('../models/User.js');
const randomstring = require("randomstring");
var LocalStrategy = require('passport-local').Strategy;
const nodemailer = require("nodemailer");
const keys = require('../config/keys');
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/


var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "krystowers.noreply",
        pass: keys.emailerKey
    }
});

module.exports= function(app)
{
    //Register
    app.post('/api/register', async function(req,res)
    {
         var name = req.body.name;
         var username= req.body.username;
         var email = req.body.email;
         var password = req.body.password;
        var verifier = randomstring.generate();
         req.checkBody('name','Name is required').notEmpty();
         req.checkBody('email','Email is required').notEmpty();
         req.checkBody('email', 'Email is not valid').isEmail();
         req.checkBody('username', 'Username is required').notEmpty();
         req.checkBody('password','Password is required').notEmpty();
         var errors=req.validationErrors();
         if(errors)
        {
                return res.status(401).send({error:'Missing fields!'});
        
       }
       var returnedUser=await User.findOne({username:username});
       if(!returnedUser)
        {
            var returnedEmail= await User.findOne({email:email});
            if(!returnedEmail)
                {
       var newUser= new User({
        name:name,
        email:email,
        username:username,
        password:password
        });
        
        User.createUser(newUser,function(err,user)
        {
            if(err) throw err;
            console.log(user);
           

          
             console.log("PASSED");
           console.log("Verifier:"+verifier);
            var mailOptions={
                to : email,
                subject : "Please confirm your Email account",
                html : `<h3>Welcome to Krys Towers Web Development Apps</h3><p>This email is to verify the account:${username}</p>
                <div>
                Click on the following link to verify your account:
                  <a href="${keys.redirectDomain}/api/verify/${account.id}/${verifier}">Verify Account</a>
                </div>`
            };
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                       console.log(error);
                       res.redirect('/');
                       
                }else{
                       console.log("Message sent: " + response.message);
                       res.redirect('/');
                       
                    }
                });



        });
        
        }
        else
            {
                return res.status(401).send({error:'Email already has an account registered.'});
                
            }
    }
   

    
    else
        {
            return res.status(401).send({error:'Username already exists.'});
            
        }
    }
);
app.get('/api/verify/:username/:verifier', async function(req,res)
{
        var username=req.param('username');
        var verifier = req.param('verifier');
        try
        {
            var user= await User.findOne({username:username});
            if(user.verifyRand==verifier)
                {
                    user.verified=true;
                    var finalUser= await user.save();
                    console.log(username+" was verified.");
                    res.send("Your account was successfully verified!");
                }
                else
                {
                        res.status(422).send("The verifier string is incorrect.");
                }
        }
        catch (err) {
            
            return res.status(500).send(err);
        }
        
           
           
});

app.post('/api/verifyemail', async function(req, res, next) {
    
    var email =req.body.email;
    console.log(email);
    //try
    //{
        console.log("test1");
       var userInitial = await User.findOne({email:email});
       var user;
       if(userInitial.verifyRand)
        {
            user=userInitial;
        }
        else
            {
                userInitial.verifyRand=randomstring.generate();
                user= await userInitial.save();
            }
       var verifier = user.verifyRand;
       console.log("test2"+user);
       console.log("test3"+user.username);
       var mailOptions={
        to : email,
        subject : "Please confirm your Email account",
        html : "<h3>Welcome to Krys Towers Web Development Apps</h3><p>This email is to verify the account:"+user.username+
        "<div>Click on the following link to verify your account:<a href=\""+
        keys.redirectDomain+"/api/verify/"+user.username+"/"+ verifier+"\">Verify Account</a></div>"
     };
     console.log(mailOptions);
     smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
               console.log(error);
               res.end();
               
        }else{
               console.log("Message sent: " + response.message);
               res.send(user);
               
            }
        });
       
    //}
   // catch (err) {
        
     //   return res.status(500).send(err);
   // }

});

app.post('/api/login', function(req, res, next) {
    console.log('before authenticate');
      passport.authenticate('local', function(err, user, info) {
    console.log('authenticate callback');
        if (err) { return res.send({'status':'err','message':err.message}); }
        if (!user) { return res.send({'status':'fail','message':info.message}); }
        req.logIn(user, function(err) {
          if (err) { return res.send({'status':'err','message':err.message}); }
          return res.send(user);
        });
      })(req, res, next);
    }); 


    app.get('/auth/google',
        passport.authenticate('google',{
        scope:['profile','email']
    })
    );

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res)=>{
            res.redirect('/surveys');
        }
    );
    app.get('/api/logout',
    function(req,res)
    {
        req.logout();
        res.redirect('/');
    }
    );

    app.get('/api/current_user', function(req, res)
    {
        res.send(req.user);
    });
};
const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

var LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('user');
//2
passport.serializeUser(function(user,done)
{
    console.log('serialize');
    done(null, user.id);
});

passport.deserializeUser(function(id, done)
{
    User.findById(id).then(
        function(user)
        {
            console.log('deserialize');
            done(null, user);
        }
    );
});
passport.use(new LocalStrategy(
    function(username,password,done)
    {
        User.getUserByUsername(username, function(err,user)
        {
          if(err) throw err;
          if(!user)
            {
                return done(null,false,{message:'Unknown User'});
            }  
            if(user.verified==false)
                {
                    return done(null,false,{message:'User\'s email address is not verified yet.'})
                }
            User.comparePassword(password, user.password, function(err,isMatch)
        {
                if(err) throw err;
                if(isMatch)
                    {
                        console.log(user.password);
                        console.log(password);
                        return done(null,user);
                    }
                    else
                        {
                            console.log('wrong pass');
                            console.log(user.password);
                            console.log(password);
                            return done(null,false,{message:'Invalid password'})
                        }
        });
        });
    }
));
//1
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    async function(accessToken, refreshToken, profile, done){
      const existingUser = await User.findOne({googleId:profile.id})
        if(existingUser)
            {
                //we already have a record with the given profile ID
                return done(null, existingUser);
            }
               //we don't have a record
                    const user =await new User({ googleId:profile.id }).save();
                    done(null,user);
                        
                    
                }
            
    )
);

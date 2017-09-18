const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
//2
passport.serializeUser(function(user,done)
{
    done(null, user.id);
});

passport.deserializeUser(function(id, done)
{
    User.findById(id).then(
        function(user)
        {
            done(null, user);
        }
    );
});

//1
passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    function(accessToken, refreshToken, profile, done){
      User.findOne({googleId:profile.id})
      .then(function(existingUser){
        if(existingUser)
            {
                //we already have a record with the given profile ID
                done(null, existingUser);
            }
            else
                {
                    //we don't have a record
                    new User({ googleId:profile.id }).save().then(
                     function(user)
                     {
                        done(null,user);
                     }   
                    );
                }
      });
     
    }
    )
);

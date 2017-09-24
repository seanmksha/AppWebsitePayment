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

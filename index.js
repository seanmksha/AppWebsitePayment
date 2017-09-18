//npm install --save passport passport-google-oauth20
//https://accounts.google.com/o/oauth2/v2/auth?
//response_type=code&redirect_uri=
//http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=1082583178932-gudam7nq2gn422il9p1k63n9fl8l0puu.apps.googleusercontent.com
//npm install -save nodemon
//npm install -save cookie-session
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//client id 
//client secret 	
mongoose.connect(keys.mongoURI);


const app = express();
app.use(
    cookieSession(
        {
            maxAge:30*24*60*60*1000,
            keys: [keys.cookieKey]
        }
    )
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5001;
app.listen(PORT);

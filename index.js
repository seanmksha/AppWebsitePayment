//npm install --save passport passport-google-oauth20
//https://accounts.google.com/o/oauth2/v2/auth?
//response_type=code&redirect_uri=
//http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=1082583178932-gudam7nq2gn422il9p1k63n9fl8l0puu.apps.googleusercontent.com
//npm install -save nodemon
//npm install -save cookie-session
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser=require('body-parser');
const keys = require('./config/keys');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.Promise = global.Promise;
//client id 
//client secret 	
mongoose.connect(keys.mongoURI);


const app = express();


app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
  // Connect Flash
  app.use(flash());
  
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV==='production')
{
    //Express will serve up production assets
    //like our main.js file or main.css file
    app.use(express.static('client/build'));

    //Express will serve up the index.html file
    //if it doesn't recognize the route
    const path = require('path');
    app.get('*',(req,res)=>
    {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

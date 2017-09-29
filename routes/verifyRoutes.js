const nodemailer = require("nodemailer");
const app=express();
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
module.exports = function(app) {
   
}
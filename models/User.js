
const mongoose= require('mongoose');
var bcrypt = require('bcryptjs');
//const Schema = mongoose.Schema;
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        googleId:String,
        credits: { type:Number,default:0 },
        localId:String,
        name:String,
        username:String,
        password:String,
        email:String,
        verified:{type:Boolean, default:false},
        verifyRand:String
    }
);


var User = module.exports = mongoose.model('user',userSchema);
module.exports.createUser = function(newUser, callback)
{
    bcrypt.genSalt(10,function(err,salt)
    {
        bcrypt.hash(newUser.password,salt,function(err,hash)
        {
            newUser.password=hash;
            newUser.save(callback);
        });
    });
}
module.exports.getUserByUsername = function(username,callback)
{
    var query={username:username};
    User.findOne(query,callback);
}
module.exports.getUserByEmail=function(email,callback)
{
    var query={email:email};
    User.findOne(query,callback);
}
module.exports.getUserById = function(id,callback)
{
   
    User.findById(id,callback);
}
module.exports.comparePassword=function(candidatePassword,hash,callback)
{
    bcrypt.compare(candidatePassword,hash,function(err,isMatch)
{
if(err) throw err;
callback(null, isMatch);
});
}
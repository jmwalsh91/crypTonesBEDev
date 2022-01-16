const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
/* const bcrypt = require('bcrypt') */

const userSchema = new Schema({
        username : {
        type: String,
        required: true,
        min: 5,
        max: 18
    },
    savedPatches: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Patch'
    }]

});
userSchema.plugin(passportLocalMongoose)

/* 
UserSchema.pre('save', function(next){
    if(!this.isModified('password')) { 
        return next()
    } else { 
        bcrypt.hash(this.password,10, (err, passwordHash) => {
            if (err) {
                return next(err)
            } else { 
                this.password = passwordHash
                next()
            }
        })
    } 
});


UserSchema.methods.comparePassword = function(password, callback){
    bcrypt.compare(password, this.password,(err, isMatch) => {
        if (err) {
            return callback(err)
        } else {
            if (!isMatch) 
                return callback(null, isMatch)
            return callback(null, this)
            }
        })
    }; */

    const User = mongoose.model('User', userSchema)
    module.exports = User
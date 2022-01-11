const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        min: 5,
        max: 18
    },
    password : {
        type: String,
        required: true
    },
    savedPatches: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Patch'
    }],

});

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
    };

    module.exports = mongoose.model('User', UserSchema)
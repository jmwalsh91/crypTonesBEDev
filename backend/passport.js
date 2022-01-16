/* const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt')
const User = require('./models/userModel')
const cookieExtractor = req => {
    let token = null
    if (req && req.cookies){
        token = req.cookies["access_token"]
    }
}



passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey : "stringaling"
}, (payload, done)=>{
    User.findById({_id : payload.sub}, (err, user)=>{
        if(err) {
            return done(err, false)
        } else if (user) {
            return done 
        }
    })
}))


passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({username}, (err, user)=>{
        if(err) {
            return done(err)
        } else if (!user) {
            return done(null, false)
        } else {
            user.comparePassword(password, done)
        }}
    )}
))

 */

const express = require('express')
const app = express()
const PORT = 4000
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const cryptoRouter = require('./controller/cryptoController')
const userRouter = require('./controller/userController')
const User = require('./models/userModel')
/* const axios = require('axios').default; */
const cors = require('cors')
const cookieParser = require('cookie-parser')
const _ = require('lodash')
const seeds = require('./db/seeds.json')
const session = require('express-session')
const passport = require('passport');
const localStrategy = require('passport-local');
let path = require('path')


const sessionConfig = {
    secret: 'take your shoes off and throw them in the lake',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  };

//session and passport
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride('_method'));
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/user/', userRouter )
app.use('/crypto/', cryptoRouter)

const routeHit = (req,res,next) =>{
    console.log("A new route was just hit");
    next()
}
app.use(routeHit)


app.use(express.urlencoded({extended:false}));


User.find((err, usersaa) => {
    console.log('ajhflkjshdlfjkksjfsdkjfdhsjdhfksjdhf')
    console.log(usersaa)

})
app.listen(PORT, ()=> console.log(`whackadoodle ${PORT} rePORTing for duty sir yes sir`))

const express = require('express')
const userRouter = express.Router()
//tidy unused imports mongoose/usermodel
const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const User = require('../models/userModel.js')
//change router to axios?
const passport = require('passport')

userRouter.get('/test', (req, res) => {
    console.log('oh hi there this is userRouter speaking')
    res.send('this is a response')
})

userRouter.post("/register", async (request, response, err) => {
    const password = request.body.password
    const username = request.body.email
    //tidy this up
    const newAcct = new User({username})
    console.log(newAcct)
    const regUser = await User.register(newAcct, password)
    console.log(regUser + ' is reguser')
});

userRouter.post('/login', passport.authenticate('local'), (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No such user");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Authentication successful");
            console.log(req.user);
          });
        }
      })(req, res, next);
    });

  
module.exports = userRouter
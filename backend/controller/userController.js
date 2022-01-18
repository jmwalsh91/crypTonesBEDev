const express = require('express')
const userRouter = express.Router()
//tidy unused imports mongoose/usermodel
const mongoose = require('mongoose')
const userModel = require('../models/userModel')
const User = require('../models/userModel.js')
const Patch = require('../models/patchModel.js')
//change router to axios?
const passport = require('passport')
const localStrategy = require('passport-local')


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
            currentUser = {
                username : req.user.username,
                id : req.user._id,
                savedPatches : req.user.savedPatches
          }
            
            res.send({currentUser});

            console.log(currentUser);
          });
        }
      })(req, res, next);
    });
    userRouter.post('/logout', (req, res) => {
      req.logout()
      res.send('Congrats.')
    });

userRouter.get('/showallpatches/:id?', (req, res)=> {
  let userId = req.query.id
  console.log(req.query)
  User.findById(userId, 'savedPatches' , (err, docs) => {
    if(err) {
      console.log(err)
    } 
    if (docs) {
      console.log('whrlfksjhkgsjdkghlksdjfhgiosdejhg')
      console.log(docs)
      res.data = (docs)
      return res.send(res.data)
    }
    
  })
});
   
  
  /* User.findById(req.body) */
      
   
   

/* userRouter.post('/patch/save', async (req, res) => {
  console.log(req.body)
  let patchOwner = req.body.patchOwner
  let newPatch = {
    patchParams : {
      name: req.body.patchName,
      noteData: req.body.noteData,
      chartData: req.body.chartData
    } 
  } 
  const savedPatch = await Patch.create(newPatch)
  await User.findByIdAndUpdate(
    patchOwner, 
    {$push: {"savedPatches" : savedPatch}},
    {new: true},
    function(err, docs) {
      if (err) {
        console.log(err)
      } else {
        console.log(docs)
        return updatedUser = docs
    } res.send('this is ' + updatedUser)
  }).clone().catch(function(err){console.log(err)})
}) */
/* 
userRouter.post('/patch/save', async (req, res) => {
  console.log(req.body)
  let patchOwner = req.body.patchOwner
  let newPatch = {
    patchParams : {
      name: req.body.patchName,
      noteData: req.body.noteData,
      chartData: req.body.chartData
    } 
  } 
  const savedPatch = await Patch.create(newPatch)
  .then(() => {
    let updatedUser = User.findByIdAndUpdate(
      patchOwner, 
      {$push: {"savedPatches" : savedPatch}},
      {new: true},
      function(err, docs) {
        if (err) {
          console.log(err)    
        } else {
          return res.send(updatedUser)
        }
      })      
  }
)}) */
userRouter.post('/patch/save', async (req, res) => {
  console.log(req.body)
  let patchOwner = req.body.patchOwner
  let newPatch = {
    patchParams : {
      name : req.body.patchName,
      noteData : req.body.noteData,
      chartData : req.body.chartData
    } 
  } 
  const savedPatch = await Patch.create(newPatch)
  User.findByIdAndUpdate(
      patchOwner, 
      {$push: {"savedPatches" : savedPatch}},
      {new: true},
      function(err, docs) {
        if (err) {
          console.log(err)    
        } else {
          console.log('docs right below')
          console.log(docs.savedPatches)
          let savedPatches = docs.savedPatches 
          return res.send(savedPatches)
        }
      })      
  })




module.exports = userRouter

const express = require('express')
const userRouter = express.Router()
const User = require('../models/userModel.js')
const Patch = require('../models/patchModel.js')
//change router to axios?
const passport = require('passport')
const localStrategy = require('passport-local')


userRouter.get('/', (req, res) => {
  console.log(req.path)
    console.log('oh hi there this is userRouter speaking')
    res.send('this is a response')
})
/* 
userRouter.post("/register", async (request, response, err) => {
    const password = request.body.password
    const username = request.body.email
    //tidy this up
    const newAcct = new User({username})
    console.log(newAcct)
    const regUser = await User.register(newAcct, password)
    console.log(regUser + ' is reguser')
}); */
userRouter.post("/register", async (req, res, err) => {
  /* const password = req.body.password
  const username = req.body.email */
  const newAcct = new User({username: req.body.email})
  console.log(newAcct)
  const regUser = await User.register(newAcct, req.body.password, (err, user) => {
   if (err) {
     console.log(err)
     throw err
   } else {
     user ? res.send(user + 'user true') : res.send(res.body)
   }
   console.log(res.body)
  })
})

userRouter.delete('/patch/delete/:id', (req, res)=> {
  let patchId = req.params.id 
  Patch.findByIdAndDelete(patchId, (err, docs) => {
     if(err) {
         console.log(`Error: ` + err)
       } else {
         console.log(docs)
         return res.send(docs)
       } 
    })
  })



userRouter.post('/login', passport.authenticate('local'), (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err
        if (!user) res.send("No such user")
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            currentUser = {
                username : req.user.username,
                id : req.user._id,
                savedPatches : req.user.savedPatches
          }
            res.send({currentUser})
          })
        }
      })(req, res, next)
    });

    userRouter.post('/logout', (req, res) => {
      req.logout()
      res.send('Congrats.')
    });

userRouter.get('/showallpatches/:id', (req, res) => {
  let userId = req.query.id
  Patch.find({ userId: {$exists : true}}, (err, docs) => {
     if(err) {
         console.log(`Error: ` + err)
       } else {
         console.log(docs)
         let patches = docs
         res.data = patches
         return res.send(res.data)
       } 
    })
  })

  userRouter.patch('/patch/rename/:id', (req, res)=> {
    console.log(req.params.id + ' is req params id')
    let patchId = req.params.id
    console.log(req.body.newName + ' is new name')
    console.log(patchId)
    let newName = req.body.newName
    Patch.findByIdAndUpdate(patchId, {$set: {'patchParams.name': newName}}, (err, docs) => {
       if(err) {
           console.log(`Error: ` + err)
         } else {
           console.log(docs)
           return res.send(docs)
         } 
      })
    })
  
userRouter.put('/patch/save', async (req, res) => {
  console.log(req.body)
  let patchOwner = req.body.patchOwner
  let newPatch = {
    patchOwner: patchOwner,
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



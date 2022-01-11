
const express = require('express')
const app = express()
const PORT = 4000
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const router = require('./controller/cryptoController')
const axios = require('axios').default;
const cors = require('cors')
const cookieParser = require('cookie-parser')
const _ = require('lodash')

let path = require('path')
//move to connections
const mongoURI = 'mongodb://127.0.0.1:27017/cryptones'
const db = mongoose.connection
mongoose.connect( mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(instance => {
    console.log(mongoURI)
    console.log(`Connected to the db: ${instance.connections[0].name}`);
})
.catch(err=> console.log(`Connection failed`, err))
//end move to connections 

app.use(methodOverride('_method'));
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/crypto/', router)

const routeHit = (req,res,next) =>{
    console.log("A new route was just hit");
    next()
}
app.use(routeHit)


app.use(express.urlencoded({extended:false}));


const User = require ('./models/userModel.js')

const userInput = {
    username : "testakak",
    password : "1203498"
}

const user = new User(userInput)
user.save((err, document) => {
    if (err) {
        console.log(err)
    } else {
        console.log(document)
    }
})

app.listen(PORT, ()=> console.log(`whackadoodle ${PORT} rePORTing for duty sir yes sir`))


const express = require('express')
const app = express()
const PORT = 4000
const methodOverride = require('method-override')
const router = require('./controller/cryptoController')
const axios = require('axios').default;
const _ = require('lodash')



/* const { populate } = require('./models/products') */


let path = require('path')
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', router)
const routeHit = (req,res,next) =>{
    console.log("A new route was just hit");
    next()
}
app.use(routeHit)

app.use(express.urlencoded({extended:false}));



/* 
router.get('/test', (req, res) => {
    res.send(res)
})
  */

// also use _.range to create an array of vals within args
function evalArray (target) {
    let onOff = []
    target.forEach((target) => {
        if (_.inRange(target, 26.9, 128.1) == true) {
            console.log('wow!' + target)
            onOff.push('1')
        } else {
            onOff.push('0')
            console.log('false' + target)}
    })
    let zipArr = _.zip(target, onOff)
    console.log(zipArr)

  }
  let trueArr = [80, 28, 100, 127, 128, 76, 40]
  evalArray(trueArr)
  let falseArr = [80, 28, 200, 129, 128, 20, 40]
  evalArray(falseArr)

// First check 
  
app.listen(PORT, ()=> console.log(`whackadoodle ${PORT} rePORTing for duty sir yes sir`))

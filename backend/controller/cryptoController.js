const express = require('express')
/* const  = require('../models/products') */
const router = express.Router()
const mongoose = require('mongoose')
const axios = require('axios').default;
const _ = require('lodash')


const valArray = []

const axiosCrypt = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    timeout: 5000,
    headers: {'X-CMC_PRO_API_KEY': '9afa7f9a-3812-4a98-83ce-d3d415ca6909'}
  });

const axiosNomics = axios.create({
    baseURL: '',
    timeout: 1000,
    headers: {'X-CMC_PRO_API_KEY': '9afa7f9a-3812-4a98-83ce-d3d415ca6909'}
})

/*  axiosCrypt.get( '', {
    params: {
        start: 1,
        limit: 2,
        convert: 'USD'
    }
})
.then(data => data.data)
.finally(console.log(data)); 
 */


/*
this works
 router.get("/", (req, res, next) => {
    console.log('ROUTER HIT')
    const noteArray = ['48','81','36','74'] 
    axiosCrypt.get( '', {
        params: {
            start: 1,
            limit: 2,
            convert: 'USD'
        }      
    })
    .then(data => data.data)
    .then((data.data))
    .finally(console.log(data));
})   */

/* router.get("/test", (req, res, next) => {
    axiosCrypt.get( '', {
        params: {
            start: 1,
            limit: 5,
            convert: 'USD'
        }
    })
    .then(data => console.log(data.data))
    .finally(next);
})   */


//alphaVantage APIKey: CQGAUB8UWNFMD2AJ
//'https://www.alphavantage.co/query?function=CRYPTO_INTRADAY


const axiosCryptAlpha = axios.create({
    baseURL: 'https://www.alphavantage.co/query?function=CRYPTO_INTRADAY',
    timeout: 10000,
  });
  

/*   axiosCryptAlpha.interceptors.response.use(response => { 

    let target = response.data['Time Series Crypto (5min)']
    console.log(target)
    let victory = []
    let newArr = (Object.values(target))
    let newestVictory = []
    for (thing of newArr) {
        victory.push(Object.entries(thing))
    }
    console.log(victory)
    for (let i = 0; i < victory.length; i++) {
        let newVictory = victory[i]
        for (let j = 0; j < newVictory.length; j++) {
            if (newVictory[j][0] === '4. close') {
                newestVictory.push(parseInt(newVictory[j][1]))
            }
        }
    } 
    console.log(newestVictory) 
})   */

axiosCryptAlpha.interceptors.response.use(response => { 
    console.log('interceptor')
    let target = response.data['Time Series Crypto (5min)']

   function formatRes(arrOne, arrTwo) {
    return resFormatted = _.zip(arrOne,arrTwo)
   }

   const reqKeys= Object.keys(target)
   const formattedOb = Object.values(target).map((thing) => {
        return Object.values(thing)
    })   

   let volArr = formattedOb.map((thing) => {
       return thing.pop() 
   })
   formatRes(reqKeys, formattedOb)
   return response = {resFormatted, volArr}
})


   router.get('/ohlcv', (req, res, err) => {
    axiosCryptAlpha.get( '', {
        params: {
            symbol: 'BTC',
            market: 'USD',
            interval: '5min',
            apikey: 'CQGAUB8UWNFMD2AJ'
        }      
    })
    .then(data => {
        console.log('then hit')
        console.log(data)
        res.send(data)
    })
    .catch((err) => console.log(err))
})



module.exports = router 
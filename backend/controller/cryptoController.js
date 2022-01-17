const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const axios = require('axios').default;
const _ = require('lodash')


const axiosCryptAlpha = axios.create({
    baseURL: 'https://www.alphavantage.co/query?function=CRYPTO_INTRADAY',
    timeout: 10000,
  });
  

axiosCryptAlpha.interceptors.response.use(response => { 
    console.log('interceptor')
    let target = response.data['Time Series Crypto (5min)']
    
    
    function formatRes(arrOne, arrTwo) {
        return resFormatted = _.zip(arrOne,arrTwo)
    }
    const reqKeys= Object.keys(target).map((thing) => {
        return Date.parse(thing)
    })
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



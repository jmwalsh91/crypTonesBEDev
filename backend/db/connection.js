//move to connections
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
console.log(mongoURI)
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

module.exports = mongoose
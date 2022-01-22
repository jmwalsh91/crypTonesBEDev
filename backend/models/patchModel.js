const mongoose = require('mongoose')
const Schema = mongoose.Schema

const patchSchema = new Schema({
    patchOwner : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    patchParams : {
        name: {type: String, required: true},
        noteData: {type: Array, required: true},
        chartData: {type: Array, required: true}
    }
})


const Patch = mongoose.model('Patch', patchSchema)
module.exports = Patch
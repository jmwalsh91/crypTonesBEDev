const mongoose = require('mongoose')

const PatchSchema = new mongoose.Schema({
    patchParams : {
        name: {type: String, required: true},
        noteData: {type: Array, required: true},
        chartData: {type: Array, required: true}
    }
})

module.exports = mongoose.model('Patch', PatchSchema)
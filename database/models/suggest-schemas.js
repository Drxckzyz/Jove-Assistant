const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const sg = mongoose.Schema({
    // Guild ID
    _id: reqString,
    channelId: reqString,
})

module.exports = mongoose.model('sg', sg)
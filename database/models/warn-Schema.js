const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const warnSchema = new mongoose.Schema({
    userID: reqString,
    warningID: Array,
    moderator: Array,
    date: Array,
    reason: Array,
})

module.exports = mongoose.model('warns', warnSchema);
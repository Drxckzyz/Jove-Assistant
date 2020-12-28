const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const autowarnSchema = new mongoose.Schema({
    userID: reqString,
    warningID: Array,
    moderator: Array,
    date: Array,
    reason: Array,
})

module.exports = mongoose.model('auto-warns', autowarnSchema);
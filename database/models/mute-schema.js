const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const muteschema = mongoose.Schema({
    userID: reqString,
    guildID: reqString,
    reason: reqString,
    staffID: reqString,
    stafftag: reqString,
    memberRoles: Array,
    expires: {
     type: Date,
        required: true
    },
    current: {
      type: Boolean,
       required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('mutes', muteschema);
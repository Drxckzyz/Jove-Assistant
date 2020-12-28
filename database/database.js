const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOURL, {
    keepAlive: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}).then(console.log("DB"))
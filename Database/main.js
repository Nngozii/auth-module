const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/testing'

mongoose
.connect(MONGO_URI)
.then(() => {
    console.log('connection to database successful')
})
.catch(err => {
    console.error(err)
})

const db = mongoose.connection;

module.exports = db
exports.MONGO_URI;

const mongoose = require('mongoose')

let connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/nta', {useNewUrlParser: true})
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('MongoDB connected successfully')
})

module.exports = connectDB



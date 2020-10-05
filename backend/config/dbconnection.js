const mongoose = require('mongoose');
var dbUrl;
// var dbUrr = 'mongodb+srv://roomfinder:Ambudidi08@cluster0.pieac.mongodb.net/roomfinder?retryWrites=true&w=majority'

if (process.env.db == 'atlas') {
    dbUrl = 'mongodb+srv://roomfinder:Ambudidi08@cluster0.pieac.mongodb.net/roomfinder?retryWrites=true&w=majority'
}
else {
    dbUrl = "mongodb://localhost:27017/roomfinderdb";
}
module.exports = mongoose.connect(dbUrl, (err, done) => {
    if (err) {
        console.log('Database connection failed ', err);
    } else {
        console.log('Database connection successful');
    }
})

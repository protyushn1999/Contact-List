//require the library for mongoose
const mongoose = require('mongoose');
// connect to the database server
mongoose.connect('mongodb://localhost/contact_list_db');
//acquire the connection to the database
const db = mongoose.connection;
//check for errors
db.on('error', console.error.bind(console, 'connection error:'));
//check for success
db.once('open', function(){
    console.log('Connected to MongoDB');
});
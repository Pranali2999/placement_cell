const mongoose = require('mongoose');
const env= require('./environment')

//mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
mongoose.connect(`mongodb+srv://Pranali:ucsAdLmhDjhdgu22@cluster0.lqn3xio.mongodb.net/`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));

db.once('open', function () {
	console.log('Connected to Database :: Mongodb');
});

module.exports = mongoose;

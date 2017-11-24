const mongoose = require('mongoose').connect('mongodb://localhost/gif_for_share');
const Schema = mongoose.Schema;

const gifStatusSchema = Schema({
	status : String,
	like : Number,
	username : String,
	image : String
})

const gifStatus = mongoose.model('gif_status', gifStatusSchema)
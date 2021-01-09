const mongoose = require('mongoose')
const mongoose_url = "mongodb://localhost:27017/User"

// connection mongoose
mongoose.connect(mongoose_url, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log("Database connection successfully!")
	})
	.catch(err => {
		console.log("Database connection error!")
		throw err
	})

// init model
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		default: 'No name'
	},
	password: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	}
})
const User = mongoose.model('User', userSchema, 'user')
module.exports = User
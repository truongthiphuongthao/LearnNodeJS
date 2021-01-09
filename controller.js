const express = require('express')
const router = express.Router()
const User = require('./model')
const crypto = require('crypto')

// display register page
router.get('/register', async(req, res)=>{
	res.render('register')
})
// display login page
router.get('/login', async(req, res)=>{
	res.render('login')
})
router.get('/', async(req, res)=>{
	res.send("<h1> Welcome to login simple </h1>")
})
// handle method post register
router.post('/register', async(req, res)=>{
	let username = req.body.username
	let user  = await User.findOne({username: username})
	// case 1: User exist
	if(user!=null){
		console.log("Register Failed")
		res.setHeader("Content-Type", "text/html")
		return res.send("Register Failed")
	}
	// case 2: User not exist
	else{
		let password = crypto.createHash('sha256').update(req.body.psw).digest('base64')
		let date = new Date()
		let newUser = await new User({
			username: username,
			password: password,
			date: date
		})
		await newUser.save(function(err, savedUser){
			if(err){
				console.log(err)
				throw err
			}
			else{
				console.log("Register Success")
				res.setHeader("Content-Type","text/html")
				return res.send("Register Success")
			}
		})
		console.log(newUser)
	}
})
// handle method post login
router.post('/login', async(req, res)=>{
	let username = req.body.username
	let password = crypto.createHash('sha256').update(req.body.psw).digest('base64')
	await User.findOne({username: username, password: password}, function(err, loginUser){
		if(err){
			console.log(err)
			throw err
		}
		// case 1: User not resgister
		if(!loginUser){
			console.log("Failed no such user")
			res.setHeader("Content-Type", "text/html")
			return res.send("Failed no such user")
		}
		// case 2: User have completed register
		console.log("Success login")
		res.setHeader("Content-Type", "text/html")
		return res.send("Success login")
	})

})
module.exports = router

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
	try{
		let username = req.body.username
		let user  = await User.findOne({username: username})
		// case 1: User exist
		if(user != null){
			console.log("Register Failed")
			res.setHeader("Content-Type", "text/html")
			return res.send("Register Failed")
		}
		// case 2: User not exist
		let password = crypto.createHash('sha256').update(req.body.psw).digest('base64')
		let date = new Date()
		let newUser = await new User({
			username: username,
			password: password,
			date: date
		})
		await newUser.save()
		console.log("Register Success")
		console.log(newUser)
		res.setHeader("Content-Type","text/html")
		return res.send("Register Success")
	}catch(err){
		console.log(err)
		throw err
	}
})
// handle method post login
router.post('/login', async(req, res)=>{
	try{
		let username = req.body.username
		let password = crypto.createHash('sha256').update(req.body.psw).digest('base64')
		let user = await User.findOne({username: username, password: password})
		// case 1: not have user
		if(!user){
			console.log("Failed no such user")
			res.setHeader("Content-Type", "text/html")
			return res.send("Failed no such user")
		}
		// case 2: have user
		console.log("Success login")
		res.setHeader("Content-Type", "text/html")
		return res.send("Success login")
	}catch(err){
		console.log(err)
		throw err
	}
})
module.exports = router

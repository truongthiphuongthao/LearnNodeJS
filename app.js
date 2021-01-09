const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./controller')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

// set view
app.set('views', './public/pages')
app.set('view engine', 'ejs')

// use routes
app.use('/', routes)

app.listen(8000, function(err){
	if(err) {
		console.log(err)
		throw err
	}
	else {
		console.log("Starting at port 8000")
	}
})
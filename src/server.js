// Importera paket: Express + Middleware
const express = require('express')
const app = express()
const cors = require('cors')
const hamstersRouter = require('../routes/hamsters.js')

// Konfigurera servern
const PORT = process.env.PORT || 3030
// räknar antal requests
let requestCount = 0

// Setup MiddleWare
app.use( cors() )
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )


//Logger
app.use( (req, res, next) => {
	requestCount++
	console.log(`${requestCount}  ${req.method}  ${req.url} `, req.body)
	next()
} )

//ROUTES AND ENDPOINTS
//Statisk mapp
app.use( '/web', express.static(__dirname + '/../frontend') )

//Hamster endpoints
app.use('/hamsters', hamstersRouter)

// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})
// Importera paket: Express + Middleware
const express = require('express')
const app = express()
const cors = require('cors')
const hamstersRouter = require('../routes/hamsters.js')
const matchesRouter = require('../routes/matches.js')
const matchWinnersRouter = require('../routes/matchWinners.js')
const loserRouter = require('../routes/losers.js')
const winnerRouter = require('../routes/winners.js')

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
app.use( '/', express.static(__dirname + '/../frontend') )
app.use( '/imgs', express.static(__dirname + '/../imgs/hamsters') )

//Hamster endpoints
app.use('/hamsters', hamstersRouter)

//Endpoints for Matches//
app.use('/matches', matchesRouter)
// //EndPionts for matchWinners//
app.use('/matchwinners', matchWinnersRouter)
// //EndPionts for losers//
app.use('/winners', winnerRouter)
// //EndPionts for losers//
app.use('/losers', loserRouter)

// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})
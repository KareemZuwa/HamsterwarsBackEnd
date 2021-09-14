// Importera paket: Express + Middleware
const express = require('express')
const app = express()


// Konfigurera servern
const PORT = process.env.PORT || 3030
// räknar antal requests
let requestCount = 0

// Setup MiddleWare
app.use( express.urlencoded() )
app.use( express.json() )
app.use( (req, res, next) => {
	requestCount++
	console.log(`${requestCount}  ${req.method}  ${req.url} `, req.body)
	next()
} )

// inställningar för passport

// Starta servern
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`)
})
// Importera express och Exportera express router
const express = require('express')
const matchwinners = express.Router()

// Importera valideringsfunktioner
const { isProperIndex, isHamstersObject , isGameObject} = require('./modules/validation.js')

// Hämta databas
const { db } = require('../routes/modules/dbvariable.js')
const MATCHWIN = 'matchWinners'
const MATCH = 'matches'
const HAMSTERS = 'hamsters'

//GET GET GET GET//
//GET all winners
matchwinners.get('/', async (req, res) => {
    let matchWinnersArray = await getAllWinners()
	
	if (!matchWinnersArray) {
		res.sendStatus(404)
		return
	};
	res.status(200).send(matchWinnersArray)
})

// //GET one Hamster
matchwinners.get('/:id', async (req, res) => {
	// let index = await req.params.id
	// let matchWinnersArray = await getAllWinners()
	// let matchList = []
	// for (let i = 0; i < matchWinnersArray.length; i++) {
	// 	matchList = matchWinnersArray[i].winnerId
	// }

	// console.log(matchList)
	// res 
	



	// for (let i = 0; i < matchWinnersArray.length; i++) {
	// 	if (matchWinnersArray[i].winnerId === index) {
	// 		res.status(200).send('tt')
	// 		return
	// 	} else {
	// 		res.status(404).send('Matchwinner does not')
	// 	}
	// }

	res.sendStatus(200)
		
})

//ASYNC FUNCTIONS COULD REFACTURATE//
//GET ALL WINNERS//
async function getAllWinners() {
	const matchesRef = await db.collection(MATCH)

    const matchSnapshot = await matchesRef.get()

    if( matchSnapshot.empty ) {
		return []
	}
    const array = []
	await matchSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
        array.push(data)
	})
    
	return array
}

//GET ONE MATCH//
async function getOne(id) {
	const hamstersRef = db.collection(HAMSTER).doc(id)
	const docSnapshot = await hamstersRef.get()

	if( docSnapshot.exists ) {
		return await docSnapshot.data()
	} else {
		return null
	}
}

async function getOneMatch(id) {
	const matchesRef = db.collection(MATCH).doc(id)
	const matchSnapshot = await matchesRef.get()

	if( matchSnapshot.exists ) {
		return await matchSnapshot.data()
	} else {
		return null
	}
}

//GET ONE FUNCTION
async function getOne(id) {
	const hamstersRef = db.collection(HAMSTERS).doc(id)
	const docSnapshot = await hamstersRef.get()

	if( docSnapshot.exists ) {
		return await docSnapshot.data()
	} else {
		return null
	}
}


module.exports = matchwinners
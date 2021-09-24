// Importera express och Exportera express router
const express = require('express')
const matchwinners = express.Router()

// Hämta databas
const { db } = require('../routes/modules/dbvariable.js')
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
	let index = await req.params.id
	console.log(index)

	let matchWinnersArray = await getAllWinnersId()
	console.log(matchWinnersArray)
	newPost = []
	let matchList = []
	// for (let i = 0; i < matchWinnersArray.length; i++) {
	// 	matchList = matchWinnersArray[i].winnerId
	// 	console.log(matchList)
	// 	if (matchList === index) {
	// 		newPost = {winnerId: matchWinnersArray[i].winnerId}
	// 		console.log(newPost)
			
	// 	}
	// 	return newPost
		
	// }
	res.status(200).send('couldnt work')
		
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
	const hamstersRef = db.collection(HAMSTERS).doc(id)
	const docSnapshot = await hamstersRef.get()

	if( docSnapshot.exists ) {
		return await docSnapshot.data()
	} else {
		return null
	}
}

async function getAllWinnersId() {
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


module.exports = matchwinners
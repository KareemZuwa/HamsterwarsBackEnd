// Importera express och Exportera express router
const express = require('express')
const losers = express.Router()

// Hämta databas
const { db } = require('../routes/modules/dbvariable.js')
const HAMSTERS = 'hamsters'
const MATCH = 'matches'

losers.get('/', async (req, res) => {
    let matchLosersArray = await getAll()
	let losers = []
	//filter by deafeat
    let defeatedHamsters = matchLosersArray.filter(cute => cute.defeats)
	// //Choose top 5 winning Hamsters
    let bottom5Hamsters = defeatedHamsters.sort((a,b) => b-a).slice(0,5);
	// console.log(bottom5Hamsters);
	
	res.status(200).send(bottom5Hamsters);
})

async function getAll() {
	const hamstersRef = db.collection(HAMSTERS)
	const hamsterSnapshot = await hamstersRef.get()

	if( hamsterSnapshot.empty ) {
		return []
	}

	const array = []
	await hamsterSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})
	return array
}

module.exports = losers
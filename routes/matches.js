// Importera express och Exportera express router
const express = require('express')
const matches = express.Router()

// Importera valideringsfunktioner
const { isMatchObject } = require('./modules/validation.js')

// Hämta databas
const { db } = require('../routes/modules/dbvariable.js')
const MATCH = 'matches'

//GET GET GET GET GET//
//GET /matches
matches.get('/', async (req, res) => {
    matchesArray = await getAll()
	res.status(200).send(matchesArray)
})
//GET one matchwinner
matches.get('/:id', async (req, res) => {
	const maybeUser = await getOneMatch(req.params.id)

	if (!maybeUser) {
		res.status(404).send('Match does not')
		return
	}

		res.status(200).send(maybeUser)
})

//POST POST POST POST//
matches.post('/', async (req, res) => {
	let maybeBody = await req.body
	if( !isMatchObject(maybeBody) ) {
		res.status(400).send('Bad Match object')
		return
	}
	let docRef = await db.collection(MATCH).add(maybeBody)
	let newPost = {id: docRef.id}
	res.status(200).send(newPost)
})

//DELETE DELETE DELETE ///
matches.delete('/:id', async(req, res) => {
	let index = await req.params.id
	let deletedOne = await getOneMatch(req.params.id)
	if (!deletedOne) {
		res.status(404).send('Match does not exist')
		return
	};

    const docRef = await db.collection(MATCH).doc(index)
	 await docRef.delete()
		res.status(200).send('Match is deleted')
})


//ASYNC FUNCTIONS COULD REFACTURATE//
//GET ALL MATCHES//
async function getAll() {
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
async function getOneMatch(id) {
	const matchesRef = db.collection(MATCH).doc(id)
	const matchSnapshot = await matchesRef.get()

	if( matchSnapshot.exists ) {
		return await matchSnapshot.data()
	} else {
		return null
	}
}

module.exports = matches
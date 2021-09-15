// Importera express och express router
const express = require('express')
const router = express.Router()

// Importera valideringsfunktioner
const { isProperIndex, isHamstersObject } = require('../src/validation/validation.js')

// Hämta databas
const database = require('../src/database.js')
const connect = database.connect
const db = connect()
const HAMSTERS = 'hamsters'

//GET /hamster
router.get('/', async (req, res) => {
	let array = await getAll()
	res.send(array)
})
//GET hamster/id
router.get('/:id', async (req, res) => {
	const maybeUser = await getOne(req.params.id)
	res.send(maybeUser)  // antingen null eller ett user-objekt
})
//PUT hamster/:id
router.put('/:id', async (req, res) => {
	const maybeBody = req.body
	// kontrollera att body är okej
	if( !isHamstersObject(maybeBody) ) {
		res.status(400).send('Must send a user object.')
		return
	}

	// skicka ändringar till databasen
	await updateOne(req.params.id, maybeBody)
	res.sendStatus(200)
})

// GET ALL FUNCTION
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

//GET ONE FUNCTION
async function getOne(id) {
	const docRef = db.collection(HAMSTERS).doc(id)
	const docSnapshot = await docRef.get()
	if( docSnapshot.exists ) {
		return await docSnapshot.data()
	} else {
		return null
	}
}

//PUT ONE FUNCTION TO
async function updateOne(id, object) {
	const docRef = db.collection(HAMSTERS).doc(id)
	docRef.set(object)
}

module.exports = router
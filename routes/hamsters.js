// Importera express och express router
const express = require('express')
const router = express.Router()

// Importera valideringsfunktioner
const { isProperIndex, isHamstersObject } = require('./modules/validation.js')

// Hämta databas
const database = require('../src/database.js')
const connect = database.connect
const db = connect()
const HAMSTERS = 'hamsters'

// GET GET GET GET //
//GET /hamster
router.get('/', async (req, res) => {
	let array = await getAll()
	res.send(array)
})

//GET hamster/random
router.get('/random', async (req, res) => {
    let hamsterArray = await getAll()

    let randomOne = await hamsterArray[Math.floor(Math.random() * hamsterArray.length)]
    res.send(randomOne) //
})

//GET hamster/id
router.get('/:id', async (req, res) => {
	const maybeUser = await getOne(req.params.id)
	res.send(maybeUser)  // antingen null eller ett user-objekt
})

//POST POST POST POST //
//POST hamster
router.post('/', async (req, res) => {
	let maybeBody = req.body
	if( !isHamstersObject(maybeBody) ) {
		res.status(400).send('Bad hamster object')
		return
	}

	await db.collection(HAMSTERS).add(maybeBody)
	res.sendStatus(200)
})

// PUT PUT PUT PUT //
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

// DELETE DELETE DELETE DELETE //
router.delete('/:id', async(req, res) => {
    const docRef = db.collection(HAMSTERS).doc()
	let id = Number(req.params.id)
	if( !isProperIndex(id, docRef.length) ) {
		res.status(400).send('Bad hamster index')
	} else {
        const docOne = docRef.doc(id)
		await docOne.delete()
		res.sendStatus(200)
	}
})

//FUNCTIONS FOR THE ROUTES CAN BE REMOVED TO A MODULE//
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
	const hamstersRef = db.collection(HAMSTERS).doc(id)
	const docSnapshot = await hamstersRef.get()
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
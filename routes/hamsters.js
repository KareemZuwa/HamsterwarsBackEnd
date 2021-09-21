// Importera express och express router
const express = require('express')
const router = express.Router()

// Importera valideringsfunktioner
const { isProperIndex, isHamstersObject , isGameObject} = require('./modules/validation.js')

// Hämta databas
const database = require('../src/database.js')
const connect = database.connect
const db = connect()
const HAMSTERS = 'hamsters'

// GET GET GET GET //
//GET /hamster
router.get('/', async (req, res) => {
	let hamsterArray = await getAll()
	res.send(hamsterArray)
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

	if (!maybeUser) {
		res.status(404).send('Hamster does not exist')
		return
	} else {
		res.status(200).send(maybeUser)
	}
})

//POST POST POST POST //
router.post('/', async (req, res) => {
	let maybeBody = await req.body
	if( !isHamstersObject(maybeBody) ) {
		res.status(400).send('Bad hamster object')
		return
	}
	let docRef = await db.collection(HAMSTERS).add(maybeBody)
	let newPost = {id: docRef.id}
	res.status(200).send(newPost)
})

// PUT PUT PUT PUT //
router.put('/:id', async (req, res) => {
	const maybeBody = await req.body
	// let docRef = db.collection(HAMSTERS).doc()

	let updateHamster = await getOne(req.params.id);
	if (!updateHamster) {
		res.sendStatus(404)
		return
	};
	
	if( !isGameObject(maybeBody) ) {
		res.status(400).send('Must send a user object.')
		return
	}
	
	await updateOne(req.params.id, maybeBody)
	res.sendStatus(200)

})

// DELETE DELETE DELETE DELETE //
router.delete('/:id', async(req, res) => {
	// const maybeBody = await req.body
	let index = req.params.id
	let hamsterArray = await getAll()
	let hamsterArrayId = hamsterArray.find(hamster => hamster.id === index)
	// console.log(hamsterArrayId.index)

	// if (deletedHamster) {
	// 	hamsterArray = hamsterArray.filter(hamster => hamster.index !== index);
	// 	const docRef = await db.collection(HAMSTERS).doc(index)
	//  	await docRef.delete()
	// 	 res.status(200).send('The hamster got deleted')
	// 	 return

	// } else {
	// 	res.status(404).send('Hamster you are lookin for does not exist')
	// }



	// 	console.log('It exist a hamster of this ID')

    const docRef = await db.collection(HAMSTERS).doc(index)
	 await docRef.delete()

		res.sendStatus(200)
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
	const settings = {merge: true}

	docRef.set(object, settings)
}

module.exports = router
// Importera express och express router
const express = require('express')
const router = express.Router()

// Hämta databas
const database = require('../src/database.js')
const connect = database.connect
const db = connect()
const HAMSTERS = 'hamsters'

router.get('/', async (req, res) => {
	let array = await getAll()
	res.send(array)
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

module.exports = router
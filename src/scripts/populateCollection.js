// Importera Firebase certifieringen och lägg i en variabel
const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

const hamsterData = require('../data.json')
// console.log(hamsterData)

populate();

// Fyll Collection med data
async function populate() {
	hamsterData.forEach(object => {
		let newObject = { ...object}
		db.collection(HAMSTERS).add(newObject)
	})
}
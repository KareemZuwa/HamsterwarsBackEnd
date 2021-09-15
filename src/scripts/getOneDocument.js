// Importera Firebase certifieringen och lägg i en variabel
const { connect } = require('../database.js')
const db = connect()

// Databas Collection Hamster
const HAMSTERS = 'hamsters'

// kalla på funktion
getOne();

// Hämta "Dart" från databasen
async function getOne(id) {
	console.log('Looking for Dart');
	const docId = id || '0LUjvKfuYAQON8iieS0l'

	const docSnapshot = await db.collection(HAMSTERS).doc(docId).get()

	if( !docSnapshot.exists ) {
		console.log('Could not find hamster!');
		return
	}
	const data = await docSnapshot.data()
	console.log('Found: ', data);
	return data
}

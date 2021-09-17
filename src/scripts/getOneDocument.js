// Importera Firebase certifieringen och lägg i en variabel
const { connect } = require('../database.js')
const db = connect()

// Databas Collection Hamster
const HAMSTERS = 'hamsters'

// kalla på funktion
getOne();

// Hämta en från databasen
async function getOne(id) {
	console.log('Looking for one Hamster');
	const docId = id || '1gF9PJHiUERqdn45i3jU'

	const docSnapshot = await db.collection(HAMSTERS).doc(docId).get()

	if( !docSnapshot.exists ) {
		console.log('Could not find hamster!');
		return
	}
	const data = await docSnapshot.data()
	console.log('Found: ', data);
	return data
}

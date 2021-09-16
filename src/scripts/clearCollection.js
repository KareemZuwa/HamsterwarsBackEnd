const { connect } = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'

clearCollection();

async function clearCollection() {
	const hamstersRef = db.collection(HAMSTERS)
	const hamsterSnapshot = await hamstersRef.get()

	// Om Collection är tom
	if( hamsterSnapshot.empty ) {
		console.log('Collection is empty')
		return
	}
		// Om Collection inte är tom så töm
	    hamsterSnapshot.forEach(docRef => {
		hamstersRef.doc(docRef.id).delete()
		// Vi behöver inte await - inget att vänta på
	})
}
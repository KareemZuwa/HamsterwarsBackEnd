// Importera Firebase certifieringen och lägg i en variabel
const { connect } = require('../database.js')
const db = connect()

// Databas Collection Hamster
const HAMSTERS = 'hamsters'

// Kalla på funktionen delete
deleteOne()

async function deleteOne(id) {
    console.log('Updating a document...')
    const docId = id || "6vHk8qDOonk0ldOOBnW9"

    const docRef = db.collection(HAMSTERS).doc(docId)
    const result = await docRef.delete()
    
    console.log('deleted result: ',result + docId);
}
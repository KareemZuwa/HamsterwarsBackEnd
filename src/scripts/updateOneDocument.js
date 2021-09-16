// Importera Firebase certifieringen och lägg i en variabel
const { connect } = require('../database.js')
const db = connect()

// Databas Collection Hamster
const HAMSTERS = 'hamsters'

// Kalla på funktionen för att update
updateOne()

async function updateOne(id) {
    console.log('Updating a document...')
    const docId = id || "5BU0yleU2QtFBWlXiYcI"

    const updates = {
        //Testar att ändra och uppdatera alla variabler 
        // wins: 0,
        // games: 0,
        age: 6,
        // favFood: 'tomat',
        // imgName: 'hamster-43.jpg',
        name: 'Quinn',
        loves: 'vattenlek',
        // defeats: 0
    }

    const settings = {merge: true}
    await db.collection(HAMSTERS).doc(docId).set(updates, settings)
}
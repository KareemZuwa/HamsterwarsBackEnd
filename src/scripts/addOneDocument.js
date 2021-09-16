// Importera Firebase certifieringen och lägg i en variabel
const { connect } = require('../database.js')
const db = connect()

// Databas Collection Hamster
const HAMSTERS = 'hamsters'

// Kalla på funktionen addOne
addOne()

async function addOne() {
    console.log('add a new document...');
    const hamsterObject = {
        wins: 0,
        games: 0,
        age: 2,
        favFood: 'honung',
        imgName: 'hamster-41.jpg',
        name: 'Smulan',
        loves: 'lukta på blommorna',
        defeats: 0
    }
    
    // utan att ange id
const docRef = await db.collection(HAMSTERS).add(hamsterObject)
console.log('The document id is: ' + docRef.id)
}
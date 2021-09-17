// Importera Firebase certifieringen och lägg i en variabel
const {connect} = require('../database.js')
const db = connect()

// Databas Collection Hamster
const HAMSTERS = 'hamsters'
getRandom();

async function getRandom () {
    // console.log('retreving all docs from database')

    // Hämta referens till den collection vi vill använda
    const hamstersRef = db.collection(HAMSTERS)
    // console.log(hamstersRef)

    // hämta alla documents som hamster collection innehåller
    const hamsterSnapshot = await hamstersRef.get()
    // console.log(hamsterSnapshot)

    if( hamsterSnapshot.empty ) {
        // Om det inte finns dokument i snapshot/collection
        console.log('No snapShots')
        return
    }

    // Lägg snapshot dokument i en ny tom array
    const array = []

    await hamsterSnapshot.forEach(async docRef => {
        const data = await docRef.data()
        // console.log('found document reference with id= ' + docRef.id);
        // console.log(data)
        data.id = docRef.id
        array.push(data)
    })

    // console.log('data from database: ', array)
    let randomOne = await array[Math.floor(Math.random() * array.length)]
    console.log('retreving random doc from database',randomOne)

    return randomOne
}
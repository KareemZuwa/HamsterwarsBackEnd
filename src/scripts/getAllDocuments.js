const {connect} = require('../database.js')
const db = connect()

const HAMSTERS = 'hamsters'


getAll();

async function getAll () {
    console.log('retreving all docs from database')

    // Hämta referens till den collection vi vill använda
    const hamstersRef = db.collection(HAMSTERS)
    // console.log(hamstersRef)

    // hämta alla documents som hamster collection innehåller
    const hamsterSnapshot = await hamstersRef.get()
    // console.log(hamsterSnapshot)

    if( hamsterSnapshot.empty ) {
        console.log('No snapShots')
        return
    }

    const array = []

    await hamsterSnapshot.forEach(async docRef => {
        const data = await docRef.data()
        // console.log('found document reference with id= ' + docRef.id);
        // console.log(data)
        data.id = docRef.id
        array.push(data)
    })

    console.log('data from database: ', array)
    return array
}
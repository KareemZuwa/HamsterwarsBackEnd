// Importera Firebase certifieringen och lägg i en variabel
const { connect } = require('../database.js')
const db = connect()

// Databas Collection Hamster
const HAMSTERS = 'hamsters'

// Kalla på funktionen delete
deleteOne()

async function deleteOne(id) {
    console.log('Updating a document...')
    const docId = id || "12AWb4BFKibYIkEb99BD"
    

    const docRef = db.collection(HAMSTERS).doc(docId)
    const result = await docRef.delete()
    
    console.log('deleted result: ',result + docId);
}

//med felsökning
// async function deleteOne(id) {
//     const docId = id || "qFNPMtqJyPdnOy18L75r";
//     const docRef = db.collection(HAMSTERS).doc(docId);
//     const docSnapshot = await docRef.get();
//     if (!docSnapshot.exists) {
//       return null;
//     }
//     docRef.delete();
//   }
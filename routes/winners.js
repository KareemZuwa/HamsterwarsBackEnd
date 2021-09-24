// Importera express och Exportera express router
const express = require('express')
const winners = express.Router()

// Hämta databas
const { db } = require('../routes/modules/dbvariable.js')
const HAMSTERS = 'hamsters'

winners.get('/', async (req, res) => {
    // let winnersArray = await getAll()
    // //filter by wins
    // let cutestHamsters = winnersArray.filter(cute => cute.wins)
	// //Choose top 5 winning Hamsters
    // let top5Hamsters = cutestHamsters.sort((a,b) => b-a).slice(0,5);
	let top5Hamsters = await cutestAll()

	res.status(200).send(top5Hamsters)
})

// GET ALL FUNCTION
async function getAll() {
	const hamstersRef = db.collection(HAMSTERS)
	const hamsterSnapshot = await hamstersRef.get()

	if( hamsterSnapshot.empty ) {
		return []
	}

	const array = []
	await hamsterSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})
	return array
}

async function cutestAll() {
	const hamsterSnapshot = await db.collection(HAMSTERS).get();
	let resultArray = [];
	await hamsterSnapshot.forEach(async (docRef) => {
	  const data = await docRef.data();
	  data.id = docRef.id;
	  let diffResult = data.wins - data.defeats;
	  let newResult = { id: data.id, diff: diffResult };
	  resultArray.push(newResult);
	});
	resultArray.sort((a, b) => {
	  return b.diff - a.diff;
	});
	let topDiff = resultArray.splice(0, 5);
	let cutest = [];
	for (let i = 0; i < topDiff.length; i++) {
	  let hamster = await db.collection(HAMSTERS).doc(topDiff[i].id).get();
	  let data = hamster.data();
	  cutest.push(data);
	}
	return cutest;
  }

module.exports = winners
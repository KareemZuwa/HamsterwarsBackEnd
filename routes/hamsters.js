// Importera express och exportera express router
const express = require('express')
const router = express.Router()

// Importera valideringsfunktioner
const { isHamstersObject , isGameObject} = require('./modules/validation.js')

// Hämta databas
const { db } = require('../routes/modules/dbvariable.js')
const HAMSTERS = 'hamsters'

// GET GET GET GET //
//GET /hamster
router.get('/', async (req, res) => {
	let hamsterArray = await getAll()
	res.send(hamsterArray)
})

//GET hamster/random
router.get('/random', async (req, res) => {
    let hamsterArray = await getAll()
    let randomOne = await hamsterArray[Math.floor(Math.random() * hamsterArray.length)]
    res.send(randomOne) //
})

router.get('/cutest', async (req, res) => {
	cutestOfThemAll = await cutestAll()

    res.status(200).send(cutestOfThemAll)
})

//GET hamster/id
router.get('/:id', async (req, res) => {
	const maybeUser = await getOne(req.params.id)

	if (!maybeUser) {
		res.status(404).send('Hamster does not exist')
		return
	} else {
		res.status(200).send(maybeUser)
	}
})

//POST POST POST POST //
router.post('/', async (req, res) => {
	let maybeBody = await req.body
	if( !isHamstersObject(maybeBody) ) {
		res.status(400).send('Bad hamster object')
		return
	}
	let docRef = await db.collection(HAMSTERS).add(maybeBody)
	let newPost = {id: docRef.id}
	res.status(200).send(newPost)
})

// PUT PUT PUT PUT //
router.put('/:id', async (req, res) => {
	const maybeBody = await req.body
	let updateHamster = await getOne(req.params.id);

	if (!updateHamster) {
		res.sendStatus(404)
		return
	};
	if( !isGameObject(maybeBody) ) {
		res.status(400).send('Must send a user object.')
		return
	}
	await updateOne(req.params.id, maybeBody)
	res.sendStatus(200)
})

// DELETE DELETE DELETE DELETE //
router.delete('/:id', async(req, res) => {
	let index = await req.params.id
	let deletedOne = await getOne(req.params.id)
	if (!deletedOne) {
		res.status(404).send('Hamster does not exist')
		return
	};

    const docRef = await db.collection(HAMSTERS).doc(index)
	 await docRef.delete()
		res.sendStatus(200)
})

//FUNCTIONS FOR THE ROUTES//
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

//GET ONE FUNCTION
async function getOne(id) {
	const hamstersRef = db.collection(HAMSTERS).doc(id)
	const docSnapshot = await hamstersRef.get()

	if( docSnapshot.exists ) {
		return await docSnapshot.data()
	} else {
		return null
	}
}

//PUT ONE FUNCTION TO
async function updateOne(id, object) {
	const docRef = db.collection(HAMSTERS).doc(id)
	const settings = {merge: true}

	docRef.set(object, settings)
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
	let topDiff = resultArray.splice(0, 1);
	let cutest = [];
	for (let i = 0; i < topDiff.length; i++) {
	  let hamster = await db.collection(HAMSTERS).doc(topDiff[i].id).get();
	  let data = hamster.data();
	  cutest.push(data);
	}
	return cutest;
  }

module.exports = router

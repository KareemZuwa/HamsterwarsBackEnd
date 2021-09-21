//Is proper index funktion
function isProperIndex(index, maxIndex) {
	return index >= 0 && index < maxIndex
}

function isHamstersObject(maybe) {
	if( (typeof maybe) !== 'object' ) {
		return false
	}
	// Body måste innehålla: onbjects keys
	let keys = Object.keys(maybe)  // ['name', 'email' ..]
	if( 
    !keys.includes('wins') || 
    !keys.includes('name') || 
    !keys.includes('favFood') || 
    !keys.includes('imgName') || 
    !keys.includes('age') ||
    !keys.includes('defeats') || 
    !keys.includes('games') || 
    !keys.includes('loves') 
    ) {
		return false
	}

	return true
}

function isGameObject(maybe) {
	if( (typeof maybe) !== 'object' ) {
		return false
	}
	// Body måste innehålla: onbjects keys
	let keys = Object.keys(maybe)  // ['name', 'email' ..]
	if( 
    !keys.includes('wins') || 
    !keys.includes('games')
    ) {
		return false
	}

	return true
}

module.exports = { isProperIndex, isHamstersObject, isGameObject }
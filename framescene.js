import * as gt from './geometrytools.js'

const scenes = []
let currentScene = 0
const sharedStates = {}

const sceneA = {
	states: {},
	work( aux ){
		// do work
		currentScene = 1
		return 'a'
	}
}
scenes.push(sceneA)

const sceneB = {
	states: {},
	work( aux ){
		// do work
		currentScene = 0
		return 'b'
	}
}
scenes.push(sceneB)

export default function ( ) {
	return scenes[currentScene].work
}

/*
function none(){}

function signalProcess ( ...calls ) {
	let ed = false
	return function signalTriggers (e) {
		calls[2*ed + e]()
		ed = e
	}
}

export default function genProcessTriggers({regular=none, onpush=none, onrelease=none, holding=none}) {
	return signalProcess(regular, onpush, onrelease, holding)
}
*/
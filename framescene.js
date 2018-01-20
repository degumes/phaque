import mkhand from './handangles.js'
const hand = mkhand()

const scenes = []
let currentRender = 0

let lastFinger = 0
let currentFinger = 0

let accTheta = 0
let accPhi = 0

function mkhs (callback) {
	let lastSignal = false
	return function holderSensor (signal) {
		if( lastSignal && !signal ) {
			callback()
		}
		lastSignal = signal
	}
}

function sceneA () {
	const handlers = [
		{
			key: 'l3',
			sensor: mkhs( () => {
				currentRender = 1
				hand.fingers[currentFinger].type = 'red'
				console.log(`going to scene: B currentFinger: ${currentFinger}`)
			})
		},
		{
			key: 'r3',
			sensor: mkhs( () => {
				currentRender = 2
				hand.fingers.forEach(f => {
					f.type = 'red'
				})
				accPhi = hand.phi
				accTheta = hand.theta
				console.log(`going to scene: C`)
			})
		},
		{
			key: 'up',
			sensor: mkhs( () => {
				lastFinger = currentFinger
				currentFinger++
				if (currentFinger === 5) {
					currentFinger = 0
				}
				hand.fingers[lastFinger].type = 'blue'
				hand.fingers[currentFinger].type = 'gree'
				console.log(`currentFinger: ${currentFinger}`)
			})
		},
		{
			key: 'down',
			sensor: mkhs( () => {

				lastFinger = currentFinger
				if (currentFinger === 0) {
					currentFinger = 4
				} else {
					currentFinger--
				}
				hand.fingers[lastFinger].type = 'blue'
				hand.fingers[currentFinger].type = 'gree'
				console.log(`currentFinger: ${currentFinger}`)
			})
		}
	]
	return function renderA (snapad) {
		for (const hdl of handlers) {
			hdl.sensor(snapad[hdl.key])
		}
		// transformations to hand shape
		return 'hand'
	}
}
scenes.push(sceneA())

function sceneB () {
	const handlers = [
		{
			key: 'r3',
			sensor: mkhs( () => {
				currentRender = 0
				hand.fingers[currentFinger].type = 'blue'
				console.log(`alpha: ${hand.fingers[currentFinger].angles.alpha} beta: ${hand.fingers[currentFinger].angles.beta} gamma: ${hand.fingers[currentFinger].angles.gamma} eta: ${hand.fingers[currentFinger].angles.eta}`)
			})
		},
		{
			key: 'alpha',
			sensor: a => {
				hand.fingers[currentFinger].angles['alpha'] = a
			}
		},
		{
			key: 'beta',
			sensor: b => {
				hand.fingers[currentFinger].angles['beta'] = b
			}			
		},
		{
			key: 'gamma',
			sensor: g => {
				hand.fingers[currentFinger].angles['gamma'] = g
			}			
		},
		{
			key: 'eta',
			sensor: e => {
				hand.fingers[currentFinger].angles['eta'] = e
			}			
		}
	]
	return function renderB (snapad) {
		for (const hdl of handlers) {
			hdl.sensor(snapad[hdl.key])
		}
		return 'hand'
	}
}
scenes.push(sceneB())

function sceneC () {
	const handlers = [
		{
			key: 'l3',
			sensor: mkhs( () => {
				currentRender = 0
				hand.fingers.forEach(f => {
					f.type = 'blue'
				})
				hand.fingers[currentFinger].type = 'green'
				
				console.log(`going to scene: A theta: ${hand.theta} phi: ${hand.phi}`)
			})
		},
		{
			key: 'theta',
			sensor: t => {
				hand.theta = accTheta + t
			}
		},
		{
			key: 'phi',
			sensor: p => {
				hand.phi = accPhi + p
			}			
		}
	]
	return function renderC (snapad) {
		for (const hdl of handlers) {
			hdl.sensor(snapad[hdl.key])
		}
		return 'hand'
	}
}
scenes.push(sceneC())

export default function ( ) {
	return scenes[currentRender]
}

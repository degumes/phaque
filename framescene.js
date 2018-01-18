const scenes = []
let currentRender = 0
let currentFinger = 0
const angleFingers = [[0,0,0],[0,0,0],[0,0,0]]

function mkhh (callback) {
	let ed = false
	return function holderHandler (e) {
		if( ed && !e ) {
			callback()
		}
		ed = e
	}
}

function sceneA () {
	const sensors = [
		{
			key: 'l3',
			signalHandler: mkhh( () => {
				currentRender = 1
				console.log('going to B')
			})
		},
		{
			key: 'up',
			signalHandler: mkhh( () => {
				currentFinger++
				if (currentFinger === 3) {
					currentFinger = 0
				}
				console.log(`currentFinger: ${currentFinger}`)
			})
		},
		{
			key: 'down',
			signalHandler: mkhh( () => {
				if (currentFinger === 0) {
					currentFinger = 2
				} else {
					currentFinger--
				}
				console.log(`currentFinger: ${currentFinger}`)
			})
		}
	]
	return function renderA (snapad) {
		for (const hdl of sensors) {
			hdl.signalHandler(snapad[hdl.key])
		}
		// transformations to hand shape
		return 'hand'
	}
}
scenes.push(sceneA())

function sceneB () {
	const sensors = [
		{
			key: 'r3',
			signalHandler: mkhh( () => {
				currentRender = 0
				console.log('going to A')
				console.log(angleFingers[currentFinger])
			})
		},
		{
			key: 'alpha',
			signalHandler: a => {
				angleFingers[currentFinger][2] = 0.5*Math.PI*a
			}
		},
		{
			key: 'beta',
			signalHandler: a => {
				angleFingers[currentFinger][1] = 0.5*Math.PI*a
			}			
		},
		{
			key: 'gamma',
			signalHandler: a => {
				angleFingers[currentFinger][0] = 0.25*Math.PI*a
			}			
		}
	]
	return function renderB (snapad) {
		for (const hdl of sensors) {
			hdl.signalHandler(snapad[hdl.key])
		}
		return 'hand'
	}
}
scenes.push(sceneB())


export default function ( ) {
	return scenes[currentRender]
}

import canvas from './canvas.js'
import gamepad from './razer.js'
import * as gt from './geometrytools.js'
import trigger from './trigger.js'

!void (function(){
	const [
		canvasDom,
		canvasContext,
		drawFinger
	] = canvas({width: 100, height: 100})
	
	const hand = [
		[-5, -5, 100, 30, -5, 100, 30, -5, 100, 65, -5, 100, 65, -5, 100, 100, -5, 100],
		[-5, 45, 100, 30, 45, 100, 30, 45, 100, 65, 45, 100, 65, 45, 100, 100, 45, 100],
		[-5, 95, 100, 30, 95, 100, 30, 95, 100, 65, 95, 100, 65, 95, 100, 100, 95, 100]
	]
	
	let fingerNumber = 0
	const trigger_up = trigger({onrelease: function trigger_up(){
		fingerNumber++
		if(fingerNumber === hand.length){
			fingerNumber = 0
		}
	}})
	const trigger_down = trigger({onrelease: function trigger_down(){
		if(fingerNumber === 0){
			fingerNumber = hand.length - 1
		} else {
			fingerNumber--
		}
	}})
	
	
	// make *loop to rAF
	const _gl = (function* (){
		while(true){
			// pause-resume generator
			yield
			
			// read gamepad
			let {
				l3: back,
				r3: log,
				l4: [
					phiN,
					phiS
				],
				l2: alfa,
				r2: teta,
				
				up,
				down
			} = gamepad()
			
			trigger_up(up)
			trigger_down(down)

			//gt.bendfinger([phiN, phiS, alfa, teta], finger3D)
			
			canvasContext.clearRect(0,0,100,100)

			canvasContext.strokeStyle = 'red'
			drawFinger(gt.projection(hand[fingerNumber]))
			for (let i=1; i<hand.length; i++) {			
				let idx = (fingerNumber+i) % hand.length
				
				canvasContext.strokeStyle = 'blue'
				drawFinger(gt.projection(hand[idx]))
			}
			
			requestAnimationFrame(gl)
		}	
	})()
	_gl.next()
	const gl = _gl.next.bind(_gl)
	
	
	window.onload = function(){
		document.body.appendChild(canvasDom)
		requestAnimationFrame(gl)
	}
	
})()

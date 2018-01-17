import canvas from './canvas.js'
import gamepad from './razer.js'
import fs from './framescene.js'

!void (function(){
	let t
	
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
	
	// make *loop to rAF
	const _gl = (function* (){
		while(true){
			// pause-resume generator
			yield t
			
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
				r3: edit,
				up,
				down,
			} = gamepad()
			
			let frame = fs()
			console.log(frame())
			//requestAnimationFrame(gl)
		}	
	})()
	_gl.next()
	const gl = _gl.next.bind(_gl)
	
	
	window.onload = function(){
		document.body.appendChild(canvasDom)
		requestAnimationFrame(gl)
	}
	
})()

/*
canvasContext.clearRect(0,0,100,100)
canvasContext.strokeStyle = 'red'
drawFinger(gt.projection(hand[fingerNumber]))
*/	
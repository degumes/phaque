import canvas from './canvas.js';
import gamepad from './razer.js';
import * as gt from './geometrytools.js';

!void (function(){
	const [
		canvasDom,
		canvasContext,
		drawFinger
	] = canvas({width: 100, height: 100})
	
	const hand = [
		[-20,-20, 100, 120,  -20, 100],// thumb
		[-20, 0, 100, 120, 0, 100],// index
		[-20, 20, 100, 120, 20, 100],// middle
		[-20, 40, 100, 120, 40, 100],// ring
		[-20, 80, 100, 120, 80, 100]// picky
	]


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
				r2: teta
			} = gamepad()

			//gt.bendfinger([phiN, phiS, alfa, teta], finger3D)
			for (let finger of hand) {
				drawFinger(gt.projection(finger))
			}
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

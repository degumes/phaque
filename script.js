import canvas from './canvas.js';
import gamepad from './razer.js';
import * as gt from './geometrytools.js';

(function(){
	const [
		canvasDom,
		canvasContext,
		drawFinger
	] = canvas({width: 100, height: 100})


	// make *loop to rAF
	const _gl = (function* (){
		while(true){
			yield
			
			let finger3D = [
				20, 20, 100,// x, y, z
				40, 20, 100,
				
				40, 20, 100,// P2
				60, 20, 100,
				
				60, 20, 100,// P3
				80, 20, 100
			]
			let {
				l4: [
					phiN,
					phiS
				],
				l2: alfa,
				r2: teta
			} = gamepad()

			//console.log(`phiN: ${phiN} phiS: ${phiN} alfa: ${alfa} teta: ${teta}`)
			
			gt.bendfinger([phiN, phiS, alfa, teta], finger3D)
			//console.log(finger3D)
			
			let fingerProjected = gt.projection(finger3D)	
			drawFinger(fingerProjected)
			
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

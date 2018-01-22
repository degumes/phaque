import gamepad from './razer.js'
import framer from './framescene.js'

!void (function(){
	let t
	let snapad
	let scene
	let hand

	// make *loop to rAF
	const _gl = (function* (){
		while(true){
			// pause-resume generator
			yield t
			
			// read gamepad
			snapad = gamepad()
			snapad.t = t
			
			// articulate interface
			scene = framer()
			hand = scene(snapad)
			
			// draw to canavs
			document.getElementById("theta").innerText = hand.theta.toFixed(2)
			document.getElementById("phi").innerText = hand.phi.toFixed(2)
			for ( const f of hand.fingers ) {
				document.getElementById(f.name).style.backgroundColor = f.type
				document.getElementById(f.name+"alpha").innerText = f.angles.alpha.toFixed(2)
				document.getElementById(f.name+"beta").innerText = f.angles.beta.toFixed(2)
				document.getElementById(f.name+"gamma").innerText = f.angles.gamma.toFixed(2)
				document.getElementById(f.name+"eta").innerText = f.angles.eta.toFixed(2)
			}
			
			requestAnimationFrame(gl)
		}	
	})()
	_gl.next()
	const gl = _gl.next.bind(_gl)
	
	
	window.onload = function(){
		requestAnimationFrame(gl)
	}
	
})()
/*
canvasContext.clearRect(0,0,100,100)
canvasContext.strokeStyle = 'red'
drawFinger(gt.projection(hand[fingerNumber]))
*/	

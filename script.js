'use strict';

(function(){
	// fixed sizes
	const width = 100
	const height = 100
	
	// init canvas
	const cv = document.createElement('canvas')
	cv.setAttribute('id', 'cv-000')
	cv.setAttribute('width', width+'px')
	cv.setAttribute('height', height+'px')
	
	// canvas context
	const canvasContext = cv.getContext('2d')
	canvasContext.strokeStyle = 'red'
	canvasContext.lineWidth = '4'
	canvasContext.lineCap = 'round'
	canvasContext.save()
	
	// make painter
	const drawer2D = ctx => bone => {
		/*
		** bone = [x0, y0, xf, yf]
		*/
		ctx.clearRect(0, 0, width, height)
		ctx.beginPath()
		ctx.moveTo(bone[0], bone[1])
		ctx.lineTo(bone[2], bone[3])
		ctx.stroke()
	}
	const drawBone = drawer2D(canvasContext)
	
	// read gamepad
	function getPressure(){
		const p = navigator.getGamepads()[0]
		return !p ? 0 : p.buttons[7].value
	}
	// spin bone
	const spinBone = bone => teta =>  [
		bone[0],
		bone[1],
		(Math.cos(teta)*(bone[2]-bone[0])-Math.sin(teta)*(bone[3]-bone[1])) + bone[0],
		(Math.sin(teta)*(bone[2]-bone[0])+Math.cos(teta)*(bone[3]-bone[1])) + bone[1]
	]

	
	// make *loop to rAF
	function* genloop(){

	}
	const _gl = (function* (){
		let lastrAF = 0
		let dt
		let t
		
		let teta = 0
		const spin = spinBone([ 25, 25, 75, 25 ])
		let bone

		while(true){
			t = yield
			dt = t - lastrAF
			lastrAF = t
			
			bone = spin(teta)
			drawBone(spin(teta))
			teta = Math.PI * getPressure() * 0.5
			
			console.log(bone)
			
			requestAnimationFrame(gl)
		}	
	})()
	_gl.next()
	const gl = _gl.next.bind(_gl)
	
	
	window.onload = function(){
		document.body.appendChild(cv)
		requestAnimationFrame(gl)
	}
	
})()

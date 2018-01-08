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
	
	// make painter
	const drawer2D = ctx => bone => {
		/*
		** bone = [x0, y0, xf, yf]
		*/
		ctx.strokeStyle = '#FF8800'
		ctx.lineWidth = '8'
		ctx.lineCap = 'round'
		ctx.beginPath()
		ctx.moveTo(bone[0], bone[1])
		ctx.lineTo(bone[2], bone[3])
		ctx.stroke()
	}
	const drawBone = drawer2D(cv.getContext('2d'))
	
	// read gamepad
	function getPressure(){
		return navigator.getGamepads()[0].buttons[7].value || 0
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

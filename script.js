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
	const drawer2D = ctx => finger => {
		/*
		** finger = [Axi, Ayi, Axf, Ayf, Bxi, Byi, Bxf, Byf]
		*/
		ctx.clearRect(0, 0, width, height)
		
		for(let i=0; i<finger.length/4; i++){
			ctx.beginPath()
			ctx.moveTo(finger[4*i], finger[4*i+1])
			ctx.lineTo(finger[4*i+2], finger[4*i+3])
			ctx.stroke()
		}
	}
	const drawFinger = drawer2D(canvasContext)
	
	// read gamepad
	function getAlfa(){
		const p = navigator.getGamepads()[0]
		return !p ? 0 : p.buttons[6].value
	}
	function getTeta(){
		const p = navigator.getGamepads()[0]
		return !p ? 0 : p.buttons[7].value
	}
	
	// shift origin
	function shift(n, dx, dy, arr) {
		for(let i=n; i<arr.length/4; i++){
			arr[4*i] -= dx
			arr[4*i + 1] -= dy
			arr[4*i + 2] -= dx
			arr[4*i + 3] -= dy
		}
	}
	// rotate
	function rotate(n, q, arr) {
		for(let i=n; i<arr.length/4; i++){
			let x0 = arr[4*i]
			let y0 = arr[4*i+1]
			arr[4*i] = x0*Math.cos(q) - y0*Math.sin(q)
			arr[4*i + 1] = x0*Math.sin(q) + y0*Math.cos(q)
			x0 = arr[4*i+2]
			y0 = arr[4*i+3]
			arr[4*i + 2] = x0*Math.cos(q) - y0*Math.sin(q)
			arr[4*i + 3] = x0*Math.sin(q) + y0*Math.cos(q)
		}
	}
	// spin finger
	function spinFinger(n, rads, finger){
		if(n < finger.length/4) {
			let dx = finger[4*n]
			let dy = finger[4*n+1]
			
			shift(n, dx, dy, finger)
			rotate(n, rads[n], finger)
			shift(n, -dx, -dy, finger)
			
			spinFinger(n+1, rads, finger)
		}
	}
	
	// make *loop to rAF
	const _gl = (function* (){
		
		let teta = 0
		let alfa = 0
		let finger

		while(true){
			yield
			
			finger = [ 25, 25, 50, 25, 50, 25, 75, 25 ]
			
			teta = Math.PI * getTeta() * 0.5
			alfa = Math.PI * getAlfa() * 0.5
			spinFinger(0, [alfa, teta], finger)
			drawFinger(finger)
			
			//console.log(finger)
			
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

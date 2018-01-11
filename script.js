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
	
	// read gamepad]
	function getPhi(){
		const p = navigator.getGamepads()[0]
		return !p ? [0,0] : [p.axes[0],p.axes[1]]
	}
	function getAlfa(){
		const p = navigator.getGamepads()[0]
		return !p ? 0 : p.buttons[6].value
	}
	function getTeta(){
		const p = navigator.getGamepads()[0]
		return !p ? 0 : p.buttons[7].value
	}
	
	// shift origin
	function shift(n, dx, dy, dz, arr) {
		for(let i=n; i<arr.length/6; i++){
			arr[6*i] -= dx
			arr[6*i + 1] -= dy
			arr[6*i + 2] -= dz
			arr[6*i + 3] -= dx
			arr[6*i + 4] -= dy
			arr[6*i + 5] -= dz
		}
	}
	// say no-no
	function hingeFinger(q, finger) {
		let dx = finger[0]
		let dy = finger[1]
		let dz = finger[2]
		
		shift(0, dx, dy, dz, finger)
		
		for(let i=0; i<finger.length/6; i++){
			let x0 = finger[6*i]
			let z0 = finger[6*i+2]
			finger[6*i] = x0*Math.cos(q) - z0*Math.sin(q)
			finger[6*i + 2] = x0*Math.sin(q) + z0*Math.cos(q)
			
			x0 = finger[6*i+3]
			z0 = finger[6*i+5]
			finger[6*i + 3] = x0*Math.cos(q) - z0*Math.sin(q)
			finger[6*i + 5] = x0*Math.sin(q) + z0*Math.cos(q)
		}
		
		shift(0, -dx, -dy, -dz, finger)
	}
	// snail finger
	function snailFinger(n, rads, finger){
		if(n < finger.length/6) {
			let dx = finger[6*n]
			let dy = finger[6*n+1]
			let dz = finger[6*n+2]
			
			shift(n, dx, dy, dz, finger)
			
			for(let i=n; i<finger.length/6; i++){
				let x0 = finger[6*i]
				let y0 = finger[6*i+1]
				finger[6*i] = x0*Math.cos(rads[n]) - y0*Math.sin(rads[n])
				finger[6*i + 1] = x0*Math.sin(rads[n]) + y0*Math.cos(rads[n])
				
				x0 = finger[6*i+3]
				y0 = finger[6*i+4]
				finger[6*i + 3] = x0*Math.cos(rads[n]) - y0*Math.sin(rads[n])
				finger[6*i + 4] = x0*Math.sin(rads[n]) + y0*Math.cos(rads[n])
			}
			
			shift(n, -dx, -dy, -dz, finger)
			
			snailFinger(n+1, rads, finger)
		}
	}
	// projection
	function projection(f) {
		// point of vision [50, 50, -100]
		// plane of projection [0,0,0] + z
		const projected = []
		for(let i=0; i<f.length/3; i++){
			projected.push(100*(f[3*i]-50)/(f[3*i+2]+100) + 50)
			projected.push(100*(f[3*i+1]-50)/(f[3*i+2]+100) + 50)
		}
		return projected
	}
	
	
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
			let [phiN, phiS] = getPhi()
			let alfa = Math.PI * getAlfa() * 0.5			
			let teta = Math.PI * getTeta() * 0.5
			//console.log(`phiN: ${phiN} phiS: ${phiN} alfa: ${alfa} teta: ${teta}`)
			
			snailFinger(0, [phiS, alfa, teta], finger3D)
			hingeFinger(phiN, finger3D)
			//console.log(finger3D)
			
			let fingerProjected = projection(finger3D)
			
			drawFinger(fingerProjected)
			
			//console.log(fingerProjected)
			
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

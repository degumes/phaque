(function(){
	const width = 100
	const height = 100
	
	const cv = document.createElement('canvas')
	cv.setAttribute('id', 'cv')
	cv.setAttribute('width', width+'px')
	cv.setAttribute('height', height+'px')
	
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
	
	window.onload = function(){
		document.body.appendChild(cv)
		drawBone([25,25,50,75])
	}
	
})()

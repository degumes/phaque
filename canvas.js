const cvDom = {}
let cvDomCount = 0

const drawer2D = (ctx, w, h) => f => {
	ctx.clearRect(0, 0, w, h)
	
	for(let i=0; i<f.length/4; i++){
		ctx.beginPath()
		ctx.moveTo(f[4*i], f[4*i+1])
		ctx.lineTo(f[4*i+2], f[4*i+3])
		ctx.stroke()
	}
}

export default function({width, height}) {
	const cv = document.createElement('canvas')
	
	const id = 'cv-' + cvDomCount.toString().padStart(3,'0')
	cv.setAttribute('id', id)
	cvDomCount++
	cvDom[id] = cv
	
	cv.setAttribute('width', width+'px')
	cv.setAttribute('height', height+'px')
	
	
	const ctx = cv.getContext('2d')
	ctx.strokeStyle = 'red'
	ctx.lineWidth = '4'
	ctx.lineCap = 'round'
	ctx.save()
	
	return [cv, ctx, drawer2D(ctx, width, height)]
}
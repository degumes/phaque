const dpi = window.devicePixelRatio || 1
let side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth

const canvas = document.getElementById('handgl')
canvas.width = side * dpi
canvas.height = side * dpi
canvas.style.width = side
canvas.style.height = side

window.onresize = () => {
	side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
	canvas.width = side * dpi
	canvas.height = side * dpi
	canvas.style.width = side
	canvas.style.height = side
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
	console.log(side)
}

const gl = canvas.getContext('webgl2')
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.clearColor(0.95, 0.95, 0.99, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

export default function (hand) {
	
}
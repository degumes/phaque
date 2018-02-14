let side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
const dpi = window.devicePixelRatio || 1
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

import VSHADER_SOURCE from './VSHADER_SOURCE.js'
const vShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vShader, VSHADER_SOURCE)
gl.compileShader(vShader)

import FSHADER_SOURCE from './FSHADER_SOURCE.js'
const fShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fShader, FSHADER_SOURCE)
gl.compileShader(fShader)

const program = gl.createProgram()
gl.attachShader(program, vShader)
gl.attachShader(program, fShader)
gl.linkProgram(program)

gl.enable(gl.CULL_FACE)
gl.enable(gl.DEPTH_TEST)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

const a_Position = gl.getAttribLocation(program, 'a_Position')

const vertexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
import vertexData from './vertexData.js'
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)

const vao = gl.createVertexArray()
gl.bindVertexArray(vao)

gl.enableVertexAttribArray(a_Position)

const FSIZE = vertexData.BYTES_PER_ELEMENT
gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 3*FSIZE, 0)

gl.useProgram(program)
gl.bindVertexArray(vao)

gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

export default function (hand) {
	
}
import VSHADER_SOURCE from './VSHADER_SOURCE.js'
import FSHADER_SOURCE from './FSHADER_SOURCE.js'
import vertexData from './vertexData.js'
import spinThetaPhi from './spinThetaPhi.js'

/*
** ################
** # SETUP CANVAS #
** ################
*/
let side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
side = 300
const dpi = window.devicePixelRatio || 1
const canvas = document.getElementById('handgl')
canvas.width = side * dpi
canvas.height = side * dpi
canvas.style.width = side
canvas.style.height = side

window.onresize = () => {
  side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
  side = 300
  canvas.width = side * dpi
  canvas.height = side * dpi
  canvas.style.width = side
  canvas.style.height = side
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
}

/*
** ###################
** # SETUP GL DRIVER #
** ###################
*/
const gl = canvas.getContext('webgl2')
window.gl = gl
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.clearColor(0.95, 0.95, 0.99, 1.0)

gl.vs = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(gl.vs, VSHADER_SOURCE)
gl.compileShader(gl.vs)

gl.fs = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(gl.fs, FSHADER_SOURCE)
gl.compileShader(gl.fs)

gl.exe = gl.createProgram()
gl.attachShader(gl.exe, gl.vs)
gl.attachShader(gl.exe, gl.fs)
gl.linkProgram(gl.exe)

gl.enable(gl.CULL_FACE)
gl.enable(gl.DEPTH_TEST)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

/*
** #############
** # SETUP ATT #
** #############
*/
gl.vao = gl.createVertexArray()
gl.bindVertexArray(gl.vao)

gl.vb = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, gl.vb)
gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)

gl.att = {}
gl.att.position = gl.getAttribLocation(gl.exe, 'position')
gl.enableVertexAttribArray(gl.att.position)

gl.vertexAttribPointer(gl.att.position, 4, gl.FLOAT, false, 4 * vertexData.BYTES_PER_ELEMENT, 0)

gl.useProgram(gl.exe)
gl.bindVertexArray(gl.vao)

/*
** #############
** # SETUP UNI #
** #############
*/
gl.uni = {}
gl.uni.spinThetaPhi = gl.getUniformLocation(gl.exe, 'spinThetaPhi')
gl.uniformMatrix4fv(gl.uni.spinThetaPhi, false, spinThetaPhi({spin: Math.PI / 12.0}))

gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)

export default function (hand) {
  return true
}

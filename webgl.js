import VSHADER_SOURCE from './VSHADER_SOURCE.js'
import FSHADER_SOURCE from './FSHADER_SOURCE.js'
import vertexSequence from './vertexSequence.js'
import vertexCoordinates from './vertexCoordinates.js'
import hadChanged from './hadChanged.js'
import * as tiltShift from './tiltShift.js'
import * as aimSpin from './aimSpin.js'

/*
** ################
** # SETUP CANVAS #
** ################
*/
let side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
side = 400
const dpi = window.devicePixelRatio || 1
const canvas = document.getElementById('handgl')
canvas.width = side * dpi
canvas.height = side * dpi
canvas.style.width = side * dpi * 2 + 'px'
canvas.style.height = side * dpi * 2 + 'px'

window.onresize = () => {
  side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
  side = 400
  canvas.width = side * dpi
  canvas.height = side * dpi
  canvas.style.width = side * dpi * 2 + 'px'
  canvas.style.height = side * dpi * 2 + 'px'
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
gl.clearColor(0.95, 0.95, 1.0, 1.0)

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

/*
** #############
** # SETUP ATT #
** #############
*/
gl.vao = gl.createVertexArray()
gl.bindVertexArray(gl.vao)

gl.vb = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, gl.vb)
gl.bufferData(gl.ARRAY_BUFFER, vertexSequence, gl.STATIC_DRAW)

gl.att = {}
gl.att.label = gl.getAttribLocation(gl.exe, 'label')
gl.enableVertexAttribArray(gl.att.label)

gl.vertexAttribPointer(gl.att.label, 1, gl.FLOAT, false, vertexSequence.BYTES_PER_ELEMENT, 0)

gl.useProgram(gl.exe)
gl.bindVertexArray(gl.vao)

/*
** #############
** # SETUP UNI #
** #############
*/
gl.uni = {}

gl.uni.vertexCoordinates = []
for (let i = 0; i < 8; i++) {
  gl.uni.vertexCoordinates[i] = gl.getUniformLocation(gl.exe, `vertexCoordinates[${i}]`)
  gl.uniform4f(gl.uni.vertexCoordinates[i],
    vertexCoordinates[4 * i + 0],
    vertexCoordinates[4 * i + 1],
    vertexCoordinates[4 * i + 2],
    vertexCoordinates[4 * i + 3])
}

gl.uni.tiltShift = []
for (let i = 0; i < 15; i++) {
  gl.uni.tiltShift[i] = gl.getUniformLocation(gl.exe, `tiltShift[${i}]`)
  gl.uniformMatrix4fv(gl.uni.tiltShift[i], false, tiltShift.matrixes[i])
}

gl.uni.aimSpin = gl.getUniformLocation(gl.exe, 'aimSpin')
const checkAimSpin = hadChanged({theta: Infinity, phi: Infinity, spin: Infinity})

export default function (hand) {
  if (checkAimSpin(hand)) {
    aimSpin.updater(hand)
    gl.uniformMatrix4fv(gl.uni.aimSpin, false, aimSpin.matrix)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 14, 15)
  }
}

import VSHADER_SOURCE from './VSHADER_SOURCE.js'
import FSHADER_SOURCE from './FSHADER_SOURCE.js'
import vertexSequence from './vertexSequence.js'
import vertexCoordinates from './vertexCoordinates.js'
import padHeight from './padHeight.js'
import shiftPad from './shiftPad.js'
import hadChanged from './hadChanged.js'
import * as tilt from './tilt.js'
import * as aimSpin from './aimSpin.js'

/*
** ################
** # SETUP CANVAS #
** ################
*/
const canvas = document.getElementById('handgl')
const dpi = window.devicePixelRatio || 1
console.log(dpi)

window.onresize = () => {
  const side = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth
  //const side = 400
  canvas.width = side * dpi
  canvas.height = side * dpi
  canvas.style.width = side + 'px'
  canvas.style.height = side + 'px'
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.draw()
}

/*
** ###################
** # SETUP GL DRIVER #
** ###################
*/
const gl = canvas.getContext('webgl2')
window.gl = gl
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
gl.clearColor(0.9, 0.9, 0.9, 1.0)

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

gl.uni.vertexCoordinates = gl.getUniformLocation(gl.exe, `vertexCoordinates`)
gl.uniform3fv(gl.uni.vertexCoordinates, vertexCoordinates)

gl.uni.padHeight = gl.getUniformLocation(gl.exe, `padHeight`)
gl.uniform1fv(gl.uni.padHeight, padHeight)

gl.uni.shiftPad = gl.getUniformLocation(gl.exe, `shiftPad`)
gl.uniform2fv(gl.uni.shiftPad, shiftPad)

gl.uni.currentFinger = gl.getUniformLocation(gl.exe, `currentFinger`)
gl.uniform1i(gl.uni.currentFinger, 0)
const checkCurrentFinger = hadChanged({currentFinger: 0})

gl.uni.fingerEditing = gl.getUniformLocation(gl.exe, `fingerEditing`)
gl.uniform1i(gl.uni.fingerEditing, 0)
const checkFingerEditing = hadChanged({fingerEditing: 0})

gl.uni.chirlt = gl.getUniformLocation(gl.exe, `chirlt`)
gl.uniform1f(gl.uni.chirlt, 1.0)
const checkChirlt = hadChanged({chirlt: 1.0})

gl.uni.aimSpin = gl.getUniformLocation(gl.exe, 'aimSpin')
const checkAimSpin = hadChanged({theta: Infinity, phi: Infinity, spin: Infinity})

gl.uni.tilt = []
for (let i = 0; i < 15; i++) {
  gl.uni.tilt[i] = gl.getUniformLocation(gl.exe, `tilt[${i}]`)
}
const checkPads = []
checkPads.push(hadChanged({chirlt: 0, eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))
checkPads.push(hadChanged({chirlt: 0, eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))
checkPads.push(hadChanged({chirlt: 0, eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))
checkPads.push(hadChanged({chirlt: 0, eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))
checkPads.push(hadChanged({chirlt: 0, eta: Infinity, gamma: Infinity}))
checkPads.push(hadChanged({beta: Infinity}))
checkPads.push(hadChanged({alpha: Infinity}))

gl.draw = function gldraw () {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 14, 15)
}

export default function (hand) {
  let needDraw = false
  if (checkAimSpin(hand)) {
    aimSpin.updater(hand)
    gl.uniformMatrix3fv(gl.uni.aimSpin, false, aimSpin.matrix)
    needDraw = true
  }
  if (checkChirlt(hand)) {
    gl.uniform1f(gl.uni.chirlt, hand.chirlt)
    needDraw = true
  }
  for (let i = 0; i < 15; i++) {
    const angles = hand.fingers[Math.trunc(i / 3)].angles
    angles.chirlt = hand.chirlt
    if (checkPads[i](angles)) {
      tilt.updateres[i](angles)
      gl.uniformMatrix3fv(gl.uni.tilt[i], false, tilt.matrixes[i])
      needDraw = true
    }
  }
  if (checkCurrentFinger({currentFinger: hand.currentFinger.id})) {
    gl.uniform1i(gl.uni.currentFinger, hand.currentFinger.id)
    needDraw = true
  }
  if (checkFingerEditing({fingerEditing: hand.currentFinger.editing})) {
    gl.uniform1i(gl.uni.fingerEditing, hand.currentFinger.editing)
    needDraw = true
  }
  if (needDraw) {
    gl.draw()
  }
}

/*
** DEBUGS
var compiled = gl.getShaderParameter(Shader, gl.COMPILE_STATUS)
var error = gl.getShaderInfoLog(Shader)
gl.deleteShader(Shader)
var linked = gl.getProgramParameter(program, gl.LINK_STATUS)
var error = gl.getProgramInfoLog(program)
*/

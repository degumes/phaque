import gamepad from './razer.js'
import framer from './framescene.js'
import drawgl from './webgl.js'

let snapad
let scene
let hand

// make *loop to rAF
const _gl = (function * () {
  while (true) {
    // pause-resume generator
    yield

    // read gamepad
    snapad = gamepad()

    // articulate interface
    scene = framer()
    hand = scene(snapad)

    // webgl draw
    drawgl(hand)

    // loop
    window.requestAnimationFrame(gl)
  }
})()
_gl.next()
const gl = _gl.next.bind(_gl)

window.onload = function () {
  document.getElementById('clickfullscreen').onclick = e => {
    e.srcElement.parentElement.style.display = 'none'
    document.body.webkitRequestFullScreen()
    window.onresize()
    window.requestAnimationFrame(gl)
  }
}

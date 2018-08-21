import gamepad from './razer.js'
import framer from './framescene.js'
import drawgl from './webgl.js'

let snapad
let scene
let hand

// make *loop to rAF
const ml = ( _ => {
  const gen = function * () {
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
      window.requestAnimationFrame(ml)
    }
  }
  
  const _ml = gen()
  _ml.next()
  
  return e => _ml.next(e)
})()

window.onload = function () {
  document.getElementById('clickfullscreen').onclick = e => {
    e.srcElement.parentElement.style.display = 'none'
    document.body.webkitRequestFullScreen()
    window.onresize()
    window.requestAnimationFrame(ml)
  }
}

import gamepad from './razer.js'
import framer from './framescene.js'
import canvas from './webgl.js'

(function () {
  let t
  let snapad
  let scene
  let hand

  // make *loop to rAF
  const _gl = (function * () {
    while (true) {
      // pause-resume generator
      yield t

      // read gamepad
      snapad = gamepad()
      snapad.t = t

      // articulate interface
      scene = framer()
      hand = scene(snapad)
	  
      window.requestAnimationFrame(gl)
    }
  })()
  _gl.next()
  const gl = _gl.next.bind(_gl)

  window.onload = function () {
    window.requestAnimationFrame(gl)
  }
})()
/*
canvasContext.clearRect(0,0,100,100)
canvasContext.strokeStyle = 'red'
drawFinger(gt.projection(hand[fingerNumber]))
*/

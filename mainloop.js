import gamepad from './razer.js'
import framer from './framescene.js'
import drawgl from './webgl.js'

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

      // webgl draw
      drawgl(hand)

      // form
      // draw to canavs
      /*
      document.getElementById('spin').innerText = hand.spin.toFixed(2)
      document.getElementById('theta').innerText = hand.theta.toFixed(2)
      document.getElementById('phi').innerText = hand.phi.toFixed(2)
      for (let i = 0; i < hand.fingers.length; i++) {
        if (hand.activeFinger.id === 5 || (hand.activeFinger.editing && hand.activeFinger.id === i)) {
          document.getElementById(hand.fingers[i].name).style.backgroundColor = 'red'
        } else if (hand.activeFinger.id === i) {
          document.getElementById(hand.fingers[i].name).style.backgroundColor = 'green'
        } else {
          document.getElementById(hand.fingers[i].name).style.backgroundColor = 'blue'
        }
        document.getElementById(hand.fingers[i].name + 'alpha').innerText = hand.fingers[i].angles.alpha.toFixed(2)
        document.getElementById(hand.fingers[i].name + 'beta').innerText = hand.fingers[i].angles.beta.toFixed(2)
        document.getElementById(hand.fingers[i].name + 'gamma').innerText = hand.fingers[i].angles.gamma.toFixed(2)
        document.getElementById(hand.fingers[i].name + 'eta').innerText = hand.fingers[i].angles.eta.toFixed(2)
      }
      */

      // loop
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

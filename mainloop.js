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
		window.requestAnimationFrame(gl)
	  }
  }
})()
/*
canvasContext.clearRect(0,0,100,100)
canvasContext.strokeStyle = 'red'
drawFinger(gt.projection(hand[fingerNumber]))

		<canvas id="handgl"></canvas>
		<form>
			<ul>
				<li id="spin">0.00</li>
				<li id="theta">0.00</li>
				<li id="phi">0.00</li>
				<li id="fingers">
					<ol>
						<li id="thumb">
							<span id="thumbalpha">0.00</span> <span id="thumbbeta">0.00</span> <span  id="thumbgamma">0.00</span> <span  id="thumbeta">0.00</span>
						</li>
						<li id="index">
							<span id="indexalpha">0.00</span> <span id="indexbeta">0.00</span> <span  id="indexgamma">0.00</span> <span  id="indexeta">0.00</span>
						</li>
						<li id="middle">
							<span id="middlealpha">0.00</span> <span id="middlebeta">0.00</span> <span  id="middlegamma">0.00</span> <span  id="middleeta">0.00</span>
						</li>
						<li id="ring">
							<span id="ringalpha">0.00</span> <span id="ringbeta">0.00</span> <span  id="ringgamma">0.00</span> <span  id="ringeta">0.00</span>
						</li>
						<li id="pinky">
							<span id="pinkyalpha">0.00</span> <span id="pinkybeta">0.00</span> <span  id="pinkygamma">0.00</span> <span  id="pinkyeta">0.00</span>
						</li>
					<ol>
				</li>
			</ul>
		</form>
		

      // form
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

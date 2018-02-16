const halfPI = Math.PI * 0.5

export default function () {
  const pads = navigator.getGamepads()
  if (!pads[0]) {
    return {
      alpha: 0,
      beta: 0,
      gamma: 0,
      eta: 0,
      theta: 0,
      phi: 0,
      l3: false,
      r3: false,
      up: false,
      down: false
    }
  } else {
    return {
      alpha: halfPI * pads[0].buttons[7].value, // R2
      beta: halfPI * pads[0].buttons[6].value, // L2
      gamma: halfPI * pads[0].axes[1], // LaV
      eta: halfPI * pads[0].axes[0], // LaH
      theta: halfPI * pads[0].axes[3], // RaV
      phi: halfPI * pads[0].axes[2], // RaH
      l3: pads[0].buttons[10].pressed,
      r3: pads[0].buttons[11].pressed,
      spin: halfPI * (pads[0].buttons[7].value - pads[0].buttons[6].value),
      up: pads[0].buttons[5].pressed,
      down: pads[0].buttons[4].pressed
    }
  }
}

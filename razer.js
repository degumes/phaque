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
      spin: 0,
      in: false,
      out: false,
      antiClockWise: false,
      clockWise: false,
      save: false,
      reset: false
    }
  } else {
    return {
      alpha: halfPI * pads[0].buttons[7].value, // R2
      beta: halfPI * pads[0].buttons[6].value, // L2
      gamma: halfPI * pads[0].axes[1], // LaV
      eta: halfPI * pads[0].axes[0], // LaH
      theta: halfPI * pads[0].axes[3], // RaV
      phi: halfPI * pads[0].axes[2], // RaH
      spin: halfPI * (pads[0].buttons[7].value - pads[0].buttons[6].value),
      in: pads[0].buttons[10].pressed,
      out: pads[0].buttons[11].pressed,
      antiClockWise: pads[0].buttons[4].pressed,
      clockWise: pads[0].buttons[5].pressed,
      save: pads[0].buttons[1].pressed,
      reset: pads[0].buttons[2].pressed
    }
  }
}

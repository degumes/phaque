const halfPI = Math.PI * 0.5

const padMap = {
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
      imgInc: false,
      imgDec: false,
      save: false,
      reset: false
  }

export default function () {
  const pads = navigator.getGamepads()
  if (pads[0] && pads[0].id === "Razer Razer Serval (STANDARD GAMEPAD Vendor: 1532 Product: 0900)" ) {
      padMap.alpha = halfPI * pads[0].buttons[7].value, // R2
      padMap.beta = halfPI * pads[0].buttons[6].value, // L2
      padMap.gamma = halfPI * pads[0].axes[1], // LaV
      padMap.eta = halfPI * pads[0].axes[0], // LaH
      padMap.theta = halfPI * pads[0].axes[2], // RaH
      padMap.phi = halfPI * pads[0].axes[3], // RaV
      padMap.spin = halfPI * (pads[0].buttons[7].value - pads[0].buttons[6].value),
      padMap.in = pads[0].buttons[10].pressed,
      padMap.out = pads[0].buttons[11].pressed,
      padMap.antiClockWise = pads[0].buttons[4].pressed,
      padMap.clockWise = pads[0].buttons[5].pressed,
      padMap.imgInc = pads[0].buttons[12].pressed,
      padMap.imgDec = pads[0].buttons[13].pressed,
      padMap.save = pads[0].buttons[1].pressed,
      padMap.reset = pads[0].buttons[2].pressed
  }
  return padMap
}

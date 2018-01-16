const halfPI = Math.PI * 0.5

export default function () {
	const pads = navigator.getGamepads()
	if (!pads[0]) {
		return {
			l2: 0,
			l3: false,
			l4: [0,0],
			r2: 0,
			r3: false,
			
			up: false,
			down: false
		}
	} else {
		return {
			l2: halfPI * pads[0].buttons[6].value,
			l3: pads[0].buttons[10].pressed,
			l4: [
				0.5 * halfPI * pads[0].axes[0],
				halfPI * pads[0].axes[1]
			],
			r2: halfPI * pads[0].buttons[7].value,
			r3: pads[0].buttons[11].pressed,
			
			up: pads[0].buttons[12].pressed,
			down: pads[0].buttons[13].pressed
		}
	}
}
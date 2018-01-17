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
			a: pads[0].buttons[0].pressed,
			b: pads[0].buttons[1].pressed,
			x: pads[0].buttons[3].pressed,
			y: pads[0].buttons[4].pressed,
			l1: halfPI * pads[0].buttons[4].value,
			l2: halfPI * pads[0].buttons[6].value,
			l3: pads[0].buttons[10].pressed,
			l4: [
				halfPI * pads[0].axes[0],
				halfPI * pads[0].axes[1]
			],
			r1: halfPI * pads[0].buttons[5].value,
			r2: halfPI * pads[0].buttons[7].value,
			r3: pads[0].buttons[11].pressed,
			r4: [
				halfPI * pads[0].axes[2],
				halfPI * pads[0].axes[3]
			],
			up: pads[0].buttons[12].pressed,
			down: pads[0].buttons[13].pressed,
			left: pads[0].buttons[14].pressed,
			right: pads[0].buttons[15].pressed
		}
	}
}
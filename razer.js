const halfPI = Math.PI * 0.5

export default function () {
	const pads = navigator.getGamepads()
	if (!pads[0]) {
		return {
			l2: 0,
			l4: [0,0],
			r2: 0			
		}
	} else {
		return {
			l2: halfPI * pads[0].buttons[6].value,
			l4: [
				0.5 * halfPI * pads[0].axes[0],
				halfPI * pads[0].axes[1]
			],
			r2: halfPI * pads[0].buttons[7].value
		}
	}
}
const Hand = {
	chirality: 'right',
	phi: 0,
	theta: 0,
	anchor: {x:0, y:0, z:0},
	fingers: [
		{
			name: 'thumb',
			type: 'green',
			angles: {
				alpha: 0,
				beta: 0,
				gamma: 0,
				eta: 0
			}
		},
		{
			name: 'index',
			type: 'blue',
			angles: {
				alpha: 0,
				beta: 0,
				gamma: 0,
				eta: 0
			}
		},
		{
			name: 'middle',
			type: 'blue',
			angles: {
				alpha: 0,
				beta: 0,
				gamma: 0,
				eta: 0
			}
		},
		{
			name: 'ring',
			type: 'blue',
			angles: {
				alpha: 0,
				beta: 0,
				gamma: 0,
				eta: 0
			}
		},
		{
			name: 'pinky',
			type: 'blue',
			angles: {
				alpha: 0,
				beta: 0,
				gamma: 0,
				eta: 0
			}
		}
	]
}

export default function(handInit={}){
	return Object.assign(handInit, Hand)
}

const Hand = {
  chirality: 'left',
  spin: 0,
  phi: 0,
  theta: 0,
  anchor: {x: 0, y: 0, z: 0},
  activeFinger: {
    id: 0,
    editing: false
  },
  fingers: [
    {
      name: 'thumb',
      angles: {
        alpha: 0,
        beta: 0,
        gamma: 0,
        eta: 0
      }
    },
    {
      name: 'index',
      angles: {
        alpha: 0,
        beta: 0,
        gamma: 0,
        eta: 0
      }
    },
    {
      name: 'middle',
      angles: {
        alpha: 0,
        beta: 0,
        gamma: 0,
        eta: 0
      }
    },
    {
      name: 'ring',
      angles: {
        alpha: 0,
        beta: 0,
        gamma: 0,
        eta: 0
      }
    },
    {
      name: 'pinky',
      angles: {
        alpha: 0,
        beta: 0,
        gamma: 0,
        eta: 0
      }
    }
  ]
}

export default function (handInit = {}) {
  return Object.assign(handInit, Hand)
}

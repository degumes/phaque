import mkhand from './handangles.js'
const hand = mkhand()

const scenes = []
let currentRender = 0

let lastFinger = 0
let currentFinger = 0

let accTheta = 0
let accPhi = 0
let accSpin = 0

function mkhs (callback) {
  let lastSignal = false
  return function holderSensor (signal) {
    if (lastSignal && !signal) {
      callback()
    }
    lastSignal = signal
  }
}

const mkScene = handlers => snapad => {
  for (const hdl of handlers) {
    hdl.sensor(snapad[hdl.key])
  }
  return hand
}

const handlers4pickFinger = [
  {
    key: 'in',
    sensor: mkhs(() => {
      currentRender = 1
      hand.currentFinger.id = currentFinger
      hand.currentFinger.editing = true
      console.log(`going to scene: B currentFinger: ${currentFinger}`)
    })
  },
  {
    key: 'out',
    sensor: mkhs(() => {
      currentRender = 2
      hand.currentFinger.id = 5
      hand.currentFinger.editing = true
      accSpin = hand.spin
      accPhi = hand.phi
      accTheta = hand.theta
      console.log(`going to scene: C`)
    })
  },
  {
    key: 'up',
    sensor: mkhs(() => {
      lastFinger = currentFinger
      currentFinger++
      if (currentFinger === 5) {
        currentFinger = 0
      }
      hand.currentFinger.id = currentFinger
      console.log(`currentFinger: ${currentFinger}`)
    })
  },
  {
    key: 'down',
    sensor: mkhs(() => {
      lastFinger = currentFinger
      if (currentFinger === 0) {
        currentFinger = 4
      } else {
        currentFinger--
      }
      hand.currentFinger.id = currentFinger
      console.log(`currentFinger: ${currentFinger}`)
    })
  }
]

const handlers4snailFinger = [
  {
    key: 'out',
    sensor: mkhs(() => {
      currentRender = 0
      hand.currentFinger.editing = false
      console.log(`alpha: ${hand.fingers[currentFinger].angles.alpha} beta: ${hand.fingers[currentFinger].angles.beta} gamma: ${hand.fingers[currentFinger].angles.gamma} eta: ${hand.fingers[currentFinger].angles.eta}`)
    })
  },
  {
    key: 'alpha',
    sensor: a => {
      hand.fingers[currentFinger].angles['alpha'] = a
    }
  },
  {
    key: 'beta',
    sensor: b => {
      hand.fingers[currentFinger].angles['beta'] = b
    }
  },
  {
    key: 'gamma',
    sensor: g => {
      hand.fingers[currentFinger].angles['gamma'] = g
    }
  },
  {
    key: 'eta',
    sensor: e => {
      hand.fingers[currentFinger].angles['eta'] = e
    }
  }
]

const handlers4aimHand = [
  {
    key: 'in',
    sensor: mkhs(() => {
      currentRender = 0
      hand.currentFinger.id = currentFinger
      hand.currentFinger.editing = false

      console.log(`going to scene: A spin: ${hand.spin} theta: ${hand.theta} phi: ${hand.phi}`)
    })
  },
  {
    key: 'theta',
    sensor: t => {
      hand.theta = accTheta + t
    }
  },
  {
    key: 'phi',
    sensor: p => {
      hand.phi = accPhi + p
    }
  },
  {
    key: 'spin',
    sensor: s => {
      hand.spin = accSpin + s
    }
  }
]

scenes.push(mkScene(handlers4pickFinger))
scenes.push(mkScene(handlers4snailFinger))
scenes.push(mkScene(handlers4aimHand))

export default function () {
  return scenes[currentRender]
}

const padY = 1.0 / 3.0

const shiftHand = new Float32Array([
  // thumb
  // thumb.pad[0]
  0.25,
  -Math.SQRT1_2 / 2.0,
  // thumb.pad[1]
  0.0,
  padY,
  // thumb.pad[2]
  0.0,
  padY,
  // index
  // index.pad[0]
  0.25,
  0.0,
  // index.pad[1]
  0.0,
  padY,
  // index.pad[2]
  0.0,
  padY,
  // middle
  // middle.pad[0]
  0.0,
  0.0,
  // middle.pad[1]
  0.0,
  padY,
  // middle.pad[2]
  0.0,
  padY,
  // ring
  // ring.pad[0]
  -0.25,
  0.0,
  // ring.pad[1]
  0.0,
  padY,
  // ring.pad[2]
  0.0,
  padY,
  // pink
  // pink.pad[0]
  -0.5,
  0.0,
  // pink.pad[1]
  0.0,
  padY,
  // pink.pad[2]
  0.0,
  padY
])

export default shiftHand

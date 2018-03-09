const matrixes = []
const scl = 400
const padY = 350 / 3 / scl
const a = Math.PI / 4
const tilt = [
  [0, 0, 0, a],
  [-a, a, a, a],
  [0, 0, 0, a],
  [0, 0, a, 0],
  [a, a, a, a]
  // [ni, gamma, beta, alpha]
]

// thumb
matrixes.push(new Float32Array([
  Math.cos(tilt[0][0]), Math.sin(tilt[0][0]), 0.0, 0.0,
  -Math.sin(tilt[0][0]) * Math.cos(tilt[0][1]), Math.cos(tilt[0][0]) * Math.cos(tilt[0][1]), Math.sin(tilt[0][1]), 0.0,
  Math.sin(tilt[0][0]) * Math.sin(tilt[0][1]), -Math.cos(tilt[0][0]) * Math.sin(tilt[0][1]), Math.cos(tilt[0][1]), 0.0,
  (100 + 500 / 3) / scl, -250 / scl, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[0][2]), Math.sin(tilt[0][2]), 0.0,
  0.0, -Math.sin(tilt[0][2]), Math.cos(tilt[0][2]), 0.0,
  0.0, padY, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[0][3]), Math.sin(tilt[0][3]), 0.0,
  0.0, -Math.sin(tilt[0][3]), Math.cos(tilt[0][3]), 0.0,
  0.0, padY, 0.0, 1.0
]))

// index
matrixes.push(new Float32Array([
  Math.cos(tilt[1][0]), Math.sin(tilt[1][0]), 0.0, 0.0,
  -Math.sin(tilt[1][0]) * Math.cos(tilt[1][1]), Math.cos(tilt[1][0]) * Math.cos(tilt[1][1]), Math.sin(tilt[1][1]), 0.0,
  Math.sin(tilt[1][0]) * Math.sin(tilt[1][1]), -Math.cos(tilt[1][0]) * Math.sin(tilt[1][1]), Math.cos(tilt[1][1]), 0.0,
  100 / scl, 0.0, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[1][2]), Math.sin(tilt[1][2]), 0.0,
  0.0, -Math.sin(tilt[1][2]), Math.cos(tilt[1][2]), 0.0,
  0.0, padY, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[1][3]), Math.sin(tilt[1][3]), 0.0,
  0.0, -Math.sin(tilt[1][3]), Math.cos(tilt[1][3]), 0.0,
  0.0, padY, 0.0, 1.0
]))

// middle
matrixes.push(new Float32Array([
  Math.cos(tilt[2][0]), Math.sin(tilt[2][0]), 0.0, 0.0,
  -Math.sin(tilt[2][0]) * Math.cos(tilt[2][1]), Math.cos(tilt[2][0]) * Math.cos(tilt[2][1]), Math.sin(tilt[2][1]), 0.0,
  Math.sin(tilt[2][0]) * Math.sin(tilt[2][1]), -Math.cos(tilt[2][0]) * Math.sin(tilt[2][1]), Math.cos(tilt[2][1]), 0.0,
  0.0, 0.0, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[2][2]), Math.sin(tilt[2][2]), 0.0,
  0.0, -Math.sin(tilt[2][2]), Math.cos(tilt[2][2]), 0.0,
  0.0, padY, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[2][3]), Math.sin(tilt[2][3]), 0.0,
  0.0, -Math.sin(tilt[2][3]), Math.cos(tilt[2][3]), 0.0,
  0.0, padY, 0.0, 1.0
]))

// ring
matrixes.push(new Float32Array([
  Math.cos(tilt[3][0]), Math.sin(tilt[3][0]), 0.0, 0.0,
  -Math.sin(tilt[3][0]) * Math.cos(tilt[3][1]), Math.cos(tilt[3][0]) * Math.cos(tilt[3][1]), Math.sin(tilt[3][1]), 0.0,
  Math.sin(tilt[3][0]) * Math.sin(tilt[3][1]), -Math.cos(tilt[3][0]) * Math.sin(tilt[3][1]), Math.cos(tilt[3][1]), 0.0,
  -100 / scl, 0.0, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[3][2]), Math.sin(tilt[3][2]), 0.0,
  0.0, -Math.sin(tilt[3][2]), Math.cos(tilt[3][2]), 0.0,
  0.0, padY, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[3][3]), Math.sin(tilt[3][3]), 0.0,
  0.0, -Math.sin(tilt[3][3]), Math.cos(tilt[3][3]), 0.0,
  0.0, padY, 0.0, 1.0
]))

// pinky
matrixes.push(new Float32Array([
  Math.cos(tilt[4][0]), Math.sin(tilt[4][0]), 0.0, 0.0,
  -Math.sin(tilt[4][0]) * Math.cos(tilt[4][1]), Math.cos(tilt[4][0]) * Math.cos(tilt[4][1]), Math.sin(tilt[4][1]), 0.0,
  Math.sin(tilt[4][0]) * Math.sin(tilt[4][1]), -Math.cos(tilt[4][0]) * Math.sin(tilt[4][1]), Math.cos(tilt[4][1]), 0.0,
  -200 / scl, 0.0, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[4][2]), Math.sin(tilt[4][2]), 0.0,
  0.0, -Math.sin(tilt[4][2]), Math.cos(tilt[4][2]), 0.0,
  0.0, padY, 0.0, 1.0
]))
matrixes.push(new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, Math.cos(tilt[4][3]), Math.sin(tilt[4][3]), 0.0,
  0.0, -Math.sin(tilt[4][3]), Math.cos(tilt[4][3]), 0.0,
  0.0, padY, 0.0, 1.0
]))

const updateres = []
for (let i = 0; i < 15; i++) {
  updateres.push(({alpha, beta, gamma, eta}) => {})
}

export {matrixes, updateres}

const matrix = new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0
])

const matrixRotZ = Float32Array.from(matrix)
const rotZ = function rotZ (spin) {
  const c = Math.cos(spin)
  const s = Math.sin(spin)
  matrixRotZ[0] = c
  matrixRotZ[1] = -s
  matrixRotZ[4] = s
  matrixRotZ[5] = c
}

// [Angle, Ux, Uy, Uz]
const arrayAU = new Float32Array([0, 0, 0, 0])
const thetaPhi2AU = function thetaPhi2AU ({theta, phi}) {
  const atan = Math.atan2(theta, phi)
  arrayAU[0] = Math.sqrt(Math.pow(theta, 2) + Math.pow(phi, 2))
  arrayAU[1] = -Math.sin(atan)
  arrayAU[2] = Math.cos(atan)
}

const matrixRotAU = Float32Array.from(matrix)
const rotAU = function rotAU () {
  const au = arrayAU
  const s = Math.sin(au[0])
  const c = Math.cos(au[0])
  const oc = 1 - c

  matrixRotAU[0] = oc * au[1] * au[1] + c
  matrixRotAU[1] = oc * au[1] * au[2] - au[3] * s
  matrixRotAU[2] = oc * au[1] * au[3] + au[2] * s
  matrixRotAU[4] = oc * au[1] * au[2] + au[3] * s
  matrixRotAU[5] = oc * au[2] * au[2] + c
  matrixRotAU[6] = oc * au[2] * au[3] - au[1] * s
  matrixRotAU[8] = oc * au[3] * au[1] - au[2] * s
  matrixRotAU[9] = oc * au[3] * au[2] + au[1] * s
  matrixRotAU[10] = oc * au[3] * au[3] + c
}
const spinThetaPhi = function spinThetaPhi ({spin, theta, phi}) {
  rotZ(spin)
  thetaPhi2AU({theta, phi})
  rotAU()// Rotation matrix from axis U and angle A
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      matrix[4 * i + j] =
        matrixRotZ[4 * i + 0] * matrixRotAU[4 * 0 + j] +
        matrixRotZ[4 * i + 1] * matrixRotAU[4 * 1 + j] +
        matrixRotZ[4 * i + 2] * matrixRotAU[4 * 2 + j] +
        matrixRotZ[4 * i + 3] * matrixRotAU[4 * 3 + j]
    }
  }
  return matrix
}

export default spinThetaPhi

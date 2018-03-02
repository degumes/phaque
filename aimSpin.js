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
const aimSpin = function aimSpin ({theta, phi, spin}) {
  rotZ(spin)
  thetaPhi2AU({theta, phi})
  rotAU()// Rotation matrix from axis U and angle A

  matrix[0] = matrixRotAU[0] * matrixRotZ[0] + matrixRotAU[1] * matrixRotZ[4]
  matrix[1] = matrixRotAU[4] * matrixRotZ[0] + matrixRotAU[5] * matrixRotZ[4]
  matrix[2] = matrixRotAU[8] * matrixRotZ[0] + matrixRotAU[9] * matrixRotZ[4]
  // matrix[3] =
  matrix[4] = matrixRotAU[0] * matrixRotZ[1] + matrixRotAU[1] * matrixRotZ[5]
  matrix[5] = matrixRotAU[4] * matrixRotZ[1] + matrixRotAU[5] * matrixRotZ[5]
  matrix[6] = matrixRotAU[8] * matrixRotZ[1] + matrixRotAU[9] * matrixRotZ[5]
  // matrix[7] =
  matrix[8] = matrixRotAU[2]
  matrix[9] = matrixRotAU[6]
  matrix[10] = matrixRotAU[10]
  // matrix[11] = 0
  // matrix[12] = 0
  // matrix[13] = 0
  // matrix[14] = 0
  // matrix[15] = 1
  /*
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      matrix[4 * i + j] =// transpose cause glsl is column major
        matrixRotZ[4 * i + 0] * matrixRotAU[4 * 0 + j] +
        matrixRotZ[4 * i + 1] * matrixRotAU[4 * 1 + j] +
        matrixRotZ[4 * i + 2] * matrixRotAU[4 * 2 + j] +
        matrixRotZ[4 * i + 3] * matrixRotAU[4 * 3 + j]
    }
  }
  */
  return matrix
}

export default aimSpin

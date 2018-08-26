const matrix = new Float32Array([
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0
])

const matrixRotZ = Float32Array.from(matrix)
const rotZ = function rotZ (spin) {
  const c = Math.cos(spin)
  const s = Math.sin(spin)
  matrixRotZ[0] = c
  matrixRotZ[1] = -s
  matrixRotZ[3] = s
  matrixRotZ[4] = c
}

// [Angle, Ux, Uy, Uz]
const arrayAU = new Float32Array([0, 0, 0, 0])
const thetaPhi2AU = function thetaPhi2AU ({theta, phi}) {
  const atan = Math.atan2(phi, theta)
  arrayAU[0] = Math.sqrt(Math.pow(theta, 2) + Math.pow(phi, 2))
  arrayAU[1] = Math.sin(atan)
  arrayAU[2] = Math.cos(atan)
  // arrayAU[3] = 0
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
  matrixRotAU[3] = oc * au[1] * au[2] + au[3] * s
  matrixRotAU[4] = oc * au[2] * au[2] + c
  matrixRotAU[5] = oc * au[2] * au[3] - au[1] * s
  matrixRotAU[6] = oc * au[3] * au[1] - au[2] * s
  matrixRotAU[7] = oc * au[3] * au[2] + au[1] * s
  matrixRotAU[8] = oc * au[3] * au[3] + c
}
const updater = function updater ({theta, phi, spin}) {
  rotZ(spin)
  thetaPhi2AU({theta, phi})
  rotAU()// Rotation matrix from axis U and angle A

  matrix[0] = matrixRotAU[0] * matrixRotZ[0] + matrixRotAU[1] * matrixRotZ[3]
  matrix[1] = matrixRotAU[3] * matrixRotZ[0] + matrixRotAU[4] * matrixRotZ[3]
  matrix[2] = matrixRotAU[6] * matrixRotZ[0] + matrixRotAU[7] * matrixRotZ[3]
  matrix[3] = matrixRotAU[0] * matrixRotZ[1] + matrixRotAU[1] * matrixRotZ[4]
  matrix[4] = matrixRotAU[3] * matrixRotZ[1] + matrixRotAU[4] * matrixRotZ[4]
  matrix[5] = matrixRotAU[6] * matrixRotZ[1] + matrixRotAU[7] * matrixRotZ[4]
  matrix[6] = matrixRotAU[2]
  matrix[7] = matrixRotAU[5]
  matrix[8] = matrixRotAU[8]
}

export {matrix, updater}

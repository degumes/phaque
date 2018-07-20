/*
 * 15 matrixes
 * one for each pad
 */
const matrixes = []
for (let i = 0; i < 15; i++) {
  matrixes.push(new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ]))
}

const mkEtaGammaUpdater = idx => ({eta, gamma}) => {
  const ce = Math.cos(eta)
  const se = Math.sin(eta)
  const cg = Math.cos(gamma)
  const sg = Math.sin(gamma)
  // E * G
  matrixes[idx][0] = ce
  matrixes[idx][1] = se
  matrixes[idx][4] = -se * cg
  matrixes[idx][5] = ce * cg
  matrixes[idx][6] = sg
  matrixes[idx][8] = se * sg
  matrixes[idx][9] = -ce * sg
  matrixes[idx][10] = cg
}

/*
 * thumb base need 2 extra transforms
 */
const mkThumbEtaGammaUpdater = idx => ({eta, gamma}) => {
  const ce = Math.cos(eta)
  const se = Math.sin(eta)
  const cg = Math.cos(gamma)
  const sg = Math.sin(gamma)

  // Eta * Gamma
  const a = []
  a[0] = ce
  a[1] = se
  a[2] = 0
  a[4] = -se * cg
  a[5] = ce * cg
  a[6] = sg
  a[8] = se * sg
  a[9] = -ce * sg
  a[10] = cg

  const PI4 = Math.PI / 4
  const chirlt = 1

  const cPI4 = Math.cos(chirlt * PI4)
  const sPI4 = Math.sin(chirlt * PI4)
  // rotY * E * G
  const b = []
  b[0] = cPI4 * a[0] + sPI4 * a[2]
  b[1] = a[1]
  b[2] = -sPI4 * a[0] + cPI4 * a[2]
  b[4] = cPI4 * a[4] + sPI4 * a[6]
  b[5] = a[5]
  b[6] = -sPI4 * a[4] + cPI4 * a[6]
  b[8] = cPI4 * a[8] + sPI4 * a[10]
  b[9] = a[9]
  b[10] = -sPI4 * a[8] + cPI4 * a[10]

  // rotZ * rotY * E * G
  matrixes[idx][0] = cPI4 * b[0] - sPI4 * b[1]
  matrixes[idx][1] = sPI4 * b[0] + cPI4 * b[1]
  matrixes[idx][2] = b[2]
  matrixes[idx][4] = cPI4 * b[4] - sPI4 * b[5]
  matrixes[idx][5] = sPI4 * b[4] + cPI4 * b[5]
  matrixes[idx][6] = b[6]
  matrixes[idx][8] = cPI4 * b[8] - sPI4 * b[9]
  matrixes[idx][9] = sPI4 * b[8] + cPI4 * b[9]
  matrixes[idx][10] = b[10]
}

const mkBetaUpdater = idx => ({beta}) => {
  const cb = Math.cos(beta)
  const sb = Math.sin(beta)
  matrixes[idx][5] = cb
  matrixes[idx][6] = sb
  matrixes[idx][9] = -sb
  matrixes[idx][10] = cb
}

const mkAlphaUpdater = idx => ({alpha}) => {
  const ca = Math.cos(alpha)
  const sa = Math.sin(alpha)
  matrixes[idx][5] = ca
  matrixes[idx][6] = sa
  matrixes[idx][9] = -sa
  matrixes[idx][10] = ca
}

const updateres = []
updateres.push(mkThumbEtaGammaUpdater(0))
updateres.push(mkBetaUpdater(1))
updateres.push(mkAlphaUpdater(2))
updateres.push(mkEtaGammaUpdater(3))
updateres.push(mkBetaUpdater(4))
updateres.push(mkAlphaUpdater(5))
updateres.push(mkEtaGammaUpdater(6))
updateres.push(mkBetaUpdater(7))
updateres.push(mkAlphaUpdater(8))
updateres.push(mkEtaGammaUpdater(9))
updateres.push(mkBetaUpdater(10))
updateres.push(mkAlphaUpdater(11))
updateres.push(mkEtaGammaUpdater(12))
updateres.push(mkBetaUpdater(13))
updateres.push(mkAlphaUpdater(14))

export {matrixes, updateres}
/**
 // E * G
 a[0] = ce
 a[1] = se
 a[2] = 0
 a[4] = -se * cg
 a[5] = ce * cg
 a[6] = sg
 a[8] = se * sg
 a[9] = -ce * sg
 a[10] = cg

 // G * E
 a[0] = ce
 a[1] = cg * se
 a[2] = sg * se
 a[4] = -se
 a[5] = cg * ce
 a[6] = sg * ce
 a[8] = 0
 a[9] = -sg
 a[10] = cg
*/

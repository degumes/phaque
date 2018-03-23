const matrixes = []
for (let i = 0; i < 15; i++) {
  matrixes.push(new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ]))
}
const mkThumbEtaGammaUpdater = idx => ({eta, gamma}) => {
  const ce = Math.cos(eta)
  const se = Math.sin(eta)
  const cg = Math.cos(gamma)
  const sg = Math.sin(gamma)

  const q = -Math.SQRT1_2

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

  // -rotY
  const b = []
  b[0] = q * (a[0] + a[2])
  b[1] = a[1]
  b[2] = q * (a[2] - a[0])
  b[4] = q * (a[4] + a[6])
  b[5] = a[5]
  b[6] = q * (a[6] - a[4])
  b[8] = q * (a[8] + a[10])
  b[9] = a[9]
  b[10] = q * (a[10] - a[8])

  // -rotZ
  matrixes[idx][0] = b[0]
  matrixes[idx][1] = b[1]
  matrixes[idx][2] = b[2]
  matrixes[idx][4] = b[4]
  matrixes[idx][5] = b[5]
  matrixes[idx][6] = b[6]
  matrixes[idx][8] = b[8]
  matrixes[idx][9] = b[9]
  matrixes[idx][10] = b[10]
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
/*
// E * G
matrixes[idx][0] = ce
matrixes[idx][1] = se
matrixes[idx][4] = -se * cg
matrixes[idx][5] = ce * cg
matrixes[idx][6] = sg
matrixes[idx][8] = se * sg
matrixes[idx][9] = -ce * sg
matrixes[idx][10] = cg

// G * E
matrixes[idx][0] = ce
matrixes[idx][1] = cg * se
matrixes[idx][2] = sg * se
matrixes[idx][4] = -se
matrixes[idx][5] = cg * ce
matrixes[idx][6] = sg * ce
matrixes[idx][9] = -sg
matrixes[idx][10] = cg

// -rotZ
matrixes[idx][0] = q * (b[0] - b[1])
matrixes[idx][1] = q * (b[0] + b[1])
matrixes[idx][2] = b[2]
matrixes[idx][4] = q * (b[4] - b[5])
matrixes[idx][5] = q * (b[4] + b[5])
matrixes[idx][6] = b[6]
matrixes[idx][8] = q * (b[8] - b[9])
matrixes[idx][9] = q * (b[8] + b[9])
matrixes[idx][10] = b[10]

*/

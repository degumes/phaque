const matrixes = []
for (let i = 0; i < 15; i++) {
  matrixes.push(new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ]))
}
const mkNiGammaUpdater = idx => ({eta, gamma}) => {
  const ce = Math.cos(eta)
  const se = Math.sin(eta)
  const cg = Math.cos(gamma)
  const sg = Math.sin(gamma)
  matrixes[idx][0] = ce
  matrixes[idx][1] = se
  matrixes[idx][4] = -(se * cg)
  matrixes[idx][5] = ce * cg
  matrixes[idx][6] = sg
  matrixes[idx][8] = se * sg
  matrixes[idx][9] = -(ce * sg)
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
updateres.push(mkNiGammaUpdater(0))
updateres.push(mkBetaUpdater(1))
updateres.push(mkAlphaUpdater(2))
updateres.push(mkNiGammaUpdater(3))
updateres.push(mkBetaUpdater(4))
updateres.push(mkAlphaUpdater(5))
updateres.push(mkNiGammaUpdater(6))
updateres.push(mkBetaUpdater(7))
updateres.push(mkAlphaUpdater(8))
updateres.push(mkNiGammaUpdater(9))
updateres.push(mkBetaUpdater(10))
updateres.push(mkAlphaUpdater(11))
updateres.push(mkNiGammaUpdater(12))
updateres.push(mkBetaUpdater(13))
updateres.push(mkAlphaUpdater(14))

export {matrixes, updateres}

/*
G * E
matrixes[idx][0] = ce
matrixes[idx][1] = se
matrixes[idx][4] = -se * cg
matrixes[idx][5] = ce * cg
matrixes[idx][6] = sg
matrixes[idx][8] = se * sg
matrixes[idx][9] = -ce * sg
matrixes[idx][10] = cg
*/

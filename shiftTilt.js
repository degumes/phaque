const matrixes = []
for (let i = 0; i < 15; i++ ) {
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
  matrixes[idx][4] = -se * cg
  matrixes[idx][5] = ce * cg
  matrixes[idx][6] =  sg
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

const scl = 400
const padY = 350 / 3 / scl
// thumb.pad[0]
matrixes[0][12] = (100 + 500 / 3) / scl
matrixes[0][13] =  -250 / scl
// thumb.pad[1]
matrixes[1][13] = padY
// thumb.pad[2]
matrixes[2][13] = padY

// index.pad[0]
matrixes[3][12] = 100 / scl
// index.pad[1]
matrixes[4][13] = padY
// index.pad[2]
matrixes[5][13] = padY

// middle.pad[1]
matrixes[7][13] = padY
// middle.pad[2]
matrixes[8][13] = padY

// ring.pad[0]
matrixes[9][12] = -100 / scl
// ring.pad[1]
matrixes[10][13] = padY
// ring.pad[2]
matrixes[11][13] = padY

// ring.pad[0]
matrixes[12][12] = -200 / scl
// ring.pad[1]
matrixes[13][13] = padY
// ring.pad[2]
matrixes[14][13] = padY

export {matrixes, updateres}

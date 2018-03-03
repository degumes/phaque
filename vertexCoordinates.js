const scl = 6.0 // scale factor

const vertexCoordinates = new Float32Array([
  1.0 / scl, 1.0 / scl, 1.0 / scl, 1,
  1.0 / scl, -1.0 / scl, 1.0 / scl, 1,
  -1.0 / scl, -1.0 / scl, 1.0 / scl, 1,
  -1.0 / scl, 1.0 / scl, 1.0 / scl, 1,
  1.0 / scl, 1.0 / scl, -1.0 / scl, 1,
  1.0 / scl, -1.0 / scl, -1.0 / scl, 1,
  -1.0 / scl, -1.0 / scl, -1.0 / scl, 1,
  -1.0 / scl, 1.0 / scl, -1.0 / scl, 1
])

export default vertexCoordinates

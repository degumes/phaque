const phalanxShift = new Float32Array([
  // thumb
  0.25, -0.625, 0, 0,
  0.45833333333333326, -0.41666666666666674, 0, 0,
  0.6666666666666665, -0.20833333333333337, 0, 0,
  // index
  0.25, 0, 0, 0,
  0.25, 0.2916666666666667, 0, 0,
  0.25, 0.5833333333333334, 0, 0,
  // middle
  0, 0, 0, 0,
  0, 0.2916666666666667, 0, 0,
  0, 0.5833333333333334, 0, 0,
  // ring
  -0.25, 0, 0, 0,
  -0.25, 0.2916666666666667, 0, 0,
  -0.25, 0.5833333333333334, 0, 0,
  // pinky
  -0.5, 0, 0, 0,
  -0.5, 0.2916666666666667, 0, 0,
  -0.5, 0.5833333333333334, 0, 0
])

export default phalanxShift

/*
vec4(x, y, z, w) = vec4(x / w, y / w, z / w, 1)

(0, 0, 0, 1) center
(1, 1, 1, 1) right up front
*/

/* // scale = 400
  // thumb
  100, -250, 0.0, 0,
  100 + 250 / 3, -250 + 250 / 3, 0.0, 0,
  100 + 500 / 3, -250 + 500 / 3, 0.0, 0,
  // index
  100, 0.0, 0.0, 0,
  100, 350 / 3, 0.0, 0,
  100, 700 / 3, 0.0, 0,
  // middle
  0.0, 0.0, 0.0, 0,
  0.0, 350 / 3, 0.0, 0,
  0.0, 700 / 3, 0.0, 0,
  // ring
  -100, 0.0, 0.0, 0,
  -100, 350 / 3, 0.0, 0,
  -100, 700 / 3, 0.0, 0,
  // pinky
  -100, 0.0, 0.0, 0,
  -100, 350 / 3, 0.0, 0,
  -100, 700 / 3, 0.0, 0,
*/

const matrix = new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0
])
/*
  0 1 2 3
  4 5 6 7
  8 9 0 1
  2 3 4 5
*/

const spinThetaPhi = function spinThetaPhi ({spin, theta, phi} = {spin: 0, theta: 0, phi: 0}) {
  matrix[0] = Math.cos(spin)
  matrix[1] = -Math.sin(spin)
  matrix[4] = Math.sin(spin)
  matrix[5] = Math.cos(spin)
  return matrix
}

export default spinThetaPhi

/*
  Rz =
  c -s 0
  s c 0
  0 0 1

axis = normalize(axis);
float s = sin(angle)
float c = cos(angle)
float oc = 1.0 - c;

oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
0.0,                                0.0,                                0.0,                                1.0);
*/

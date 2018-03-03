const VSHADER_SOURCE = `#version 300 es
in vec4 label;
vec4 viewed;
uniform mat4 aimSpin;
uniform vec4 vertexCoordinates[8];
uniform vec4 phalanxShift[15];
out vec4 color;

void main() {
  vec4 vertex = vertexCoordinates[int(label)];

  if (vertex.z < 0.0) {
    color = vec4(1.0, 0.8, 0.8, 1.0);
  }else{
    color = vec4(0.1, 0.1, 0.1, 1.0);
  }

  //viewed = aimSpin * vertex + phalanxShift[gl_InstanceID];
  //gl_Position = vec4(viewed.xy / (0.25 * viewed.z + 1.0),viewed.zw);

  gl_Position = aimSpin * vertex + phalanxShift[gl_InstanceID];
}`

export default VSHADER_SOURCE

// gl_Position = vec4(position.xy / zToDivideBy, position.zw)
// flat out int instanceID = gl_InstanceID

const VSHADER_SOURCE = `#version 300 es
in vec4 label;
uniform mat4 aimSpin;
uniform mat4 tiltShift[15];
uniform vec4 vertexCoordinates[8];
out vec4 color;

void main() {
  vec4 vertex = vertexCoordinates[int(label)];
  vec4 viewed;

  if (vertex.z > 0.0) {
    color = vec4(1.0, 0.8, 0.8, 1.0);
  }else{
    color = vec4(0.1, 0.1, 0.1, 1.0);
  }

  viewed = aimSpin * tiltShift[gl_InstanceID] * vertex;
  gl_Position = vec4(viewed.xy / (0.25 * viewed.z + 1.0),viewed.zw);
}`

export default VSHADER_SOURCE

// gl_Position = vec4(position.xy / zToDivideBy, position.zw)

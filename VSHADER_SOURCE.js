const VSHADER_SOURCE = `#version 300 es
in vec4 label;
uniform mat4 aimSpin;
uniform mat4 tilt[15];
uniform vec2 shiftPad[15];
uniform vec4 vertexCoordinates[8];
out vec4 color;

void main() {
  vec4 vertex = vertexCoordinates[int(label)];
  int finger = gl_InstanceID / 3;
  int pad = gl_InstanceID - 3 * finger;

  if (vertex.z > 0.0) {
    color = vec4(1.0, 0.8, 0.8, 1.0);
  }else{
    color = vec4(0.1, 0.1, 0.1, 1.0);
  }

  switch (pad) {
    case 2:
      vertex.xy = vertex.xy + shiftPad[3 * finger + 2];
      vertex = tilt[3 * finger + 2] * vertex;
    case 1:
      vertex.xy = vertex.xy + shiftPad[3 * finger + 1];
      vertex = tilt[3 * finger + 1] * vertex;
    case 0:
      vertex.xy = vertex.xy + shiftPad[3 * finger];
      vertex = tilt[3 * finger + 0] * vertex;
  }

  vertex = aimSpin * vertex;

  gl_Position = vec4(vertex.xy / (0.25 * vertex.z + 1.0), vertex.zw);
}`

export default VSHADER_SOURCE

// gl_Position = vec4(position.xy / zToDivideBy, position.zw)

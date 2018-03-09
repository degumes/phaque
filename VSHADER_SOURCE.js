const VSHADER_SOURCE = `#version 300 es
in vec4 label;
uniform mat4 aimSpin;
uniform mat4 shiftTilt[15];
uniform vec4 vertexCoordinates[8];
out vec4 color;

void main() {
  vec4 vertex = vertexCoordinates[int(label)];
  int finger = gl_InstanceID / 3;
  int pad = gl_InstanceID - 3 * finger;
  vec4 shiftTilted;
  vec4 aimSpined;
  vec4 viewed;

  if (vertex.z > 0.0) {
    color = vec4(1.0, 0.8, 0.8, 1.0);
  }else{
    color = vec4(0.1, 0.1, 0.1, 1.0);
  }

  shiftTilted = vertex;
  switch (pad) {
    case 2:
      shiftTilted = shiftTilt[3 * finger + 2] * shiftTilted;
    case 1:
      shiftTilted = shiftTilt[3 * finger + 1] * shiftTilted;
    case 0:
      shiftTilted = shiftTilt[3 * finger + 0] * shiftTilted;
  }
  aimSpined = aimSpin * shiftTilted;
  viewed = vec4(aimSpined.xy / (0.25 * aimSpined.z + 1.0), aimSpined.zw);
  gl_Position = viewed;
}`

export default VSHADER_SOURCE

// gl_Position = vec4(position.xy / zToDivideBy, position.zw)

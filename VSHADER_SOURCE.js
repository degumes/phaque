const VSHADER_SOURCE = `#version 300 es
in vec3 label;
uniform int currentFinger;
uniform bool fingerEditing;
uniform float chirlt;
uniform mat3 aimSpin;
uniform mat3 tilt[15];
uniform float padHeight[15];
uniform vec2 shiftPad[5];
uniform vec3 vertexCoordinates[8];
out vec4 color;

void main() {
  vec3 vertex = vertexCoordinates[int(label)];
  int finger = gl_InstanceID / 3;
  int pad = gl_InstanceID - 3 * finger;


  if (vertex.z > 0.0) {
    if (currentFinger == 5 || fingerEditing && currentFinger == finger) {
      // red
      color = vec4(0.9, 0.2, 0.2, 1.0);
    } else if (currentFinger == finger) {
      // green
      color = vec4(0.2, 0.9, 0.2, 1.0);
    } else {
      // blue
      color = vec4(0.2, 0.2, 0.9, 1.0);
    }
  }else{
    // black
    color = vec4(0.2, 0.2, 0.2, 1.0);
  }

  switch (pad) {
    case 2:
      vertex.y = vertex.y + padHeight[3 * finger + 2] / 2.0;
      vertex = tilt[3 * finger + 2] * vertex;
      vertex.y = vertex.y + padHeight[3 * finger + 1] / 2.0;
    case 1:
      vertex.y = vertex.y + padHeight[3 * finger + 1] / 2.0;
      vertex = tilt[3 * finger + 1] * vertex;
      vertex.y = vertex.y + padHeight[3 * finger + 0] / 2.0;
    case 0:
      vertex.y = vertex.y + padHeight[3 * finger + 0] / 2.0;
      vertex = tilt[3 * finger] * vertex;
      vertex.x = vertex.x - chirlt * shiftPad[finger].x;
      vertex.y = vertex.y + shiftPad[finger].y;
      
      // sem inversão
      //vertex.x = vertex.x + shiftPad[finger].x;
  }

  vertex = aimSpin * vertex;

  gl_Position = vec4(vertex.xy / (0.25 * vertex.z + 1.0), vertex.z, 1.0);
}`

export default VSHADER_SOURCE

// gl_Position = vec4(position.xy / zToDivideBy, position.zw)
// vertex.y = vertex.y +- shiftPad[3 * finger + 1].y;

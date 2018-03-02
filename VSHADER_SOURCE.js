const VSHADER_SOURCE = `#version 300 es
in vec4 label;
uniform mat4 aimSpin;
uniform vec4 vertexCoordinates[8];
out vec4 color;

void main() {
  vec4 vertex = vertexCoordinates[int(label)];
  if (vertex.z < 0.0) {
    color = vec4(1.0, 0.8, 0.8, 1.0);
  }else{
    color = vec4(0.1, 0.1, 0.1, 1.0);
  }

  gl_Position = aimSpin * vertex;
}`

export default VSHADER_SOURCE

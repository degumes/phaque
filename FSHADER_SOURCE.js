const FSHADER_SOURCE = `#version 300 es
precision lowp float;
out vec4 outColor;
in vec4 color;
void main() {
  outColor = color;
}`

export default FSHADER_SOURCE

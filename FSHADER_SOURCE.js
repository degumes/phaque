const FSHADER_SOURCE = `#version 300 es
precision lowp float;
out vec4 outColor;
in vec4 vColor;
void main() {
  outColor = vColor;;
}`

export default FSHADER_SOURCE

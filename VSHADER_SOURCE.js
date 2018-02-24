const VSHADER_SOURCE = `#version 300 es
in vec4 position;
uniform mat4 spinThetaPhi;
void main() {
  gl_Position = spinThetaPhi*position;
}`

export default VSHADER_SOURCE

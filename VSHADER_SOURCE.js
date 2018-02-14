const VSHADER_SOURCE = `#version 300 es
in vec4 a_Position;
void main() {
	gl_Position = a_Position;
}`

export default VSHADER_SOURCE
const VSHADER_SOURCE = `#version 300 es
in vec4 position;
uniform mat4 spinThetaPhi;
out vec4 vColor;

void main() {

  if(position.z < 0.0){
    vColor = vec4(1.0, 0.8, 0.8, 1.0);
  }else{
    vColor = vec4(0.1, 0.1, 0.1, 1.0);
  }

  gl_Position = spinThetaPhi*position;
}`

export default VSHADER_SOURCE

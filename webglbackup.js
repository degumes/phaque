var VSHADER_SOURCE = `#version 300 es
	in vec4 a_Position;
	in float a_ColorID;
	uniform vec4 u_ColorMap[9];
	uniform mat4 u_Matrix[9];
	out vec4 v_Color;
	
	void main() {
		bool cid = bool(a_ColorID);
		float fiid = float(gl_InstanceID);
		float ffiid = floor(fiid/3.0);
		vec4 roted = u_Matrix[gl_InstanceID]*a_Position;
		gl_Position.x = roted.x / (roted.z + 2.0) - 0.5 * ffiid + 0.5;
		gl_Position.y = roted.y / (roted.z + 2.0) + 0.5 * (fiid - ffiid*3.0) -0.5;
		gl_Position.z = roted.z;
		gl_Position.w = roted.w;
		//
		if(cid){
			v_Color = u_ColorMap[gl_InstanceID];
		}else{
			v_Color = vec4(0.0, 0.0, 0.0, 1.0);
		}

	}
`
var FSHADER_SOURCE = `#version 300 es
	precision lowp float;
	in vec4 v_Color;
	out vec4 outColor;
	void main() {
		outColor = v_Color;
	}
`
var canvas
var gl
var vShader
var fShader
var program
//
//
var vao
var a_Position
var a_ColorID
var u_ColorMap = []
var u_Matrix = []
var wasDedix = 4
var dedix = 4
var dedixMap = []
for (let i = 0; i < 9; i++) {
  dedixMap.push({up: undefined, down: undefined, left: undefined, right: undefined, value: i})
}
dedixMap[0].up = dedixMap[1]
dedixMap[0].down = dedixMap[2]
dedixMap[0].left = dedixMap[6]
dedixMap[0].right = dedixMap[3]
dedixMap[1].up = dedixMap[2]
dedixMap[1].down = dedixMap[0]
dedixMap[1].left = dedixMap[7]
dedixMap[1].right = dedixMap[4]
dedixMap[2].up = dedixMap[0]
dedixMap[2].down = dedixMap[1]
dedixMap[2].left = dedixMap[8]
dedixMap[2].right = dedixMap[5]
dedixMap[3].up = dedixMap[4]
dedixMap[3].down = dedixMap[5]
dedixMap[3].left = dedixMap[0]
dedixMap[3].right = dedixMap[6]
dedixMap[4].up = dedixMap[5]
dedixMap[4].down = dedixMap[3]
dedixMap[4].left = dedixMap[1]
dedixMap[4].right = dedixMap[7]
dedixMap[5].up = dedixMap[3]
dedixMap[5].down = dedixMap[4]
dedixMap[5].left = dedixMap[2]
dedixMap[5].right = dedixMap[8]
dedixMap[6].up = dedixMap[7]
dedixMap[6].down = dedixMap[8]
dedixMap[6].left = dedixMap[3]
dedixMap[6].right = dedixMap[0]
dedixMap[7].up = dedixMap[8]
dedixMap[7].down = dedixMap[6]
dedixMap[7].left = dedixMap[4]
dedixMap[7].right = dedixMap[1]
dedixMap[8].up = dedixMap[6]
dedixMap[8].down = dedixMap[7]
dedixMap[8].left = dedixMap[5]
dedixMap[8].right = dedixMap[2]

var vertexBuffer
var vertexData = new Float32Array([
	 3.0 / 4.0, -2.0 / 4.0, 2.0 / 4.0,
	 0.0,
	 3.0 / 4.0, 2.0 / 4.0, 2.0 / 4.0,
	 0.0,
  -3.0 / 4.0, -2.0 / 4.0, 2.0 / 4.0,
  0.0,
  -3.0 / 4.0, 2.0 / 4.0, 2.0 / 4.0,
  0.0,
  -2.0 / 4.0, 1.0 / 4.0, -2.0 / 4.0,
  1.0,
	 3.0 / 4.0, 2.0 / 4.0, 2.0 / 4.0,
	 0.0,
	 2.0 / 4.0, 1.0 / 4.0, -2.0 / 4.0,
  1.0,
	 3.0 / 4.0, -2.0 / 4.0, 2.0 / 4.0,
  0.0,
	 2.0 / 4.0, -1.0 / 4.0, -2.0 / 4.0,
  1.0,
  -3.0 / 4.0, -2.0 / 4.0, 2.0 / 4.0,
  0.0,
  -2.0 / 4.0, -1.0 / 4.0, -2.0 / 4.0,
  1.0,
  -2.0 / 4.0, 1.0 / 4.0, -2.0 / 4.0,
  1.0,
	 2.0 / 4.0, -1.0 / 4.0, -2.0 / 4.0,
  1.0,
	 2.0 / 4.0, 1.0 / 4.0, -2.0 / 4.0,
  1.0
])
var FSIZE = vertexData.BYTES_PER_ELEMENT
var rotate = []
for (let i = 0; i < 9; i++) {
  rotate[i] = new Float32Array([
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ])
}

function update_rotate (m, a, o) {
  var c = Math.cos
  var s = Math.sin
  m[0] = c(a)
  m[1] = 0
  m[2] = -s(a)
	// m[3] = 0

  m[4] = s(a) * s(o)
  m[5] = c(o)
  m[6] = c(a) * s(a)
	// m[7] = 0

  m[8] = s(a) * c(o)
  m[9] = -s(o)
  m[10] = c(a) * c(o)
	// m[11] = 0

	// m[12] = 0
	// m[13] = 0
	// m[14] = 0
	// m[15] = 1
}

let up = false
let wasUp = false
let left = false
let wasLeft = false
let down = false
let wasDown = false
let right = false
let wasRight = false

function loopAnimationFrame () {
  const gp = navigator.getGamepads()[0]
  if (gp) {
    const h = -navigator.getGamepads()[0].axes[0] * 0.5 * Math.PI
    const v = -navigator.getGamepads()[0].axes[1] * 0.5 * Math.PI

    if (wasDedix !== dedix) {
      gl.uniform4f(u_ColorMap[wasDedix], 1.0, 1.0, 1.0, 1.0)
      gl.uniform4f(u_ColorMap[dedix], 1.0, 0.0, 0.0, 1.0)
    }
    wasDedix = dedix

    up = navigator.getGamepads()[0].axes[3] < -0.7
    down = navigator.getGamepads()[0].axes[3] > 0.7
    left = navigator.getGamepads()[0].axes[2] > 0.7
    right = navigator.getGamepads()[0].axes[2] < -0.7

    if (wasUp && !up) {
      dedix = dedixMap[dedix].up.value
    }
    if (wasDown && !down) {
      dedix = dedixMap[dedix].down.value
    }
    if (wasLeft && !left) {
      dedix = dedixMap[dedix].left.value
    }
    if (wasRight && !right) {
      dedix = dedixMap[dedix].right.value
    }
    wasUp = up
    wasDown = down
    wasLeft = left
    wasRight = right

    update_rotate(rotate[dedix], h, v)
    gl.clearColor(0.90, 0.90, 0.90, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.uniformMatrix4fv(u_Matrix[dedix], false, rotate[dedix])
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 14, 9)
  }
  requestAnimationFrame(loopAnimationFrame)
}

window.onload = function () {
  canvas = document.getElementsByTagName('canvas')[0]
  gl = canvas.getContext('webgl2')
  vShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vShader, VSHADER_SOURCE)
  gl.compileShader(vShader)
  fShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fShader, FSHADER_SOURCE)
  gl.compileShader(fShader)
  program = gl.createProgram()
  gl.attachShader(program, vShader)
  gl.attachShader(program, fShader)
  gl.linkProgram(program)
		//
		//
  gl.clearColor(0.90, 0.90, 0.90, 1.0)
		// gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
		//
  a_Position = gl.getAttribLocation(program, 'a_Position')
  a_ColorID = gl.getAttribLocation(program, 'a_ColorID')
		//
  vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW)
		//
  vao = gl.createVertexArray()
  gl.bindVertexArray(vao)
  gl.enableVertexAttribArray(a_Position)
  gl.enableVertexAttribArray(a_ColorID)
		//
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 4, 0)
  gl.vertexAttribPointer(a_ColorID, 1, gl.FLOAT, false, FSIZE * 4, FSIZE * 3)
		//
		//
  gl.useProgram(program)
		//
		//
  for (let i = 0; i < 9; i++) {
    u_Matrix[i] = gl.getUniformLocation(program, 'u_Matrix[' + i + ']')
    gl.uniformMatrix4fv(u_Matrix[i], false, rotate[i])
			//
    u_ColorMap[i] = gl.getUniformLocation(program, 'u_ColorMap[' + i + ']')
    gl.uniform4f(u_ColorMap[i], 1.0, 1.0, 1.0, 1.0)
    gl.uniform4f(u_ColorMap[dedix], 1.0, 0.0, 0.0, 1.0)
  }
		//
  gl.bindVertexArray(vao)
		//
  gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 14, 9)

  requestAnimationFrame(loopAnimationFrame)
}
/*
** DEBUGS
var compiled = gl.getShaderParameter(Shader, gl.COMPILE_STATUS)
var error = gl.getShaderInfoLog(Shader)
gl.deleteShader(Shader)
var linked = gl.getProgramParameter(program, gl.LINK_STATUS)
var error = gl.getProgramInfoLog(program)
*/

/*
** resizes
css aparência
html/js canvas tamanho buffer
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
window.innerWidth
window.devicePixelRatio
*/

import frag from "./shader.frag";
import vert from "./shader.vert";
import matIV from "./lib/minMatrix.ts";

const canvasSize: CanvasSize = {
    width: 500,
    height: 500
};

enum ShaderType {
    vertex,
    fragment
};

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = canvasSize.width;
canvas.height = canvasSize.height;

const gl = canvas.getContext("webgl") as WebGLRenderingContext;
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clearDepth(1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

const createShader = (shaderType: ShaderType, shaderText: string): WebGLShader | void => {
    const glType = shaderType === ShaderType.vertex? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
    const shader: WebGLShader = gl.createShader(glType);
    gl.shaderSource(shader, shaderText);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS)? shader : alert(gl.getShaderInfoLog(shader));
};

const createProgram = (vs: WebGLShader, fs: WebGLShader): WebGLProgram | void => {
    const program: WebGLProgram = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return alert(gl.getProgramInfoLog(program));

    gl.useProgram(program);
    return program;
};

const createVbo = (data: number[]) => {
    const vbo: WebGLBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
};

const vertShader = createShader(ShaderType.vertex, vert) as WebGLShader;
const fragShader = createShader(ShaderType.fragment, frag) as WebGLShader;

const program = createProgram(vertShader, fragShader) as WebGLProgram;

const attLocation: GLint = gl.getAttribLocation(program, 'position');
const attStride = 3;
const vertexPosition = [
    0.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
   -1.0, 0.0, 0.0
];

const vbo = createVbo(vertexPosition);
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.enableVertexAttribArray(attLocation);
gl.vertexAttribPointer(attLocation, attStride, gl.FLOAT, false, 0, 0);

const mat = new matIV();
const mMatrix = mat.identity(mat.create());
const vMatrix = mat.identity(mat.create());
const pMatrix = mat.identity(mat.create());
const mvpMatrix = mat.identity(mat.create());
mat.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);
mat.perspective(90, canvas.width / canvas.height, 0.1, 100, pMatrix);
mat.multiply(pMatrix, vMatrix, mvpMatrix);
mat.multiply(mvpMatrix, mMatrix, mvpMatrix);

const uniLocation = gl.getUniformLocation(program, 'mvpMatrix');
gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);
gl.drawArrays(gl.TRIANGLES, 0, 3);
gl.flush();

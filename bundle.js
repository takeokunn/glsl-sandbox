/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const shader_frag_1 = __webpack_require__(/*! ./shader.frag */ "./src/shader.frag");
const shader_vert_1 = __webpack_require__(/*! ./shader.vert */ "./src/shader.vert");
const minMatrix_ts_1 = __webpack_require__(/*! ./lib/minMatrix.ts */ "./src/lib/minMatrix.ts");
const canvasSize = {
    width: 500,
    height: 500
};
var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["vertex"] = 0] = "vertex";
    ShaderType[ShaderType["fragment"] = 1] = "fragment";
})(ShaderType || (ShaderType = {}));
;
const canvas = document.getElementById("canvas");
canvas.width = canvasSize.width;
canvas.height = canvasSize.height;
const gl = canvas.getContext("webgl");
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clearDepth(1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
const createShader = (shaderType, shaderText) => {
    const glType = shaderType === ShaderType.vertex ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
    const shader = gl.createShader(glType);
    gl.shaderSource(shader, shaderText);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : alert(gl.getShaderInfoLog(shader));
};
const createProgram = (vs, fs) => {
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        return alert(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    return program;
};
const createVbo = (data) => {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
};
const vertShader = createShader(ShaderType.vertex, shader_vert_1.default);
const fragShader = createShader(ShaderType.fragment, shader_frag_1.default);
const program = createProgram(vertShader, fragShader);
const attLocation = gl.getAttribLocation(program, 'position');
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
const mat = new minMatrix_ts_1.default();
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


/***/ }),

/***/ "./src/lib/minMatrix.ts":
/*!******************************!*\
  !*** ./src/lib/minMatrix.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ------------------------------------------------------------------------------------------------
// minMatrix.js
// version 0.0.1
// Copyright (c) doxas
// ------------------------------------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
function matIV() {
    this.create = function () {
        return new Float32Array(16);
    };
    this.identity = function (dest) {
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = 1;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 0;
        dest[9] = 0;
        dest[10] = 1;
        dest[11] = 0;
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    };
    this.multiply = function (mat1, mat2, dest) {
        const a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3], e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7], i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11], m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15], A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3], E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7], I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11], M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
        dest[0] = A * a + B * e + C * i + D * m;
        dest[1] = A * b + B * f + C * j + D * n;
        dest[2] = A * c + B * g + C * k + D * o;
        dest[3] = A * d + B * h + C * l + D * p;
        dest[4] = E * a + F * e + G * i + H * m;
        dest[5] = E * b + F * f + G * j + H * n;
        dest[6] = E * c + F * g + G * k + H * o;
        dest[7] = E * d + F * h + G * l + H * p;
        dest[8] = I * a + J * e + K * i + L * m;
        dest[9] = I * b + J * f + K * j + L * n;
        dest[10] = I * c + J * g + K * k + L * o;
        dest[11] = I * d + J * h + K * l + L * p;
        dest[12] = M * a + N * e + O * i + P * m;
        dest[13] = M * b + N * f + O * j + P * n;
        dest[14] = M * c + N * g + O * k + P * o;
        dest[15] = M * d + N * h + O * l + P * p;
        return dest;
    };
    this.scale = function (mat, vec, dest) {
        dest[0] = mat[0] * vec[0];
        dest[1] = mat[1] * vec[0];
        dest[2] = mat[2] * vec[0];
        dest[3] = mat[3] * vec[0];
        dest[4] = mat[4] * vec[1];
        dest[5] = mat[5] * vec[1];
        dest[6] = mat[6] * vec[1];
        dest[7] = mat[7] * vec[1];
        dest[8] = mat[8] * vec[2];
        dest[9] = mat[9] * vec[2];
        dest[10] = mat[10] * vec[2];
        dest[11] = mat[11] * vec[2];
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
        return dest;
    };
    this.translate = function (mat, vec, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];
        dest[12] = mat[0] * vec[0] + mat[4] * vec[1] + mat[8] * vec[2] + mat[12];
        dest[13] = mat[1] * vec[0] + mat[5] * vec[1] + mat[9] * vec[2] + mat[13];
        dest[14] = mat[2] * vec[0] + mat[6] * vec[1] + mat[10] * vec[2] + mat[14];
        dest[15] = mat[3] * vec[0] + mat[7] * vec[1] + mat[11] * vec[2] + mat[15];
        return dest;
    };
    this.rotate = function (mat, angle, axis, dest) {
        let sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
        if (!sq) {
            return null;
        }
        let a = axis[0], b = axis[1], c = axis[2];
        if (sq != 1) {
            sq = 1 / sq;
            a *= sq;
            b *= sq;
            c *= sq;
        }
        const d = Math.sin(angle), e = Math.cos(angle), f = 1 - e, g = mat[0], h = mat[1], i = mat[2], j = mat[3], k = mat[4], l = mat[5], m = mat[6], n = mat[7], o = mat[8], p = mat[9], q = mat[10], r = mat[11], s = a * a * f + e, t = b * a * f + c * d, u = c * a * f - b * d, v = a * b * f - c * d, w = b * b * f + e, x = c * b * f + a * d, y = a * c * f + b * d, z = b * c * f - a * d, A = c * c * f + e;
        if (angle) {
            if (mat != dest) {
                dest[12] = mat[12];
                dest[13] = mat[13];
                dest[14] = mat[14];
                dest[15] = mat[15];
            }
        }
        else {
            dest = mat;
        }
        dest[0] = g * s + k * t + o * u;
        dest[1] = h * s + l * t + p * u;
        dest[2] = i * s + m * t + q * u;
        dest[3] = j * s + n * t + r * u;
        dest[4] = g * v + k * w + o * x;
        dest[5] = h * v + l * w + p * x;
        dest[6] = i * v + m * w + q * x;
        dest[7] = j * v + n * w + r * x;
        dest[8] = g * y + k * z + o * A;
        dest[9] = h * y + l * z + p * A;
        dest[10] = i * y + m * z + q * A;
        dest[11] = j * y + n * z + r * A;
        return dest;
    };
    this.lookAt = function (eye, center, up, dest) {
        const eyeX = eye[0], eyeY = eye[1], eyeZ = eye[2], upX = up[0], upY = up[1], upZ = up[2], centerX = center[0], centerY = center[1], centerZ = center[2];
        if (eyeX == centerX && eyeY == centerY && eyeZ == centerZ) {
            return this.identity(dest);
        }
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, l;
        z0 = eyeX - center[0];
        z1 = eyeY - center[1];
        z2 = eyeZ - center[2];
        l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= l;
        z1 *= l;
        z2 *= l;
        x0 = upY * z2 - upZ * z1;
        x1 = upZ * z0 - upX * z2;
        x2 = upX * z1 - upY * z0;
        l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!l) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        }
        else {
            l = 1 / l;
            x0 *= l;
            x1 *= l;
            x2 *= l;
        }
        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!l) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        }
        else {
            l = 1 / l;
            y0 *= l;
            y1 *= l;
            y2 *= l;
        }
        dest[0] = x0;
        dest[1] = y0;
        dest[2] = z0;
        dest[3] = 0;
        dest[4] = x1;
        dest[5] = y1;
        dest[6] = z1;
        dest[7] = 0;
        dest[8] = x2;
        dest[9] = y2;
        dest[10] = z2;
        dest[11] = 0;
        dest[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
        dest[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
        dest[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
        dest[15] = 1;
        return dest;
    };
    this.perspective = function (fovy, aspect, near, far, dest) {
        const t = near * Math.tan((fovy * Math.PI) / 360);
        const r = t * aspect;
        const a = r * 2, b = t * 2, c = far - near;
        dest[0] = (near * 2) / a;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = (near * 2) / b;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 0;
        dest[9] = 0;
        dest[10] = -(far + near) / c;
        dest[11] = -1;
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = -(far * near * 2) / c;
        dest[15] = 0;
        return dest;
    };
    this.transpose = function (mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[4];
        dest[2] = mat[8];
        dest[3] = mat[12];
        dest[4] = mat[1];
        dest[5] = mat[5];
        dest[6] = mat[9];
        dest[7] = mat[13];
        dest[8] = mat[2];
        dest[9] = mat[6];
        dest[10] = mat[10];
        dest[11] = mat[14];
        dest[12] = mat[3];
        dest[13] = mat[7];
        dest[14] = mat[11];
        dest[15] = mat[15];
        return dest;
    };
    this.inverse = function (mat, dest) {
        const a = mat[0], b = mat[1], c = mat[2], d = mat[3], e = mat[4], f = mat[5], g = mat[6], h = mat[7], i = mat[8], j = mat[9], k = mat[10], l = mat[11], m = mat[12], n = mat[13], o = mat[14], p = mat[15], q = a * f - b * e, r = a * g - c * e, s = a * h - d * e, t = b * g - c * f, u = b * h - d * f, v = c * h - d * g, w = i * n - j * m, x = i * o - k * m, y = i * p - l * m, z = j * o - k * n, A = j * p - l * n, B = k * p - l * o, ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
        dest[0] = (f * B - g * A + h * z) * ivd;
        dest[1] = (-b * B + c * A - d * z) * ivd;
        dest[2] = (n * v - o * u + p * t) * ivd;
        dest[3] = (-j * v + k * u - l * t) * ivd;
        dest[4] = (-e * B + g * y - h * x) * ivd;
        dest[5] = (a * B - c * y + d * x) * ivd;
        dest[6] = (-m * v + o * s - p * r) * ivd;
        dest[7] = (i * v - k * s + l * r) * ivd;
        dest[8] = (e * A - f * y + h * w) * ivd;
        dest[9] = (-a * A + b * y - d * w) * ivd;
        dest[10] = (m * u - n * s + p * q) * ivd;
        dest[11] = (-i * u + j * s - l * q) * ivd;
        dest[12] = (-e * z + f * x - g * w) * ivd;
        dest[13] = (a * z - b * x + c * w) * ivd;
        dest[14] = (-m * t + n * r - o * q) * ivd;
        dest[15] = (i * t - j * r + k * q) * ivd;
        return dest;
    };
}
exports.default = matIV;


/***/ }),

/***/ "./src/shader.frag":
/*!*************************!*\
  !*** ./src/shader.frag ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#define GLSLIFY 1\nvoid main(void){\n  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n}\n");

/***/ }),

/***/ "./src/shader.vert":
/*!*************************!*\
  !*** ./src/shader.vert ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#define GLSLIFY 1\nattribute vec3 position;\nuniform   mat4 mvpMatrix;\n\nvoid main(void){\n  gl_Position = mvpMatrix * vec4(position, 1.0);\n}\n");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvbWluTWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXIuZnJhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhZGVyLnZlcnQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLG9GQUFpQztBQUNqQyxvRkFBaUM7QUFDakMsK0ZBQXVDO0FBRXZDLE1BQU0sVUFBVSxHQUFlO0lBQzNCLEtBQUssRUFBRSxHQUFHO0lBQ1YsTUFBTSxFQUFFLEdBQUc7Q0FDZCxDQUFDO0FBRUYsSUFBSyxVQUdKO0FBSEQsV0FBSyxVQUFVO0lBQ1gsK0NBQU07SUFDTixtREFBUTtBQUNaLENBQUMsRUFISSxVQUFVLEtBQVYsVUFBVSxRQUdkO0FBQUEs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R0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFTLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtRQUNyQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDWixDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNaLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDWixDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNaLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNaLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDWixDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNaLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7SUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBUyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJO1FBQ3pDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ1QsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDWixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNSLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDWDtRQUNELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQ3JCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUNuQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDVCxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDVixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDVixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDVixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQ1gsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDWCxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNqQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDckIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ3JCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNyQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNqQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDckIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ3JCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNyQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUks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SUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7SUFDRixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDckQsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDckIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDWCxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDVCxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7SUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVMsR0FBRyxFQUFFLElBQUk7UUFDL0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7SUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVMsR0FBRyxFQUFFLElBQUk7UUFDN0IsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNaLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDVixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDVixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDVixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQ1gsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDWCxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUNYLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQ1gsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDWCxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUNYLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMxQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQsa0JBQWUsS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7O0FDcFZyQjtBQUFlLG1HQUFvQyw0Q0FBNEMsR0FBRyxHOzs7Ozs7Ozs7Ozs7QUNBbEc7QUFBZSwyR0FBNEMsMkJBQTJCLG9CQUFvQixrREFBa0QsR0FBRyxHIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IGZyYWcgZnJvbSBcIi4vc2hhZGVyLmZyYWdcIjtcbmltcG9ydCB2ZXJ0IGZyb20gXCIuL3NoYWRlci52ZXJ0XCI7XG5pbXBvcnQgbWF0SVYgZnJvbSBcIi4vbGliL21pbk1hdHJpeC50c1wiO1xuXG5jb25zdCBjYW52YXNTaXplOiBDYW52YXNTaXplID0ge1xuICAgIHdpZHRoOiA1MDAsXG4gICAgaGVpZ2h0OiA1MDBcbn07XG5cbmVudW0gU2hhZGVyVHlwZSB7XG4gICAgdmVydGV4LFxuICAgIGZyYWdtZW50XG59O1xuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcbmNhbnZhcy53aWR0aCA9IGNhbnZhc1NpemUud2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gY2FudmFzU2l6ZS5oZWlnaHQ7XG5cbmNvbnN0IGdsID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbFwiKSBhcyBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG5nbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAwLjAsIDEuMCk7XG5nbC5jbGVhckRlcHRoKDEuMCk7XG5nbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbmNvbnN0IGNyZWF0ZVNoYWRlciA9IChzaGFkZXJUeXBlOiBTaGFkZXJUeXBlLCBzaGFkZXJUZXh0OiBzdHJpbmcpOiBXZWJHTFNoYWRlciB8IHZvaWQgPT4ge1xuICAgIGNvbnN0IGdsVHlwZSA9IHNoYWRlclR5cGUgPT09IFNoYWRlclR5cGUudmVydGV4PyBnbC5WRVJURVhfU0hBREVSIDogZ2wuRlJBR01FTlRfU0hBREVSO1xuICAgIGNvbnN0IHNoYWRlcjogV2ViR0xTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2xUeXBlKTtcbiAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzaGFkZXJUZXh0KTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG4gICAgcmV0dXJuIGdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKT8gc2hhZGVyIDogYWxlcnQoZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcbn07XG5cbmNvbnN0IGNyZWF0ZVByb2dyYW0gPSAodnM6IFdlYkdMU2hhZGVyLCBmczogV2ViR0xTaGFkZXIpOiBXZWJHTFByb2dyYW0gfCB2b2lkID0+IHtcbiAgICBjb25zdCBwcm9ncmFtOiBXZWJHTFByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZzKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnMpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkgcmV0dXJuIGFsZXJ0KGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcblxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgcmV0dXJuIHByb2dyYW07XG59O1xuXG5jb25zdCBjcmVhdGVWYm8gPSAoZGF0YTogbnVtYmVyW10pID0+IHtcbiAgICBjb25zdCB2Ym86IFdlYkdMQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZibyk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZGF0YSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XG4gICAgcmV0dXJuIHZibztcbn07XG5cbmNvbnN0IHZlcnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIoU2hhZGVyVHlwZS52ZXJ0ZXgsIHZlcnQpIGFzIFdlYkdMU2hhZGVyO1xuY29uc3QgZnJhZ1NoYWRlciA9IGNyZWF0ZVNoYWRlcihTaGFkZXJUeXBlLmZyYWdtZW50LCBmcmFnKSBhcyBXZWJHTFNoYWRlcjtcblxuY29uc3QgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0odmVydFNoYWRlciwgZnJhZ1NoYWRlcikgYXMgV2ViR0xQcm9ncmFtO1xuXG5jb25zdCBhdHRMb2NhdGlvbjogR0xpbnQgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAncG9zaXRpb24nKTtcbmNvbnN0IGF0dFN0cmlkZSA9IDM7XG5jb25zdCB2ZXJ0ZXhQb3NpdGlvbiA9IFtcbiAgICAwLjAsIDEuMCwgMC4wLFxuICAgIDEuMCwgMC4wLCAwLjAsXG4gICAtMS4wLCAwLjAsIDAuMFxuXTtcblxuY29uc3QgdmJvID0gY3JlYXRlVmJvKHZlcnRleFBvc2l0aW9uKTtcbmdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2Ym8pO1xuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoYXR0TG9jYXRpb24pO1xuZ2wudmVydGV4QXR0cmliUG9pbnRlcihhdHRMb2NhdGlvbiwgYXR0U3RyaWRlLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG5jb25zdCBtYXQgPSBuZXcgbWF0SVYoKTtcbmNvbnN0IG1NYXRyaXggPSBtYXQuaWRlbnRpdHkobWF0LmNyZWF0ZSgpKTtcbmNvbnN0IHZNYXRyaXggPSBtYXQuaWRlbnRpdHkobWF0LmNyZWF0ZSgpKTtcbmNvbnN0IHBNYXRyaXggPSBtYXQuaWRlbnRpdHkobWF0LmNyZWF0ZSgpKTtcbmNvbnN0IG12cE1hdHJpeCA9IG1hdC5pZGVudGl0eShtYXQuY3JlYXRlKCkpO1xubWF0Lmxvb2tBdChbMC4wLCAxLjAsIDMuMF0sIFswLCAwLCAwXSwgWzAsIDEsIDBdLCB2TWF0cml4KTtcbm1hdC5wZXJzcGVjdGl2ZSg5MCwgY2FudmFzLndpZHRoIC8gY2FudmFzLmhlaWdodCwgMC4xLCAxMDAsIHBNYXRyaXgpO1xubWF0Lm11bHRpcGx5KHBNYXRyaXgsIHZNYXRyaXgsIG12cE1hdHJpeCk7XG5tYXQubXVsdGlwbHkobXZwTWF0cml4LCBtTWF0cml4LCBtdnBNYXRyaXgpO1xuXG5jb25zdCB1bmlMb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAnbXZwTWF0cml4Jyk7XG5nbC51bmlmb3JtTWF0cml4NGZ2KHVuaUxvY2F0aW9uLCBmYWxzZSwgbXZwTWF0cml4KTtcbmdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCAzKTtcbmdsLmZsdXNoKCk7XG4iLCIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIG1pbk1hdHJpeC5qc1xuLy8gdmVyc2lvbiAwLjAuMVxuLy8gQ29weXJpZ2h0IChjKSBkb3hhc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmZ1bmN0aW9uIG1hdElWKCk6IHZvaWQge1xuICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24oKTogRmxvYXQzMkFycmF5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIH07XG4gICAgdGhpcy5pZGVudGl0eSA9IGZ1bmN0aW9uKGRlc3QpOiBbXSB7XG4gICAgICAgIGRlc3RbMF0gPSAxO1xuICAgICAgICBkZXN0WzFdID0gMDtcbiAgICAgICAgZGVzdFsyXSA9IDA7XG4gICAgICAgIGRlc3RbM10gPSAwO1xuICAgICAgICBkZXN0WzRdID0gMDtcbiAgICAgICAgZGVzdFs1XSA9IDE7XG4gICAgICAgIGRlc3RbNl0gPSAwO1xuICAgICAgICBkZXN0WzddID0gMDtcbiAgICAgICAgZGVzdFs4XSA9IDA7XG4gICAgICAgIGRlc3RbOV0gPSAwO1xuICAgICAgICBkZXN0WzEwXSA9IDE7XG4gICAgICAgIGRlc3RbMTFdID0gMDtcbiAgICAgICAgZGVzdFsxMl0gPSAwO1xuICAgICAgICBkZXN0WzEzXSA9IDA7XG4gICAgICAgIGRlc3RbMTRdID0gMDtcbiAgICAgICAgZGVzdFsxNV0gPSAxO1xuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9O1xuICAgIHRoaXMubXVsdGlwbHkgPSBmdW5jdGlvbihtYXQxLCBtYXQyLCBkZXN0KTogW10ge1xuICAgICAgICBjb25zdCBhID0gbWF0MVswXSxcbiAgICAgICAgICAgIGIgPSBtYXQxWzFdLFxuICAgICAgICAgICAgYyA9IG1hdDFbMl0sXG4gICAgICAgICAgICBkID0gbWF0MVszXSxcbiAgICAgICAgICAgIGUgPSBtYXQxWzRdLFxuICAgICAgICAgICAgZiA9IG1hdDFbNV0sXG4gICAgICAgICAgICBnID0gbWF0MVs2XSxcbiAgICAgICAgICAgIGggPSBtYXQxWzddLFxuICAgICAgICAgICAgaSA9IG1hdDFbOF0sXG4gICAgICAgICAgICBqID0gbWF0MVs5XSxcbiAgICAgICAgICAgIGsgPSBtYXQxWzEwXSxcbiAgICAgICAgICAgIGwgPSBtYXQxWzExXSxcbiAgICAgICAgICAgIG0gPSBtYXQxWzEyXSxcbiAgICAgICAgICAgIG4gPSBtYXQxWzEzXSxcbiAgICAgICAgICAgIG8gPSBtYXQxWzE0XSxcbiAgICAgICAgICAgIHAgPSBtYXQxWzE1XSxcbiAgICAgICAgICAgIEEgPSBtYXQyWzBdLFxuICAgICAgICAgICAgQiA9IG1hdDJbMV0sXG4gICAgICAgICAgICBDID0gbWF0MlsyXSxcbiAgICAgICAgICAgIEQgPSBtYXQyWzNdLFxuICAgICAgICAgICAgRSA9IG1hdDJbNF0sXG4gICAgICAgICAgICBGID0gbWF0Mls1XSxcbiAgICAgICAgICAgIEcgPSBtYXQyWzZdLFxuICAgICAgICAgICAgSCA9IG1hdDJbN10sXG4gICAgICAgICAgICBJID0gbWF0Mls4XSxcbiAgICAgICAgICAgIEogPSBtYXQyWzldLFxuICAgICAgICAgICAgSyA9IG1hdDJbMTBdLFxuICAgICAgICAgICAgTCA9IG1hdDJbMTFdLFxuICAgICAgICAgICAgTSA9IG1hdDJbMTJdLFxuICAgICAgICAgICAgTiA9IG1hdDJbMTNdLFxuICAgICAgICAgICAgTyA9IG1hdDJbMTRdLFxuICAgICAgICAgICAgUCA9IG1hdDJbMTVdO1xuICAgICAgICBkZXN0WzBdID0gQSAqIGEgKyBCICogZSArIEMgKiBpICsgRCAqIG07XG4gICAgICAgIGRlc3RbMV0gPSBBICogYiArIEIgKiBmICsgQyAqIGogKyBEICogbjtcbiAgICAgICAgZGVzdFsyXSA9IEEgKiBjICsgQiAqIGcgKyBDICogayArIEQgKiBvO1xuICAgICAgICBkZXN0WzNdID0gQSAqIGQgKyBCICogaCArIEMgKiBsICsgRCAqIHA7XG4gICAgICAgIGRlc3RbNF0gPSBFICogYSArIEYgKiBlICsgRyAqIGkgKyBIICogbTtcbiAgICAgICAgZGVzdFs1XSA9IEUgKiBiICsgRiAqIGYgKyBHICogaiArIEggKiBuO1xuICAgICAgICBkZXN0WzZdID0gRSAqIGMgKyBGICogZyArIEcgKiBrICsgSCAqIG87XG4gICAgICAgIGRlc3RbN10gPSBFICogZCArIEYgKiBoICsgRyAqIGwgKyBIICogcDtcbiAgICAgICAgZGVzdFs4XSA9IEkgKiBhICsgSiAqIGUgKyBLICogaSArIEwgKiBtO1xuICAgICAgICBkZXN0WzldID0gSSAqIGIgKyBKICogZiArIEsgKiBqICsgTCAqIG47XG4gICAgICAgIGRlc3RbMTBdID0gSSAqIGMgKyBKICogZyArIEsgKiBrICsgTCAqIG87XG4gICAgICAgIGRlc3RbMTFdID0gSSAqIGQgKyBKICogaCArIEsgKiBsICsgTCAqIHA7XG4gICAgICAgIGRlc3RbMTJdID0gTSAqIGEgKyBOICogZSArIE8gKiBpICsgUCAqIG07XG4gICAgICAgIGRlc3RbMTNdID0gTSAqIGIgKyBOICogZiArIE8gKiBqICsgUCAqIG47XG4gICAgICAgIGRlc3RbMTRdID0gTSAqIGMgKyBOICogZyArIE8gKiBrICsgUCAqIG87XG4gICAgICAgIGRlc3RbMTVdID0gTSAqIGQgKyBOICogaCArIE8gKiBsICsgUCAqIHA7XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH07XG4gICAgdGhpcy5zY2FsZSA9IGZ1bmN0aW9uKG1hdCwgdmVjLCBkZXN0KTogW10ge1xuICAgICAgICBkZXN0WzBdID0gbWF0WzBdICogdmVjWzBdO1xuICAgICAgICBkZXN0WzFdID0gbWF0WzFdICogdmVjWzBdO1xuICAgICAgICBkZXN0WzJdID0gbWF0WzJdICogdmVjWzBdO1xuICAgICAgICBkZXN0WzNdID0gbWF0WzNdICogdmVjWzBdO1xuICAgICAgICBkZXN0WzRdID0gbWF0WzRdICogdmVjWzFdO1xuICAgICAgICBkZXN0WzVdID0gbWF0WzVdICogdmVjWzFdO1xuICAgICAgICBkZXN0WzZdID0gbWF0WzZdICogdmVjWzFdO1xuICAgICAgICBkZXN0WzddID0gbWF0WzddICogdmVjWzFdO1xuICAgICAgICBkZXN0WzhdID0gbWF0WzhdICogdmVjWzJdO1xuICAgICAgICBkZXN0WzldID0gbWF0WzldICogdmVjWzJdO1xuICAgICAgICBkZXN0WzEwXSA9IG1hdFsxMF0gKiB2ZWNbMl07XG4gICAgICAgIGRlc3RbMTFdID0gbWF0WzExXSAqIHZlY1syXTtcbiAgICAgICAgZGVzdFsxMl0gPSBtYXRbMTJdO1xuICAgICAgICBkZXN0WzEzXSA9IG1hdFsxM107XG4gICAgICAgIGRlc3RbMTRdID0gbWF0WzE0XTtcbiAgICAgICAgZGVzdFsxNV0gPSBtYXRbMTVdO1xuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9O1xuICAgIHRoaXMudHJhbnNsYXRlID0gZnVuY3Rpb24obWF0LCB2ZWMsIGRlc3QpOiBbXSB7XG4gICAgICAgIGRlc3RbMF0gPSBtYXRbMF07XG4gICAgICAgIGRlc3RbMV0gPSBtYXRbMV07XG4gICAgICAgIGRlc3RbMl0gPSBtYXRbMl07XG4gICAgICAgIGRlc3RbM10gPSBtYXRbM107XG4gICAgICAgIGRlc3RbNF0gPSBtYXRbNF07XG4gICAgICAgIGRlc3RbNV0gPSBtYXRbNV07XG4gICAgICAgIGRlc3RbNl0gPSBtYXRbNl07XG4gICAgICAgIGRlc3RbN10gPSBtYXRbN107XG4gICAgICAgIGRlc3RbOF0gPSBtYXRbOF07XG4gICAgICAgIGRlc3RbOV0gPSBtYXRbOV07XG4gICAgICAgIGRlc3RbMTBdID0gbWF0WzEwXTtcbiAgICAgICAgZGVzdFsxMV0gPSBtYXRbMTFdO1xuICAgICAgICBkZXN0WzEyXSA9IG1hdFswXSAqIHZlY1swXSArIG1hdFs0XSAqIHZlY1sxXSArIG1hdFs4XSAqIHZlY1syXSArIG1hdFsxMl07XG4gICAgICAgIGRlc3RbMTNdID0gbWF0WzFdICogdmVjWzBdICsgbWF0WzVdICogdmVjWzFdICsgbWF0WzldICogdmVjWzJdICsgbWF0WzEzXTtcbiAgICAgICAgZGVzdFsxNF0gPSBtYXRbMl0gKiB2ZWNbMF0gKyBtYXRbNl0gKiB2ZWNbMV0gKyBtYXRbMTBdICogdmVjWzJdICsgbWF0WzE0XTtcbiAgICAgICAgZGVzdFsxNV0gPSBtYXRbM10gKiB2ZWNbMF0gKyBtYXRbN10gKiB2ZWNbMV0gKyBtYXRbMTFdICogdmVjWzJdICsgbWF0WzE1XTtcbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfTtcbiAgICB0aGlzLnJvdGF0ZSA9IGZ1bmN0aW9uKG1hdCwgYW5nbGUsIGF4aXMsIGRlc3QpOiBbXSB7XG4gICAgICAgIGxldCBzcSA9IE1hdGguc3FydChheGlzWzBdICogYXhpc1swXSArIGF4aXNbMV0gKiBheGlzWzFdICsgYXhpc1syXSAqIGF4aXNbMl0pO1xuICAgICAgICBpZiAoIXNxKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYSA9IGF4aXNbMF0sXG4gICAgICAgICAgICBiID0gYXhpc1sxXSxcbiAgICAgICAgICAgIGMgPSBheGlzWzJdO1xuICAgICAgICBpZiAoc3EgIT0gMSkge1xuICAgICAgICAgICAgc3EgPSAxIC8gc3E7XG4gICAgICAgICAgICBhICo9IHNxO1xuICAgICAgICAgICAgYiAqPSBzcTtcbiAgICAgICAgICAgIGMgKj0gc3E7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZCA9IE1hdGguc2luKGFuZ2xlKSxcbiAgICAgICAgICAgIGUgPSBNYXRoLmNvcyhhbmdsZSksXG4gICAgICAgICAgICBmID0gMSAtIGUsXG4gICAgICAgICAgICBnID0gbWF0WzBdLFxuICAgICAgICAgICAgaCA9IG1hdFsxXSxcbiAgICAgICAgICAgIGkgPSBtYXRbMl0sXG4gICAgICAgICAgICBqID0gbWF0WzNdLFxuICAgICAgICAgICAgayA9IG1hdFs0XSxcbiAgICAgICAgICAgIGwgPSBtYXRbNV0sXG4gICAgICAgICAgICBtID0gbWF0WzZdLFxuICAgICAgICAgICAgbiA9IG1hdFs3XSxcbiAgICAgICAgICAgIG8gPSBtYXRbOF0sXG4gICAgICAgICAgICBwID0gbWF0WzldLFxuICAgICAgICAgICAgcSA9IG1hdFsxMF0sXG4gICAgICAgICAgICByID0gbWF0WzExXSxcbiAgICAgICAgICAgIHMgPSBhICogYSAqIGYgKyBlLFxuICAgICAgICAgICAgdCA9IGIgKiBhICogZiArIGMgKiBkLFxuICAgICAgICAgICAgdSA9IGMgKiBhICogZiAtIGIgKiBkLFxuICAgICAgICAgICAgdiA9IGEgKiBiICogZiAtIGMgKiBkLFxuICAgICAgICAgICAgdyA9IGIgKiBiICogZiArIGUsXG4gICAgICAgICAgICB4ID0gYyAqIGIgKiBmICsgYSAqIGQsXG4gICAgICAgICAgICB5ID0gYSAqIGMgKiBmICsgYiAqIGQsXG4gICAgICAgICAgICB6ID0gYiAqIGMgKiBmIC0gYSAqIGQsXG4gICAgICAgICAgICBBID0gYyAqIGMgKiBmICsgZTtcbiAgICAgICAgaWYgKGFuZ2xlKSB7XG4gICAgICAgICAgICBpZiAobWF0ICE9IGRlc3QpIHtcbiAgICAgICAgICAgICAgICBkZXN0WzEyXSA9IG1hdFsxMl07XG4gICAgICAgICAgICAgICAgZGVzdFsxM10gPSBtYXRbMTNdO1xuICAgICAgICAgICAgICAgIGRlc3RbMTRdID0gbWF0WzE0XTtcbiAgICAgICAgICAgICAgICBkZXN0WzE1XSA9IG1hdFsxNV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXN0ID0gbWF0O1xuICAgICAgICB9XG4gICAgICAgIGRlc3RbMF0gPSBnICogcyArIGsgKiB0ICsgbyAqIHU7XG4gICAgICAgIGRlc3RbMV0gPSBoICogcyArIGwgKiB0ICsgcCAqIHU7XG4gICAgICAgIGRlc3RbMl0gPSBpICogcyArIG0gKiB0ICsgcSAqIHU7XG4gICAgICAgIGRlc3RbM10gPSBqICogcyArIG4gKiB0ICsgciAqIHU7XG4gICAgICAgIGRlc3RbNF0gPSBnICogdiArIGsgKiB3ICsgbyAqIHg7XG4gICAgICAgIGRlc3RbNV0gPSBoICogdiArIGwgKiB3ICsgcCAqIHg7XG4gICAgICAgIGRlc3RbNl0gPSBpICogdiArIG0gKiB3ICsgcSAqIHg7XG4gICAgICAgIGRlc3RbN10gPSBqICogdiArIG4gKiB3ICsgciAqIHg7XG4gICAgICAgIGRlc3RbOF0gPSBnICogeSArIGsgKiB6ICsgbyAqIEE7XG4gICAgICAgIGRlc3RbOV0gPSBoICogeSArIGwgKiB6ICsgcCAqIEE7XG4gICAgICAgIGRlc3RbMTBdID0gaSAqIHkgKyBtICogeiArIHEgKiBBO1xuICAgICAgICBkZXN0WzExXSA9IGogKiB5ICsgbiAqIHogKyByICogQTtcbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfTtcbiAgICB0aGlzLmxvb2tBdCA9IGZ1bmN0aW9uKGV5ZSwgY2VudGVyLCB1cCwgZGVzdCk6IFtdIHtcbiAgICAgICAgY29uc3QgZXllWCA9IGV5ZVswXSxcbiAgICAgICAgICAgIGV5ZVkgPSBleWVbMV0sXG4gICAgICAgICAgICBleWVaID0gZXllWzJdLFxuICAgICAgICAgICAgdXBYID0gdXBbMF0sXG4gICAgICAgICAgICB1cFkgPSB1cFsxXSxcbiAgICAgICAgICAgIHVwWiA9IHVwWzJdLFxuICAgICAgICAgICAgY2VudGVyWCA9IGNlbnRlclswXSxcbiAgICAgICAgICAgIGNlbnRlclkgPSBjZW50ZXJbMV0sXG4gICAgICAgICAgICBjZW50ZXJaID0gY2VudGVyWzJdO1xuICAgICAgICBpZiAoZXllWCA9PSBjZW50ZXJYICYmIGV5ZVkgPT0gY2VudGVyWSAmJiBleWVaID09IGNlbnRlclopIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlkZW50aXR5KGRlc3QpO1xuICAgICAgICB9XG4gICAgICAgIGxldCB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsO1xuICAgICAgICB6MCA9IGV5ZVggLSBjZW50ZXJbMF07XG4gICAgICAgIHoxID0gZXllWSAtIGNlbnRlclsxXTtcbiAgICAgICAgejIgPSBleWVaIC0gY2VudGVyWzJdO1xuICAgICAgICBsID0gMSAvIE1hdGguc3FydCh6MCAqIHowICsgejEgKiB6MSArIHoyICogejIpO1xuICAgICAgICB6MCAqPSBsO1xuICAgICAgICB6MSAqPSBsO1xuICAgICAgICB6MiAqPSBsO1xuICAgICAgICB4MCA9IHVwWSAqIHoyIC0gdXBaICogejE7XG4gICAgICAgIHgxID0gdXBaICogejAgLSB1cFggKiB6MjtcbiAgICAgICAgeDIgPSB1cFggKiB6MSAtIHVwWSAqIHowO1xuICAgICAgICBsID0gTWF0aC5zcXJ0KHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4Mik7XG4gICAgICAgIGlmICghbCkge1xuICAgICAgICAgICAgeDAgPSAwO1xuICAgICAgICAgICAgeDEgPSAwO1xuICAgICAgICAgICAgeDIgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbCA9IDEgLyBsO1xuICAgICAgICAgICAgeDAgKj0gbDtcbiAgICAgICAgICAgIHgxICo9IGw7XG4gICAgICAgICAgICB4MiAqPSBsO1xuICAgICAgICB9XG4gICAgICAgIHkwID0gejEgKiB4MiAtIHoyICogeDE7XG4gICAgICAgIHkxID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgICAgIHkyID0gejAgKiB4MSAtIHoxICogeDA7XG4gICAgICAgIGwgPSBNYXRoLnNxcnQoeTAgKiB5MCArIHkxICogeTEgKyB5MiAqIHkyKTtcbiAgICAgICAgaWYgKCFsKSB7XG4gICAgICAgICAgICB5MCA9IDA7XG4gICAgICAgICAgICB5MSA9IDA7XG4gICAgICAgICAgICB5MiA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsID0gMSAvIGw7XG4gICAgICAgICAgICB5MCAqPSBsO1xuICAgICAgICAgICAgeTEgKj0gbDtcbiAgICAgICAgICAgIHkyICo9IGw7XG4gICAgICAgIH1cbiAgICAgICAgZGVzdFswXSA9IHgwO1xuICAgICAgICBkZXN0WzFdID0geTA7XG4gICAgICAgIGRlc3RbMl0gPSB6MDtcbiAgICAgICAgZGVzdFszXSA9IDA7XG4gICAgICAgIGRlc3RbNF0gPSB4MTtcbiAgICAgICAgZGVzdFs1XSA9IHkxO1xuICAgICAgICBkZXN0WzZdID0gejE7XG4gICAgICAgIGRlc3RbN10gPSAwO1xuICAgICAgICBkZXN0WzhdID0geDI7XG4gICAgICAgIGRlc3RbOV0gPSB5MjtcbiAgICAgICAgZGVzdFsxMF0gPSB6MjtcbiAgICAgICAgZGVzdFsxMV0gPSAwO1xuICAgICAgICBkZXN0WzEyXSA9IC0oeDAgKiBleWVYICsgeDEgKiBleWVZICsgeDIgKiBleWVaKTtcbiAgICAgICAgZGVzdFsxM10gPSAtKHkwICogZXllWCArIHkxICogZXllWSArIHkyICogZXllWik7XG4gICAgICAgIGRlc3RbMTRdID0gLSh6MCAqIGV5ZVggKyB6MSAqIGV5ZVkgKyB6MiAqIGV5ZVopO1xuICAgICAgICBkZXN0WzE1XSA9IDE7XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH07XG4gICAgdGhpcy5wZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uKGZvdnksIGFzcGVjdCwgbmVhciwgZmFyLCBkZXN0KTogW10ge1xuICAgICAgICBjb25zdCB0ID0gbmVhciAqIE1hdGgudGFuKChmb3Z5ICogTWF0aC5QSSkgLyAzNjApO1xuICAgICAgICBjb25zdCByID0gdCAqIGFzcGVjdDtcbiAgICAgICAgY29uc3QgYSA9IHIgKiAyLFxuICAgICAgICAgICAgYiA9IHQgKiAyLFxuICAgICAgICAgICAgYyA9IGZhciAtIG5lYXI7XG4gICAgICAgIGRlc3RbMF0gPSAobmVhciAqIDIpIC8gYTtcbiAgICAgICAgZGVzdFsxXSA9IDA7XG4gICAgICAgIGRlc3RbMl0gPSAwO1xuICAgICAgICBkZXN0WzNdID0gMDtcbiAgICAgICAgZGVzdFs0XSA9IDA7XG4gICAgICAgIGRlc3RbNV0gPSAobmVhciAqIDIpIC8gYjtcbiAgICAgICAgZGVzdFs2XSA9IDA7XG4gICAgICAgIGRlc3RbN10gPSAwO1xuICAgICAgICBkZXN0WzhdID0gMDtcbiAgICAgICAgZGVzdFs5XSA9IDA7XG4gICAgICAgIGRlc3RbMTBdID0gLShmYXIgKyBuZWFyKSAvIGM7XG4gICAgICAgIGRlc3RbMTFdID0gLTE7XG4gICAgICAgIGRlc3RbMTJdID0gMDtcbiAgICAgICAgZGVzdFsxM10gPSAwO1xuICAgICAgICBkZXN0WzE0XSA9IC0oZmFyICogbmVhciAqIDIpIC8gYztcbiAgICAgICAgZGVzdFsxNV0gPSAwO1xuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9O1xuICAgIHRoaXMudHJhbnNwb3NlID0gZnVuY3Rpb24obWF0LCBkZXN0KTogW10ge1xuICAgICAgICBkZXN0WzBdID0gbWF0WzBdO1xuICAgICAgICBkZXN0WzFdID0gbWF0WzRdO1xuICAgICAgICBkZXN0WzJdID0gbWF0WzhdO1xuICAgICAgICBkZXN0WzNdID0gbWF0WzEyXTtcbiAgICAgICAgZGVzdFs0XSA9IG1hdFsxXTtcbiAgICAgICAgZGVzdFs1XSA9IG1hdFs1XTtcbiAgICAgICAgZGVzdFs2XSA9IG1hdFs5XTtcbiAgICAgICAgZGVzdFs3XSA9IG1hdFsxM107XG4gICAgICAgIGRlc3RbOF0gPSBtYXRbMl07XG4gICAgICAgIGRlc3RbOV0gPSBtYXRbNl07XG4gICAgICAgIGRlc3RbMTBdID0gbWF0WzEwXTtcbiAgICAgICAgZGVzdFsxMV0gPSBtYXRbMTRdO1xuICAgICAgICBkZXN0WzEyXSA9IG1hdFszXTtcbiAgICAgICAgZGVzdFsxM10gPSBtYXRbN107XG4gICAgICAgIGRlc3RbMTRdID0gbWF0WzExXTtcbiAgICAgICAgZGVzdFsxNV0gPSBtYXRbMTVdO1xuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9O1xuICAgIHRoaXMuaW52ZXJzZSA9IGZ1bmN0aW9uKG1hdCwgZGVzdCk6IFtdIHtcbiAgICAgICAgY29uc3QgYSA9IG1hdFswXSxcbiAgICAgICAgICAgIGIgPSBtYXRbMV0sXG4gICAgICAgICAgICBjID0gbWF0WzJdLFxuICAgICAgICAgICAgZCA9IG1hdFszXSxcbiAgICAgICAgICAgIGUgPSBtYXRbNF0sXG4gICAgICAgICAgICBmID0gbWF0WzVdLFxuICAgICAgICAgICAgZyA9IG1hdFs2XSxcbiAgICAgICAgICAgIGggPSBtYXRbN10sXG4gICAgICAgICAgICBpID0gbWF0WzhdLFxuICAgICAgICAgICAgaiA9IG1hdFs5XSxcbiAgICAgICAgICAgIGsgPSBtYXRbMTBdLFxuICAgICAgICAgICAgbCA9IG1hdFsxMV0sXG4gICAgICAgICAgICBtID0gbWF0WzEyXSxcbiAgICAgICAgICAgIG4gPSBtYXRbMTNdLFxuICAgICAgICAgICAgbyA9IG1hdFsxNF0sXG4gICAgICAgICAgICBwID0gbWF0WzE1XSxcbiAgICAgICAgICAgIHEgPSBhICogZiAtIGIgKiBlLFxuICAgICAgICAgICAgciA9IGEgKiBnIC0gYyAqIGUsXG4gICAgICAgICAgICBzID0gYSAqIGggLSBkICogZSxcbiAgICAgICAgICAgIHQgPSBiICogZyAtIGMgKiBmLFxuICAgICAgICAgICAgdSA9IGIgKiBoIC0gZCAqIGYsXG4gICAgICAgICAgICB2ID0gYyAqIGggLSBkICogZyxcbiAgICAgICAgICAgIHcgPSBpICogbiAtIGogKiBtLFxuICAgICAgICAgICAgeCA9IGkgKiBvIC0gayAqIG0sXG4gICAgICAgICAgICB5ID0gaSAqIHAgLSBsICogbSxcbiAgICAgICAgICAgIHogPSBqICogbyAtIGsgKiBuLFxuICAgICAgICAgICAgQSA9IGogKiBwIC0gbCAqIG4sXG4gICAgICAgICAgICBCID0gayAqIHAgLSBsICogbyxcbiAgICAgICAgICAgIGl2ZCA9IDEgLyAocSAqIEIgLSByICogQSArIHMgKiB6ICsgdCAqIHkgLSB1ICogeCArIHYgKiB3KTtcbiAgICAgICAgZGVzdFswXSA9IChmICogQiAtIGcgKiBBICsgaCAqIHopICogaXZkO1xuICAgICAgICBkZXN0WzFdID0gKC1iICogQiArIGMgKiBBIC0gZCAqIHopICogaXZkO1xuICAgICAgICBkZXN0WzJdID0gKG4gKiB2IC0gbyAqIHUgKyBwICogdCkgKiBpdmQ7XG4gICAgICAgIGRlc3RbM10gPSAoLWogKiB2ICsgayAqIHUgLSBsICogdCkgKiBpdmQ7XG4gICAgICAgIGRlc3RbNF0gPSAoLWUgKiBCICsgZyAqIHkgLSBoICogeCkgKiBpdmQ7XG4gICAgICAgIGRlc3RbNV0gPSAoYSAqIEIgLSBjICogeSArIGQgKiB4KSAqIGl2ZDtcbiAgICAgICAgZGVzdFs2XSA9ICgtbSAqIHYgKyBvICogcyAtIHAgKiByKSAqIGl2ZDtcbiAgICAgICAgZGVzdFs3XSA9IChpICogdiAtIGsgKiBzICsgbCAqIHIpICogaXZkO1xuICAgICAgICBkZXN0WzhdID0gKGUgKiBBIC0gZiAqIHkgKyBoICogdykgKiBpdmQ7XG4gICAgICAgIGRlc3RbOV0gPSAoLWEgKiBBICsgYiAqIHkgLSBkICogdykgKiBpdmQ7XG4gICAgICAgIGRlc3RbMTBdID0gKG0gKiB1IC0gbiAqIHMgKyBwICogcSkgKiBpdmQ7XG4gICAgICAgIGRlc3RbMTFdID0gKC1pICogdSArIGogKiBzIC0gbCAqIHEpICogaXZkO1xuICAgICAgICBkZXN0WzEyXSA9ICgtZSAqIHogKyBmICogeCAtIGcgKiB3KSAqIGl2ZDtcbiAgICAgICAgZGVzdFsxM10gPSAoYSAqIHogLSBiICogeCArIGMgKiB3KSAqIGl2ZDtcbiAgICAgICAgZGVzdFsxNF0gPSAoLW0gKiB0ICsgbiAqIHIgLSBvICogcSkgKiBpdmQ7XG4gICAgICAgIGRlc3RbMTVdID0gKGkgKiB0IC0gaiAqIHIgKyBrICogcSkgKiBpdmQ7XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hdElWO1xuIiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZvaWQgbWFpbih2b2lkKXtcXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQoMS4wLCAxLjAsIDEuMCwgMS4wKTtcXG59XFxuXCIiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxuYXR0cmlidXRlIHZlYzMgcG9zaXRpb247XFxudW5pZm9ybSAgIG1hdDQgbXZwTWF0cml4O1xcblxcbnZvaWQgbWFpbih2b2lkKXtcXG4gIGdsX1Bvc2l0aW9uID0gbXZwTWF0cml4ICogdmVjNChwb3NpdGlvbiwgMS4wKTtcXG59XFxuXCIiXSwic291cmNlUm9vdCI6IiJ9
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvbWluTWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9zaGFkZXIuZnJhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2hhZGVyLnZlcnQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLG9GQUFpQztBQUNqQyxvRkFBaUM7QUFDakMsK0ZBQXVDO0FBRXZDLE1BQU0sVUFBVSxHQUFlO0lBQzNCLEtBQUssRUFBRSxHQUFHO0lBQ1YsTUFBTSxFQUFFLEdBQUc7Q0FDZCxDQUFDO0FBRUYsSUFBSyxVQUdKO0FBSEQsV0FBSyxVQUFVO0lBQ1gsK0NBQU07SUFDTixtREFBUTtBQUNaLENBQUMsRUFISSxVQUFVLEtBQVYsVUFBVSxRQUdkO0FBQUEs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QyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDYixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7SUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJO1FBQ3JDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDYixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNaLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDWixDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNaLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDWixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDWixDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUNaLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFDWixDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztJQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDaEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLENBQUM7SUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFTLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUk7UUFDekMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDTCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNYLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDVCxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNaLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDUixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNYO1FBQ0QsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFDckIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQ25CLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNULENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDVixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDVixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDVixDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNWLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDWCxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUNYLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNyQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDckIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ3JCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ2pCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUNyQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDckIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQ3JCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFB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QyxHQUFHLENBQUMsRUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDakIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDakIsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDMUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMxQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztBQUNOLENBQUM7QUFFRCxrQkFBZSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNwVnJCO0FBQWUsbUdBQW9DLDRDQUE0QyxHQUFHLEc7Ozs7Ozs7Ozs7OztBQ0FsRztBQUFlLDJHQUE0QywyQkFBMkIsb0JBQW9CLGtEQUFrRCxHQUFHLEciLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgZnJhZyBmcm9tIFwiLi9zaGFkZXIuZnJhZ1wiO1xuaW1wb3J0IHZlcnQgZnJvbSBcIi4vc2hhZGVyLnZlcnRcIjtcbmltcG9ydCBtYXRJViBmcm9tIFwiLi9saWIvbWluTWF0cml4LnRzXCI7XG5cbmNvbnN0IGNhbnZhc1NpemU6IENhbnZhc1NpemUgPSB7XG4gICAgd2lkdGg6IDUwMCxcbiAgICBoZWlnaHQ6IDUwMFxufTtcblxuZW51bSBTaGFkZXJUeXBlIHtcbiAgICB2ZXJ0ZXgsXG4gICAgZnJhZ21lbnRcbn07XG5cbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY2FudmFzLndpZHRoID0gY2FudmFzU2l6ZS53aWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBjYW52YXNTaXplLmhlaWdodDtcblxuY29uc3QgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsXCIpIGFzIFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcbmdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbmdsLmNsZWFyRGVwdGgoMS4wKTtcbmdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuY29uc3QgY3JlYXRlU2hhZGVyID0gKHNoYWRlclR5cGU6IFNoYWRlclR5cGUsIHNoYWRlclRleHQ6IHN0cmluZyk6IFdlYkdMU2hhZGVyIHwgdm9pZCA9PiB7XG4gICAgY29uc3QgZ2xUeXBlID0gc2hhZGVyVHlwZSA9PT0gU2hhZGVyVHlwZS52ZXJ0ZXg/IGdsLlZFUlRFWF9TSEFERVIgOiBnbC5GUkFHTUVOVF9TSEFERVI7XG4gICAgY29uc3Qgc2hhZGVyOiBXZWJHTFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbFR5cGUpO1xuICAgIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNoYWRlclRleHQpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcbiAgICByZXR1cm4gZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpPyBzaGFkZXIgOiBhbGVydChnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xufTtcblxuY29uc3QgY3JlYXRlUHJvZ3JhbSA9ICh2czogV2ViR0xTaGFkZXIsIGZzOiBXZWJHTFNoYWRlcik6IFdlYkdMUHJvZ3JhbSB8IHZvaWQgPT4ge1xuICAgIGNvbnN0IHByb2dyYW06IFdlYkdMUHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdnMpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcyk7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSByZXR1cm4gYWxlcnQoZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuXG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcbiAgICByZXR1cm4gcHJvZ3JhbTtcbn07XG5cbmNvbnN0IGNyZWF0ZVZibyA9IChkYXRhOiBudW1iZXJbXSk6IFdlYkdMQnVmZmVyID0+IHtcbiAgICBjb25zdCB2Ym86IFdlYkdMQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZibyk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoZGF0YSksIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XG4gICAgcmV0dXJuIHZibztcbn07XG5cbmNvbnN0IHZlcnRTaGFkZXIgPSBjcmVhdGVTaGFkZXIoU2hhZGVyVHlwZS52ZXJ0ZXgsIHZlcnQpIGFzIFdlYkdMU2hhZGVyO1xuY29uc3QgZnJhZ1NoYWRlciA9IGNyZWF0ZVNoYWRlcihTaGFkZXJUeXBlLmZyYWdtZW50LCBmcmFnKSBhcyBXZWJHTFNoYWRlcjtcblxuY29uc3QgcHJvZ3JhbSA9IGNyZWF0ZVByb2dyYW0odmVydFNoYWRlciwgZnJhZ1NoYWRlcikgYXMgV2ViR0xQcm9ncmFtO1xuXG5jb25zdCBhdHRMb2NhdGlvbjogR0xpbnQgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAncG9zaXRpb24nKTtcbmNvbnN0IGF0dFN0cmlkZTogbnVtYmVyID0gMztcbmNvbnN0IHZlcnRleFBvc2l0aW9uOiBudW1iZXJbXSA9IFtcbiAgICAwLjAsIDEuMCwgMC4wLFxuICAgIDEuMCwgMC4wLCAwLjAsXG4gICAtMS4wLCAwLjAsIDAuMFxuXTtcblxuY29uc3QgdmJvOiBXZWJHTEJ1ZmZlciA9IGNyZWF0ZVZibyh2ZXJ0ZXhQb3NpdGlvbik7XG5nbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmJvKTtcbmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGF0dExvY2F0aW9uKTtcbmdsLnZlcnRleEF0dHJpYlBvaW50ZXIoYXR0TG9jYXRpb24sIGF0dFN0cmlkZSwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuY29uc3QgbWF0ID0gbmV3IG1hdElWKCk7XG5jb25zdCBtTWF0cml4ID0gbWF0LmlkZW50aXR5KG1hdC5jcmVhdGUoKSk7XG5jb25zdCB2TWF0cml4ID0gbWF0LmlkZW50aXR5KG1hdC5jcmVhdGUoKSk7XG5jb25zdCBwTWF0cml4ID0gbWF0LmlkZW50aXR5KG1hdC5jcmVhdGUoKSk7XG5jb25zdCBtdnBNYXRyaXggPSBtYXQuaWRlbnRpdHkobWF0LmNyZWF0ZSgpKTtcbm1hdC5sb29rQXQoWzAuMCwgMS4wLCAzLjBdLCBbMCwgMCwgMF0sIFswLCAxLCAwXSwgdk1hdHJpeCk7XG5tYXQucGVyc3BlY3RpdmUoOTAsIGNhbnZhcy53aWR0aCAvIGNhbnZhcy5oZWlnaHQsIDAuMSwgMTAwLCBwTWF0cml4KTtcbm1hdC5tdWx0aXBseShwTWF0cml4LCB2TWF0cml4LCBtdnBNYXRyaXgpO1xubWF0Lm11bHRpcGx5KG12cE1hdHJpeCwgbU1hdHJpeCwgbXZwTWF0cml4KTtcblxuY29uc3QgdW5pTG9jYXRpb246IFdlYkdMVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICdtdnBNYXRyaXgnKTtcbmdsLnVuaWZvcm1NYXRyaXg0ZnYodW5pTG9jYXRpb24sIGZhbHNlLCBtdnBNYXRyaXgpO1xuZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDMpO1xuZ2wuZmx1c2goKTtcbiIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gbWluTWF0cml4LmpzXG4vLyB2ZXJzaW9uIDAuMC4xXG4vLyBDb3B5cmlnaHQgKGMpIGRveGFzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZnVuY3Rpb24gbWF0SVYoKTogdm9pZCB7XG4gICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbigpOiBGbG9hdDMyQXJyYXkge1xuICAgICAgICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgfTtcbiAgICB0aGlzLmlkZW50aXR5ID0gZnVuY3Rpb24oZGVzdCk6IFtdIHtcbiAgICAgICAgZGVzdFswXSA9IDE7XG4gICAgICAgIGRlc3RbMV0gPSAwO1xuICAgICAgICBkZXN0WzJdID0gMDtcbiAgICAgICAgZGVzdFszXSA9IDA7XG4gICAgICAgIGRlc3RbNF0gPSAwO1xuICAgICAgICBkZXN0WzVdID0gMTtcbiAgICAgICAgZGVzdFs2XSA9IDA7XG4gICAgICAgIGRlc3RbN10gPSAwO1xuICAgICAgICBkZXN0WzhdID0gMDtcbiAgICAgICAgZGVzdFs5XSA9IDA7XG4gICAgICAgIGRlc3RbMTBdID0gMTtcbiAgICAgICAgZGVzdFsxMV0gPSAwO1xuICAgICAgICBkZXN0WzEyXSA9IDA7XG4gICAgICAgIGRlc3RbMTNdID0gMDtcbiAgICAgICAgZGVzdFsxNF0gPSAwO1xuICAgICAgICBkZXN0WzE1XSA9IDE7XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH07XG4gICAgdGhpcy5tdWx0aXBseSA9IGZ1bmN0aW9uKG1hdDEsIG1hdDIsIGRlc3QpOiBbXSB7XG4gICAgICAgIGNvbnN0IGEgPSBtYXQxWzBdLFxuICAgICAgICAgICAgYiA9IG1hdDFbMV0sXG4gICAgICAgICAgICBjID0gbWF0MVsyXSxcbiAgICAgICAgICAgIGQgPSBtYXQxWzNdLFxuICAgICAgICAgICAgZSA9IG1hdDFbNF0sXG4gICAgICAgICAgICBmID0gbWF0MVs1XSxcbiAgICAgICAgICAgIGcgPSBtYXQxWzZdLFxuICAgICAgICAgICAgaCA9IG1hdDFbN10sXG4gICAgICAgICAgICBpID0gbWF0MVs4XSxcbiAgICAgICAgICAgIGogPSBtYXQxWzldLFxuICAgICAgICAgICAgayA9IG1hdDFbMTBdLFxuICAgICAgICAgICAgbCA9IG1hdDFbMTFdLFxuICAgICAgICAgICAgbSA9IG1hdDFbMTJdLFxuICAgICAgICAgICAgbiA9IG1hdDFbMTNdLFxuICAgICAgICAgICAgbyA9IG1hdDFbMTRdLFxuICAgICAgICAgICAgcCA9IG1hdDFbMTVdLFxuICAgICAgICAgICAgQSA9IG1hdDJbMF0sXG4gICAgICAgICAgICBCID0gbWF0MlsxXSxcbiAgICAgICAgICAgIEMgPSBtYXQyWzJdLFxuICAgICAgICAgICAgRCA9IG1hdDJbM10sXG4gICAgICAgICAgICBFID0gbWF0Mls0XSxcbiAgICAgICAgICAgIEYgPSBtYXQyWzVdLFxuICAgICAgICAgICAgRyA9IG1hdDJbNl0sXG4gICAgICAgICAgICBIID0gbWF0Mls3XSxcbiAgICAgICAgICAgIEkgPSBtYXQyWzhdLFxuICAgICAgICAgICAgSiA9IG1hdDJbOV0sXG4gICAgICAgICAgICBLID0gbWF0MlsxMF0sXG4gICAgICAgICAgICBMID0gbWF0MlsxMV0sXG4gICAgICAgICAgICBNID0gbWF0MlsxMl0sXG4gICAgICAgICAgICBOID0gbWF0MlsxM10sXG4gICAgICAgICAgICBPID0gbWF0MlsxNF0sXG4gICAgICAgICAgICBQID0gbWF0MlsxNV07XG4gICAgICAgIGRlc3RbMF0gPSBBICogYSArIEIgKiBlICsgQyAqIGkgKyBEICogbTtcbiAgICAgICAgZGVzdFsxXSA9IEEgKiBiICsgQiAqIGYgKyBDICogaiArIEQgKiBuO1xuICAgICAgICBkZXN0WzJdID0gQSAqIGMgKyBCICogZyArIEMgKiBrICsgRCAqIG87XG4gICAgICAgIGRlc3RbM10gPSBBICogZCArIEIgKiBoICsgQyAqIGwgKyBEICogcDtcbiAgICAgICAgZGVzdFs0XSA9IEUgKiBhICsgRiAqIGUgKyBHICogaSArIEggKiBtO1xuICAgICAgICBkZXN0WzVdID0gRSAqIGIgKyBGICogZiArIEcgKiBqICsgSCAqIG47XG4gICAgICAgIGRlc3RbNl0gPSBFICogYyArIEYgKiBnICsgRyAqIGsgKyBIICogbztcbiAgICAgICAgZGVzdFs3XSA9IEUgKiBkICsgRiAqIGggKyBHICogbCArIEggKiBwO1xuICAgICAgICBkZXN0WzhdID0gSSAqIGEgKyBKICogZSArIEsgKiBpICsgTCAqIG07XG4gICAgICAgIGRlc3RbOV0gPSBJICogYiArIEogKiBmICsgSyAqIGogKyBMICogbjtcbiAgICAgICAgZGVzdFsxMF0gPSBJICogYyArIEogKiBnICsgSyAqIGsgKyBMICogbztcbiAgICAgICAgZGVzdFsxMV0gPSBJICogZCArIEogKiBoICsgSyAqIGwgKyBMICogcDtcbiAgICAgICAgZGVzdFsxMl0gPSBNICogYSArIE4gKiBlICsgTyAqIGkgKyBQICogbTtcbiAgICAgICAgZGVzdFsxM10gPSBNICogYiArIE4gKiBmICsgTyAqIGogKyBQICogbjtcbiAgICAgICAgZGVzdFsxNF0gPSBNICogYyArIE4gKiBnICsgTyAqIGsgKyBQICogbztcbiAgICAgICAgZGVzdFsxNV0gPSBNICogZCArIE4gKiBoICsgTyAqIGwgKyBQICogcDtcbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfTtcbiAgICB0aGlzLnNjYWxlID0gZnVuY3Rpb24obWF0LCB2ZWMsIGRlc3QpOiBbXSB7XG4gICAgICAgIGRlc3RbMF0gPSBtYXRbMF0gKiB2ZWNbMF07XG4gICAgICAgIGRlc3RbMV0gPSBtYXRbMV0gKiB2ZWNbMF07XG4gICAgICAgIGRlc3RbMl0gPSBtYXRbMl0gKiB2ZWNbMF07XG4gICAgICAgIGRlc3RbM10gPSBtYXRbM10gKiB2ZWNbMF07XG4gICAgICAgIGRlc3RbNF0gPSBtYXRbNF0gKiB2ZWNbMV07XG4gICAgICAgIGRlc3RbNV0gPSBtYXRbNV0gKiB2ZWNbMV07XG4gICAgICAgIGRlc3RbNl0gPSBtYXRbNl0gKiB2ZWNbMV07XG4gICAgICAgIGRlc3RbN10gPSBtYXRbN10gKiB2ZWNbMV07XG4gICAgICAgIGRlc3RbOF0gPSBtYXRbOF0gKiB2ZWNbMl07XG4gICAgICAgIGRlc3RbOV0gPSBtYXRbOV0gKiB2ZWNbMl07XG4gICAgICAgIGRlc3RbMTBdID0gbWF0WzEwXSAqIHZlY1syXTtcbiAgICAgICAgZGVzdFsxMV0gPSBtYXRbMTFdICogdmVjWzJdO1xuICAgICAgICBkZXN0WzEyXSA9IG1hdFsxMl07XG4gICAgICAgIGRlc3RbMTNdID0gbWF0WzEzXTtcbiAgICAgICAgZGVzdFsxNF0gPSBtYXRbMTRdO1xuICAgICAgICBkZXN0WzE1XSA9IG1hdFsxNV07XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH07XG4gICAgdGhpcy50cmFuc2xhdGUgPSBmdW5jdGlvbihtYXQsIHZlYywgZGVzdCk6IFtdIHtcbiAgICAgICAgZGVzdFswXSA9IG1hdFswXTtcbiAgICAgICAgZGVzdFsxXSA9IG1hdFsxXTtcbiAgICAgICAgZGVzdFsyXSA9IG1hdFsyXTtcbiAgICAgICAgZGVzdFszXSA9IG1hdFszXTtcbiAgICAgICAgZGVzdFs0XSA9IG1hdFs0XTtcbiAgICAgICAgZGVzdFs1XSA9IG1hdFs1XTtcbiAgICAgICAgZGVzdFs2XSA9IG1hdFs2XTtcbiAgICAgICAgZGVzdFs3XSA9IG1hdFs3XTtcbiAgICAgICAgZGVzdFs4XSA9IG1hdFs4XTtcbiAgICAgICAgZGVzdFs5XSA9IG1hdFs5XTtcbiAgICAgICAgZGVzdFsxMF0gPSBtYXRbMTBdO1xuICAgICAgICBkZXN0WzExXSA9IG1hdFsxMV07XG4gICAgICAgIGRlc3RbMTJdID0gbWF0WzBdICogdmVjWzBdICsgbWF0WzRdICogdmVjWzFdICsgbWF0WzhdICogdmVjWzJdICsgbWF0WzEyXTtcbiAgICAgICAgZGVzdFsxM10gPSBtYXRbMV0gKiB2ZWNbMF0gKyBtYXRbNV0gKiB2ZWNbMV0gKyBtYXRbOV0gKiB2ZWNbMl0gKyBtYXRbMTNdO1xuICAgICAgICBkZXN0WzE0XSA9IG1hdFsyXSAqIHZlY1swXSArIG1hdFs2XSAqIHZlY1sxXSArIG1hdFsxMF0gKiB2ZWNbMl0gKyBtYXRbMTRdO1xuICAgICAgICBkZXN0WzE1XSA9IG1hdFszXSAqIHZlY1swXSArIG1hdFs3XSAqIHZlY1sxXSArIG1hdFsxMV0gKiB2ZWNbMl0gKyBtYXRbMTVdO1xuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9O1xuICAgIHRoaXMucm90YXRlID0gZnVuY3Rpb24obWF0LCBhbmdsZSwgYXhpcywgZGVzdCk6IFtdIHtcbiAgICAgICAgbGV0IHNxID0gTWF0aC5zcXJ0KGF4aXNbMF0gKiBheGlzWzBdICsgYXhpc1sxXSAqIGF4aXNbMV0gKyBheGlzWzJdICogYXhpc1syXSk7XG4gICAgICAgIGlmICghc3EpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBhID0gYXhpc1swXSxcbiAgICAgICAgICAgIGIgPSBheGlzWzFdLFxuICAgICAgICAgICAgYyA9IGF4aXNbMl07XG4gICAgICAgIGlmIChzcSAhPSAxKSB7XG4gICAgICAgICAgICBzcSA9IDEgLyBzcTtcbiAgICAgICAgICAgIGEgKj0gc3E7XG4gICAgICAgICAgICBiICo9IHNxO1xuICAgICAgICAgICAgYyAqPSBzcTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkID0gTWF0aC5zaW4oYW5nbGUpLFxuICAgICAgICAgICAgZSA9IE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgICAgIGYgPSAxIC0gZSxcbiAgICAgICAgICAgIGcgPSBtYXRbMF0sXG4gICAgICAgICAgICBoID0gbWF0WzFdLFxuICAgICAgICAgICAgaSA9IG1hdFsyXSxcbiAgICAgICAgICAgIGogPSBtYXRbM10sXG4gICAgICAgICAgICBrID0gbWF0WzRdLFxuICAgICAgICAgICAgbCA9IG1hdFs1XSxcbiAgICAgICAgICAgIG0gPSBtYXRbNl0sXG4gICAgICAgICAgICBuID0gbWF0WzddLFxuICAgICAgICAgICAgbyA9IG1hdFs4XSxcbiAgICAgICAgICAgIHAgPSBtYXRbOV0sXG4gICAgICAgICAgICBxID0gbWF0WzEwXSxcbiAgICAgICAgICAgIHIgPSBtYXRbMTFdLFxuICAgICAgICAgICAgcyA9IGEgKiBhICogZiArIGUsXG4gICAgICAgICAgICB0ID0gYiAqIGEgKiBmICsgYyAqIGQsXG4gICAgICAgICAgICB1ID0gYyAqIGEgKiBmIC0gYiAqIGQsXG4gICAgICAgICAgICB2ID0gYSAqIGIgKiBmIC0gYyAqIGQsXG4gICAgICAgICAgICB3ID0gYiAqIGIgKiBmICsgZSxcbiAgICAgICAgICAgIHggPSBjICogYiAqIGYgKyBhICogZCxcbiAgICAgICAgICAgIHkgPSBhICogYyAqIGYgKyBiICogZCxcbiAgICAgICAgICAgIHogPSBiICogYyAqIGYgLSBhICogZCxcbiAgICAgICAgICAgIEEgPSBjICogYyAqIGYgKyBlO1xuICAgICAgICBpZiAoYW5nbGUpIHtcbiAgICAgICAgICAgIGlmIChtYXQgIT0gZGVzdCkge1xuICAgICAgICAgICAgICAgIGRlc3RbMTJdID0gbWF0WzEyXTtcbiAgICAgICAgICAgICAgICBkZXN0WzEzXSA9IG1hdFsxM107XG4gICAgICAgICAgICAgICAgZGVzdFsxNF0gPSBtYXRbMTRdO1xuICAgICAgICAgICAgICAgIGRlc3RbMTVdID0gbWF0WzE1XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlc3QgPSBtYXQ7XG4gICAgICAgIH1cbiAgICAgICAgZGVzdFswXSA9IGcgKiBzICsgayAqIHQgKyBvICogdTtcbiAgICAgICAgZGVzdFsxXSA9IGggKiBzICsgbCAqIHQgKyBwICogdTtcbiAgICAgICAgZGVzdFsyXSA9IGkgKiBzICsgbSAqIHQgKyBxICogdTtcbiAgICAgICAgZGVzdFszXSA9IGogKiBzICsgbiAqIHQgKyByICogdTtcbiAgICAgICAgZGVzdFs0XSA9IGcgKiB2ICsgayAqIHcgKyBvICogeDtcbiAgICAgICAgZGVzdFs1XSA9IGggKiB2ICsgbCAqIHcgKyBwICogeDtcbiAgICAgICAgZGVzdFs2XSA9IGkgKiB2ICsgbSAqIHcgKyBxICogeDtcbiAgICAgICAgZGVzdFs3XSA9IGogKiB2ICsgbiAqIHcgKyByICogeDtcbiAgICAgICAgZGVzdFs4XSA9IGcgKiB5ICsgayAqIHogKyBvICogQTtcbiAgICAgICAgZGVzdFs5XSA9IGggKiB5ICsgbCAqIHogKyBwICogQTtcbiAgICAgICAgZGVzdFsxMF0gPSBpICogeSArIG0gKiB6ICsgcSAqIEE7XG4gICAgICAgIGRlc3RbMTFdID0gaiAqIHkgKyBuICogeiArIHIgKiBBO1xuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9O1xuICAgIHRoaXMubG9va0F0ID0gZnVuY3Rpb24oZXllLCBjZW50ZXIsIHVwLCBkZXN0KTogW10ge1xuICAgICAgICBjb25zdCBleWVYID0gZXllWzBdLFxuICAgICAgICAgICAgZXllWSA9IGV5ZVsxXSxcbiAgICAgICAgICAgIGV5ZVogPSBleWVbMl0sXG4gICAgICAgICAgICB1cFggPSB1cFswXSxcbiAgICAgICAgICAgIHVwWSA9IHVwWzFdLFxuICAgICAgICAgICAgdXBaID0gdXBbMl0sXG4gICAgICAgICAgICBjZW50ZXJYID0gY2VudGVyWzBdLFxuICAgICAgICAgICAgY2VudGVyWSA9IGNlbnRlclsxXSxcbiAgICAgICAgICAgIGNlbnRlclogPSBjZW50ZXJbMl07XG4gICAgICAgIGlmIChleWVYID09IGNlbnRlclggJiYgZXllWSA9PSBjZW50ZXJZICYmIGV5ZVogPT0gY2VudGVyWikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWRlbnRpdHkoZGVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHgwLCB4MSwgeDIsIHkwLCB5MSwgeTIsIHowLCB6MSwgejIsIGw7XG4gICAgICAgIHowID0gZXllWCAtIGNlbnRlclswXTtcbiAgICAgICAgejEgPSBleWVZIC0gY2VudGVyWzFdO1xuICAgICAgICB6MiA9IGV5ZVogLSBjZW50ZXJbMl07XG4gICAgICAgIGwgPSAxIC8gTWF0aC5zcXJ0KHowICogejAgKyB6MSAqIHoxICsgejIgKiB6Mik7XG4gICAgICAgIHowICo9IGw7XG4gICAgICAgIHoxICo9IGw7XG4gICAgICAgIHoyICo9IGw7XG4gICAgICAgIHgwID0gdXBZICogejIgLSB1cFogKiB6MTtcbiAgICAgICAgeDEgPSB1cFogKiB6MCAtIHVwWCAqIHoyO1xuICAgICAgICB4MiA9IHVwWCAqIHoxIC0gdXBZICogejA7XG4gICAgICAgIGwgPSBNYXRoLnNxcnQoeDAgKiB4MCArIHgxICogeDEgKyB4MiAqIHgyKTtcbiAgICAgICAgaWYgKCFsKSB7XG4gICAgICAgICAgICB4MCA9IDA7XG4gICAgICAgICAgICB4MSA9IDA7XG4gICAgICAgICAgICB4MiA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsID0gMSAvIGw7XG4gICAgICAgICAgICB4MCAqPSBsO1xuICAgICAgICAgICAgeDEgKj0gbDtcbiAgICAgICAgICAgIHgyICo9IGw7XG4gICAgICAgIH1cbiAgICAgICAgeTAgPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgICAgICAgeTEgPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgICAgICAgeTIgPSB6MCAqIHgxIC0gejEgKiB4MDtcbiAgICAgICAgbCA9IE1hdGguc3FydCh5MCAqIHkwICsgeTEgKiB5MSArIHkyICogeTIpO1xuICAgICAgICBpZiAoIWwpIHtcbiAgICAgICAgICAgIHkwID0gMDtcbiAgICAgICAgICAgIHkxID0gMDtcbiAgICAgICAgICAgIHkyID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGwgPSAxIC8gbDtcbiAgICAgICAgICAgIHkwICo9IGw7XG4gICAgICAgICAgICB5MSAqPSBsO1xuICAgICAgICAgICAgeTIgKj0gbDtcbiAgICAgICAgfVxuICAgICAgICBkZXN0WzBdID0geDA7XG4gICAgICAgIGRlc3RbMV0gPSB5MDtcbiAgICAgICAgZGVzdFsyXSA9IHowO1xuICAgICAgICBkZXN0WzNdID0gMDtcbiAgICAgICAgZGVzdFs0XSA9IHgxO1xuICAgICAgICBkZXN0WzVdID0geTE7XG4gICAgICAgIGRlc3RbNl0gPSB6MTtcbiAgICAgICAgZGVzdFs3XSA9IDA7XG4gICAgICAgIGRlc3RbOF0gPSB4MjtcbiAgICAgICAgZGVzdFs5XSA9IHkyO1xuICAgICAgICBkZXN0WzEwXSA9IHoyO1xuICAgICAgICBkZXN0WzExXSA9IDA7XG4gICAgICAgIGRlc3RbMTJdID0gLSh4MCAqIGV5ZVggKyB4MSAqIGV5ZVkgKyB4MiAqIGV5ZVopO1xuICAgICAgICBkZXN0WzEzXSA9IC0oeTAgKiBleWVYICsgeTEgKiBleWVZICsgeTIgKiBleWVaKTtcbiAgICAgICAgZGVzdFsxNF0gPSAtKHowICogZXllWCArIHoxICogZXllWSArIHoyICogZXllWik7XG4gICAgICAgIGRlc3RbMTVdID0gMTtcbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfTtcbiAgICB0aGlzLnBlcnNwZWN0aXZlID0gZnVuY3Rpb24oZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIsIGRlc3QpOiBbXSB7XG4gICAgICAgIGNvbnN0IHQgPSBuZWFyICogTWF0aC50YW4oKGZvdnkgKiBNYXRoLlBJKSAvIDM2MCk7XG4gICAgICAgIGNvbnN0IHIgPSB0ICogYXNwZWN0O1xuICAgICAgICBjb25zdCBhID0gciAqIDIsXG4gICAgICAgICAgICBiID0gdCAqIDIsXG4gICAgICAgICAgICBjID0gZmFyIC0gbmVhcjtcbiAgICAgICAgZGVzdFswXSA9IChuZWFyICogMikgLyBhO1xuICAgICAgICBkZXN0WzFdID0gMDtcbiAgICAgICAgZGVzdFsyXSA9IDA7XG4gICAgICAgIGRlc3RbM10gPSAwO1xuICAgICAgICBkZXN0WzRdID0gMDtcbiAgICAgICAgZGVzdFs1XSA9IChuZWFyICogMikgLyBiO1xuICAgICAgICBkZXN0WzZdID0gMDtcbiAgICAgICAgZGVzdFs3XSA9IDA7XG4gICAgICAgIGRlc3RbOF0gPSAwO1xuICAgICAgICBkZXN0WzldID0gMDtcbiAgICAgICAgZGVzdFsxMF0gPSAtKGZhciArIG5lYXIpIC8gYztcbiAgICAgICAgZGVzdFsxMV0gPSAtMTtcbiAgICAgICAgZGVzdFsxMl0gPSAwO1xuICAgICAgICBkZXN0WzEzXSA9IDA7XG4gICAgICAgIGRlc3RbMTRdID0gLShmYXIgKiBuZWFyICogMikgLyBjO1xuICAgICAgICBkZXN0WzE1XSA9IDA7XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH07XG4gICAgdGhpcy50cmFuc3Bvc2UgPSBmdW5jdGlvbihtYXQsIGRlc3QpOiBbXSB7XG4gICAgICAgIGRlc3RbMF0gPSBtYXRbMF07XG4gICAgICAgIGRlc3RbMV0gPSBtYXRbNF07XG4gICAgICAgIGRlc3RbMl0gPSBtYXRbOF07XG4gICAgICAgIGRlc3RbM10gPSBtYXRbMTJdO1xuICAgICAgICBkZXN0WzRdID0gbWF0WzFdO1xuICAgICAgICBkZXN0WzVdID0gbWF0WzVdO1xuICAgICAgICBkZXN0WzZdID0gbWF0WzldO1xuICAgICAgICBkZXN0WzddID0gbWF0WzEzXTtcbiAgICAgICAgZGVzdFs4XSA9IG1hdFsyXTtcbiAgICAgICAgZGVzdFs5XSA9IG1hdFs2XTtcbiAgICAgICAgZGVzdFsxMF0gPSBtYXRbMTBdO1xuICAgICAgICBkZXN0WzExXSA9IG1hdFsxNF07XG4gICAgICAgIGRlc3RbMTJdID0gbWF0WzNdO1xuICAgICAgICBkZXN0WzEzXSA9IG1hdFs3XTtcbiAgICAgICAgZGVzdFsxNF0gPSBtYXRbMTFdO1xuICAgICAgICBkZXN0WzE1XSA9IG1hdFsxNV07XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH07XG4gICAgdGhpcy5pbnZlcnNlID0gZnVuY3Rpb24obWF0LCBkZXN0KTogW10ge1xuICAgICAgICBjb25zdCBhID0gbWF0WzBdLFxuICAgICAgICAgICAgYiA9IG1hdFsxXSxcbiAgICAgICAgICAgIGMgPSBtYXRbMl0sXG4gICAgICAgICAgICBkID0gbWF0WzNdLFxuICAgICAgICAgICAgZSA9IG1hdFs0XSxcbiAgICAgICAgICAgIGYgPSBtYXRbNV0sXG4gICAgICAgICAgICBnID0gbWF0WzZdLFxuICAgICAgICAgICAgaCA9IG1hdFs3XSxcbiAgICAgICAgICAgIGkgPSBtYXRbOF0sXG4gICAgICAgICAgICBqID0gbWF0WzldLFxuICAgICAgICAgICAgayA9IG1hdFsxMF0sXG4gICAgICAgICAgICBsID0gbWF0WzExXSxcbiAgICAgICAgICAgIG0gPSBtYXRbMTJdLFxuICAgICAgICAgICAgbiA9IG1hdFsxM10sXG4gICAgICAgICAgICBvID0gbWF0WzE0XSxcbiAgICAgICAgICAgIHAgPSBtYXRbMTVdLFxuICAgICAgICAgICAgcSA9IGEgKiBmIC0gYiAqIGUsXG4gICAgICAgICAgICByID0gYSAqIGcgLSBjICogZSxcbiAgICAgICAgICAgIHMgPSBhICogaCAtIGQgKiBlLFxuICAgICAgICAgICAgdCA9IGIgKiBnIC0gYyAqIGYsXG4gICAgICAgICAgICB1ID0gYiAqIGggLSBkICogZixcbiAgICAgICAgICAgIHYgPSBjICogaCAtIGQgKiBnLFxuICAgICAgICAgICAgdyA9IGkgKiBuIC0gaiAqIG0sXG4gICAgICAgICAgICB4ID0gaSAqIG8gLSBrICogbSxcbiAgICAgICAgICAgIHkgPSBpICogcCAtIGwgKiBtLFxuICAgICAgICAgICAgeiA9IGogKiBvIC0gayAqIG4sXG4gICAgICAgICAgICBBID0gaiAqIHAgLSBsICogbixcbiAgICAgICAgICAgIEIgPSBrICogcCAtIGwgKiBvLFxuICAgICAgICAgICAgaXZkID0gMSAvIChxICogQiAtIHIgKiBBICsgcyAqIHogKyB0ICogeSAtIHUgKiB4ICsgdiAqIHcpO1xuICAgICAgICBkZXN0WzBdID0gKGYgKiBCIC0gZyAqIEEgKyBoICogeikgKiBpdmQ7XG4gICAgICAgIGRlc3RbMV0gPSAoLWIgKiBCICsgYyAqIEEgLSBkICogeikgKiBpdmQ7XG4gICAgICAgIGRlc3RbMl0gPSAobiAqIHYgLSBvICogdSArIHAgKiB0KSAqIGl2ZDtcbiAgICAgICAgZGVzdFszXSA9ICgtaiAqIHYgKyBrICogdSAtIGwgKiB0KSAqIGl2ZDtcbiAgICAgICAgZGVzdFs0XSA9ICgtZSAqIEIgKyBnICogeSAtIGggKiB4KSAqIGl2ZDtcbiAgICAgICAgZGVzdFs1XSA9IChhICogQiAtIGMgKiB5ICsgZCAqIHgpICogaXZkO1xuICAgICAgICBkZXN0WzZdID0gKC1tICogdiArIG8gKiBzIC0gcCAqIHIpICogaXZkO1xuICAgICAgICBkZXN0WzddID0gKGkgKiB2IC0gayAqIHMgKyBsICogcikgKiBpdmQ7XG4gICAgICAgIGRlc3RbOF0gPSAoZSAqIEEgLSBmICogeSArIGggKiB3KSAqIGl2ZDtcbiAgICAgICAgZGVzdFs5XSA9ICgtYSAqIEEgKyBiICogeSAtIGQgKiB3KSAqIGl2ZDtcbiAgICAgICAgZGVzdFsxMF0gPSAobSAqIHUgLSBuICogcyArIHAgKiBxKSAqIGl2ZDtcbiAgICAgICAgZGVzdFsxMV0gPSAoLWkgKiB1ICsgaiAqIHMgLSBsICogcSkgKiBpdmQ7XG4gICAgICAgIGRlc3RbMTJdID0gKC1lICogeiArIGYgKiB4IC0gZyAqIHcpICogaXZkO1xuICAgICAgICBkZXN0WzEzXSA9IChhICogeiAtIGIgKiB4ICsgYyAqIHcpICogaXZkO1xuICAgICAgICBkZXN0WzE0XSA9ICgtbSAqIHQgKyBuICogciAtIG8gKiBxKSAqIGl2ZDtcbiAgICAgICAgZGVzdFsxNV0gPSAoaSAqIHQgLSBqICogciArIGsgKiBxKSAqIGl2ZDtcbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWF0SVY7XG4iLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudm9pZCBtYWluKHZvaWQpe1xcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNCgxLjAsIDEuMCwgMS4wLCAxLjApO1xcbn1cXG5cIiIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5hdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjtcXG51bmlmb3JtICAgbWF0NCBtdnBNYXRyaXg7XFxuXFxudm9pZCBtYWluKHZvaWQpe1xcbiAgZ2xfUG9zaXRpb24gPSBtdnBNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcbn1cXG5cIiJdLCJzb3VyY2VSb290IjoiIn0=
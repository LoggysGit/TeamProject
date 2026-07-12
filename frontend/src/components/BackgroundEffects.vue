<template>
  <canvas ref="canvasRef" class="bg"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  scale: { type: Number, default: 1.4 },
  ringFrequency: { type: Number, default: 20 },
  ringSpeed: { type: Number, default: 0.6 },
  driftSpeed: { type: Number, default: 0.06 },
  lineWidth: { type: Number, default: 0.2 },
  peakOpacity: { type: Number, default: 0.05 },
})

const canvasRef = ref(null)
let gl = null
let rafId = null
let resizeObserver = null
let startTime = 0
let uTime, uResolution, uScale, uRingFreq, uRingSpeed, uDrift, uLineWidth, uPeakOpacity, uColor

const VERTEX_SRC = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const FRAGMENT_SRC = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uScale;
uniform float uRingFreq;
uniform float uRingSpeed;
uniform float uDrift;
uniform float uLineWidth;
uniform float uPeakOpacity;
uniform vec3 uColor;

out vec4 fragColor;

vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod289(vec4(Pi0, 0.0)).xyz;
  Pi1 = mod289(vec4(Pi1, 0.0)).xyz;
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));
  g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));
  g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fadeXYZ = fade(Pf0);
  vec4 n_z = mix(vec4(n000,n100,n010,n110), vec4(n001,n101,n011,n111), fadeXYZ.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fadeXYZ.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fadeXYZ.x);
  return 2.2 * n_xyz;
}

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * cnoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 aspectUv = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

  float field = fbm(vec3(aspectUv * uScale, uTime * uDrift));

  float wave = sin(field * uRingFreq - uTime * uRingSpeed);
  float line = 1.0 - smoothstep(0.0, uLineWidth, abs(wave));

  fragColor = vec4(uColor, line * uPeakOpacity);
}
`

function compileShader(gl, type, source, label) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(`${label} shader compile error:`, gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function resizeCanvas(canvas, gl) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = Math.max(1, Math.floor(canvas.clientWidth * dpr))
  const height = Math.max(1, Math.floor(canvas.clientHeight * dpr))
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    gl.viewport(0, 0, width, height)
  }
}

function getSurfaceColor(el, val='--color-muted') {
  const raw = getComputedStyle(el).getPropertyValue(val).trim()
  const hexMatch = raw.match(/^#([0-9a-f]{6})$/i)
  if (!hexMatch) return [1, 1, 1]
  const hex = hexMatch[1]
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ]
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  const canvas = canvasRef.value
  gl = canvas.getContext('webgl2')

  if (!gl) {
    console.error('WebGL2 unavailable — background disabled.')
    return
  }

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC, 'vertex')
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC, 'fragment')
  if (!vertexShader || !fragmentShader) return

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program))
    return
  }
  gl.useProgram(program)

  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
  const aPosition = gl.getAttribLocation(program, 'aPosition')
  gl.enableVertexAttribArray(aPosition)
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  uTime = gl.getUniformLocation(program, 'uTime')
  uResolution = gl.getUniformLocation(program, 'uResolution')
  uScale = gl.getUniformLocation(program, 'uScale')
  uRingFreq = gl.getUniformLocation(program, 'uRingFreq')
  uRingSpeed = gl.getUniformLocation(program, 'uRingSpeed')
  uDrift = gl.getUniformLocation(program, 'uDrift')
  uLineWidth = gl.getUniformLocation(program, 'uLineWidth')
  uPeakOpacity = gl.getUniformLocation(program, 'uPeakOpacity')
  uColor = gl.getUniformLocation(program, 'uColor')

  resizeCanvas(canvas, gl)
  resizeObserver = new ResizeObserver(() => resizeCanvas(canvas, gl))
  resizeObserver.observe(canvas)

  startTime = performance.now()

  function render(now) {
    const elapsed = (now - startTime) / 1000
    gl.uniform1f(uTime, elapsed)
    gl.uniform2f(uResolution, canvas.width, canvas.height)
    gl.uniform1f(uScale, props.scale)
    gl.uniform1f(uRingFreq, props.ringFrequency)
    gl.uniform1f(uRingSpeed, props.ringSpeed)
    gl.uniform1f(uDrift, props.driftSpeed)
    gl.uniform1f(uLineWidth, props.lineWidth)
    gl.uniform1f(uPeakOpacity, props.peakOpacity)
    gl.uniform3fv(uColor, getSurfaceColor(canvas))
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    if (!reducedMotion) rafId = requestAnimationFrame(render)
  }

  render(performance.now())
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<style scoped>
.bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
}
</style>
<template>
    <canvas ref="canvasRef" class="perlin-bg" aria-hidden="true"></canvas>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  /*
    Анимированный серый шум Перлина на фоне страницы.
    Яркость шума ограничена сверху светлотой CSS-переменной --color-bg —
    узор никогда не станет светлее самого фона, только темнее/нейтральнее,
    так что эффект читается как тонкая фактура, а не как более светлое пятно.
  
    ВАЖНО: контейнер, в который вкладывается канвас (.home-page),
    должен иметь `isolation: isolate;` (или position+z-index) —
    иначе собственный непрозрачный background контейнера перекроет канвас.
  */
  
  const props = defineProps({
    speed: { type: Number, default: 0.08 },   // скорость "течения" шума
    scale: { type: Number, default: 1.6 },    // масштаб узора (меньше = крупнее пятна)
    opacity: { type: Number, default: 0.12 }, // сила зерна поверх фона
  })
  
  const canvasRef = ref(null)
  let gl = null
  let program = null
  let rafId = null
  let resizeObserver = null
  let startTime = 0
  let uTime, uResolution, uScale, uOpacity, uMaxLightness
  
  const VERTEX_SRC = `#version 300 es
    in vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `
  
  // Классический 3D Perlin noise (Ashima Arts / Stefan Gustavson, MIT)
  const FRAGMENT_SRC = `#version 300 es
    precision highp float;
  
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uScale;
    uniform float uOpacity;
    uniform float uMaxLightness;
  
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
      for (int i = 0; i < 5; i++) {
        value += amplitude * cnoise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
  
    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      vec2 aspectUv = uv * vec2(uResolution.x / uResolution.y, 1.0);
  
      float n = fbm(vec3(aspectUv * uScale, uTime));
      n = n * 0.5 + 0.5; // из [-1, 1] в [0, 1]
  
      // Серый уровень колеблется между половиной и полной светлотой --color-bg —
      // никогда не поднимается выше самого фона.
      float grey = mix(uMaxLightness * 0.4, uMaxLightness, n);
  
      fragColor = vec4(vec3(grey), uOpacity);
    }
  `
  
  function compileShader(gl, type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    return shader
  }
  
  function resizeCanvas(canvas, gl) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.floor(canvas.clientWidth * dpr)
    const height = Math.floor(canvas.clientHeight * dpr)
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }
  }
  
  // Читаем --color-bg именно с самого канваса (не с <html>!) —
  // он унаследует переменную от родителя (.home-page), где она реально объявлена.
  function getBgLightness(el) {
    const raw = getComputedStyle(el).getPropertyValue('--color-bg').trim()
    const hexMatch = raw.match(/^#([0-9a-f]{6})$/i)
    if (!hexMatch) return 0.85 // фолбэк, если переменная не найдена
    const hex = hexMatch[1]
    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255
    // Перцептивная светлота (Rec. 601), а не простое среднее — точнее совпадает с
    // тем, как глаз воспринимает яркость.
    return 0.299 * r + 0.587 * g + 0.114 * b
  }
  
  let reducedMotion = false
  
  onMounted(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
    const canvas = canvasRef.value
    gl = canvas.getContext('webgl2')
    if (!gl) {
      console.warn('WebGL2 недоступен — анимированный фон отключён.')
      return
    }
  
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC)
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC)
    if (!vertexShader || !fragmentShader) return
  
    program = gl.createProgram()
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
    uOpacity = gl.getUniformLocation(program, 'uOpacity')
    uMaxLightness = gl.getUniformLocation(program, 'uMaxLightness')
  
    resizeCanvas(canvas, gl)
    resizeObserver = new ResizeObserver(() => resizeCanvas(canvas, gl))
    resizeObserver.observe(canvas)
  
    startTime = performance.now()
  
    function render(now) {
      const elapsed = (now - startTime) / 1000
      gl.uniform1f(uTime, elapsed * props.speed)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uScale, props.scale)
      gl.uniform1f(uOpacity, props.opacity)
      gl.uniform1f(uMaxLightness, getBgLightness(canvas))
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
  .perlin-bg {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    pointer-events: none;
  }
  </style>
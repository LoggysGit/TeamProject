<template>
    <div class="moving-list" @mouseenter="paused = true" @mouseleave="paused = false">
      <span
        v-for="(text, i) in items"
        :key="i"
        class="pill-item"
        :class="{ main: relOffset(i) === 0, dim: relOffset(i) !== 0 }"
        :style="itemStyle(i)"
      >{{ text }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  const props = defineProps({
    items: {
      type: Array,
      default: () => [
        'Project',
        'Startup',
        'Olympiad',
        'Debates',
        'Hakaton',
        'Gamejam',
        'Research',
      ],
    },
    delay: { type: Number, default: 2 },
    dir: { type: Number, default: 1 },
    slotGap: { type: Number, default: 35 },
  })
  
  const current = ref(0)
  const paused = ref(false)
  let timer = null
  
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function relOffset(i) {
    const len = props.items.length
    let rel = (i - current.value) % len
    if (rel > len / 2) rel -= len
    if (rel < -len / 2) rel += len
    return rel
  }
  
  function itemStyle(i) {
    const rel = relOffset(i)
    const visible = Math.abs(rel) <= 1
    return {
      left: `${50 + rel * props.slotGap}%`,
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
    }
  }
  
  function step() {
    if (paused.value) return
    const len = props.items.length
    current.value = ((current.value + props.dir) % len + len) % len
  }
  
  onMounted(() => {
    if (reducedMotion) return
    timer = setInterval(step, props.delay * 1000)
  })
  
  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
  })
  </script>
  
  <style scoped>
  .moving-list {
    position: relative;
    width: 60%;
    max-width: 92%;
    height: 110px;
    border-radius: 30px;
    border: 4px solid var(--color-border);
    background: var(--color-surface);
    box-shadow: var(--shadow-pill);
    overflow: hidden;
    margin: 0 auto;
  }
  
  .pill-item {
    position: absolute;
    top: 50%;
    font-weight: 700;
    white-space: nowrap;
    transform: translate(-50%, -50%);
    transition: left 0.6s ease, opacity 0.5s ease, font-size 0.4s ease;
  }
  
  .pill-item.dim {
    color: var(--color-accent-secondary);
    opacity: 0.5;
    font-size: 36px;
  }
  
  .pill-item.main {
    color: var(--color-accent-secondary);
    font-size: 54px;
  }
  
  @media (max-width: 768px) {
    .moving-list {
        width: 90%;
        height: 70px;
    }
  
    .pill-item.dim {
      font-size: 16px;
    }
  
    .pill-item.main {
      font-size: 22px;
    }
  }
  </style>
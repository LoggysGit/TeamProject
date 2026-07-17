<template>
  <div class="timeline-wrap">
    <div class="month-label">{{ visibleMonth }}</div>

    <div
      class="timeline-scroll"
      ref="scrollEl"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    >
      <!-- Day headers -->
      <div class="timeline-header" :style="{ width: totalWidth + 'px' }">
        <div
          v-for="day in days"
          :key="day.iso"
          class="day-col"
          :style="{ left: day.offset + 'px', width: DAY_W + 'px' }"
        >
          <span class="day-label">{{ day.label }}</span>
        </div>
      </div>

      <!-- Grid + events -->
      <div class="timeline-body-wrap" :style="{ width: totalWidth + 'px', height: bodyHeight + 'px' }">

        <!-- Grid lines -->
        <div
          v-for="day in days"
          :key="day.iso + '-line'"
          class="grid-line"
          :class="{ 'grid-line--weekend': day.isWeekend }"
          :style="{ left: day.offset + 'px', width: DAY_W + 'px', height: bodyHeight + 'px' }"
        />

        <!-- Events -->
        <div
          v-for="ev in placed"
          :key="ev.cid"
          class="event-bar"
          :style="{
            left:       ev.x + 'px',
            top:        ev.row * (ROW_H + ROW_GAP) + 'px',
            width:      ev.w + 'px',
            background: ev.color,
          }"
          :title="ev.title"
          @click="$emit('select', ev)"
        >
          <span class="event-title">{{ ev.title }}</span>
        </div>

      </div>

      <!-- Day footers -->
      <div class="timeline-footer" :style="{ width: totalWidth + 'px' }">
        <div
          v-for="day in days"
          :key="day.iso + '-footer'"
          class="day-col"
          :style="{ left: day.offset + 'px', width: DAY_W + 'px' }"
        >
          <span class="day-label">{{ day.weekday }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  competitions: { type: Array, default: () => [] },
})
defineEmits(['select'])

/* ---- Constants ---- */
const DAY_W      = 120
const ROW_H      = 28
const ROW_GAP    = 6
const PAD_BEFORE = 5
const PAD_AFTER  = 5
const V_PADDING  = 24


const COLORS = [
  '#4a9eff', '#ff6b6b', '#6bcb77', '#f4a261',
  '#c77dff', '#48cae4', '#e63946', '#2ec4b6',
  '#ff9f1c', '#3c62fb'
]

/* ---- Date helpers ---- */
const parse    = s  => s instanceof Date ? s : new Date(s + 'T00:00:00')
const diffDays = (a,b) => Math.round((b - a) / 86400000)
const addDays  = (d,n) => { const r = new Date(d); r.setDate(r.getDate()+n); return r }

function fmtDay(d) {
  const n = d.getDate()
  return n + ([,'st','nd','rd'][n] ?? 'th')
}

/* ---- Range ---- */
const range = computed(() => {
  if (!props.competitions.length) {
    const now = new Date()
    return { start: addDays(now,-PAD_BEFORE), end: addDays(now,30+PAD_AFTER) }
  }
  const starts = props.competitions.map(c => parse(c.startDate))
  const ends   = props.competitions.map(c => parse(c.endDate))
  return {
    start: addDays(new Date(Math.min(...starts)), -PAD_BEFORE),
    end:   addDays(new Date(Math.max(...ends)),    PAD_AFTER),
  }
})

const totalDays  = computed(() => diffDays(range.value.start, range.value.end) + 1)
const totalWidth = computed(() => totalDays.value * DAY_W)

/* ---- Days ---- */
const days = computed(() =>
  Array.from({ length: totalDays.value }, (_, i) => {
    const d   = addDays(range.value.start, i)
    const dow = d.getDay()
    return { 
      iso: d.toISOString().slice(0,10), 
      label: fmtDay(d), 
      weekday: d.toLocaleString('en', { weekday: 'short' }),
      offset: i * DAY_W, 
      isWeekend: dow===0||dow===6 
    }
  })
)

/* ---- Visible month ---- */
const scrollEl    = ref(null)
const scrollLeft  = ref(0)

const visibleMonth = computed(() => {
  const midPx  = scrollLeft.value + (scrollEl.value?.clientWidth ?? 800) / 2
  const midDay = Math.floor(midPx / DAY_W)
  const d = addDays(range.value.start, Math.min(midDay, totalDays.value - 1))
  return d.toLocaleString('en', { month: 'long', year: 'numeric' })
})

function onScroll() { scrollLeft.value = scrollEl.value?.scrollLeft ?? 0 }

/* ---- Drag-to-scroll (X only) ---- */
let dragging = false
let dragStartX = 0
let dragScrollStart = 0

function onMouseDown(e) {
  dragging = true
  dragStartX = e.clientX
  dragScrollStart = scrollEl.value.scrollLeft
  scrollEl.value.style.cursor = 'grabbing'
}
function onMouseMove(e) {
  if (!dragging) return
  scrollEl.value.scrollLeft = dragScrollStart - (e.clientX - dragStartX)
}
function onMouseUp() {
  dragging = false
  if (scrollEl.value) scrollEl.value.style.cursor = 'grab'
}

onMounted(() => scrollEl.value?.addEventListener('scroll', onScroll))
onBeforeUnmount(() => scrollEl.value?.removeEventListener('scroll', onScroll))

/* ---- Pack events ---- */
const placed = computed(() => {
  const rs = range.value.start
  const rowEnds = []
  return props.competitions.map((ev, idx) => {
    const s = parse(ev.startDate)
    const e = parse(ev.endDate)
    const x = Math.max(0, diffDays(rs, s)) * DAY_W
    const w = Math.max(DAY_W, (diffDays(s, e) + 1) * DAY_W) - 4
    let row = rowEnds.findIndex(ex => ex <= x)
    if (row === -1) { row = rowEnds.length }
    rowEnds[row] = x + w + 4
    return { ...ev, x, w, row, color: COLORS[idx % COLORS.length] }
  })
})

/* ---- Dynamic height ---- */
const bodyHeight = computed(() => {
  if (!placed.value.length) {
    return ROW_H + (V_PADDING * 2)
  }
  const maxRow = placed.value.reduce((m, e) => Math.max(m, e.row), 0)
  const totalRows = maxRow + 1
  const rowsHeight = (totalRows * ROW_H) + ((totalRows - 1) * ROW_GAP)
  
  return rowsHeight + (V_PADDING * 2)
})
</script>

<style scoped>
.timeline-wrap {
  width: 100%;
  background: var(--color-surface);
  overflow: hidden;
  font-family: var(--font-display);
  color: var(--color-text);
  user-select: none;
}

.month-label {
  padding: 14px 20px 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  opacity: 0.8;
}

.timeline-scroll {
  overflow-x: scroll;
  overflow-y: visible;
  padding-bottom: 16px;
  cursor: grab;
  scrollbar-width: none;
}
.timeline-scroll::-webkit-scrollbar { display: none; }

/* ---- Header / Footer ---- */
.timeline-header,
.timeline-footer {
  position: relative;
  height: 36px;
}

.day-col {
  position: absolute;
  top: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  box-sizing: border-box;
}

.day-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-faint);
  white-space: nowrap;
}

/* ---- Body ---- */
.timeline-body-wrap {
  position: relative;
  margin-top: 4px;
  padding: 24px 0;
  box-sizing: border-box;
}

/* Grid lines */
.grid-line {
  position: absolute;
  top: 0;
  border-left: 1px solid var(--color-panel);
  opacity: 0.5;
  box-sizing: border-box;
  pointer-events: none;
}

.grid-line--weekend {
  background: var(--color-panel);
  opacity: 0.25;
  border-left-color: var(--color-faint);
}

/* ---- Event bars ---- */
.event-bar {
  position: absolute;
  transform: translateY(24px);
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  transition: filter 0.15s, transform 0.1s;
  box-shadow: var(--shadow-pill);
}

.event-bar:hover {
  filter: brightness(1.1);
  transform: translateY(23px); 
}

.event-title {
  position: sticky;
  left: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  padding-right: 8px;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
<template>
  <div class="page">
    <BackgroundEffects />

    <!-- Header -->
    <Header v-model:theme="theme" />

    <!-- Search -->
    <section class="search-section">
      <div class="search-grid">
        <div class="grid-cell">
          <label class="field-label" for="team-search">Search</label>
          <div class="field field-search">
            <svg class="icon icon-search" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50.6333 54.25L34.3583 37.975C33.0667 39.0083 31.5813 39.8264 29.9021 40.4292C28.2229 41.0319 26.4361 41.3333 24.5417 41.3333C19.8486 41.3333 15.8772 39.7076 12.6273 36.456C9.3775 33.2044 7.75172 29.233 7.75 24.5417C7.74828 19.8503 9.37406 15.8789 12.6273 12.6273C15.8806 9.37578 19.8521 7.75 24.5417 7.75C29.2313 7.75 33.2036 9.37578 36.4586 12.6273C39.7136 15.8789 41.3385 19.8503 41.3333 24.5417C41.3333 26.4361 41.0319 28.2229 40.4292 29.9021C39.8264 31.5812 39.0083 33.0667 37.975 34.3583L54.25 50.6333L50.6333 54.25ZM24.5417 36.1667C27.7708 36.1667 30.5161 35.0369 32.7773 32.7773C35.0386 30.5178 36.1684 27.7726 36.1667 24.5417C36.1649 21.3108 35.0352 18.5664 32.7773 16.3086C30.5195 14.0508 27.7743 12.9201 24.5417 12.9167C21.3091 12.9132 18.5647 14.0439 16.3086 16.3086C14.0525 18.5733 12.9218 21.3177 12.9167 24.5417C12.9115 27.7657 14.0421 30.5109 16.3086 32.7773C18.575 35.0438 21.3194 36.1736 24.5417 36.1667Z" fill="currentColor"/>
            </svg>
            <input
              id="team-search"
              v-model="query"
              type="text"
              class="field-input"
              placeholder="Search for teams..."
            />
          </div>
        </div>
      
        <div class="grid-cell">
          <span class="field-label">Deadline</span>
          <div class="date-range">
            <input v-model="deadlineFrom" type="date" class="field-input field-input--date" aria-label="From date" />
            <span class="field-sep">–</span>
            <input v-model="deadlineTo" type="date" class="field-input field-input--date" aria-label="To date" />
          </div>
        </div>
      
        <div class="grid-cell">
          <span class="field-label">Tags</span>
          <div class="chip-row">
            <span
              v-for="tag in selectedTags"
              :key="tag.label"
              class="chip"
              :style="{ background: tag.color }"
            >{{ tag.label }}</span>
            <button type="button" class="chip chip-add" aria-label="Add tag">+</button>
          </div>
        </div>
      
        <div class="grid-cell">
          <label class="field-label" for="team-type">Type</label>
          <div class="field field-inline">
            <input
              id="team-type"
              v-model="typeQuery"
              type="text"
              class="field-input"
              placeholder="Startup, Biology..."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Teams list -->
    <section class="teams-section">
      <TeamCard 
      v-for="item in teams" 
      :key="item.id" 
      :team="item" 
    />
    </section>

    <!-- Pagination -->
    <section class="pagination-section">
      <nav class="pagination">
        <button
          v-for="page in visiblePages"
          :key="page"
          type="button"
          class="page-btn"
          :class="{ 'is-active': page === currentPage, 'is-ellipsis': page === '...' }"
          :disabled="page === '...'"
          @click="page !== '...' && (currentPage = page)"
        >{{ page }}</button>
      </nav>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

import TeamCard from '../components/TeamCard.vue'

const theme = ref('light')

const query = ref('')
const deadlineFrom = ref('')
const deadlineTo = ref('')
const typeQuery = ref('')

const selectedTags = ref([
])

const teams = ref([
])

const currentPage = ref(1)
const totalPages = 10

const visiblePages = computed(() => {
  const pages = [1, 2, 3]
  if (totalPages > 4) pages.push('...')
  pages.push(totalPages)
  return pages
})

function sendSearchParams(){
  
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: var(--color-bg);
  font-family: var(--font-display);
  color: var(--color-text);
  overflow-x: hidden;
  isolation: isolate;
}

/* ---------- Shared block ---------- */
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: var(--color-panel);
  box-shadow: var(--shadow-panel);
  padding: 40px 5%;
  text-align: center;
}

.page > section,
.page > .site-header,
.page > .site-footer {
  margin-bottom: 100px;
}

.page > .site-header {
  margin-bottom: 28px;
}

.page > :last-child {
  margin-bottom: 0;
}

/* ---------- Search / filters ---------- */
.search-section {
  align-items: center;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 40px;
  width: 90%;
  margin: 0 auto;
}

.grid-cell {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

.field-label {
  color: var(--color-muted);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* Every control in the matrix shares the same height, so all four
   cells line up cleanly regardless of what kind of control they hold. */
.field,
.date-range .field-input--date {
  height: 60px;
  box-sizing: border-box;
  border-radius: 14px;
  border: 3px solid var(--color-border);
  background: var(--color-surface);
}

.field {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 22px;
}

.field-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-icon);
  font-family: inherit;
  font-size: 17px;
  font-weight: 600;
  text-align: left;
}

.field-input::placeholder {
  color: var(--color-muted);
}

.icon-search {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  color: var(--color-accent);
}

/* Native date input — inherits the same pill chrome as the other fields,
   only the calendar icon has limited cross-browser styling. */
.field-input--date {
  flex: 1;
  min-width: 0;
  padding: 0 18px;
  color: var(--color-icon);
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  color-scheme: light;
  cursor: pointer;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 60px;
}

.field-sep {
  flex-shrink: 0;
  color: var(--color-text);
  font-size: 18px;
  font-weight: 600;
}

.chip-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  height: 60px;
  padding: 0 4px;
}

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border-radius: 16px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
}

.chip-add {
  border: none;
  background: var(--color-icon);
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 50%;
  font-size: 18px;
  line-height: 1;
}

@media (max-width: 768px) {
  .search-grid {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .date-range {
    flex-wrap: wrap;
    height: auto;
  }

  .date-range .field-input--date {
    flex: 1 1 auto;
    min-width: 120px;
  }
}
/* ---------- Team section ---------- */
.teams-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

/* ---------- Pagination ---------- */
.pagination-section {
  display: flex;
  justify-content: center;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 10px;
}

.page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-muted);
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.page-btn.is-active {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.page-btn.is-ellipsis {
  border: none;
  background: transparent;
  cursor: default;
  width: auto;
}

/* ================= Responsive ================= */
@media (max-width: 900px) {
  .search-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page > section,
  .page > .site-header,
  .page > .site-footer {
    margin-bottom: 60px;
  }

  .page > .site-header {
    margin-bottom: 20px;
  }

  .team-title {
    font-size: 24px;
  }

  .field-date {
    width: 110px;
  }
}
</style>
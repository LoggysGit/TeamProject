<template>
  <article class="team-card">
    <div class="team-card-top">
      <div class="team-heading">
        <h3 class="team-title">{{ team.title }}</h3>
        <span
          v-if="typeTag"
          class="chip chip-type"
          :style="{ background: typeTag.color }"
        >{{ typeTag.label }}</span>
      </div>
      <span class="team-deadline">Until {{ team.deadline }}</span>
    </div>

    <div class="chip-row">
      <span
        v-for="tag in restTags"
        :key="tag.label"
        class="chip"
        :style="{ background: tag.color }"
      >{{ tag.label }}</span>
    </div>

    <p class="team-description">{{ team.description }}</p>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  team: {
    type: Object,
    required: true,
  },
})

const typeTag = computed(() => props.team.type ?? props.team.tags?.[0] ?? null)

const restTags = computed(() => {
  if (props.team.type) return props.team.tags ?? []
  return (props.team.tags ?? []).slice(1)
})
</script>

<style scoped>
.team-card {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 1100px;
  padding: 24px 32px;
  border-radius: 16px;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
}

.team-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.team-heading {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  min-width: 0;
}

.team-title {
  color: var(--color-text);
  font-size: 30px;
  font-weight: 700;
  margin: 10px 0;
}

.team-deadline {
  color: var(--color-text);
  font-size: 15px;
  font-weight: 500;
  white-space: nowrap;
  padding-top: 10px;
}

.team-description {
  color: var(--color-muted);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}

.chip-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
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

.chip-type {
  border-radius: 8px;
  padding: 7px 20px;
  font-weight: 800;
  letter-spacing: 0.01em;
}

.chip-add {
  border: none;
  background: var(--color-icon);
  cursor: pointer;
  min-width: 36px;
}

@media (max-width: 480px) {
  .team-card-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .team-deadline {
    padding-top: 0;
  }
}
</style>
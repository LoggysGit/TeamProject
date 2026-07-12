<template>
    <article class="team-card">
      <div class="team-card-top">
        <h3 class="team-title">{{ team.title }}</h3>
        <span class="team-deadline">Until {{ team.deadline }}</span>
      </div>
  
      <div class="chip-row">
        <span
          v-for="tag in team.tags"
          :key="tag.label"
          class="chip"
          :style="{ background: tag.color }"
        >{{ tag.label }}</span>
      </div>
  
      <p class="team-description">{{ team.description }}</p>
    </article>
</template>
  
<script setup>
  defineProps({
    team: {
      type: Object,
      required: true
    }
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
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
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

.chip-add {
  border: none;
  background: var(--color-icon);
  cursor: pointer;
  min-width: 36px;
}
</style>
<template>
    <div class="page">
        <BackgroundEffects />

        <!-- Header -->
        <Header v-model:theme="theme" />

        <!-- Content -->
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import Header from '../components/Header.vue'
    import BackgroundEffects from '../components/BackgroundEffects.vue'

    const theme = ref('light')
</script>

<style>
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
  
  /* ---------- Shared section styles ---------- */
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: var(--color-panel);
    box-shadow: var(--shadow-panel);
    padding: 40px 1%;
    text-align: center;
  }
  
  .section-title {
    font-size: 44px;
    font-weight: 700;
    line-height: 1.3;
    margin: 10px;
  }
  
  .section-lede {
    max-width: 1000px;
    color: var(--color-muted);
    font-size: 22px;
    font-weight: 600;
    line-height: 1.5;
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
</style>
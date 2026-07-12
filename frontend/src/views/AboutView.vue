<template>
    <div class="page">
        <BackgroundEffects />

          <!-- Header -->
        <Header v-model:theme="theme" />

        <!-- ... -->
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import Header from '../components/Header.vue'
    import BackgroundEffects from '../components/BackgroundEffects.vue'
</script>

<style>
</style>
<template>
    <header class="site-header">
      <div class="header-inner">
        <span class="logo">Header</span>
  
        <button
          class="burger"
          :class="{ 'is-open': menuOpen }"
          type="button"
          aria-label="Toggle navigation"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span><span></span>
        </button>
  
        <nav class="nav-links" :class="{ 'is-open': menuOpen }">
          <a href="/" class="nav-link">Home</a>
          <a href="/about" class="nav-link">About</a>
          <a href="/teamlist" class="nav-link">Teams</a>
          <a href="/competitions" class="nav-link">Competitions</a>
          <a href="/contacts" class="nav-link">Contact Us</a>
  
          <div class="user-block">
            <span class="lang">ENG</span>
            <button
              type="button"
              class="theme-toggle"
              :aria-pressed="theme === 'dark'"
              aria-label="Toggle dark theme"
              @click="toggleTheme"
            >
              <svg class="icon icon-moon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 44C35.046 44 44 35.046 44 24C44 23.074 42.612 22.92 42.134 23.714C41.1145 25.4027 39.7241 26.8372 38.068 27.9089C36.412 28.9807 34.5338 29.6615 32.5757 29.8998C30.6175 30.1381 28.6309 29.9277 26.7661 29.2846C24.9013 28.6414 23.2074 27.5823 21.8126 26.1874C20.4177 24.7926 19.3586 23.0987 18.7154 21.2339C18.0723 19.3691 17.8619 17.3825 18.1002 15.4243C18.3385 13.4662 19.0193 11.588 20.0911 9.93197C21.1628 8.27594 22.5973 6.88551 24.286 5.866C25.08 5.386 24.926 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z" fill="currentColor"/>
              </svg>
            </button>
            <span class="login">Login</span>
          </div>
        </nav>
      </div>
    </header>
  </template>
  
<script setup>
  import { ref, watch } from 'vue'
  
  const theme = ref(localStorage.getItem('theme') || 'light')

  watch(theme, (value) => {
    document.documentElement.setAttribute('data-theme', value)
    localStorage.setItem('theme', value)
  }, { immediate: true })
  
  const menuOpen = ref(false)
  
  function toggleTheme(event) {
    const x = event.clientX ?? window.innerWidth / 2;
    const y = event.clientY ?? window.innerHeight / 2;
  
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
  
    if (!document.startViewTransition) {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
      return;
    }
  
    const transition = document.startViewTransition(() => {
      theme.value = theme.value === 'light' ? 'dark' : 'light';
    });
  
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 450,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  }
</script>
  
<style scoped>
  .site-header {
    position: relative;
    background: var(--color-header-bg);
    box-shadow: var(--shadow-header);
  }
  
  .header-inner {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 20px 5%;
    max-width: 1440px;
    margin: 0 auto;
  }
  
  .logo {
    flex-shrink: 0;
    font-size: 28px;
    font-weight: 800;
    line-height: 1.1;
    background: var(--gradient-brand);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 44px;
    flex-wrap: wrap;
    margin-left: auto;
  }
  
  .nav-link {
    color: var(--color-accent);
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
  }
  
  .nav-link:hover,
  .nav-link:focus-visible {
    text-decoration: underline;
  }
  
  .user-block {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .lang,
  .login {
    color: var(--color-accent);
    font-size: 18px;
    font-weight: 700;
    white-space: nowrap;
  }
  
  .login {
    font-weight: 600;
  }
  
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    color: var(--color-accent);
  }
  
  .icon-moon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
  
  .burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 32px;
    height: 32px;
    margin-left: auto;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
  }
  
  .burger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--color-accent);
    border-radius: 2px;
    transition: transform 0.2s ease, opacity 0.2s ease;
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
  
    .burger {
      display: flex;
    }
  
    .nav-links {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      padding: 20px;
      background: var(--color-header-bg);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      z-index: 10;
    }
  
    .nav-links.is-open {
      display: flex;
    }
  }
</style>
  
<style>
  ::view-transition-group(root),
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none !important;
    mix-blend-mode: normal !important;
  }
  
  ::view-transition-old(root) {
    z-index: 1;
    opacity: 1 !important;
  }
  
  ::view-transition-new(root) {
    z-index: 2;
    opacity: 1 !important;
  }
</style>
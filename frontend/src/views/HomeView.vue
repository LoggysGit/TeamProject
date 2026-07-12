<template>
    <div class="home-page" :data-theme="theme">
        <BackgroundEffects />
        <!-- Header -->
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
  
        <!-- Hero -->
        <section class="info-section">
          <h1 class="hero-title">
            Participate together<br class="hero-break" />
            with a <span class="gradient-text">Header</span>
          </h1>
          <p class="section-lede">
            Create teams and take part in different competitions, gamejams and hackathons
          </p>
          <MovingList />
          <button type="button" class="start-btn">Collaborate</button>
        </section>
  
        <!-- Features -->
        <section class="features-section">
          <h2 class="section-title">Our features</h2>
          <div class="features-grid">
            <article
              v-for="feature in features"
              :key="feature.title"
              class="feature-card"
              :class="{ 'is-active': feature.active }"
            >
              <svg class="icon icon-feature" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M101.75 9.25H37V33.0688C30.861 34.3236 25.1764 37.2178 20.5503 41.4441C15.9242 45.6704 12.5292 51.0709 10.7261 57.0719C8.92301 63.0728 8.77907 69.4501 10.3096 75.5263C11.8401 81.6025 14.9879 87.1506 19.4186 91.5814C23.8494 96.0121 29.3975 99.1599 35.4737 100.69C41.5499 102.221 47.9272 102.077 53.9282 100.274C59.9291 98.4708 65.3296 95.0758 69.5559 90.4497C73.7822 85.8236 76.6765 80.1391 77.9313 74H101.75V9.25ZM78.551 64.75C77.9916 56.3673 74.4089 48.4724 68.4683 42.5318C62.5276 36.5911 54.6327 33.0084 46.25 32.449V18.5H92.5V64.75H78.551Z" fill="currentColor"/>
              </svg>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </article>
          </div>
        </section>
  
        <!-- How it works -->
        <section class="steps-section">
          <h2 class="section-title">How it works?</h2>
  
          <div class="steps-group">
            <h3 class="steps-group-title">For team creators</h3>
            <div
              v-for="step in creatorSteps"
              :key="step.number"
              class="step-card"
            >
              <span class="step-number">{{ step.number }}</span>
              <p class="step-text">{{ step.text }}</p>
              <svg class="icon icon-step" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="step.icon"></svg>
            </div>
          </div>
  
          <div class="steps-group">
            <h3 class="steps-group-title">For participants</h3>
            <div
              v-for="step in participantSteps"
              :key="step.number"
              class="step-card"
            >
              <span class="step-number">{{ step.number }}</span>
              <p class="step-text">{{ step.text }}</p>
              <svg class="icon icon-step" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="step.icon"></svg>
            </div>
          </div>
        </section>
  
        <!-- Join community / login -->
        <section class="login-section">
            <h2 class="section-title">Join community</h2>
            <p class="section-lede">
                Become a member of passionate making community and start searching team right now!
            </p>
            <div class="login-btns">
                <button type="button" class="oauth-btn">
                    <span>Log in with Google</span>
                    <svg class="icon icon-oauth" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.987" fill-rule="evenodd" clip-rule="evenodd" d="M38.2978 5.63646C42.1494 5.20614 44.4284 5.20614 48.5669 5.63646C55.8925 6.72071 62.6833 10.1068 67.9575 15.3052C64.3935 18.6741 60.8763 22.0921 57.4069 25.5583C50.7627 19.9271 43.3465 18.6273 35.1581 21.659C29.1515 24.4215 24.9688 28.8981 22.61 35.089C18.7555 32.2193 14.9511 29.2828 11.1988 26.2808C10.938 26.1436 10.6401 26.0933 10.3488 26.1374C16.3094 14.6447 25.624 7.80927 38.2925 5.63114" fill="#F44336"/>
                        <path opacity="0.997" fill-rule="evenodd" clip-rule="evenodd" d="M10.3381 26.1373C10.6392 26.0913 10.9243 26.1391 11.1934 26.2807C14.9458 29.2827 18.7501 32.2192 22.6047 35.0889C21.9981 37.5011 21.6158 39.9641 21.4625 42.4467C21.5935 44.8479 21.9743 47.2049 22.6047 49.5176L10.625 59.0536C5.40812 48.1523 5.3125 37.1802 10.3381 26.1373Z" fill="#FFC107"/>
                        <path opacity="0.999" fill-rule="evenodd" clip-rule="evenodd" d="M67.3891 70.603C63.659 67.3134 59.7539 64.2277 55.6909 61.3593C59.7639 58.4835 62.2359 54.538 63.1072 49.523H43.1481V35.6627C54.6585 35.5671 66.1637 35.6645 77.6634 35.9549C79.8451 47.8018 77.3252 58.4835 70.1038 67.9999C69.2451 68.9127 68.3355 69.7815 67.3891 70.603Z" fill="#448AFF"/>
                        <path opacity="0.993" fill-rule="evenodd" clip-rule="evenodd" d="M22.6047 49.5229C26.9609 60.3498 34.9474 65.4038 46.5641 64.6848C49.825 64.3073 52.9515 63.1681 55.6909 61.3592C59.7568 64.235 63.6561 67.3163 67.3891 70.603C61.4744 75.9179 53.9331 79.0715 45.9956 79.5492C44.1922 79.6934 42.3802 79.6934 40.5769 79.5492C27.0548 77.9555 17.0708 71.1236 10.625 59.0536L22.6047 49.5229Z" fill="#43A047"/>
                    </svg>
                </button>
                <button type="button" class="oauth-btn">
                    <span>Log in with Github</span>
                    <svg class="icon icon-oauth" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42.5 7.08325C37.8491 7.08325 33.2436 7.99933 28.9467 9.77919C24.6497 11.559 20.7454 14.1678 17.4567 17.4566C10.8148 24.0985 7.08337 33.1068 7.08337 42.4999C7.08337 58.1541 17.248 71.4353 31.3084 76.1457C33.0792 76.4291 33.6459 75.3312 33.6459 74.3749V68.3895C23.8355 70.5145 21.7459 63.6437 21.7459 63.6437C20.1167 59.5353 17.8146 58.4374 17.8146 58.4374C14.5917 56.2416 18.0625 56.3124 18.0625 56.3124C21.6042 56.5603 23.4813 59.9603 23.4813 59.9603C26.5625 65.3437 31.7688 63.7499 33.7875 62.8999C34.1063 60.5978 35.0271 59.0395 36.0188 58.1541C28.1563 57.2687 19.9042 54.2228 19.9042 40.7291C19.9042 36.7978 21.25 33.6458 23.5521 31.1312C23.198 30.2458 21.9584 26.5624 23.9063 21.7812C23.9063 21.7812 26.8813 20.8249 33.6459 25.3937C36.4438 24.6145 39.4896 24.2249 42.5 24.2249C45.5105 24.2249 48.5563 24.6145 51.3542 25.3937C58.1188 20.8249 61.0938 21.7812 61.0938 21.7812C63.0417 26.5624 61.8021 30.2458 61.448 31.1312C63.75 33.6458 65.0959 36.7978 65.0959 40.7291C65.0959 54.2582 56.8084 57.2332 48.9105 58.1187C50.1855 59.2166 51.3542 61.377 51.3542 64.6708V74.3749C51.3542 75.3312 51.9209 76.4645 53.7271 76.1457C67.7875 71.3999 77.9167 58.1541 77.9167 42.4999C77.9167 37.8489 77.0006 33.2435 75.2208 28.9465C73.4409 24.6496 70.8321 20.7453 67.5434 17.4566C64.2547 14.1678 60.3504 11.559 56.0534 9.77919C51.7565 7.99933 47.151 7.08325 42.5 7.08325Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </section>
  
        <!-- Contact -->
        <section class="contact-section">
            <h2 class="section-title">Contact us</h2>
            <p class="section-lede">Our support team can help you.</p>
            <button type="button" class="contact-btn">Contact</button>
        </section>
  
        <!-- Footer -->
        <footer class="site-footer">
            <p>Header, 2026. Metsler A, Fam2, Fam3. All rights reserved.</p>
        </footer>
    </div>
</template>
  
<script setup>
    import { ref } from 'vue'
    import BackgroundEffects from '../components/BackgroundEffects.vue'
    import MovingList from '../components/MovingList.vue'

    const menuOpen = ref(false)
    const theme = ref('light')

    const features = [
        {
          title: 'Feature 1',
          description: 'Feature 1 desctiption. Lorem ipsum si dolore el lucina baline dur durum exmas li senra',
          active: false,
        },
        {
          title: 'Feature 2',
          description: 'Feature 1 desctiption. Lorem ipsum si dolore el lucina baline dur durum exmas li senra',
          active: true,
        },
        {
          title: 'Feature 3',
          description: 'Feature 1 desctiption. Lorem ipsum si dolore el lucina baline dur durum exmas li senra',
          active: false,
        },
    ]
    
    const loginIcon = '<path d="M54 94.5V85.5H85.5V22.5H54V13.5H85.5C87.975 13.5 90.0945 14.382 91.8585 16.146C93.6225 17.91 94.503 20.028 94.5 22.5V85.5C94.5 87.975 93.6195 90.0945 91.8585 91.8585C90.0975 93.6225 87.978 94.503 85.5 94.5H54ZM45 76.5L38.8125 69.975L50.2875 58.5H13.5V49.5H50.2875L38.8125 38.025L45 31.5L67.5 54L45 76.5Z" fill="currentColor"/>'
    
    const creatorSteps = [
        {
          number: '01',
          text: 'Sign up or login with you Google account and fill your portfolio in profile.',
          icon: loginIcon,
        },
        {
          number: '02',
          text: 'Create a team card - team work type, participant requirements and contact number.',
          icon: '<path d="M94.5 63V85.5C94.5 87.8869 93.5518 90.1761 91.864 91.864C90.1761 93.5518 87.8869 94.5 85.5 94.5H22.5C20.1131 94.5 17.8239 93.5518 16.136 91.864C14.4482 90.1761 13.5 87.8869 13.5 85.5V22.5C13.5 20.1131 14.4482 17.8239 16.136 16.136C17.8239 14.4482 20.1131 13.5 22.5 13.5H45V22.5H22.5V85.5H85.5V63H94.5Z" fill="currentColor"/><path d="M94.5 31.5H76.5V13.5H67.5V31.5H49.5V40.5H67.5V58.5H76.5V40.5H94.5V31.5Z" fill="currentColor"/>',
        },
        {
          number: '03',
          text: 'Our algorithms show your team card to potential participants, and they will contact with you.',
          icon: '<path d="M86.9274 73.8176C84.2874 71.1757 81.2028 69.0193 77.8149 67.4473C82.5926 63.5766 85.6407 57.6703 85.6407 51.0469C85.6407 39.361 75.8953 29.7739 64.2094 29.9532C52.7028 30.1325 43.4321 39.5086 43.4321 51.0469C43.4321 57.6703 46.4906 63.5766 51.2578 67.4473C47.8692 69.0181 44.7844 71.1747 42.1453 73.8176C36.3867 79.5868 33.1172 87.2016 32.9063 95.3227C32.9035 95.4353 32.9232 95.5472 32.9643 95.6521C33.0055 95.7569 33.0672 95.8524 33.1458 95.933C33.2244 96.0136 33.3184 96.0776 33.4222 96.1213C33.526 96.1651 33.6374 96.1876 33.75 96.1875H39.6563C40.1098 96.1875 40.4895 95.8289 40.5 95.3754C40.7004 89.2582 43.1789 83.5313 47.5348 79.186C49.7638 76.9451 52.415 75.1687 55.3352 73.9593C58.2553 72.75 61.3863 72.1319 64.5469 72.1407C70.9699 72.1407 77.0133 74.6403 81.559 79.186C85.9043 83.5313 88.3828 89.2582 88.5938 95.3754C88.6043 95.8289 88.984 96.1875 89.4375 96.1875H95.3438C95.4564 96.1876 95.5678 96.1651 95.6716 96.1213C95.7754 96.0776 95.8693 96.0136 95.948 95.933C96.0266 95.8524 96.0883 95.7569 96.1295 95.6521C96.1706 95.5472 96.1903 95.4353 96.1875 95.3227C95.9766 87.2016 92.7071 79.5868 86.9274 73.8176ZM64.5469 64.5469C60.9399 64.5469 57.5438 63.1442 55.002 60.5918C53.7264 59.3263 52.7187 57.8167 52.0392 56.1533C51.3597 54.4898 51.0222 52.7065 51.0469 50.9098C51.0785 47.4504 52.4602 44.1071 54.8754 41.6286C57.4067 39.034 60.7922 37.5891 64.4098 37.5469C67.9852 37.5153 71.4551 38.9075 74.0074 41.4071C76.6231 43.97 78.0574 47.3977 78.0574 51.0469C78.0574 54.6539 76.6547 58.0395 74.1024 60.5918C72.8502 61.85 71.3609 62.8474 69.7207 63.5263C68.0805 64.2052 66.322 64.5521 64.5469 64.5469ZM38.127 53.8313C38.0321 52.9137 37.9793 51.9856 37.9793 51.0469C37.9793 49.37 38.1375 47.7352 38.4328 46.1426C38.5067 45.7629 38.3063 45.3727 37.9582 45.2145C36.5238 44.5711 35.2055 43.6852 34.0664 42.5672C32.7242 41.2658 31.668 39.6989 30.9653 37.9665C30.2625 36.2341 29.9286 34.3742 29.9848 32.5055C30.0797 29.12 31.4403 25.9032 33.8133 23.4774C36.4184 20.809 39.9199 19.3535 43.643 19.3957C47.0074 19.4274 50.2559 20.7246 52.7133 23.0239C53.5465 23.8043 54.2637 24.6692 54.8649 25.5973C55.0758 25.9243 55.4871 26.0614 55.8457 25.9348C57.702 25.2914 59.6637 24.8379 61.6781 24.627C62.2688 24.5637 62.6063 23.9309 62.3426 23.4035C58.9149 16.6219 51.9117 11.9391 43.8117 11.8125C32.1153 11.6332 22.3699 21.2203 22.3699 32.8957C22.3699 39.5192 25.418 45.4254 30.1957 49.2961C26.8418 50.8465 23.7516 52.9875 21.0727 55.6664C15.293 61.4356 12.0235 69.0504 11.8125 77.1821C11.8097 77.2946 11.8294 77.4066 11.8706 77.5114C11.9117 77.6162 11.9734 77.7118 12.0521 77.7924C12.1307 77.873 12.2247 77.937 12.3284 77.9807C12.4322 78.0244 12.5437 78.0469 12.6563 78.0469H18.5731C19.0266 78.0469 19.4063 77.6883 19.4168 77.2348C19.6172 71.1176 22.0957 65.3907 26.4516 61.0453C29.5524 57.9446 33.3492 55.793 37.4942 54.7489C37.9055 54.6434 38.1797 54.2532 38.127 53.8313Z" fill="currentColor"/>',
        },
    ]
    
    const participantSteps = [
        {
          number: '01',
          text: 'Sign up or login with you Google account and fill your portfolio in profile.',
          icon: loginIcon,
        },
        {
          number: '02',
          text: 'Go to team list and search for a suitable team topic and requirements for you.',
          icon: '<path d="M88.2 94.5L59.85 66.15C57.6 67.95 55.0125 69.375 52.0875 70.425C49.1625 71.475 46.05 72 42.75 72C34.575 72 27.657 69.168 21.996 63.504C16.335 57.84 13.503 50.922 13.5 42.75C13.497 34.578 16.329 27.66 21.996 21.996C27.663 16.332 34.581 13.5 42.75 13.5C50.919 13.5 57.8385 16.332 63.5085 21.996C69.1785 27.66 72.009 34.578 72 42.75C72 46.05 71.475 49.1625 70.425 52.0875C69.375 55.0125 67.95 57.6 66.15 59.85L94.5 88.2L88.2 94.5ZM42.75 63C48.375 63 53.157 61.032 57.096 57.096C61.035 53.16 63.003 48.378 63 42.75C62.997 37.122 61.029 32.3415 57.096 28.4085C53.163 24.4755 48.381 22.506 42.75 22.5C37.119 22.494 32.3385 24.4635 28.4085 28.4085C24.4785 32.3535 22.509 37.134 22.5 42.75C22.491 48.366 24.4605 53.148 28.4085 57.096C32.3565 61.044 37.137 63.012 42.75 63Z" fill="currentColor"/>',
        },
    ]

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
    
        document.documentElement.classList.add('vt-disable-transitions');
    
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
              duration: 500,
              easing: 'ease-in-out',
              pseudoElement: '::view-transition-new(root)',
            }
          );
        });

        transition.finished.finally(() => {
          document.documentElement.classList.remove('vt-disable-transitions');
        });
    }
</script>
  
<style>
    html,
    body {
      margin: 0;
      padding: 0;
      width: 100%;
      min-height: 100%;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .vt-disable-transitions * {
      transition: none !important;
    }

    ::view-transition-group(root) {
      animation-duration: 0s;
    }

    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none !important;
      mix-blend-mode: normal !important;
    }

    ::view-transition-old(root) {
      z-index: 1;
    }

    ::view-transition-new(root) {
      z-index: 2;
    }
</style>
  
<style scoped>
  .home-page {
    /* ---- Light theme ---- */
    --color-bg: #dadada;
    --color-panel: #f2f2f2;
    --color-header-bg: #f1f1f1;
    --color-surface: #ffffff;
    --color-text: #1a1a1a;
    --color-muted: #b5b5b5;
    --color-faint: #adadad;
    --color-icon: #8b8b8b;
    --color-accent: #0800ff;
    --color-accent-secondary: #423cfb;
    --color-border: rgba(0, 9, 255, 0.2);
    --gradient-brand: linear-gradient(138deg, #0101a5 18.63%, #0185ff 76.82%);
    --shadow-panel: 3px 4px 15px 0 rgba(119, 119, 119, 0.25);
    --shadow-header: 1px 4px 36px 4px rgba(135, 135, 135, 0.25);
    --shadow-pill: 0 6px 10px 0 rgba(165, 165, 165, 0.25);
    --shadow-feature-active: 7px 9px 10px 0 rgba(135, 135, 135, 0.25);
  
    --font-display: 'Montserrat', -apple-system, Roboto, Helvetica, sans-serif;
  
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
  
  /* ---- Dark theme ---- */
  .home-page[data-theme='dark'] {
    --color-bg: #2a2a2a;
    --color-panel: #343434;
    --color-header-bg: #404040;
    --color-surface: #1a1a1a;
    --color-text: #eaeaea;
    --color-muted: #b5b5b5;
    --color-faint: #9e9e9e;
    --color-icon: #8b8b8b;
    --color-accent: #3c62fb;
    --color-accent-secondary: #423cfb;
    --color-border: rgba(72, 142, 255, 1);
    --gradient-brand: linear-gradient(138deg, #0000cc 18.63%, #0185ff 76.82%);
    --shadow-panel: 3px 4px 15px 0 rgba(0, 0, 0, 0.25);
    --shadow-header: 1px 4px 36px 4px rgba(0, 0, 0, 0.25);
    --shadow-pill: 0 6px 10px 0 rgba(0, 0, 0, 0.25);
    --shadow-feature-active: 7px 9px 10px 0 rgba(0, 0, 0, 0.25);
  }

  @media (prefers-reduced-motion: no-preference) {
    .home-page,
    .home-page * {
      transition-property: background-color, color, border-color, box-shadow, opacity, transform;
      transition-duration: 0.25s;
      transition-timing-function: ease;
    }
  }

  /* ---------- Header ---------- */
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
  
  /* ---------- Shared section styles ---------- */
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
  
  .section-title {
    font-size: 44px;
    font-weight: 700;
    line-height: 1.3;
    margin: 10px;
  }
  
  .section-lede {
    max-width: 700px;
    color: var(--color-muted);
    font-size: 22px;
    font-weight: 600;
    line-height: 1.5;
  }

  .home-page > section,
  .home-page > .site-header,
  .home-page > .site-footer {
    margin-bottom: 100px;
  }

  .home-page > .site-header {
    margin-bottom: 28px;
  }
  
  .home-page > :last-child {
    margin-bottom: 0;
  }
  
  /* ---------- Hero ---------- */
  .info-section {
    padding-top: 72px;
    padding-bottom: 72px;
    margin: 20px 0;
    gap: 12px;
  }
  
  .hero-title {
    max-width: 700px;
    font-size: 56px;
    font-weight: 800;
    line-height: 1.25;
    margin: 0px;
  }
  
  .hero-break {
    display: block;
  }
  
  .gradient-text {
    background: var(--gradient-brand);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }


  .start-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border-radius: 12px;
    border: 2px solid var(--color-border);
    background: var(--color-accent);
    color: var(--color-surface);
    font-family: inherit;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
    cursor: pointer;
  }
  
  /* ---------- Features ---------- */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px;
    width: 100%;
    max-width: 850px;
  }
  
  .feature-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 24px 20px;
    border-radius: 20px;
    border: 2px solid var(--color-border);
    background: var(--color-surface);
  }
  
  .feature-card:hover {
    box-shadow: var(--shadow-feature-active);
    transform: scale(1.01);
  }
  
  .icon-feature {
    flex-shrink: 0;
    width: 52px;
    height: 52px;
    color: var(--color-accent);
  }
  
  .feature-title {
    color: var(--color-accent);
    font-size: 22px;
    font-weight: 700;
    line-height: 1.3;
  }
  
  .feature-description {
    max-width: 280px;
    color: var(--color-muted);
    font-size: 15px;
    font-weight: 600;
    line-height: 1.5;
  }
  
  /* ---------- Steps ---------- */
  .steps-section {
    gap: 12px;
    padding: 50px 3%;
  }
  
  .steps-group {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    width: 100%;
    max-width: 1000px;
    text-align: left;
  }
  
  .steps-group-title {
    color: var(--color-muted);
    font-size: 20px;
    font-weight: 700;
    line-height: 1.3;
    margin: 10px;
  }
  
  .step-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 14px 28px;
    border-radius: 20px;
    border: 2px solid var(--color-border);
    background: var(--color-surface);
  }
  
  .step-number {
    flex-shrink: 0;
    color: var(--color-accent-secondary);
    font-size: 36px;
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
    min-width: 40px;
  }
  
  .step-text {
    flex: 1;
    min-width: 0;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.5;
  }
  
  .icon-step {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    color: var(--color-accent);
  }
  
  /* ---------- Join community ---------- */
  .login-section {
    -display: none;
  }

  .login-btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 28px;
  }
  
  .oauth-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px 22px;
    border-radius: 12px;
    border: 2px solid var(--color-border);
    background: var(--color-surface);
    cursor: pointer;
    font-family: inherit;
  }
  
  .oauth-btn span {
    color: var(--color-icon);
    font-size: 18px;
    font-weight: 600;
    line-height: 1.3;
    white-space: nowrap;
  }
  
  .icon-oauth {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
  }
  
  .oauth-btn:hover {
    border-color: rgba(0, 9, 255, 0.4);
  }
  
  /* ---------- Contact ---------- */
  .contact-section{
    gap: 4px;
    padding: 20px 5%;
  }
  .contact-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border-radius: 12px;
    border: 2px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-icon);
    font-family: inherit;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
    cursor: pointer;
  }
  
  .contact-btn:hover {
    border-color: rgba(0, 9, 255, 0.4);
  }
  
  /* ---------- Footer ---------- */
  .site-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 20px;
    background: var(--color-panel);
    box-shadow: var(--shadow-panel);
  }
  
  .site-footer p {
    color: var(--color-faint);
    text-align: center;
    font-size: 15px;
    font-weight: 700;
  }
  
  /* ================= Responsive ================= */
  @media (max-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 36px;
    }
  
    .section-title {
      font-size: 30px;
    }
  
    .section-lede {
      font-size: 16px;
    }
  
    .moving-list {
      gap: 32px;
      padding: 14px 32px;
    }
  
    .pill-item.dim {
      font-size: 24px;
    }
  
    .pill-item.main {
      font-size: 36px;
    }
  
    .home-page > section,
    .home-page > .site-header,
    .home-page > .site-footer {
      margin-bottom: 60px;
    }
  
    .home-page > .site-header {
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
  
    .features-grid {
      grid-template-columns: minmax(0, 1fr);
      max-width: 360px;
    }
  
    .step-card {
      flex-wrap: wrap;
    }
  
    .icon-step {
      order: 3;
      margin-left: auto;
    }
  }
  
  </style>
<template>
    <div class="page">
        <BackgroundEffects />
        
        <!-- Header -->
        <Header v-model:theme="theme" />
  
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
          <h2 class="section-title">Why Header?</h2>
          <div class="features-grid">
            <article
              v-for="feature in features"
              :key="feature.title"
              class="feature-card"
              :class="{ 'is-active': feature.active }"
            >
              <svg class="icon icon-feature" viewBox="0 0 111 111" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="feature.icon"></svg>
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
  
        <!-- Join community -->
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
        <Footer />
    </div>
</template>
  
<script setup>
    import { ref } from 'vue'
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue'

    import BackgroundEffects from '../components/BackgroundEffects.vue'
    import MovingList from '../components/MovingList.vue'

    const theme = ref('light')

    const features = [
  {
    title: 'Wide thematic range',
    description: 'Explore teams across a vast array of disciplines, from tech startups to scientific research, ensuring a perfect match for your specific field.',
    icon: '<path d="M55.5 101.75C29.9561 101.75 9.25 81.0439 9.25 55.5C9.25 29.9561 29.9561 9.25 55.5 9.25C81.0439 9.25 101.75 29.9561 101.75 55.5C101.75 81.0439 81.0439 101.75 55.5 101.75ZM44.9088 90.9599C40.3458 81.2812 37.7024 70.8097 37.1249 60.125H18.7867C19.6878 67.242 22.6359 73.9443 27.273 79.418C31.9101 84.8917 38.0366 88.9013 44.9088 90.9599ZM46.3887 60.125C47.0871 71.4054 50.3108 82.0013 55.5 91.353C60.8302 81.7544 63.9435 71.084 64.6113 60.125H46.3887ZM92.2132 60.125H73.8751C73.2976 70.8097 70.6542 81.2812 66.0912 90.9599C72.9634 88.9013 79.0899 84.8917 83.727 79.418C88.3641 73.9443 91.3122 67.242 92.2132 60.125ZM18.7867 50.875H37.1249C37.7024 40.1903 40.3458 29.7188 44.9088 20.0401C38.0366 22.0987 31.9101 26.1083 27.273 31.582C22.6359 37.0557 19.6878 43.758 18.7867 50.875ZM46.3934 50.875H64.6066C63.9402 39.9164 60.8286 29.246 55.5 19.647C50.1698 29.2456 47.0565 39.916 46.3887 50.875M66.0866 20.0401C70.6512 29.7185 73.2961 40.1899 73.8751 50.875H92.2132C91.3122 43.758 88.3641 37.0557 83.727 31.582C79.0899 26.1083 72.9634 22.0987 66.0912 20.0401" fill="currentColor"/>'
  },
  {
    title: 'Strict criteria matching',
    description: 'No vague recommendations or hidden algorithms. Get transparent, precise team selection based strictly on your defined requirements and filters.',
    icon: '<path d="M64.75 55.5V91.945C64.935 93.3325 64.4725 94.8125 63.4087 95.7837C62.9809 96.2125 62.4726 96.5527 61.9131 96.7847C61.3536 97.0168 60.7538 97.1363 60.1481 97.1363C59.5424 97.1363 58.9426 97.0168 58.3831 96.7847C57.8236 96.5527 57.3154 96.2125 56.8875 95.7837L47.5912 86.4875C47.0871 85.9942 46.7038 85.3911 46.4711 84.7252C46.2385 84.0593 46.1628 83.3487 46.25 82.6488V55.5H46.1112L19.4712 21.3675C18.7202 20.4033 18.3813 19.1811 18.5286 17.9678C18.6759 16.7545 19.2975 15.6489 20.2575 14.8925C21.1362 14.245 22.1075 13.875 23.125 13.875H87.875C88.8925 13.875 89.8637 14.245 90.7425 14.8925C91.7025 15.6489 92.3241 16.7545 92.4714 17.9678C92.6187 19.1811 92.2798 20.4033 91.5287 21.3675L64.8887 55.5H64.75Z" fill="currentColor"/>'
  },
  {
    title: 'Competition database',
    description: 'Access an extensive, continuously updated repository of global hackathons, academic tournaments, and professional contests.',
    icon: '<path d="M13.875 72.7559C22.977 79.7257 38.0822 83.25 55.5 83.25C72.89 83.25 87.9906 79.735 97.125 72.8345V83.25C97.125 94.4656 79.1106 101.454 56.9199 101.741L55.5 101.75C32.6617 101.75 13.875 94.7061 13.875 83.25V72.7559Z" fill="currentColor"/><path d="M13.875 45.0059C22.977 51.9757 38.0822 55.5 55.5 55.5C72.89 55.5 87.9906 51.985 97.125 45.0845V55.5C97.125 66.9561 78.3383 74 55.5 74C33.3093 74 14.9387 67.3492 13.9721 56.4481L13.8981 55.981L13.875 55.5V45.0059Z" fill="currentColor"/><path d="M55.5 9.25C60.3146 9.25 64.9535 9.5645 69.2686 10.1657L71.4378 10.4941C74.0278 10.9258 76.4728 11.4623 78.773 12.1036L80.808 12.7095L81.1549 12.8205C82.4135 13.2343 83.6555 13.6972 84.878 14.208L85.7984 14.6057C87.448 15.3519 88.9387 16.169 90.2707 17.057C90.7795 17.3962 91.262 17.743 91.7184 18.0976C92.8743 18.9946 93.9138 20.0325 94.8125 21.1871L95.2334 21.7791C95.4492 22.1029 95.6481 22.4282 95.83 22.755L96.1538 23.3979C96.6563 24.477 96.9647 25.6025 97.0787 26.7741L97.125 27.75C97.125 39.2061 78.3383 46.25 55.5 46.25C33.3093 46.25 14.9388 39.5993 13.9721 28.6981C13.9072 28.3863 13.8746 28.0685 13.875 27.75L13.8981 27.269L13.9721 26.8065C14.9203 16.1413 32.5184 9.54138 54.057 9.25925L55.5 9.25Z" fill="currentColor"/>'
  },
  {
    title: '100% Free platform',
    description: 'Enjoy full, unrestricted access to all matchmaking features, database entries, and team tools without any paywalls or hidden fees.',
    icon: '<path fill-rule="evenodd" clip-rule="evenodd" d="M43.8283 31.635C40.7703 33.9271 39.3883 36.6744 39.3883 39.2385C39.3883 41.8026 40.7703 44.5554 43.8283 46.8531C46.8919 49.1508 51.3763 50.7381 56.5656 50.7381C58.0375 50.7381 59.4492 51.3228 60.49 52.3636C61.5309 53.4045 62.1156 54.8161 62.1156 56.2881C62.1156 57.76 61.5309 59.1717 60.49 60.2125C59.4492 61.2533 58.0375 61.8381 56.5656 61.8381C49.2063 61.8381 42.3298 59.607 37.1683 55.7331C32.0068 51.8592 28.2883 46.0872 28.2883 39.244C28.2883 32.4009 32.0068 26.6233 37.1683 22.7494C42.3298 18.8811 49.2118 16.65 56.5656 16.65C67.9597 16.65 78.7323 22.1056 83.0169 31.191C83.3277 31.8506 83.5056 32.5649 83.5404 33.2933C83.5752 34.0216 83.4661 34.7497 83.2195 35.4359C82.9729 36.1221 82.5936 36.753 82.1031 37.2926C81.6127 37.8322 81.0208 38.2699 80.3612 38.5808C79.7016 38.8916 78.9872 39.0695 78.2589 39.1043C77.5306 39.1391 76.8025 39.03 76.1163 38.7834C75.4301 38.5368 74.7992 38.1575 74.2596 37.6671C73.7199 37.1766 73.2822 36.5847 72.9714 35.9251C71.0289 31.7793 64.9683 27.75 56.5711 27.75C51.3819 27.75 46.8919 29.3373 43.8283 31.635Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M67.4713 80.9356C70.5294 78.6435 71.9058 75.8962 71.9058 73.3321C71.9058 70.768 70.5294 68.0097 67.4658 65.7175C64.4077 63.4198 59.9178 61.8325 54.7341 61.8325C53.2621 61.8325 51.8505 61.2478 50.8096 60.207C49.7688 59.1662 49.1841 57.7545 49.1841 56.2825C49.1841 54.8106 49.7688 53.3989 50.8096 52.3581C51.8505 51.3173 53.2621 50.7325 54.7341 50.7325C62.0934 50.7325 68.9698 52.9636 74.1313 56.8375C79.2928 60.7114 83.0058 66.4834 83.0058 73.3266C83.0058 80.1697 79.2928 85.9473 74.1258 89.8156C68.9643 93.6895 62.0934 95.9206 54.7341 95.9206C43.3399 95.9206 32.5618 90.465 28.2828 81.3741C27.655 80.0427 27.5818 78.5165 28.0793 77.1311C28.5768 75.7458 29.6043 74.6148 30.9357 73.987C32.2671 73.3593 33.7933 73.2861 35.1786 73.7836C36.564 74.2811 37.6949 75.3086 38.3227 76.6399C40.2763 80.7913 46.3369 84.8206 54.7341 84.8206C59.9233 84.8206 64.4077 83.2333 67.4713 80.9356ZM55.5 5.54999C56.9719 5.54999 58.3836 6.13472 59.4244 7.17554C60.4652 8.21637 61.05 9.62804 61.05 11.1V16.65C61.05 18.1219 60.4652 19.5336 59.4244 20.5744C58.3836 21.6153 56.9719 22.2 55.5 22.2C54.028 22.2 52.6164 21.6153 51.5755 20.5744C50.5347 19.5336 49.95 18.1219 49.95 16.65V11.1C49.95 9.62804 50.5347 8.21637 51.5755 7.17554C52.6164 6.13472 54.028 5.54999 55.5 5.54999Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M55.5 88.8C56.9719 88.8 58.3836 89.3847 59.4244 90.4255C60.4652 91.4664 61.05 92.878 61.05 94.35V99.9C61.05 101.372 60.4652 102.784 59.4244 103.824C58.3836 104.865 56.9719 105.45 55.5 105.45C54.028 105.45 52.6163 104.865 51.5755 103.824C50.5347 102.784 49.95 101.372 49.95 99.9V94.35C49.95 92.878 50.5347 91.4664 51.5755 90.4255C52.6163 89.3847 54.028 88.8 55.5 88.8Z" fill="currentColor"/>'
  }
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
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 28px;
    width: 100%;
    max-width: 1200px;
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
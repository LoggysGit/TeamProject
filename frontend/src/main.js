import './components/Styles.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

const TAG_COLORS = {
    Hackathon: '#000000',
    Olympiad:  '#000000',
    Gamejam:   '#000000',
    Research:  '#000000',
    Project:   '#000000',
    Startup:   '#EBA100',
    AI:        '#000000',
    Biology:   '#8FC998',
    Geography: '#8FC998',
    SE:        '#A2E6ED',
    Other:     '#8B8B8B',
  }  

const app = createApp(App)
app.use(router)
app.mount('#app')

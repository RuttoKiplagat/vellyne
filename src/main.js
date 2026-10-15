import { createApp } from 'vue'

import './assets/main.css'
import App from './App.vue'
import { vReveal } from './directives/reveal'

const app = createApp(App)

// `v-reveal` gently fades elements in as they scroll into view.
app.directive('reveal', vReveal)

app.mount('#app')
